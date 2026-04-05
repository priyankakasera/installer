import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// NOTE: vite-plugin-prerender (devDep) has an ESM compat bug (require() in .mjs).
// Prerendering can be re-enabled once the package is patched or replaced.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
