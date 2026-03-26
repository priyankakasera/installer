const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    resizable: true,
    icon: path.join(__dirname, 'renderer', 'icon.png'),
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
