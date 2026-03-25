# DevTools Installer

A one-click desktop app to install and configure developer tools on Windows.

## Features

- **Tool Selection** — Pick from Java (JDK), Node.js, Git, Maven with version options
- **Quick Bundles** — Pre-configured sets like "Java Developer" or "Full-Stack Developer"
- **Silent Install** — Downloads and installs everything automatically
- **Auto-Configuration** — Sets `JAVA_HOME`, `MAVEN_HOME`, and updates `PATH`
- **Verification** — Runs version checks to confirm each tool works
- **Detection** — Skips tools already installed on your system
- **Real-time Logs** — See download/install progress and errors live
- **Retry on Failure** — Retry individual failed tools without restarting

## Quick Start

```bash
npm install
npm start
```

> **Note:** Run as Administrator for system-wide environment variable configuration.

## Project Structure

```
src/
├── main.js                 # Electron main process
├── preload.js              # IPC bridge (context isolation)
├── config/
│   └── tools.json          # Data-driven tool definitions
├── installer/
│   └── engine.js           # Download, install, configure, verify logic
└── renderer/
    ├── index.html          # UI layout
    ├── styles.css          # Dark theme styling
    └── renderer.js         # UI logic and state management
```

## How It Works

1. **Select** tools or a bundle from the UI
2. **Install** — the engine downloads installers, runs them silently, sets env vars, and verifies
3. **Done** — see a summary of what succeeded/failed

## Configuration

All tool definitions live in `src/config/tools.json`. To add a new tool, add an entry with:

- `downloadUrls` — version-keyed download links
- `installCommand` — silent install command templates
- `envVars` — environment variables to set
- `pathEntries` — directories to add to PATH
- `verifyCommand` — command to check installation

## Build

```bash
npm run build
```

Produces a Windows installer in `dist/`.
