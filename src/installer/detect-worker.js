'use strict';

const { parentPort, workerData } = require('worker_threads');
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const { tools, envVarNames, tempDir } = workerData;

// Unique suffix to avoid file conflicts on concurrent calls
const suffix = Date.now() + '_' + Math.random().toString(36).substring(2, 8);
const inputPath = path.join(tempDir, `_detect_input_${suffix}.json`);
const psPath = path.join(tempDir, `_detect_batch_${suffix}.ps1`);

// Write tool commands to a temp JSON file (avoids all quoting/escaping issues)
const commandsObj = {};
for (const t of tools) commandsObj[t.id] = t.verifyCommand;
fs.writeFileSync(inputPath, JSON.stringify({ envVarNames, commands: commandsObj }));

// Generate and write the PowerShell script
fs.writeFileSync(psPath, buildPsScript(inputPath));

// Execute a SINGLE PowerShell process (all detection runs inside it via runspaces)
execFile('powershell.exe', [
  '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', psPath
], {
  encoding: 'utf8',
  timeout: 60000,
  windowsHide: true,
  maxBuffer: 10 * 1024 * 1024
}, (err, stdout) => {
  const results = {};

  // Look for the JSON output after our known marker
  const marker = ':::DETECT_RESULTS:::';
  const markerIdx = (stdout || '').indexOf(marker);

  if (markerIdx >= 0) {
    try {
      const jsonStr = stdout.substring(markerIdx + marker.length).trim();
      const raw = JSON.parse(jsonStr);

      for (const tool of tools) {
        const output = (raw[tool.id] || '').toString().trim();
        try {
          const match = output.match(new RegExp(tool.verifyRegex));
          results[tool.id] = {
            installed: !!match,
            version: match ? match[0] : null,
            output: output.split(/\r?\n/)[0].trim()
          };
        } catch {
          results[tool.id] = { installed: false, version: null, output: '' };
        }
      }
    } catch {
      // JSON parse failed — results stay empty, triggering fallback
    }
  }

  // Clean up temp files
  try { fs.unlinkSync(inputPath); } catch {}
  try { fs.unlinkSync(psPath); } catch {}

  // If no tools were detected at all and PS returned an error, signal failure
  if (Object.keys(results).length === 0 && err) {
    parentPort.postMessage({ __error: true, message: err.message });
  } else {
    // Fill any missing tools as not-installed
    for (const tool of tools) {
      if (!results[tool.id]) {
        results[tool.id] = { installed: false, version: null, output: '' };
      }
    }
    parentPort.postMessage(results);
  }
});

function buildPsScript(inputFilePath) {
  // Single-quoted PS path — only need to escape single quotes (backslashes are literal)
  const psInputPath = inputFilePath.replace(/'/g, "''");

  return `$ErrorActionPreference = 'SilentlyContinue'

# Read tool commands from JSON input
$data = Get-Content -Path '${psInputPath}' -Raw | ConvertFrom-Json

# --- Refresh process environment with current Machine + User PATH ---
$mp = [Environment]::GetEnvironmentVariable('Path', 'Machine')
$up = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($mp -and $up) { $env:Path = "$mp;$up" }
elseif ($mp) { $env:Path = $mp }
elseif ($up) { $env:Path = $up }

# Load tool-specific env vars from Machine scope
foreach ($vn in $data.envVarNames) {
    $val = [Environment]::GetEnvironmentVariable($vn, 'Machine')
    if ($val) { [Environment]::SetEnvironmentVariable($vn, $val, 'Process') }
}

# Build commands hashtable from deserialized JSON
$cmdMap = [ordered]@{}
foreach ($prop in $data.commands.PSObject.Properties) {
    $cmdMap[$prop.Name] = [string]$prop.Value
}

# Script block for each detection task (runs in its own runspace thread)
# Uses System.Diagnostics.Process to launch cmd.exe with the verify command.
# This inherits the process environment we set above (fresh PATH + env vars).
$detectBlock = @'
param([string]$Cmd)
try {
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = 'cmd.exe'
    $psi.Arguments = '/c ' + $Cmd
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true
    $proc = [System.Diagnostics.Process]::Start($psi)
    $stdout = $proc.StandardOutput.ReadToEnd()
    $stderr = $proc.StandardError.ReadToEnd()
    if (-not $proc.WaitForExit(15000)) {
        try { $proc.Kill() } catch {}
    }
    return ($stdout + [char]10 + $stderr).Trim()
} catch {
    return ''
}
'@

# Create runspace pool (max 8 parallel threads — avoids OS process contention)
$pool = [System.Management.Automation.Runspaces.RunspaceFactory]::CreateRunspacePool(1, 8)
$pool.Open()

$handles = New-Object System.Collections.ArrayList
foreach ($id in $cmdMap.Keys) {
    $ps = [PowerShell]::Create()
    $ps.RunspacePool = $pool
    [void]$ps.AddScript($detectBlock)
    [void]$ps.AddArgument($cmdMap[$id])
    $handle = $ps.BeginInvoke()
    [void]$handles.Add(@{ Id = $id; PS = $ps; Handle = $handle })
}

# Collect results from all runspaces
$results = [ordered]@{}
foreach ($h in $handles) {
    try {
        $output = $h.PS.EndInvoke($h.Handle)
        $results[$h.Id] = ($output | Out-String).Trim()
    } catch {
        $results[$h.Id] = ''
    }
    $h.PS.Dispose()
}

$pool.Close()
$pool.Dispose()

# Output marker followed by compact JSON
Write-Output ':::DETECT_RESULTS:::'
ConvertTo-Json $results -Compress
`;
}
