// Central release configuration — values are injected at build time via VITE_* env vars
// set in the CI/CD workflow from the Firebase Storage upload URL.
const releaseConfig = {
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  downloadUrl: import.meta.env.VITE_DOWNLOAD_URL || null,
  fileName: import.meta.env.VITE_INSTALLER_FILENAME || 'DevTools-Installer-Setup.exe',
}

export default releaseConfig
