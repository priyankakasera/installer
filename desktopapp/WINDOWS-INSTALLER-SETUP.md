# Windows Installer Setup — DevTools Installer

This document covers the complete setup for building a Windows `.exe` installer using
**electron-builder** and **GitHub Actions**.

---

## Project Structure (after setup)

```
installer/
├── .github/
│   └── workflows/
│       └── build.yml          ← GitHub Actions CI/CD pipeline
├── build/
│   ├── icon.ico               ← App icon (YOU must add this)
│   └── README.md              ← Icon requirements & optional assets
├── src/
│   ├── main.js
│   ├── preload.js
│   ├── config/
│   │   └── tools.json
│   ├── installer/
│   │   └── engine.js
│   └── renderer/
│       ├── index.html
│       ├── renderer.js
│       └── styles.css
├── dist/                      ← Build output (git-ignored)
├── electron-builder.yml       ← electron-builder configuration
├── package.json
└── WINDOWS-INSTALLER-SETUP.md ← This file
```

---

## Files Created / Modified

| File | Type | Purpose |
|------|------|---------|
| `package.json` | Modified | Updated scripts, metadata, added `electron-updater` |
| `electron-builder.yml` | Created | Full NSIS installer configuration |
| `.github/workflows/build.yml` | Created | GitHub Actions pipeline |
| `build/README.md` | Created | Icon requirements documentation |

---

## package.json (relevant parts)

```json
{
  "name": "dev-tools-installer",
  "version": "1.0.0",
  "description": "One-click developer tools installer for Windows",
  "main": "src/main.js",
  "homepage": "https://github.com/YOUR_USERNAME/dev-tools-installer",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/dev-tools-installer.git"
  },
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --win --publish never",
    "build:publish": "electron-builder --win --publish always",
    "dist": "electron-builder --win --publish never",
    "postinstall": "electron-builder install-app-deps"
  },
  "author": {
    "name": "DevTools Installer",
    "email": "your-email@example.com"
  },
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.13.3",
    "electron-updater": "^6.1.7"
  },
  "dependencies": {
    "adm-zip": "^0.5.16"
  }
}
```

### Build Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `npm start` | `electron .` | Run app locally |
| `npm run build` | `electron-builder --win --publish never` | Build `.exe` locally, no upload |
| `npm run build:publish` | `electron-builder --win --publish always` | Build + push to GitHub Releases |
| `npm run dist` | Same as `build` | Alias |

---

## electron-builder.yml (full config)

```yaml
# Application identity
appId: com.devtools.installer
productName: DevTools Installer
copyright: "Copyright © 2026 DevTools Installer"

# Directory structure
directories:
  output: dist
  buildResources: build

# Files to include in the app bundle
files:
  - "src/**/*"
  - "package.json"
  - "!**/*.map"
  - "!**/node_modules/.cache/**"

# Windows target
win:
  icon: build/icon.ico           # .ico, min 256×256
  target:
    - target: nsis
      arch:
        - x64
  requestedExecutionLevel: requireAdministrator
  # Code signing (uncomment when you have a certificate):
  # certificateFile: ./certs/your-cert.pfx
  # certificatePassword: ${CSC_KEY_PASSWORD}

# NSIS Installer configuration
nsis:
  oneClick: false                           # Show wizard (not silent)
  allowToChangeInstallationDirectory: true  # User can choose install path
  createDesktopShortcut: true
  createStartMenuShortcut: true
  shortcutName: DevTools Installer
  artifactName: "DevTools-Installer-Setup-${version}.${ext}"
  runAfterFinish: true
  perMachine: true
  allowElevation: true
  deleteAppDataOnUninstall: false

# Auto-update via GitHub Releases
publish:
  - provider: github
    owner: YOUR_USERNAME
    repo: dev-tools-installer
    releaseType: draft
```

---

## .github/workflows/build.yml (full workflow)

```yaml
name: Build Windows Installer

on:
  push:
    branches: [main]
    tags:
      - "v*.*.*"          # e.g. v1.0.0 → creates a GitHub Release
  pull_request:
    branches: [main]
  workflow_dispatch:       # manual trigger from GitHub UI

permissions:
  contents: write          # needed to create GitHub Releases

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build:
    name: Build on Windows
    runs-on: windows-latest
    timeout-minutes: 30

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Cache Electron binaries
        uses: actions/cache@v4
        with:
          path: |
            ~\AppData\Local\electron\Cache
            ~\AppData\Local\electron-builder\Cache
          key: electron-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            electron-${{ runner.os }}-

      - name: Install dependencies
        run: npm ci

      - name: Ensure build/icon.ico exists
        shell: pwsh
        run: |
          if (-Not (Test-Path "build/icon.ico")) {
            Write-Host "⚠ No icon.ico found — generating a placeholder"
            New-Item -ItemType Directory -Force -Path "build" | Out-Null
            # Creates a minimal valid ICO file so the build doesn't fail
            $icoBytes = @(0x00,0x00,0x01,0x00,0x01,0x00,...) # see build.yml for full bytes
            [System.IO.File]::WriteAllBytes("build/icon.ico", [byte[]]$icoBytes)
          }

      - name: Build Electron app (installer .exe)
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # CSC_LINK: ${{ secrets.WIN_CSC_LINK }}
          # CSC_KEY_PASSWORD: ${{ secrets.WIN_CSC_KEY_PASSWORD }}
        run: |
          if ("${{ github.ref_type }}" -eq "tag") {
            npm run build:publish
          } else {
            npm run build
          }

      - name: Upload installer artifact
        uses: actions/upload-artifact@v4
        with:
          name: DevTools-Installer-Windows
          path: |
            dist/*.exe
            dist/*.blockmap
            dist/latest.yml
          if-no-files-found: error
          retention-days: 30

      - name: Create GitHub Release
        if: startsWith(github.ref, 'refs/tags/v')
        uses: softprops/action-gh-release@v2
        with:
          draft: true
          generate_release_notes: true
          files: |
            dist/*.exe
            dist/*.blockmap
            dist/latest.yml
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## GitHub Actions — How It Works

### Triggers

| Event | What happens |
|-------|--------------|
| Push to `main` | Builds installer → uploads as artifact |
| Pull request to `main` | Builds installer (CI check) |
| Tag `v*.*.*` (e.g. `v1.0.0`) | Builds + creates **draft** GitHub Release with `.exe` attached |
| Manual dispatch | Build on demand from GitHub UI |

### Pipeline steps

1. **Checkout** — clone the repo
2. **Node.js 20** — with npm dependency caching
3. **Electron binary cache** — avoids re-downloading Electron on every run
4. **`npm ci`** — clean, reproducible install
5. **Icon check** — generates a placeholder if `build/icon.ico` is missing
6. **Build** — produces `dist/DevTools-Installer-Setup-1.0.0.exe`
7. **Upload artifact** — available in GitHub Actions UI for 30 days
8. **GitHub Release** — created as draft on version tags only

### NSIS Installer Features

| Feature | Status |
|---------|--------|
| Installation wizard (not silent) | ✅ Enabled |
| User-selectable install directory | ✅ Enabled |
| Desktop shortcut | ✅ Created |
| Start Menu shortcut | ✅ Created |
| Launch app after install | ✅ Enabled |
| Per-machine install (Program Files) | ✅ Enabled |
| Uninstaller | ✅ Included |
| Output filename | `DevTools-Installer-Setup-{version}.exe` |

---

## Before You Push — Checklist

### 1. Replace placeholders

In `package.json`:
- `YOUR_USERNAME` → your GitHub username or organization
- `your-email@example.com` → your email address

In `electron-builder.yml`:
- `YOUR_USERNAME` → your GitHub username or organization

### 2. Add your app icon

Place `build/icon.ico` (256×256 minimum, multi-resolution recommended).

**How to create an `.ico` file:**
- Online: [convertico.com](https://convertico.com/)
- GIMP: File → Export As → `.ico`
- ImageMagick:
  ```bash
  magick convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
  ```

### 3. Generate `package-lock.json`

Required by `npm ci` in CI:
```bash
npm install
git add package-lock.json
git commit -m "chore: add package-lock.json"
```

### 4. Push and verify

```bash
git add .
git commit -m "chore: add electron-builder and GitHub Actions setup"
git push origin main
```

Check the **Actions** tab in your GitHub repo — you should see the workflow run.

---

## Releasing a New Version

```bash
# 1. Bump version in package.json
npm version patch   # or minor / major

# 2. Push with tags
git push origin main --tags
```

This triggers the workflow, builds the installer, and creates a **draft release** on GitHub.
Go to **Releases** → review → click **Publish release** to make it public.

---

## Code Signing (Optional but Recommended)

Without a certificate, Windows Defender SmartScreen shows an "Unknown publisher" warning.

### Steps:
1. Obtain a code-signing certificate (e.g., from DigiCert, Sectigo, or Microsoft)
2. Export it as a `.pfx` file
3. Base64-encode it:
   ```bash
   base64 -i your-cert.pfx | tr -d '\n'
   ```
4. Add GitHub secrets:

   | Secret | Value |
   |--------|-------|
   | `WIN_CSC_LINK` | Base64-encoded `.pfx` content |
   | `WIN_CSC_KEY_PASSWORD` | Certificate password |

5. Uncomment in `.github/workflows/build.yml`:
   ```yaml
   CSC_LINK: ${{ secrets.WIN_CSC_LINK }}
   CSC_KEY_PASSWORD: ${{ secrets.WIN_CSC_KEY_PASSWORD }}
   ```

6. Uncomment in `electron-builder.yml`:
   ```yaml
   win:
     certificateFile: ./certs/your-cert.pfx
     certificatePassword: ${CSC_KEY_PASSWORD}
   ```

---

## Auto-Update Support (Optional)

`electron-updater` is already added as a dependency. Add this to `src/main.js` to enable
in-app update checks against GitHub Releases:

```js
const { autoUpdater } = require('electron-updater');

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});

// Optional: listen for update events
autoUpdater.on('update-available', () => {
  // notify user
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
```

The `latest.yml` file produced by the build tells `electron-updater` where to find new
versions. It's automatically uploaded to GitHub Releases by the workflow.

---

## Versioning Strategy

Use [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

| Command | Example | When to use |
|---------|---------|-------------|
| `npm version patch` | `1.0.0 → 1.0.1` | Bug fixes |
| `npm version minor` | `1.0.0 → 1.1.0` | New features (backwards-compatible) |
| `npm version major` | `1.0.0 → 2.0.0` | Breaking changes |

These commands automatically update `package.json` and create a git tag.
