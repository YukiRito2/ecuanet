// Post-build step: snapshots the fully client-rendered page into dist/index.html.
//
// This app is a client-only React SPA (no SSR/SSG), so the HTML Vite emits is
// just `<div id="root"></div>` until React mounts. Crawlers that don't execute
// JS (and several SEO checkers) see an empty page: no H1, no headings, no text.
// This script boots the built app in headless Chrome, waits for it to render,
// and writes the resulting DOM back into dist/index.html — the JS bundle stays
// in place, so real browsers still hydrate/re-render normally on load.
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteerCore from 'puppeteer-core';

// Vercel's build image is missing shared libs (libnspr4.so etc.) that the
// full `puppeteer` download of Chromium needs, so plain `puppeteer` only
// works for local dev. On CI/Vercel we instead launch @sparticuz/chromium,
// a static build made for serverless Linux with no external lib dependencies.
const isServerless = Boolean(process.env.VERCEL || process.env.CI);

async function launchBrowser() {
  if (isServerless) {
    const { default: chromium } = await import('@sparticuz/chromium');
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const { default: puppeteer } = await import('puppeteer');
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

const DIST_DIR = new URL('../dist/', import.meta.url);
const PORT = 4174;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
};

function startStaticServer() {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const target = urlPath === '/' ? '/index.html' : urlPath;
    try {
      const fileUrl = new URL('.' + target, DIST_DIR);
      const data = await readFile(fileUrl);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[extname(fileUrl.pathname)] ?? 'application/octet-stream' });
      res.end(data);
    } catch {
      const data = await readFile(new URL('index.html', DIST_DIR));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    }
  });
  return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

// Every client route that needs its own prerendered snapshot, mapped to
// where Vercel/static hosting expects to find it as a real file.
const ROUTES = [
  { path: '/', output: 'index.html' },
  { path: '/trabajos', output: 'trabajos/index.html' },
];

async function main() {
  const server = await startStaticServer();
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    // Skip external image fetches: alt text still lands in the snapshot, and
    // this keeps the build from depending on an external host being reachable.
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'image' && !req.url().startsWith('http://127.0.0.1')) {
        req.abort();
      } else {
        req.continue();
      }
    });

    for (const route of ROUTES) {
      await page.goto(`http://127.0.0.1:${PORT}${route.path}`, { waitUntil: 'networkidle0', timeout: 60_000 });
      await page.waitForSelector('h1');
      // Let entry animations (staggered fade-ins, up to ~0.6s) settle before the snapshot.
      await new Promise((resolve) => setTimeout(resolve, 800));

      const html = await page.content();
      const outputUrl = new URL(route.output, DIST_DIR);
      await mkdir(new URL('.', outputUrl), { recursive: true });
      const outputPath = fileURLToPath(outputUrl);
      await writeFile(outputPath, html);
      console.log(`Prerendered ${outputPath} (${html.length} bytes)`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
