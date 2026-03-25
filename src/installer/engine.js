const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync, exec } = require('child_process');
const { app } = require('electron');
const AdmZip = require('adm-zip');

class InstallerEngine {
  constructor() {
    this.config = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'config', 'tools.json'), 'utf8')
    );
    this.downloadDir = path.join(app.getPath('temp'), 'devtools-installer');
    this.historyPath = path.join(app.getPath('userData'), 'install-history.json');
    this.logPath = path.join(app.getPath('userData'), 'install.log');

    if (!fs.existsSync(this.downloadDir)) {
      fs.mkdirSync(this.downloadDir, { recursive: true });
    }
  }

  // ─── Public API ──────────────────────────────────────────────

  getToolsConfig() {
    return this.config;
  }

  isAdmin() {
    try {
      execSync('net session', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  async detectInstalled(toolId) {
    const tool = this._getTool(toolId);
    if (!tool) return { installed: false };

    // Read fresh env vars from the system — the Electron process.env is stale
    // after we set Machine-scope variables during installation.
    const freshEnv = this._getFreshEnv();

    try {
      // Use spawnSync with shell:true to find .cmd files (e.g. mvn.cmd).
      // Pass the full command as a single string to avoid deprecation warning.
      const result = require('child_process').spawnSync(
        tool.verifyCommand,
        { encoding: 'utf8', timeout: 10000, stdio: ['pipe', 'pipe', 'pipe'], env: freshEnv, windowsHide: true, shell: true }
      );
      const combined = (result.stdout || '') + (result.stderr || '');
      const match = combined.match(new RegExp(tool.verifyRegex));
      return { installed: !!match, version: match ? match[0] : null, output: combined.trim().split('\n')[0] };
    } catch (err) {
      return { installed: false, version: null, output: '' };
    }
  }

  async installAll(selections, progressCallback) {
    const total = selections.length;
    const results = [];

    for (let i = 0; i < selections.length; i++) {
      const { toolId, version } = selections[i];
      const tool = this._getTool(toolId);
      if (!tool) continue;

      const selectedVersion = version || tool.defaultVersion;

      try {
        await this._installTool(tool, selectedVersion, (step, detail) => {
          progressCallback({
            toolId,
            toolName: tool.name,
            step,
            detail,
            toolIndex: i,
            totalTools: total,
            overallPercent: Math.round(((i + (this._stepPercent(step) / 100)) / total) * 100)
          });
        });

        results.push({ toolId, success: true });
        this._saveHistory(toolId, selectedVersion, true);
      } catch (err) {
        this._log(`ERROR installing ${tool.name}: ${err.message}`);
        results.push({ toolId, success: false, error: err.message });
        this._saveHistory(toolId, selectedVersion, false, err.message);

        progressCallback({
          toolId,
          toolName: tool.name,
          step: 'error',
          detail: err.message,
          toolIndex: i,
          totalTools: total,
          overallPercent: Math.round(((i + 1) / total) * 100)
        });
      }
    }

    progressCallback({
      step: 'all-complete',
      results,
      overallPercent: 100
    });

    return results;
  }

  async installSingle(toolId, version, progressCallback) {
    const tool = this._getTool(toolId);
    if (!tool) throw new Error(`Tool ${toolId} not found`);
    const selectedVersion = version || tool.defaultVersion;

    // Clear cached download on retry so a corrupt file doesn't persist
    const url = tool.downloadUrls[selectedVersion];
    if (url) {
      const ext = path.extname(new URL(url).pathname) || '.exe';
      const cached = path.join(this.downloadDir, `${tool.id}-${selectedVersion}${ext}`);
      if (fs.existsSync(cached)) {
        this._log(`Clearing cached download for retry: ${cached}`);
        fs.unlinkSync(cached);
      }
    }

    await this._installTool(tool, selectedVersion, (step, detail) => {
      progressCallback({
        toolId,
        toolName: tool.name,
        step,
        detail,
        toolIndex: 0,
        totalTools: 1,
        overallPercent: this._stepPercent(step)
      });
    });

    this._saveHistory(toolId, selectedVersion, true);
  }

  getHistory() {
    try {
      return JSON.parse(fs.readFileSync(this.historyPath, 'utf8'));
    } catch {
      return [];
    }
  }

  // ─── Private Methods ─────────────────────────────────────────

  _getTool(toolId) {
    return this.config.tools.find((t) => t.id === toolId);
  }

  _stepPercent(step) {
    const map = { downloading: 10, installing: 50, configuring: 80, verifying: 90, completed: 100, error: 100 };
    return map[step] || 0;
  }

  async _installTool(tool, version, onStep) {
    this._log(`\n${'='.repeat(50)}\nInstalling ${tool.name} v${version}\n${'='.repeat(50)}`);

    // Step 1: Download
    onStep('downloading', 'Starting download...');
    const installerPath = await this._download(tool, version, (pct, speed) => {
      onStep('downloading', `${pct}% downloaded${speed ? ` (${speed})` : ''}`);
    });

    // Step 2: Install
    onStep('installing', 'Running installer...');
    await this._runInstaller(tool, version, installerPath);
    onStep('installing', 'Installation complete');

    // Step 3: Configure
    onStep('configuring', 'Setting environment variables...');
    await this._configure(tool, version);
    onStep('configuring', 'Environment configured');

    // Step 4: Verify
    onStep('verifying', 'Verifying installation...');
    const verifyResult = await this.detectInstalled(tool.id);
    if (!verifyResult.installed) {
      this._log(`Verification warning for ${tool.name} — command may require shell restart`);
      onStep('completed', `Installed (verification may need shell restart): ${verifyResult.output || 'N/A'}`);
    } else {
      onStep('completed', `Verified: ${verifyResult.output}`);
    }

    this._log(`${tool.name} installed successfully`);
  }

  _download(tool, version, onProgress) {
    return new Promise((resolve, reject) => {
      const url = tool.downloadUrls[version];
      if (!url) return reject(new Error(`No download URL for ${tool.name} v${version}`));

      const ext = path.extname(new URL(url).pathname) || '.exe';
      const dest = path.join(this.downloadDir, `${tool.id}-${version}${ext}`);

      // Skip if already downloaded
      if (fs.existsSync(dest)) {
        const stat = fs.statSync(dest);
        if (stat.size > 1000) {
          this._log(`Using cached download: ${dest}`);
          onProgress(100, '');
          return resolve(dest);
        }
      }

      this._log(`Downloading from: ${url}`);
      this._followRedirect(url, (response) => {
        if (response.statusCode !== 200) {
          return reject(new Error(`Download failed: HTTP ${response.statusCode}`));
        }

        const totalSize = parseInt(response.headers['content-length'], 10) || 0;
        let downloaded = 0;
        let lastProgressTime = 0;
        const startTime = Date.now();

        // Use large buffer for the write stream to maximize throughput
        const fileStream = fs.createWriteStream(dest, { highWaterMark: 4 * 1024 * 1024 });

        response.on('data', (chunk) => {
          downloaded += chunk.length;

          // Throttle progress updates to every 200ms to avoid UI backpressure
          const now = Date.now();
          if (totalSize > 0 && (now - lastProgressTime > 200 || downloaded >= totalSize)) {
            lastProgressTime = now;
            const pct = Math.round((downloaded / totalSize) * 100);
            const mb = (downloaded / (1024 * 1024)).toFixed(1);
            const totalMb = (totalSize / (1024 * 1024)).toFixed(1);
            const elapsed = (now - startTime) / 1000;
            const speedMBs = elapsed > 0 ? (downloaded / (1024 * 1024) / elapsed).toFixed(1) : '0';
            onProgress(pct, `${mb}MB / ${totalMb}MB — ${speedMBs} MB/s`);
          }
        });

        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          this._log(`Download complete: ${dest}`);
          resolve(dest);
        });

        fileStream.on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      }, (err) => reject(err));
    });
  }

  _followRedirect(url, onResponse, onError, maxRedirects = 10) {
    if (maxRedirects <= 0) return onError(new Error('Too many redirects'));

    const client = url.startsWith('https') ? https : http;
    const requestOptions = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Encoding': 'identity',
        'Connection': 'keep-alive'
      },
      // Large buffer for fast reading from socket
      highWaterMark: 4 * 1024 * 1024
    };

    client.get(url, requestOptions, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume(); // drain the redirect response
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        return this._followRedirect(redirectUrl, onResponse, onError, maxRedirects - 1);
      }
      onResponse(res);
    }).on('error', onError);
  }

  async _runInstaller(tool, version, installerPath) {
    const ext = path.extname(installerPath).toLowerCase();
    const installDir = tool.defaultInstallDir.replace('{version}', version);

    // Validate the downloaded file before attempting install
    try {
      const stat = fs.statSync(installerPath);
      if (stat.size < 50000) {
        throw new Error(`Downloaded file is too small (${stat.size} bytes) — likely not a valid installer`);
      }
      if (ext === '.msi') {
        const fd = fs.openSync(installerPath, 'r');
        const buf = Buffer.alloc(4);
        fs.readSync(fd, buf, 0, 4, 0);
        fs.closeSync(fd);
        // MSI magic: D0 CF 11 E0
        if (buf[0] !== 0xD0 || buf[1] !== 0xCF || buf[2] !== 0x11 || buf[3] !== 0xE0) {
          fs.unlinkSync(installerPath);
          throw new Error('Downloaded file is not a valid MSI — removing cached file. Please retry.');
        }
      }
    } catch (validationErr) {
      if (validationErr.message.includes('not a valid')) throw validationErr;
      throw new Error(`Cannot access installer file: ${validationErr.message}`);
    }

    if (ext === '.zip') {
      // Extract ZIP (e.g., Maven)
      const parentDir = path.dirname(installDir);
      this._log(`Extracting ZIP to: ${parentDir}`);

      if (this.isAdmin()) {
        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }
        const zip = new AdmZip(installerPath);
        zip.extractAllTo(parentDir, true);
      } else {
        // Non-admin: use elevated PowerShell to extract to protected directories
        const psScript = [
          `if (-not (Test-Path '${parentDir}')) { New-Item -ItemType Directory -Path '${parentDir}' -Force | Out-Null }`,
          `Expand-Archive -Path '${installerPath}' -DestinationPath '${parentDir}' -Force`
        ].join('\r\n');
        const psScriptPath = path.join(this.downloadDir, `${tool.id}-extract.ps1`);
        fs.writeFileSync(psScriptPath, psScript);

        await new Promise((resolve, reject) => {
          exec(
            `powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \\"${psScriptPath}\\"' -Verb RunAs -Wait -WindowStyle Hidden"`,
            { timeout: 120000, windowsHide: true },
            (err) => {
              if (err) {
                this._log(`ZIP extraction error: ${err.message}`);
                return reject(new Error('ZIP extraction failed — UAC may have been denied'));
              }
              if (!fs.existsSync(installDir)) {
                return reject(new Error(`Extraction completed but ${installDir} was not found`));
              }
              resolve();
            }
          );
        });
      }

      this._log('Extraction complete');
      return;
    }

    // Build install command
    const cmdTemplate = tool.installCommand[ext.replace('.', '')];
    if (!cmdTemplate) throw new Error(`No install command for ${ext} files`);

    // MSI log path for debugging
    const msiLogPath = path.join(this.downloadDir, `${tool.id}-install.log`);

    const cmd = cmdTemplate
      .replace(/\{installerPath\}/g, installerPath)
      .replace(/\{installDir\}/g, installDir)
      .replace(/\{logPath\}/g, msiLogPath);

    this._log(`Running: ${cmd}`);

    const isAdmin = this.isAdmin();

    if (isAdmin) {
      // Already admin — clear pending reboot flags and run directly
      this._clearRebootPending();
      return new Promise((resolve, reject) => {
        exec(cmd, { timeout: 600000, windowsHide: true }, (err, stdout, stderr) => {
          if (err) {
            this._handleInstallError(err, stdout, stderr, msiLogPath);
            if (err.code === 3010) return resolve();
            if (err.killed) return reject(new Error('Installation timed out (killed after 10 minutes)'));
            return reject(new Error(`Installation failed (exit code ${err.code || 'unknown'}): ${stderr || stdout || err.message}`));
          }
          this._log(`Install stdout: ${stdout}`);
          resolve();
        });
      });
    }

    // Not admin — elevate via PowerShell Start-Process
    // Write command to a batch file and run it elevated
    const exitCodeFile = path.join(this.downloadDir, `${tool.id}-exitcode.txt`);
    const batPath = path.join(this.downloadDir, `${tool.id}-install.bat`);

    // Clear MsiSystemRebootPending if set — Oracle JDK MSI's LaunchConditions
    // will reject the install when a reboot is pending from a previous install.
    const rebootClear = [
      'reg delete "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager" /v PendingFileRenameOperations /f >nul 2>&1',
      'reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Component Based Servicing\\RebootPending" /f >nul 2>&1'
    ].join('\r\n');

    const batContent = `@echo off\r\n${rebootClear}\r\nif not exist "${installDir}" mkdir "${installDir}"\r\n${cmd}\r\necho %ERRORLEVEL% > "${exitCodeFile}"\r\n`;
    fs.writeFileSync(batPath, batContent);

    // Clean up old exit code file
    if (fs.existsSync(exitCodeFile)) {
      try { fs.unlinkSync(exitCodeFile); } catch { /* ignore */ }
    }

    this._log('Not running as admin — elevating install command via UAC...');

    return new Promise((resolve, reject) => {
      const psCmd = `Start-Process -FilePath 'cmd.exe' -ArgumentList '/c "${batPath}"' -Verb RunAs -Wait -WindowStyle Hidden`;
      exec(`powershell -NoProfile -Command "${psCmd.replace(/"/g, '\\"')}"`, { timeout: 600000, windowsHide: true }, (err, stdout, stderr) => {
        // Read exit code from the file the batch wrote
        let exitCode = null;
        if (fs.existsSync(exitCodeFile)) {
          try {
            exitCode = parseInt(fs.readFileSync(exitCodeFile, 'utf8').trim(), 10);
          } catch { /* ignore */ }
        }

        this._log(`Elevated install finished. Exit code from file: ${exitCode}, PS error: ${err ? err.message : 'none'}`);

        // Only log MSI errors on actual failure
        if (exitCode !== 0 && exitCode !== 3010) {
          this._handleInstallError({ code: exitCode }, '', '', msiLogPath);
        }

        if (exitCode === 0 || exitCode === 3010) {
          if (exitCode === 3010) this._log('Exit code 3010: success (reboot recommended)');
          return resolve();
        }

        if (err && err.killed) {
          return reject(new Error('Installation timed out (killed after 10 minutes)'));
        }

        // If user cancelled UAC, no exit code file will exist
        if (exitCode === null && err) {
          return reject(new Error('Installation was cancelled (UAC was denied or process failed to start)'));
        }

        return reject(new Error(`Installation failed (exit code ${exitCode || 'unknown'})`));
      });
    });
  }

  _handleInstallError(err, stdout, stderr, msiLogPath) {
    if (stdout) this._log(`Install stdout: ${stdout}`);
    if (stderr) this._log(`Install stderr: ${stderr}`);
    if (err && err.code) this._log(`Exit code: ${err.code}`);

    // Read MSI log if available
    if (msiLogPath && fs.existsSync(msiLogPath)) {
      try {
        const msiLog = fs.readFileSync(msiLogPath, 'utf16le');
        const errorLines = msiLog.split('\n')
          .filter(l => /error|failed|fatal/i.test(l) && !/^Property\(S\):|^Property\(C\):/i.test(l.trim()))
          .slice(-10);
        if (errorLines.length > 0) {
          this._log(`MSI log errors:\n${errorLines.join('\n')}`);
        }
      } catch { /* ignore */ }
    }
  }

  _clearRebootPending() {
    // Oracle JDK MSI LaunchConditions fail when Windows has a pending reboot.
    // Temporarily clear the registry keys that MSI checks.
    try {
      execSync('reg delete "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager" /v PendingFileRenameOperations /f', { stdio: 'ignore', timeout: 5000 });
    } catch { /* key may not exist — that's fine */ }
    try {
      execSync('reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Component Based Servicing\\RebootPending" /f', { stdio: 'ignore', timeout: 5000 });
    } catch { /* key may not exist — that's fine */ }
    this._log('Cleared pending reboot flags');
  }

  async _configure(tool, version) {
    const installDir = tool.defaultInstallDir.replace('{version}', version);
    const isAdmin = this.isAdmin();

    // Build a PowerShell script that sets env vars and updates PATH (system-wide)
    const psLines = [];

    for (const [varName, varValue] of Object.entries(tool.envVars)) {
      const resolved = varValue.replace('{installDir}', installDir);
      psLines.push(`[System.Environment]::SetEnvironmentVariable('${varName}', '${resolved}', [System.EnvironmentVariableTarget]::Machine)`);
      this._log(`Will set env var: ${varName} = ${resolved}`);
    }

    if (tool.pathEntries && tool.pathEntries.length > 0) {
      for (const entry of tool.pathEntries) {
        const resolvedPath = entry.replace('{installDir}', installDir);
        psLines.push(`$p = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::Machine); if ($p -notlike '*${resolvedPath.replace(/\\/g, '\\\\')}*') { [System.Environment]::SetEnvironmentVariable('Path', $p + ';${resolvedPath}', [System.EnvironmentVariableTarget]::Machine) }`);
        this._log(`Will add to PATH: ${resolvedPath}`);
      }
    }

    if (psLines.length === 0) return;

    // Write the PS script to a file
    const psScriptPath = path.join(this.downloadDir, `${tool.id}-config.ps1`);
    fs.writeFileSync(psScriptPath, psLines.join('\r\n') + '\r\n');

    if (isAdmin) {
      // Run directly
      try {
        execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`, { timeout: 120000, windowsHide: true });
        this._log('Environment configured (admin)');
      } catch (err) {
        this._log(`Warning configuring env: ${err.message}`);
      }
    } else {
      // Elevate the PS script
      try {
        execSync(`powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \\"${psScriptPath}\\"' -Verb RunAs -Wait -WindowStyle Hidden"`, { timeout: 120000, windowsHide: true });
        this._log('Environment configured (elevated)');
      } catch (err) {
        this._log(`Warning configuring env (elevated): ${err.message}`);
      }
    }
  }

  // ─── Uninstall ──────────────────────────────────────────────

  async uninstallTool(toolId, detectedInfo, progressCallback) {
    const tool = this._getTool(toolId);
    if (!tool) throw new Error(`Tool ${toolId} not found`);

    this._log(`\n${'='.repeat(50)}\nUninstalling ${tool.name}\n${'='.repeat(50)}`);

    progressCallback({ step: 'finding', detail: 'Finding installed product...' });

    const productInfo = await this._findInstalledProduct(tool, detectedInfo);
    if (!productInfo) {
      throw new Error(`No installed ${tool.name} found on this system`);
    }

    this._log(`Found: ${JSON.stringify(productInfo)}`);

    progressCallback({ step: 'uninstalling', detail: `Removing ${tool.name}...` });
    await this._runUninstaller(tool, productInfo);

    // Clean up residual install directory left by MSI uninstaller
    if (productInfo.location) {
      const loc = productInfo.location.replace(/\\$/, '');
      if (fs.existsSync(loc)) {
        this._log(`Cleaning up residual install directory: ${loc}`);
        try {
          if (this.isAdmin()) {
            fs.rmSync(loc, { recursive: true, force: true });
          } else {
            await this._runElevatedCommand(tool.id, 'cleanup', `rmdir /s /q "${loc}"`, false);
          }
        } catch (e) {
          this._log(`Warning: could not remove residual directory: ${e.message}`);
        }
      }
    }

    progressCallback({ step: 'cleaning', detail: 'Removing environment variables and PATH entries...' });
    await this._unconfigure(tool);

    progressCallback({ step: 'verifying', detail: 'Verifying removal...' });
    // Small delay for system to catch up
    await new Promise(r => setTimeout(r, 1000));
    const still = await this.detectInstalled(tool.id);
    if (still.installed) {
      this._log(`Warning: ${tool.name} still detected after uninstall — may need shell restart`);
    }

    progressCallback({ step: 'completed', detail: `${tool.name} uninstalled successfully` });
    this._log(`${tool.name} uninstalled successfully`);
  }

  async _findInstalledProduct(tool, detectedInfo) {
    // Search Windows registry for MSI-installed product
    if (tool.installCommand.msi || tool.installCommand.exe) {
      const searchTerms = Array.isArray(tool.uninstallSearch)
        ? tool.uninstallSearch
        : [tool.uninstallSearch || tool.name];
      const whereClause = searchTerms
        .map(t => `$_.DisplayName -like '*${t}*'`)
        .join(' -or ');
      try {
        const ps = `Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*' -ErrorAction SilentlyContinue | Where-Object { ${whereClause} } | Select-Object PSChildName, DisplayName, UninstallString, InstallLocation | ConvertTo-Json -Compress`;
        const output = execSync(`powershell -NoProfile -Command "${ps}"`, {
          encoding: 'utf8', timeout: 15000, windowsHide: true
        }).trim();
        if (output && (output.startsWith('{') || output.startsWith('['))) {
          const parsed = JSON.parse(output);
          const products = (Array.isArray(parsed) ? parsed : [parsed]).filter(p => p.DisplayName);

          if (products.length > 0) {
            let best = products[0];

            // If we have detected version info, pick the product matching that version
            if (detectedInfo && detectedInfo.version) {
              const verMatch = detectedInfo.version.match(/[\d.]+/);
              if (verMatch) {
                const detectedVer = verMatch[0];
                const exact = products.find(p => p.DisplayName.includes(detectedVer));
                if (exact) {
                  best = exact;
                } else {
                  // Fall back to major version match
                  const major = detectedVer.split('.')[0];
                  const majorMatch = products.find(p => p.DisplayName.match(new RegExp(`\\b${major}\\b`)));
                  if (majorMatch) best = majorMatch;
                }
              }
            }

            this._log(`Found product: ${best.DisplayName} (of ${products.length} match(es))`);
            return {
              type: best.UninstallString && best.UninstallString.includes('MsiExec') ? 'msi' : 'exe',
              guid: best.PSChildName,
              name: best.DisplayName,
              location: best.InstallLocation || '',
              uninstallString: best.UninstallString || ''
            };
          }
        }
      } catch { /* not found in registry */ }
    }

    // For EXE-based tools (like Git), look for uninstaller directly
    if (tool.installCommand.exe) {
      const installDir = tool.defaultInstallDir.replace('{version}', tool.defaultVersion);
      const uninstaller = path.join(installDir, 'unins000.exe');
      if (fs.existsSync(uninstaller)) {
        return { type: 'exe-uninstaller', uninstallerPath: uninstaller, location: installDir };
      }
    }

    // For ZIP-extracted tools (Maven), check if install dir exists
    if (tool.installCommand.zip) {
      for (const ver of tool.versions) {
        const dir = tool.defaultInstallDir.replace('{version}', ver);
        if (fs.existsSync(dir)) {
          return { type: 'zip', location: dir, version: ver };
        }
      }
    }

    return null;
  }

  async _runUninstaller(tool, productInfo) {
    const isAdmin = this.isAdmin();

    if (productInfo.type === 'msi') {
      const cmd = `msiexec /x "${productInfo.guid}" /quiet /norestart`;
      this._log(`Uninstalling MSI: ${cmd}`);
      return this._runElevatedCommand(tool.id, 'uninstall', cmd, isAdmin);
    }

    if (productInfo.type === 'exe-uninstaller') {
      const cmd = `"${productInfo.uninstallerPath}" /VERYSILENT /NORESTART /SUPPRESSMSGBOXES`;
      this._log(`Running uninstaller: ${cmd}`);
      return this._runElevatedCommand(tool.id, 'uninstall', cmd, isAdmin);
    }

    if (productInfo.type === 'exe' && productInfo.uninstallString) {
      // Registry-found uninstaller — make it silent
      let cmd = productInfo.uninstallString;
      if (cmd.includes('MsiExec')) {
        cmd = cmd.replace('/I', '/X') + ' /quiet /norestart';
      }
      this._log(`Running uninstall string: ${cmd}`);
      return this._runElevatedCommand(tool.id, 'uninstall', cmd, isAdmin);
    }

    if (productInfo.type === 'zip') {
      const dir = productInfo.location;
      this._log(`Deleting directory: ${dir}`);
      if (isAdmin) {
        fs.rmSync(dir, { recursive: true, force: true });
      } else {
        await this._runElevatedCommand(tool.id, 'uninstall', `rmdir /s /q "${dir}"`, false);
      }
      return;
    }

    throw new Error('Cannot determine how to uninstall this product');
  }

  _runElevatedCommand(toolId, purpose, cmd, isAdmin) {
    if (isAdmin) {
      return new Promise((resolve, reject) => {
        exec(cmd, { timeout: 300000, windowsHide: true }, (err) => {
          if (err && err.code !== 3010 && err.code !== 0) {
            return reject(new Error(`${purpose} failed (exit code ${err.code})`));
          }
          resolve();
        });
      });
    }

    const exitCodeFile = path.join(this.downloadDir, `${toolId}-${purpose}-exitcode.txt`);
    const batPath = path.join(this.downloadDir, `${toolId}-${purpose}.bat`);
    const batContent = `@echo off\r\n${cmd}\r\necho %ERRORLEVEL% > "${exitCodeFile}"\r\n`;
    fs.writeFileSync(batPath, batContent);
    if (fs.existsSync(exitCodeFile)) try { fs.unlinkSync(exitCodeFile); } catch {}

    return new Promise((resolve, reject) => {
      const psCmd = `Start-Process -FilePath 'cmd.exe' -ArgumentList '/c "${batPath}"' -Verb RunAs -Wait -WindowStyle Hidden`;
      exec(`powershell -NoProfile -Command "${psCmd.replace(/"/g, '\\"')}"`, { timeout: 300000, windowsHide: true }, (err) => {
        let exitCode = null;
        if (fs.existsSync(exitCodeFile)) {
          try { exitCode = parseInt(fs.readFileSync(exitCodeFile, 'utf8').trim(), 10); } catch {}
        }
        this._log(`Elevated ${purpose} finished. Exit code: ${exitCode}`);
        if (exitCode === 0 || exitCode === 3010) return resolve();
        if (exitCode === null && err) return reject(new Error(`${purpose} cancelled (UAC denied)`));
        return reject(new Error(`${purpose} failed (exit code ${exitCode})`));
      });
    });
  }

  async _unconfigure(tool) {
    const isAdmin = this.isAdmin();
    const psLines = [];

    // Remove env vars
    for (const varName of Object.keys(tool.envVars)) {
      psLines.push(`[System.Environment]::SetEnvironmentVariable('${varName}', $null, [System.EnvironmentVariableTarget]::Machine)`);
      this._log(`Will remove env var: ${varName}`);
    }

    // Remove PATH entries for all versions
    if (tool.pathEntries && tool.pathEntries.length > 0) {
      for (const entry of tool.pathEntries) {
        for (const ver of tool.versions) {
          const resolvedPath = entry
            .replace('{installDir}', tool.defaultInstallDir.replace('{version}', ver))
            .replace(/\\/g, '\\');
          psLines.push(`$p = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::Machine); $paths = $p -split ';' | Where-Object { $_ -and $_.TrimEnd('\\') -ne '${resolvedPath}'.TrimEnd('\\') }; [System.Environment]::SetEnvironmentVariable('Path', ($paths -join ';'), [System.EnvironmentVariableTarget]::Machine)`);
          this._log(`Will remove from PATH: ${resolvedPath}`);
        }
      }
    }

    if (psLines.length === 0) return;

    const psScriptPath = path.join(this.downloadDir, `${tool.id}-unconfig.ps1`);
    fs.writeFileSync(psScriptPath, psLines.join('\r\n') + '\r\n');

    if (isAdmin) {
      try {
        execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`, { timeout: 120000, windowsHide: true });
        this._log('Environment cleaned up (admin)');
      } catch (err) {
        this._log(`Warning cleaning up env: ${err.message}`);
      }
    } else {
      try {
        execSync(`powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \\"${psScriptPath}\\"' -Verb RunAs -Wait -WindowStyle Hidden"`, { timeout: 120000, windowsHide: true });
        this._log('Environment cleaned up (elevated)');
      } catch (err) {
        this._log(`Warning cleaning up env (elevated): ${err.message}`);
      }
    }
  }

  // ─── Fresh Environment ─────────────────────────────────────

  _getFreshEnv() {
    try {
      const varNames = new Set();
      for (const tool of this.config.tools) {
        for (const v of Object.keys(tool.envVars)) varNames.add(v);
      }

      // Build a PS1 script that outputs all needed env vars
      const lines = [
        `$m = [Environment]::GetEnvironmentVariable('Path','Machine')`,
        `$u = [Environment]::GetEnvironmentVariable('Path','User')`,
        `Write-Output "FRESHPATH=$m;$u"`
      ];
      for (const v of varNames) {
        lines.push(`$val = [Environment]::GetEnvironmentVariable('${v}','Machine'); if ($val) { Write-Output "${v}=$val" }`);
      }

      const psScript = path.join(this.downloadDir, '_freshenv.ps1');
      fs.writeFileSync(psScript, lines.join('\r\n'));

      const output = execSync(
        `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScript}"`,
        { encoding: 'utf8', timeout: 10000, windowsHide: true }
      );

      const env = { ...process.env };
      for (const line of output.split(/\r?\n/)) {
        const idx = line.indexOf('=');
        if (idx > 0) {
          const key = line.substring(0, idx).trim();
          const val = line.substring(idx + 1).trim();
          if (key === 'FRESHPATH') {
            env.Path = val;
            env.PATH = val;
          } else if (val) {
            env[key] = val;
          }
        }
      }
      return env;
    } catch {
      return process.env;
    }
  }

  // ─── Persistence ───────────────────────────────────────────

  _saveHistory(toolId, version, success, error) {
    let history = this.getHistory();
    history.push({
      toolId,
      version,
      success,
      error: error || null,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(this.historyPath, JSON.stringify(history, null, 2));
  }

  _log(message) {
    const ts = new Date().toISOString();
    const line = `[${ts}] ${message}\n`;
    fs.appendFileSync(this.logPath, line);
  }
}

module.exports = InstallerEngine;
