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
    // Build a flat tools list from categories for backward-compatible lookups
    this._allTools = this.config.categories.flatMap((cat) => cat.tools);
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
    const freshEnv = await this._getFreshEnv();

    return new Promise((resolve) => {
      // Use shell:true to find .cmd files (e.g. mvn.cmd).
      exec(tool.verifyCommand, {
        encoding: 'utf8', timeout: 10000, env: freshEnv, windowsHide: true, shell: true
      }, (err, stdout, stderr) => {
        try {
          const combined = (stdout || '') + (stderr || '');
          const match = combined.match(new RegExp(tool.verifyRegex));
          resolve({ installed: !!match, version: match ? match[0] : null, output: combined.trim().split('\n')[0] });
        } catch {
          resolve({ installed: false, version: null, output: '' });
        }
      });
    });
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
        const configResult = await this._installTool(tool, selectedVersion, (step, detail) => {
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
        this._saveHistory(toolId, selectedVersion, true, null, configResult);
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
      const safeVer = this._safeVersion(selectedVersion);
      const prefix = `${tool.id}-${safeVer}`;
      // Clear all cached files for this tool+version (any extension)
      try {
        const files = fs.readdirSync(this.downloadDir);
        for (const f of files) {
          if (f.startsWith(prefix) || f.startsWith(prefix + '.')) {
            const fullPath = path.join(this.downloadDir, f);
            this._log(`Clearing cached download for retry: ${fullPath}`);
            try { fs.unlinkSync(fullPath); } catch {}
          }
        }
      } catch { /* directory may not exist yet */ }
    }

    const configResult = await this._installTool(tool, selectedVersion, (step, detail) => {
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

    this._saveHistory(toolId, selectedVersion, true, null, configResult);
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
    return this._allTools.find((t) => t.id === toolId);
  }

  _stepPercent(step) {
    const map = { downloading: 10, installing: 50, configuring: 80, verifying: 90, completed: 100, error: 100 };
    return map[step] || 0;
  }

  _safeVersion(version) {
    return version.replace(/[<>:"/\\|?*]/g, '_');
  }

  async _installTool(tool, version, onStep) {
    this._log(`\n${'='.repeat(50)}\nInstalling ${tool.name} v${version}\n${'='.repeat(50)}`);

    // Step 1: Download
    onStep('downloading', 'Starting download...');
    const installerPath = await this._download(tool, version, (pct, speed) => {
      if (pct >= 0) {
        onStep('downloading', `${pct}% downloaded${speed ? ` (${speed})` : ''}`);
      } else {
        onStep('downloading', speed || 'Downloading...');
      }
    });

    // Step 2: Install
    onStep('installing', 'Running installer...');
    await this._runInstaller(tool, version, installerPath);
    onStep('installing', 'Installation complete');

    // Step 3: Configure
    onStep('configuring', 'Setting environment variables...');
    const configResult = await this._configure(tool, version);
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
    return configResult;
  }

  _download(tool, version, onProgress) {
    return new Promise((resolve, reject) => {
      const url = tool.downloadUrls[version];
      if (!url) return reject(new Error(`No download URL for ${tool.name} v${version}`));

      const ext = path.extname(new URL(url).pathname) || '.exe';
      const safeVer = this._safeVersion(version);
      const dest = path.join(this.downloadDir, `${tool.id}-${safeVer}${ext}`);

      // Check for cached download (might have been saved with a different
      // extension after a redirect, e.g. .exe -> .msi)
      const prefix = `${tool.id}-${safeVer}`;
      try {
        const existing = fs.readdirSync(this.downloadDir).find((f) => {
          if (!f.startsWith(prefix) || f.endsWith('.size')) return false;
          const filePath = path.join(this.downloadDir, f);
          const fileSize = fs.statSync(filePath).size;
          if (fileSize <= 1000) return false;
          // Verify file size matches recorded expected size from the original download
          const sizeFile = filePath + '.size';
          if (fs.existsSync(sizeFile)) {
            try {
              const expectedSize = parseInt(fs.readFileSync(sizeFile, 'utf8').trim(), 10);
              if (expectedSize > 0 && fileSize < expectedSize) {
                this._log(`Cached file ${f} is incomplete (${fileSize} vs expected ${expectedSize}) — removing`);
                fs.unlinkSync(filePath);
                try { fs.unlinkSync(sizeFile); } catch {}
                return false;
              }
            } catch {}
          }
          return true;
        });
        if (existing) {
          const cachedPath = path.join(this.downloadDir, existing);
          this._log(`Using cached download: ${cachedPath}`);
          onProgress(100, '');
          return resolve(cachedPath);
        }
      } catch { /* directory may not exist yet */ }

      this._log(`Downloading from: ${url}`);
      this._followRedirect(url, (response, finalUrl) => {
        if (response.statusCode !== 200) {
          return reject(new Error(`Download failed: HTTP ${response.statusCode}`));
        }

        // Resolve the real file extension from the final URL or Content-Disposition
        let realExt = ext;
        const disposition = response.headers['content-disposition'];
        if (disposition) {
          const match = disposition.match(/filename[^;=\n]*=(['"]?)([^'"\n;]+)\1/);
          if (match && match[2]) realExt = path.extname(match[2]) || realExt;
        } else if (finalUrl !== url) {
          const finalPathExt = path.extname(new URL(finalUrl).pathname);
          if (finalPathExt) realExt = finalPathExt;
        }
        const finalDest = realExt !== ext
          ? path.join(this.downloadDir, `${tool.id}-${safeVer}${realExt}`)
          : dest;

        const totalSize = parseInt(response.headers['content-length'], 10) || 0;
        let downloaded = 0;
        let lastProgressTime = 0;
        const startTime = Date.now();

        const fileStream = fs.createWriteStream(finalDest, { highWaterMark: 4 * 1024 * 1024 });

        response.on('data', (chunk) => {
          downloaded += chunk.length;

          // Throttle progress updates to every 300ms to avoid UI backpressure
          const now = Date.now();
          if (now - lastProgressTime > 300 || (totalSize > 0 && downloaded >= totalSize)) {
            lastProgressTime = now;
            const mb = (downloaded / (1024 * 1024)).toFixed(1);
            const elapsed = (now - startTime) / 1000;
            const speedMBs = elapsed > 0 ? (downloaded / (1024 * 1024) / elapsed).toFixed(1) : '0';
            if (totalSize > 0) {
              const pct = Math.round((downloaded / totalSize) * 100);
              const totalMb = (totalSize / (1024 * 1024)).toFixed(1);
              onProgress(pct, `${mb}MB / ${totalMb}MB — ${speedMBs} MB/s`);
            } else {
              onProgress(-1, `${mb}MB downloaded — ${speedMBs} MB/s`);
            }
          }
        });

        response.pipe(fileStream);

        response.on('error', (err) => {
          fileStream.destroy();
          fs.unlink(finalDest, () => {});
          reject(new Error(`Download stream error: ${err.message}`));
        });

        response.on('close', () => {
          // If connection closed before all data received, treat as error
          if (totalSize > 0 && downloaded < totalSize && !fileStream.destroyed) {
            fileStream.destroy();
            fs.unlink(finalDest, () => {});
            reject(new Error(`Download interrupted: received ${(downloaded / 1024 / 1024).toFixed(1)}MB of ${(totalSize / 1024 / 1024).toFixed(1)}MB. Please retry.`));
          }
        });

        fileStream.on('finish', () => {
          fileStream.close();

          // Verify the download is complete — reject truncated files
          if (totalSize > 0 && downloaded < totalSize) {
            this._log(`Download incomplete: got ${downloaded} of ${totalSize} bytes — removing partial file`);
            fs.unlink(finalDest, () => {});
            return reject(new Error(`Download incomplete: received ${(downloaded / 1024 / 1024).toFixed(1)}MB of ${(totalSize / 1024 / 1024).toFixed(1)}MB. Please retry.`));
          }

          // Record the expected file size so cached-file checks can validate completeness
          if (totalSize > 0) {
            try { fs.writeFileSync(finalDest + '.size', String(totalSize)); } catch {}
          }

          this._log(`Download complete: ${finalDest} (${downloaded} bytes)`);
          resolve(finalDest);
        });

        fileStream.on('error', (err) => {
          fs.unlink(finalDest, () => {});
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
      }
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

      // Optimize socket for maximum download throughput
      if (res.socket) {
        res.socket.setNoDelay(true);
        res.socket.setKeepAlive(true);
      }
      // Increase readable stream buffer from 16KB default to 1MB
      // to reduce per-chunk overhead on large files
      if (res._readableState) {
        res._readableState.highWaterMark = 1024 * 1024;
      }

      onResponse(res, url);
    }).on('error', onError);
  }

  async _runInstaller(tool, version, installerPath) {
    const ext = path.extname(installerPath).toLowerCase();
    const installDir = tool.defaultInstallDir.replace('{version}', version);

    // Validate the downloaded file before attempting install
    try {
      const stat = fs.statSync(installerPath);
      // Standalone binaries (kubectl) may be small; only enforce min size for installers
      const isCopyInstall = tool.installCommand[ext.replace('.', '')] === 'copy';
      if (!isCopyInstall && stat.size < 50000) {
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

    // Handle standalone binary copy (e.g., kubectl.exe)
    const cmdTemplateRaw = tool.installCommand[ext.replace('.', '')];
    if (cmdTemplateRaw === 'copy') {
      this._log(`Copying standalone binary to: ${installDir}`);
      const destFile = path.join(installDir, `${tool.id}${ext}`);

      if (this.isAdmin()) {
        if (!fs.existsSync(installDir)) {
          fs.mkdirSync(installDir, { recursive: true });
        }
        fs.copyFileSync(installerPath, destFile);
      } else {
        const psScript = [
          `if (-not (Test-Path '${installDir}')) { New-Item -ItemType Directory -Path '${installDir}' -Force | Out-Null }`,
          `Copy-Item -Path '${installerPath}' -Destination '${destFile}' -Force`
        ].join('\r\n');
        const psScriptPath = path.join(this.downloadDir, `${tool.id}-copy.ps1`);
        fs.writeFileSync(psScriptPath, psScript);

        await new Promise((resolve, reject) => {
          exec(
            `powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \\"${psScriptPath}\\"' -Verb RunAs -Wait -WindowStyle Hidden"`,
            { timeout: 60000, windowsHide: true },
            (err) => {
              if (err) return reject(new Error('Copy failed — UAC may have been denied'));
              if (!fs.existsSync(destFile)) return reject(new Error(`Copy completed but ${destFile} was not found`));
              resolve();
            }
          );
        });
      }

      this._log(`Binary copied to ${destFile}`);
      return;
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
            if (err.code === 3010 || err.code === 3) {
              this._log(`Exit code ${err.code}: success (reboot recommended)`);
              return resolve();
            }
            if (err.code === 1 && ext === '.exe') {
              this._log('Exit code 1 from EXE installer — treating as success (common with Inno Setup when app is already installed or reboot needed)');
              return resolve();
            }
            if (err.code === 1620 || err.code === 1603) {
              // 1620 = package could not be opened (corrupt/incomplete)
              // 1603 = fatal error during installation
              this._log(`MSI error ${err.code} — removing potentially corrupt installer: ${installerPath}`);
              try { fs.unlinkSync(installerPath); } catch {}
              try { fs.unlinkSync(installerPath + '.size'); } catch {}
              return reject(new Error(`Installer package is corrupt or incomplete (error ${err.code}). Cached file removed — please retry the installation.`));
            }
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
        if (exitCode !== 0 && exitCode !== 3010 && exitCode !== 3 && !(exitCode === 1 && ext === '.exe')) {
          this._handleInstallError({ code: exitCode }, '', '', msiLogPath);
        }

        if (exitCode === 0 || exitCode === 3010 || exitCode === 3) {
          if (exitCode === 3010 || exitCode === 3) this._log(`Exit code ${exitCode}: success (reboot recommended)`);
          return resolve();
        }

        if (exitCode === 1 && ext === '.exe') {
          this._log('Exit code 1 from EXE installer — treating as success (common with Inno Setup when app is already installed or reboot needed)');
          return resolve();
        }

        if (exitCode === 1620 || exitCode === 1603) {
          // 1620 = package could not be opened (corrupt/incomplete)
          // 1603 = fatal error during installation
          this._log(`MSI error ${exitCode} — removing potentially corrupt installer: ${installerPath}`);
          try { fs.unlinkSync(installerPath); } catch {}
          try { fs.unlinkSync(installerPath + '.size'); } catch {}
          return reject(new Error(`Installer package is corrupt or incomplete (error ${exitCode}). Cached file removed — please retry the installation.`));
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
    const configuredPaths = [];
    const configuredEnvVars = {};

    // Build a PowerShell script that idempotently sets env vars and updates PATH.
    // PowerShell single-quoted strings treat backslashes literally — no extra escaping needed.
    const psLines = [];

    for (const [varName, varValue] of Object.entries(tool.envVars)) {
      const resolved = varValue.replace('{installDir}', installDir);
      // Only set if the current value is different
      psLines.push(
        `$cur = [System.Environment]::GetEnvironmentVariable('${varName}', [System.EnvironmentVariableTarget]::Machine)`,
        `if ($cur -ne '${resolved}') {`,
        `    [System.Environment]::SetEnvironmentVariable('${varName}', '${resolved}', [System.EnvironmentVariableTarget]::Machine)`,
        `}`
      );
      configuredEnvVars[varName] = resolved;
      this._log(`Will set env var (if changed): ${varName} = ${resolved}`);
    }

    if (tool.pathEntries && tool.pathEntries.length > 0) {
      // Resolve all path entries for this install; strip any trailing backslash.
      const rawPaths = tool.pathEntries.map(entry =>
        entry.replace('{installDir}', installDir).replace(/\\+$/, '')
      );
      rawPaths.forEach(p => configuredPaths.push(p));
      const psRawArray   = rawPaths.map(p => `'${p}'`).join(', ');
      const psLowerArray = rawPaths.map(p => `'${p.toLowerCase()}'`).join(', ');

      // Single consolidated read → deduplicate → append → write.
      // Filter normalises each existing entry: strip trailing \, collapse \\→\, lowercase.
      psLines.push(
        `$toAdd      = @(${psRawArray})`,
        `$lowerToAdd = @(${psLowerArray})`,
        `$rawPath    = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::Machine)`,
        `$parts      = ($rawPath -split ';') | Where-Object {`,
        `    $t = $_.TrimEnd('\\').Replace('\\\\', '\\').ToLower()`,
        `    $_ -and $lowerToAdd -notcontains $t`,
        `}`,
        `$parts = @($parts) + $toAdd`,
        `[System.Environment]::SetEnvironmentVariable('Path', ($parts -join ';'), [System.EnvironmentVariableTarget]::Machine)`
      );
      this._log(`Will add to PATH (deduplicated): ${rawPaths.join(', ')}`);
    }

    if (psLines.length === 0) return { paths: configuredPaths, envVars: configuredEnvVars };

    // Write the PS script to a file
    const psScriptPath = path.join(this.downloadDir, `${tool.id}-config.ps1`);
    fs.writeFileSync(psScriptPath, psLines.join('\r\n') + '\r\n');

    // Use async exec (not execSync) so the main-process IPC thread stays
    // responsive during potentially slow PowerShell elevation prompts.
    const runAsync = (cmd) => new Promise((resolve) => {
      exec(cmd, { timeout: 120000, windowsHide: true }, (err) => {
        if (err) this._log(`Warning configuring env: ${err.message}`);
        resolve();
      });
    });

    if (isAdmin) {
      await runAsync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`);
      this._log('Environment configured (admin)');
    } else {
      await runAsync(`powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \\"${psScriptPath}\\"' -Verb RunAs -Wait -WindowStyle Hidden"`);
      this._log('Environment configured (elevated)');
    }
    return { paths: configuredPaths, envVars: configuredEnvVars };
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
    // (skip for 'directory' and 'zip' types — already handled in _runUninstaller)
    if (productInfo.location && productInfo.type !== 'directory' && productInfo.type !== 'zip') {
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
      // Identify where the command is still found
      let remainingSource = '';
      try {
        const freshEnv = await this._getFreshEnv();
        const whereOutput = await new Promise((resolve) => {
          exec(`where.exe ${tool.id}`, {
            encoding: 'utf8', timeout: 10000, windowsHide: true, env: freshEnv
          }, (err, stdout) => resolve(err ? '' : (stdout || '').trim()));
        });
        if (whereOutput) {
          remainingSource = whereOutput.split(/\r?\n/)[0].trim();
          this._log(`Warning: ${tool.name} still detected at: ${remainingSource}`);
        }
      } catch { /* not found — good */ }

      if (remainingSource) {
        progressCallback({ step: 'completed', detail: `Our installation removed. Note: ${tool.name} is still available from ${remainingSource} (bundled by another application)` });
      } else {
        this._log(`Warning: ${tool.name} still detected after uninstall — may need shell restart`);
        progressCallback({ step: 'completed', detail: `${tool.name} uninstalled (verification may need shell restart)` });
      }
    } else {
      progressCallback({ step: 'completed', detail: `${tool.name} uninstalled successfully` });
    }
    this._log(`${tool.name} uninstall completed`);
  }

  async _findInstalledProduct(tool, detectedInfo) {
    // Search Windows registry for MSI-installed product
    const searchTerms = Array.isArray(tool.uninstallSearch)
      ? tool.uninstallSearch
      : [tool.uninstallSearch || tool.name];

    if ((tool.installCommand.msi || tool.installCommand.exe) && searchTerms.length > 0 && searchTerms[0]) {
      const whereClause = searchTerms
        .map(t => `$_.DisplayName -like '*${t}*'`)
        .join(' -or ');
      try {
        const ps = `Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*' -ErrorAction SilentlyContinue | Where-Object { ${whereClause} } | Select-Object PSChildName, DisplayName, UninstallString, InstallLocation | ConvertTo-Json -Compress`;
        const output = await new Promise((resolve) => {
          exec(`powershell -NoProfile -Command "${ps}"`, {
            encoding: 'utf8', timeout: 15000, windowsHide: true
          }, (err, stdout) => resolve(err ? '' : (stdout || '').trim()));
        });
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
    if (tool.installCommand.exe && tool.installCommand.exe !== 'copy') {
      const installDir = tool.defaultInstallDir.replace('{version}', tool.defaultVersion);
      const uninstaller = path.join(installDir, 'unins000.exe');
      if (fs.existsSync(uninstaller)) {
        return { type: 'exe-uninstaller', uninstallerPath: uninstaller, location: installDir };
      }
    }

    // For standalone binary copy tools (e.g., kubectl), check install dir AND
    // search for all copies of the binary on the system
    if (tool.installCommand.exe === 'copy') {
      const installDir = tool.defaultInstallDir.replace('{version}', tool.defaultVersion);
      const binaryName = `${tool.id}.exe`;

      // Collect all known locations of this binary
      const locations = [];

      // 1. Our own install directory
      if (fs.existsSync(installDir)) {
        locations.push(installDir);
      }

      // 2. Find additional copies via where.exe
      try {
        const freshEnv = await this._getFreshEnv();
        const whereOutput = await new Promise((resolve) => {
          exec(`where.exe ${tool.id}`, {
            encoding: 'utf8', timeout: 10000, windowsHide: true, env: freshEnv
          }, (err, stdout) => resolve(err ? '' : (stdout || '').trim()));
        });
        if (whereOutput) {
          for (const line of whereOutput.split(/\r?\n/)) {
            const loc = line.trim();
            if (loc && fs.existsSync(loc)) {
              const dir = path.dirname(loc);
              // Don't include our install dir twice
              if (dir.toLowerCase() !== installDir.toLowerCase()) {
                locations.push(dir);
              }
            }
          }
        }
      } catch { /* where.exe returns exit code 1 if not found */ }

      if (locations.length > 0) {
        return {
          type: 'directory',
          location: locations[0], // primary location (our install dir if it exists)
          allLocations: locations,
          binaryName
        };
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
      } else {
        // Verify the uninstall exe actually exists
        const exeMatch = cmd.match(/"([^"]+\.exe)"/i);
        const uninstallExe = exeMatch ? exeMatch[1] : null;

        if (uninstallExe && !fs.existsSync(uninstallExe)) {
          this._log(`Registry uninstall exe not found: ${uninstallExe}`);

          // Fall back to cached installer if available
          const cachedInstaller = this._findCachedInstaller(tool);
          if (cachedInstaller) {
            this._log(`Falling back to cached installer for uninstall: ${cachedInstaller}`);
            // Replace the missing exe path with our cached installer
            cmd = cmd.replace(exeMatch[0], `"${cachedInstaller}"`);
          } else {
            throw new Error(`Uninstaller not found at ${uninstallExe} and no cached installer available. Please reinstall and try again, or uninstall manually from Windows Settings > Apps.`);
          }
        }

        if (tool.silentUninstallArgs) {
          cmd += ' ' + tool.silentUninstallArgs;
        }
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

    if (productInfo.type === 'directory') {
      const binaryName = productInfo.binaryName || `${tool.id}.exe`;
      const allLocations = productInfo.allLocations || [productInfo.location];
      const installDir = tool.defaultInstallDir.replace('{version}', tool.defaultVersion);

      for (const dir of allLocations) {
        // Only remove our managed install directory; skip third-party dirs (e.g. Docker)
        const isOurs = dir.toLowerCase() === installDir.toLowerCase();
        if (isOurs) {
          this._log(`Deleting managed install directory: ${dir}`);
          if (isAdmin) {
            fs.rmSync(dir, { recursive: true, force: true });
          } else {
            await this._runElevatedCommand(tool.id, 'uninstall', `rmdir /s /q "${dir}"`, false);
          }
        } else {
          // For third-party directories, remove only the specific binary if it exists
          const binaryPath = path.join(dir, binaryName);
          if (fs.existsSync(binaryPath)) {
            this._log(`Removing binary from third-party location: ${binaryPath}`);
            try {
              if (isAdmin) {
                fs.unlinkSync(binaryPath);
              } else {
                await this._runElevatedCommand(tool.id, 'uninstall-binary', `del /f "${binaryPath}"`, false);
              }
            } catch (e) {
              this._log(`Warning: could not remove ${binaryPath}: ${e.message}`);
            }
          }
        }
      }
      return;
    }

    throw new Error('Cannot determine how to uninstall this product');
  }

  _runElevatedCommand(toolId, purpose, cmd, isAdmin) {
    if (isAdmin) {
      return new Promise((resolve, reject) => {
        exec(cmd, { timeout: 300000, windowsHide: true }, (err) => {
          if (err) {
            if (err.killed) {
              return reject(new Error(`${purpose} timed out after 5 minutes. The process may be waiting for user interaction or is still running in the background. Try closing the application first and retry.`));
            }
            if (err.code === 0 || err.code === 3010 || err.code === 3) {
              if (err.code !== 0) this._log(`${purpose} exit code ${err.code}: success (reboot recommended)`);
              return resolve();
            }
            return reject(new Error(`${purpose} failed — ${this._describeExitCode(err.code)}`));
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
        if (exitCode === 0 || exitCode === 3010 || exitCode === 3) {
          if (exitCode && exitCode !== 0) this._log(`${purpose} exit code ${exitCode}: success (reboot recommended)`);
          return resolve();
        }
        if (err && err.killed) {
          return reject(new Error(`${purpose} timed out after 5 minutes. The process may be waiting for user interaction or is still running in the background. Try closing the application first and retry.`));
        }
        if (exitCode === null && err) return reject(new Error(`${purpose} cancelled — UAC prompt was denied or the process failed to start. Please try again and accept the administrator prompt.`));
        return reject(new Error(`${purpose} failed — ${this._describeExitCode(exitCode)}`));
      });
    });
  }

  _findCachedInstaller(tool) {
    const prefix = `${tool.id}-`;
    try {
      const files = fs.readdirSync(this.downloadDir);
      const match = files.find(f => f.startsWith(prefix) && /\.(exe|msi)$/i.test(f) && !f.endsWith('.size'));
      return match ? path.join(this.downloadDir, match) : null;
    } catch {
      return null;
    }
  }

  _describeExitCode(code) {
    const descriptions = {
      1: `Exit code 1 — the process reported an error. The application may already be uninstalled, or files may be locked by a running process. Close the application and retry.`,
      2: `Exit code 2 — file not found. The uninstaller executable may have been moved or deleted.`,
      3: `Exit code 3 — the operation requires a system reboot to complete.`,
      5: `Exit code 5 — access denied. Run this application as administrator.`,
      87: `Exit code 87 — invalid parameter passed to the uninstaller.`,
      1602: `Exit code 1602 — the user cancelled the operation.`,
      1603: `Exit code 1603 — fatal error during uninstall. Files may be in use — close all related applications and retry.`,
      1605: `Exit code 1605 — this product is not currently installed.`,
      1618: `Exit code 1618 — another installation is in progress. Wait for it to finish and retry.`,
      1620: `Exit code 1620 — the installer package could not be opened. The file may be corrupt.`,
      3010: `Exit code 3010 — success, but a reboot is required to complete the operation.`,
    };
    if (code === null || code === undefined) return 'The process exited unexpectedly without reporting a result. It may still be running in the background.';
    return descriptions[code] || `Exit code ${code} — an unexpected error occurred. Check the install log for details.`;
  }

  async _unconfigure(tool) {
    const isAdmin = this.isAdmin();

    // Gather every PATH entry that should be removed.
    // Source 1 — install history: the exact paths recorded at install time (most reliable).
    // Source 2 — template expansion across all known versions: catches installs that
    //            pre-date history tracking and handles version-specific install dirs.
    // Both sources are union-merged, normalised to lowercase with no trailing backslash.
    const entriesToRemove = new Set();

    const history = this.getHistory();
    for (const record of history) {
      if (record.toolId === tool.id && record.success && Array.isArray(record.configuredPaths)) {
        for (const p of record.configuredPaths) {
          entriesToRemove.add(p.replace(/\\+$/, '').toLowerCase());
        }
      }
    }

    for (const entry of (tool.pathEntries || [])) {
      if (!entry.includes('{installDir}')) {
        entriesToRemove.add(entry.replace(/\\+$/, '').toLowerCase());
      } else {
        for (const ver of tool.versions) {
          const resolved = entry
            .replace('{installDir}', tool.defaultInstallDir.replace('{version}', ver))
            .replace(/\\+$/, '');
          entriesToRemove.add(resolved.toLowerCase());
        }
      }
    }

    const envVarsToRemove = Object.keys(tool.envVars);
    if (entriesToRemove.size === 0 && envVarsToRemove.length === 0) return;

    const psLines = [];

    // Remove environment variables (idempotent — setting to $null is a no-op if already absent).
    for (const varName of envVarsToRemove) {
      psLines.push(`[System.Environment]::SetEnvironmentVariable('${varName}', $null, [System.EnvironmentVariableTarget]::Machine)`);
      this._log(`Will remove env var: ${varName}`);
    }

    // Single consolidated PATH read → filter → write.
    // Each existing entry is normalised before comparison:
    //   TrimEnd('\')     — strips a trailing backslash
    //   Replace('\\','\')— collapses double-backslashes left by a previous buggy install
    //   ToLower()        — case-insensitive match
    // Empty segments are also dropped, eliminating stale semicolons.
    if (entriesToRemove.size > 0) {
      const psRemoveArray = [...entriesToRemove].map(p => `'${p}'`).join(', ');
      psLines.push(
        `$removeSet = @(${psRemoveArray})`,
        `$rawPath   = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::Machine)`,
        `$parts     = ($rawPath -split ';') | Where-Object {`,
        `    $t = $_.TrimEnd('\\').Replace('\\\\', '\\').ToLower()`,
        `    $_ -and $removeSet -notcontains $t`,
        `}`,
        `[System.Environment]::SetEnvironmentVariable('Path', ($parts -join ';'), [System.EnvironmentVariableTarget]::Machine)`
      );
      this._log(`Will remove from PATH: ${[...entriesToRemove].join(', ')}`);
    }

    const psScriptPath = path.join(this.downloadDir, `${tool.id}-unconfig.ps1`);
    fs.writeFileSync(psScriptPath, psLines.join('\r\n') + '\r\n');

    // Use async exec (not execSync) so the main-process IPC thread stays
    // responsive during potentially slow PowerShell elevation prompts.
    const runAsync = (cmd) => new Promise((resolve) => {
      exec(cmd, { timeout: 120000, windowsHide: true }, (err) => {
        if (err) this._log(`Warning cleaning up env: ${err.message}`);
        resolve();
      });
    });

    if (isAdmin) {
      await runAsync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`);
      this._log('Environment cleaned up (admin)');
    } else {
      await runAsync(`powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \\"${psScriptPath}\\"' -Verb RunAs -Wait -WindowStyle Hidden"`);
      this._log('Environment cleaned up (elevated)');
    }
  }

  // ─── Fresh Environment ─────────────────────────────────────

  _getFreshEnv() {
    return new Promise((resolve) => {
      try {
        const varNames = new Set();
        for (const tool of this._allTools) {
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

        // Use async exec so the main-process event loop stays responsive.
        exec(
          `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScript}"`,
          { encoding: 'utf8', timeout: 10000, windowsHide: true },
          (err, output) => {
            if (err) { resolve({ ...process.env }); return; }
            const env = { ...process.env };
            for (const line of (output || '').split(/\r?\n/)) {
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
            resolve(env);
          }
        );
      } catch {
        resolve({ ...process.env });
      }
    });
  }

  // ─── Persistence ───────────────────────────────────────────

  _saveHistory(toolId, version, success, error, configResult) {
    let history = this.getHistory();
    history.push({
      toolId,
      version,
      success,
      error: error || null,
      timestamp: new Date().toISOString(),
      configuredPaths: configResult ? (configResult.paths || []) : [],
      configuredEnvVars: configResult ? (configResult.envVars || {}) : {}
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
