import fs from 'fs';
import http from 'http';
import path from 'path';
import puppeteer from 'puppeteer-core';

const BASE_URL = 'http://127.0.0.1:4321';

const mode = process.argv[2] === 'before' ? 'before' : 'after';
const OUT_DIR = path.join(process.cwd(), 'docs', 'audits', 'screenshots', 'batch-5', mode);
const RESULT_PATH = path.join(process.cwd(), 'docs', 'audits', `batch-5-qa-results-${mode}.json`);
const DIST_DIR = path.join(process.cwd(), 'dist');

const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
];

const viewports = [
  { name: '360x800', width: 360, height: 800 },
  { name: '390x844', width: 390, height: 844 },
  { name: '430x932', width: 430, height: 932 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 },
];

const pages = [
  { name: 'home', path: '/', expectedStatus: 200 },
  { name: 'notebook', path: '/notebook/', expectedStatus: 200 },
  { name: 'computer', path: '/computer/', expectedStatus: 200 },
  { name: 'iphone', path: '/iphone/', expectedStatus: 200 },
  { name: 'macbook', path: '/macbook/', expectedStatus: 200 },
  { name: 'gpu', path: '/gpu/', expectedStatus: 200 },
  { name: 'local-khonkaen', path: '/รับซื้อไอที-เมืองขอนแก่น/', expectedStatus: 200 },
  { name: 'blog-index', path: '/blog/', expectedStatus: 200 },
  { name: 'blog-article', path: '/blog/macbook-resale-price/', expectedStatus: 200 },
  { name: 'contact', path: '/contact/', expectedStatus: 200 },
  { name: '404', path: '/not-found-batch-5-check/', expectedStatus: 404 },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function checkOverflow() {
  const width = window.innerWidth;
  const docWidth = document.documentElement.scrollWidth;
  const bodyWidth = document.body.scrollWidth;
  const overflowing = [];

  if (docWidth <= width && bodyWidth <= width) {
    return { docWidth, bodyWidth, width, overflowing };
  }

  for (const el of document.querySelectorAll('body *')) {
    const rect = el.getBoundingClientRect();
    if (rect.right <= width + 1 && rect.left >= -1) continue;

    let parent = el.parentElement;
    let clipped = false;
    while (parent && parent !== document.body) {
      const style = getComputedStyle(parent);
      if (style.overflow === 'hidden' || style.overflowX === 'hidden') {
        clipped = true;
        break;
      }
      parent = parent.parentElement;
    }

    if (!clipped) {
      overflowing.push({
        tag: el.tagName.toLowerCase(),
        id: el.id,
        className: typeof el.className === 'string' ? el.className : '',
        left: Math.round(rect.left),
        right: Math.round(rect.right),
      });
    }
  }

  return { docWidth, bodyWidth, width, overflowing };
}

function pageChecks() {
  const h1Count = document.querySelectorAll('h1').length;
  const header = document.querySelector('.hdr__in');
  const footer = document.querySelector('footer');
  const sticky = document.querySelector('.sticky-bar');
  const headerRect = header?.getBoundingClientRect();
  const footerRect = footer?.getBoundingClientRect();
  const stickyRect = sticky && getComputedStyle(sticky).display !== 'none' ? sticky.getBoundingClientRect() : null;
  const h1Rect = document.querySelector('h1')?.getBoundingClientRect();

  return {
    h1Count,
    headerHeight: headerRect ? Math.round(headerRect.height) : 0,
    h1Visible: h1Rect ? h1Rect.height > 0 && h1Rect.width > 0 : false,
    stickyOverFooter: Boolean(stickyRect && footerRect && stickyRect.top < footerRect.bottom && footerRect.top < window.innerHeight),
  };
}

const chromePath = chromeCandidates.find((candidate) => fs.existsSync(candidate));
if (!chromePath) {
  throw new Error('Google Chrome was not found.');
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
  }[ext] || 'application/octet-stream';
}

function resolveDistPath(urlPath) {
  const decodedPath = decodeURIComponent(new URL(urlPath, BASE_URL).pathname);
  const cleanPath = decodedPath.replace(/^\/+/, '');
  const direct = path.join(DIST_DIR, cleanPath);
  const index = path.join(DIST_DIR, cleanPath, 'index.html');

  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return { filePath: direct, status: 200 };
  if (fs.existsSync(index) && fs.statSync(index).isFile()) return { filePath: index, status: 200 };
  return { filePath: path.join(DIST_DIR, '404.html'), status: 404 };
}

const server = http.createServer((req, res) => {
  const { filePath, status } = resolveDistPath(req.url || '/');
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  res.writeHead(status, { 'content-type': contentType(filePath) });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(4321, '127.0.0.1', resolve));
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const results = {
  timestamp: new Date().toISOString(),
  baseUrl: BASE_URL,
  pages: [],
  summary: {
    checked: 0,
    failures: 0,
    screenshots: 0,
  },
};

try {
  for (const pageDef of pages) {
    for (const viewport of viewports) {
      const tab = await browser.newPage();
      const consoleErrors = [];
      const failedRequests = [];

      tab.on('pageerror', (err) => consoleErrors.push(err.message));
      tab.on('console', (msg) => {
        if (msg.type() !== 'error') return;
        const text = msg.text();
        if (pageDef.expectedStatus === 404 && text.includes('Failed to load resource') && text.includes('404')) return;
        consoleErrors.push(text);
      });
      tab.on('requestfailed', (req) => {
        const url = req.url();
        if (url.startsWith(BASE_URL)) {
          failedRequests.push(`${req.method()} ${url} ${req.failure()?.errorText || ''}`.trim());
        }
      });

      await tab.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
      const response = await tab.goto(`${BASE_URL}${pageDef.path}`, { waitUntil: 'networkidle0', timeout: 30000 });
      await sleep(250);

      const status = response?.status() ?? 0;
      const overflow = await tab.evaluate(checkOverflow);
      const checks = await tab.evaluate(pageChecks);
      const screenshotName = `${pageDef.name}-${viewport.name}-after.png`;
      await tab.screenshot({ path: path.join(OUT_DIR, screenshotName), fullPage: false });
      await tab.close();

      const failures = [];
      if (status !== pageDef.expectedStatus) failures.push(`status ${status} expected ${pageDef.expectedStatus}`);
      if (overflow.docWidth !== overflow.width || overflow.bodyWidth > overflow.width || overflow.overflowing.length > 0) failures.push('horizontal overflow');
      if (consoleErrors.length) failures.push('console errors');
      if (failedRequests.length) failures.push('failed first-party requests');
      if (checks.h1Count !== 1) failures.push(`h1 count ${checks.h1Count}`);
      if (!checks.h1Visible) failures.push('h1 not visible');
      if (checks.headerHeight > 92) failures.push(`header wrap/height ${checks.headerHeight}`);
      if (checks.stickyOverFooter) failures.push('sticky bar overlaps footer in viewport');

      results.pages.push({
        page: pageDef.name,
        path: pageDef.path,
        viewport: viewport.name,
        status,
        overflow,
        consoleErrors,
        failedRequests,
        checks,
        screenshot: screenshotName,
        pass: failures.length === 0,
        failures,
      });

      results.summary.checked += 1;
      results.summary.screenshots += 1;
      if (failures.length) results.summary.failures += 1;
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

fs.writeFileSync(RESULT_PATH, JSON.stringify(results, null, 2), 'utf8');
console.log(JSON.stringify(results.summary, null, 2));
