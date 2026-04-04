const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Signal that an install/uninstall operation is in progress
  setOperationInProgress: (inProgress) => ipcRenderer.send('set-operation-in-progress', inProgress),

  // Fetch tools config
  getToolsConfig: () => ipcRenderer.invoke('get-tools-config'),

  // Detect already installed tools
  detectInstalled: (toolIds) => ipcRenderer.invoke('detect-installed', toolIds),

  // Start installation of selected tools
  startInstallation: (selections) => ipcRenderer.invoke('start-installation', selections),

  // Retry a single failed tool
  retryTool: (toolId, version) => ipcRenderer.invoke('retry-tool', toolId, version),

  // Check if running as admin
  checkAdmin: () => ipcRenderer.invoke('check-admin'),

  // Get installation history
  getInstallHistory: () => ipcRenderer.invoke('get-install-history'),

  // Uninstall a tool
  uninstallTool: (toolId, detectedInfo) => ipcRenderer.invoke('uninstall-tool', toolId, detectedInfo),

  // Uninstall all installed tools
  uninstallAll: (toolIds, detectedToolsMap) => ipcRenderer.invoke('uninstall-all', toolIds, detectedToolsMap),

  // Listen for progress updates from main process
  onProgress: (callback) => {
    ipcRenderer.on('install-progress', (event, data) => callback(data));
  },

  // Listen for uninstall progress
  onUninstallProgress: (callback) => {
    ipcRenderer.on('uninstall-progress', (event, data) => callback(data));
  },

  // Listen for uninstall-all progress
  onUninstallAllProgress: (callback) => {
    ipcRenderer.on('uninstall-all-progress', (event, data) => callback(data));
  },

  // Remove uninstall-all progress listener
  removeUninstallAllProgressListener: () => {
    ipcRenderer.removeAllListeners('uninstall-all-progress');
  },

  // Remove progress listener
  removeProgressListener: () => {
    ipcRenderer.removeAllListeners('install-progress');
  },

  // Remove uninstall progress listener
  removeUninstallProgressListener: () => {
    ipcRenderer.removeAllListeners('uninstall-progress');
  }
});
