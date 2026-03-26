// Central release configuration — values are overridden at build time via VITE_* env vars
const releaseConfig = {
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  downloadUrl: import.meta.env.VITE_DOWNLOAD_URL || 'https://github.com',
  fileName: import.meta.env.VITE_INSTALLER_FILENAME || 'DevTools-Installer-Setup.exe',
}

export default releaseConfig
