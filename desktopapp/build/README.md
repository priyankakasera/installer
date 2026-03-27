# Build Resources

This directory contains build assets used by electron-builder.

## Required: `icon.ico`

Place your application icon here as `icon.ico`.

### Requirements:
- Format: `.ico` (Windows icon format)
- Minimum size: **256×256 pixels** (recommended: include 16, 32, 48, 64, 128, 256px sizes)
- The same icon is used for the app executable, installer, and desktop shortcut

### How to create an icon:
1. Design a 256×256 PNG
2. Convert to `.ico` using:
   - [ConvertICO.com](https://convertico.com/) (online)
   - [GIMP](https://www.gimp.org/) (export as .ico)
   - ImageMagick: `magick convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico`

> **Note:** If no `icon.ico` is present, the GitHub Actions workflow will generate a
> minimal placeholder icon so the build doesn't fail. Replace it with your real icon
> before distributing.

## Optional assets

| File                    | Size      | Format | Purpose                        |
|-------------------------|-----------|--------|--------------------------------|
| `installerSidebar.bmp`  | 164×314   | BMP    | NSIS wizard left sidebar       |
| `uninstallerSidebar.bmp`| 164×314   | BMP    | Uninstall wizard left sidebar  |
| `installerHeader.bmp`   | 150×57    | BMP    | NSIS wizard top-right header   |
