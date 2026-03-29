const { app, BrowserWindow, ipcMain, dialog, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const { execSync, exec } = require('child_process');

// ─── Self-elevation ───────────────────────────────────────────────
// If not already running as administrator, relaunch the process elevated
// via PowerShell Start-Process -Verb RunAs, then quit this instance.
// This runs before app.whenReady() so the window never opens unelevated.
function isAdmin() {
  try { execSync('net session', { stdio: 'ignore' }); return true; } catch { return false; }
}

if (process.platform === 'win32' && !isAdmin()) {
  // Build the relaunch command.
  // app.getPath('exe') gives the Electron executable; process.argv[1] is the
  // app entry point (e.g. the .js file when running in dev, or absent in prod).
  const exe = process.execPath;
  const args = process.argv.slice(1).map(a => `'${a.replace(/'/g, "''")}'`).join(', ');
  const argList = args ? `, ${args}` : '';
  const psCmd = `Start-Process -FilePath '${exe.replace(/'/g, "''")}' -ArgumentList @(${argList}) -Verb RunAs`;
  exec(`powershell -NoProfile -Command "${psCmd.replace(/"/g, '\\"')}"`, () => {});
  app.exit(0);
}

let mainWindow;
let installerEngine;

// Lazy-require after elevation check
const InstallerEngine = require('./installer/engine');

function getAppIcon() {
  // Prefer .ico for Windows (native format for Electron/installer)
  if (process.platform === 'win32') {
    const icoPath = path.join(__dirname, '..', 'build', 'icon.ico');
    if (fs.existsSync(icoPath)) {
      return nativeImage.createFromPath(icoPath);
    }
  }
  // Fallback: Try loading icon.png from the renderer directory
  const pngPath = path.join(__dirname, 'renderer', 'icon.png');
  if (fs.existsSync(pngPath)) {
    return nativeImage.createFromPath(pngPath);
  }
  // Fallback: generate a 64x64 icon programmatically via a data URL
  const size = 64;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4f8cff"/><stop offset="100%" stop-color="#3a5fcf"/></linearGradient></defs>
    <rect width="64" height="64" rx="14" fill="url(#bg)"/>
    <g transform="translate(32,32)" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle r="12"/>
      <circle r="5"/>
      <line y1="-16" y2="-12"/><line y1="12" y2="16"/>
      <line x1="-16" x2="-12"/><line x1="12" x2="16"/>
      <line x1="-11.3" y1="-11.3" x2="-8.5" y2="-8.5"/>
      <line x1="8.5" y1="8.5" x2="11.3" y2="11.3"/>
      <line x1="11.3" y1="-11.3" x2="8.5" y2="-8.5"/>
      <line x1="-8.5" y1="8.5" x2="-11.3" y2="11.3"/>
    </g>
  </svg>`;
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  return nativeImage.createFromDataURL(dataUrl);
}

function createWindow() {
  const appIcon = getAppIcon();

  mainWindow = new BrowserWindow({
    width: 960,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    resizable: true,
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    titleBarStyle: 'default',
    title: 'DevTools Installer'
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();
  installerEngine = new InstallerEngine();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ─── IPC Handlers ────────────────────────────────────────────────

ipcMain.handle('get-tools-config', async () => {
  return installerEngine.getToolsConfig();
});

ipcMain.handle('detect-installed', async (event, toolIds) => {
  return installerEngine.detectInstalledBatch(toolIds);
});

ipcMain.handle('start-installation', async (event, selections) => {
  // selections: [{ toolId, version }]
  try {
    await installerEngine.installAll(selections, (progress) => {
      mainWindow.webContents.send('install-progress', progress);
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('retry-tool', async (event, toolId, version) => {
  try {
    await installerEngine.installSingle(toolId, version, (progress) => {
      mainWindow.webContents.send('install-progress', progress);
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('check-admin', async () => {
  return installerEngine.isAdmin();
});

ipcMain.handle('get-install-history', async () => {
  return installerEngine.getHistory();
});

ipcMain.handle('uninstall-tool', async (event, toolId, detectedInfo) => {
  try {
    await installerEngine.uninstallTool(toolId, detectedInfo, (progress) => {
      mainWindow.webContents.send('uninstall-progress', { toolId, ...progress });
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('uninstall-all', async (event, toolIds, detectedToolsMap) => {
  try {
    const results = await installerEngine.uninstallAll(toolIds, detectedToolsMap, (progress) => {
      mainWindow.webContents.send('uninstall-all-progress', progress);
    });
    return { success: true, results };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
