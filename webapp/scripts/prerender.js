/**
 * Post-build prerender script.
 *
 * Reads every route from the built sitemap.xml, renders each page in a
 * headless browser, and writes the fully-rendered HTML back into dist/.
 *
 * Output uses the "clean URLs" convention (e.g. /guides/java → guides/java.html)
 * so Firebase Hosting can serve them with `"cleanUrls": true`.
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  statSync,
} from 'node:fs'
import { resolve, join, dirname, extname } from 'node:path'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const SITEMAP = join(DIST, 'sitemap.xml')
const PORT = 45_678

/* ── helpers ────────────────────────────────────────────────────────── */

/** Parse sitemap.xml and return an array of pathname strings. */
function extractRoutes() {
  const xml = readFileSync(SITEMAP, 'utf-8')
  const routes = []
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    routes.push(new URL(loc).pathname)
  }
  return [...new Set(routes)]
}

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain',
}

/** Minimal static-file server with SPA fallback to index.html. */
function startServer(fallbackHtml) {
  return new Promise((res) => {
    const srv = createServer((req, resp) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0])
      const fp = join(DIST, urlPath)

      if (existsSync(fp) && statSync(fp).isFile()) {
        resp.writeHead(200, {
          'Content-Type': MIME[extname(fp)] || 'application/octet-stream',
        })
        resp.end(readFileSync(fp))
      } else {
        resp.writeHead(200, { 'Content-Type': 'text/html' })
        resp.end(fallbackHtml)
      }
    })
    srv.listen(PORT, '127.0.0.1', () => res(srv))
  })
}

/** Map a route to its output file path (clean-URL convention). */
function routeToFile(route) {
  if (route === '/') return join(DIST, 'index.html')
  return join(DIST, `${route.replace(/\/$/, '')}.html`)
}

/* ── main ───────────────────────────────────────────────────────────── */

async function prerender() {
  const routes = extractRoutes()
  console.log(`\nPrerendering ${routes.length} routes…\n`)

  // Keep the original SPA shell in memory for the dev server fallback.
  const fallbackHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

  const server = await startServer(fallbackHtml)
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  // Skip images / fonts / media to speed up rendering.
  await page.setRequestInterception(true)
  page.on('request', (r) => {
    if (['image', 'font', 'media'].includes(r.resourceType())) r.abort()
    else r.continue()
  })

  let ok = 0
  for (const route of routes) {
    try {
      await page.goto(`http://127.0.0.1:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30_000,
      })

      // Wait until React Helmet has injected the canonical tag — this
      // guarantees all SEO-critical head tags are in the DOM.
      await page.waitForSelector('link[rel="canonical"]', { timeout: 10_000 })

      const html = await page.content()

      const outFile = routeToFile(route)
      mkdirSync(dirname(outFile), { recursive: true })
      writeFileSync(outFile, html)
      ok++
      console.log(`  ✓ ${route}`)
    } catch (err) {
      console.error(`  ✗ ${route}: ${err.message}`)
    }
  }

  await page.close()
  await browser.close()
  server.close()

  console.log(`\n✅ Prerendered ${ok}/${routes.length} pages\n`)
  if (ok < routes.length) process.exit(1)
}

prerender()
