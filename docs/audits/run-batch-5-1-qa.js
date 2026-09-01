import fs from 'fs';
import http from 'http';
import path from 'path';
import puppeteer from 'puppeteer-core';

const BASE_URL = 'http://127.0.0.1:4321';
const DIST_DIR = path.join(process.cwd(), 'dist');
const OUT_DIR = path.join(process.cwd(), 'docs', 'audits', 'screenshots', 'batch-5-1', 'after');
const RESULT_PATH = path.join(process.cwd(), 'docs', 'audits', 'batch-5-1-qa-results.json');

const viewports = [
  { name: '360', width: 360, height: 800 },
  { name: '390', width: 390, height: 844 },
  { name: '430', width: 430, height: 932 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1440', width: 1440, height: 900 },
  { name: '1920', width: 1920, height: 1080 },
];

const pages = [
  { name: 'homepage', path: '/', expectedStatus: 200 },
  { name: 'notebook', path: '/notebook/', expectedStatus: 200 },
  { name: 'local-page', path: '/รับซื้อไอที-เมืองขอนแก่น/', expectedStatus: 200 },
  { name: 'blog-index', path: '/blog/', expectedStatus: 200 },
  { name: 'blog-article', path: '/blog/macbook-resale-price/', expectedStatus: 200 },
  { name: 'blog-article-other', path: '/blog/iphone-resale-price/', expectedStatus: 200 },
  { name: 'contact', path: '/contact/', expectedStatus: 200 },
  { name: '404', path: '/not-found-batch-5-1-check/', expectedStatus: 404 },
];

const screenshotAllow = new Set([
  'blog-index-768-after.png',
  'blog-index-1024-after.png',
  'blog-index-1440-after.png',
  'blog-article-360-after.png',
  'blog-article-390-after.png',
  'blog-article-1440-after.png',
  'blog-article-1920-after.png',
  '404-390-after.png',
  '404-1440-after.png',
  'header-768-after.png',
  'header-1024-after.png',
]);

const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

function checkOverflow() {
  const width = window.innerWidth;
  const docWidth = document.documentElement.scrollWidth;
  const bodyWidth = document.body.scrollWidth;
  const overflowing = [];
  if (docWidth <= width && bodyWidth <= width) return { docWidth, bodyWidth, width, overflowing };

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
    if (!clipped) overflowing.push({ tag: el.tagName.toLowerCase(), className: String(el.className || ''), right: Math.round(rect.right) });
  }
  return { docWidth, bodyWidth, width, overflowing };
}

function visualChecks() {
  const h1 = document.querySelector('h1');
  const header = document.querySelector('.hdr__in');
  const brand = document.querySelector('.hdr__logo');
  const footer = document.querySelector('footer');
  const sticky = document.querySelector('.sticky-bar');
  const footerRect = footer?.getBoundingClientRect();
  const stickyRect = sticky && getComputedStyle(sticky).display !== 'none' ? sticky.getBoundingClientRect() : null;
  const h1Rect = h1?.getBoundingClientRect();
  const brandRect = brand?.getBoundingClientRect();
  const headerRect = header?.getBoundingClientRect();
  const articleContent = document.querySelector('.post__content');
  const articleHeader = document.querySelector('.post__header');
  const errorHero = document.querySelector('.error-hero');
  const errorVisual = document.querySelector('.error-hero__visual');

  return {
    h1Count: document.querySelectorAll('h1').length,
    h1Text: h1?.textContent?.trim() || '',
    h1Visible: Boolean(h1Rect && h1Rect.width > 0 && h1Rect.height > 0),
    h1Height: h1Rect ? Math.round(h1Rect.height) : 0,
    h1LinesApprox: h1Rect ? Math.round(h1Rect.height / parseFloat(getComputedStyle(h1).lineHeight)) : 0,
    headerHeight: headerRect ? Math.round(headerRect.height) : 0,
    headerBrandWidth: brandRect ? Math.round(brandRect.width) : 0,
    stickyOverFooter: Boolean(stickyRect && footerRect && stickyRect.top < footerRect.bottom && footerRect.top < window.innerHeight),
    articleContentWidth: articleContent ? Math.round(articleContent.getBoundingClientRect().width) : 0,
    articleHeaderWidth: articleHeader ? Math.round(articleHeader.getBoundingClientRect().width) : 0,
    errorColumns: errorHero ? getComputedStyle(errorHero).gridTemplateColumns : '',
    errorVisualVisible: errorVisual ? getComputedStyle(errorVisual).display !== 'none' : false,
  };
}

function collectMetadata() {
  const title = document.querySelector('title')?.textContent?.trim() || '';
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => node.textContent || '');
  const schemaErrors = schemas.flatMap((schema) => {
    try {
      JSON.parse(schema);
      return [];
    } catch (err) {
      return [err.message];
    }
  });
  return { title, description, canonical, robots, schemaErrors };
}

function walkHtml(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(p, acc);
    else if (entry.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

function staticSeoAudit() {
  const files = walkHtml(DIST_DIR);
  const titles = new Map();
  const issues = [];
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim() || '';
    const desc = html.match(/<meta name="description" content="([^"]*)"/s)?.[1] || '';
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/s)?.[1] || '';
    const h1Count = [...html.matchAll(/<h1[\s>]/g)].length;
    if (!title) issues.push({ file, issue: 'missing title' });
    if (!desc) issues.push({ file, issue: 'missing description' });
    if (!canonical) issues.push({ file, issue: 'missing canonical' });
    if (h1Count === 0) issues.push({ file, issue: 'missing h1' });
    if (h1Count > 1) issues.push({ file, issue: 'multiple h1', h1Count });
    titles.set(title, [...(titles.get(title) || []), file]);
    for (const schema of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        JSON.parse(schema[1]);
      } catch (err) {
        issues.push({ file, issue: 'schema parse error', message: err.message });
      }
    }
  }
  const duplicateTitles = [...titles.entries()].filter(([title, list]) => title && list.length > 1);
  const sitemap = fs.readFileSync(path.join(DIST_DIR, 'sitemap-0.xml'), 'utf8');
  return {
    htmlCount: files.length,
    sitemapUrls: [...sitemap.matchAll(/<loc>/g)].length,
    fourOhFourInSitemap: sitemap.includes('/404'),
    issues,
    duplicateTitles: duplicateTitles.map(([title, list]) => ({ title, count: list.length })),
  };
}

function brokenLinksAudit() {
  const files = walkHtml(DIST_DIR);
  const bad = [];
  function existsHref(href) {
    try {
      let target = decodeURIComponent(href.split('#')[0].split('?')[0]);
      if (!target || target === '/') return fs.existsSync(path.join(DIST_DIR, 'index.html'));
      if (target.endsWith('/')) target += 'index.html';
      else if (!path.extname(target)) target = target.replace(/\/$/, '') + '/index.html';
      return fs.existsSync(path.join(DIST_DIR, target.replace(/^\//, '')));
    } catch {
      return true;
    }
  }
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|tel:|#|javascript:)/.test(href)) continue;
      if (!existsHref(href)) bad.push({ file, href });
    }
  }
  return bad;
}

const chromePath = chromeCandidates.find((candidate) => fs.existsSync(candidate));
if (!chromePath) throw new Error('Google Chrome was not found.');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.join(process.cwd(), 'docs', 'audits', 'screenshots', 'batch-5-1', 'before'), { recursive: true });

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

const browser = await puppeteer.launch({ executablePath: chromePath, headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const results = { timestamp: new Date().toISOString(), pages: [], staticSeo: staticSeoAudit(), brokenLinks: brokenLinksAudit(), summary: { checked: 0, failures: 0, screenshots: 0 } };

try {
  for (const pageDef of pages) {
    for (const viewport of viewports) {
      const page = await browser.newPage();
      const consoleErrors = [];
      const failedRequests = [];
      page.on('pageerror', (err) => consoleErrors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() !== 'error') return;
        const text = msg.text();
        if (pageDef.expectedStatus === 404 && text.includes('Failed to load resource') && text.includes('404')) return;
        consoleErrors.push(text);
      });
      page.on('requestfailed', (req) => {
        const url = req.url();
        if (url.startsWith(BASE_URL)) failedRequests.push(`${req.method()} ${url} ${req.failure()?.errorText || ''}`.trim());
      });
      await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
      const response = await page.goto(`${BASE_URL}${pageDef.path}`, { waitUntil: 'networkidle0', timeout: 30000 });
      await sleep(250);
      const status = response?.status() ?? 0;
      const overflow = await page.evaluate(checkOverflow);
      const checks = await page.evaluate(visualChecks);
      const metadata = await page.evaluate(collectMetadata);
      const failures = [];
      if (status !== pageDef.expectedStatus) failures.push(`status ${status} expected ${pageDef.expectedStatus}`);
      if (overflow.docWidth !== overflow.width || overflow.bodyWidth > overflow.width || overflow.overflowing.length > 0) failures.push('horizontal overflow');
      if (consoleErrors.length) failures.push('console errors');
      if (failedRequests.length) failures.push('failed first-party requests');
      if (checks.h1Count !== 1) failures.push(`h1 count ${checks.h1Count}`);
      if (!checks.h1Visible) failures.push('h1 not visible');
      if (checks.headerHeight > 92) failures.push(`header wrap/height ${checks.headerHeight}`);
      if (checks.stickyOverFooter) failures.push('sticky overlaps footer');
      if (metadata.schemaErrors.length) failures.push('schema parse errors');

      const screenshotName = `${pageDef.name}-${viewport.name}-after.png`;
      await page.screenshot({ path: path.join(OUT_DIR, screenshotName), fullPage: false });
      results.summary.screenshots += 1;
      if (pageDef.name === 'blog-index' && (viewport.name === '768' || viewport.name === '1024' || viewport.name === '1440')) {
        fs.copyFileSync(path.join(OUT_DIR, screenshotName), path.join(OUT_DIR, `blog-index-${viewport.name}-after.png`));
      }
      if (pageDef.name === 'blog-article' && ['360', '390', '1440', '1920'].includes(viewport.name)) {
        fs.copyFileSync(path.join(OUT_DIR, screenshotName), path.join(OUT_DIR, `blog-article-${viewport.name}-after.png`));
      }
      if (pageDef.name === '404' && ['390', '1440'].includes(viewport.name)) {
        fs.copyFileSync(path.join(OUT_DIR, screenshotName), path.join(OUT_DIR, `404-${viewport.name}-after.png`));
      }
      if (pageDef.name === 'homepage' && (viewport.name === '768' || viewport.name === '1024')) {
        fs.copyFileSync(path.join(OUT_DIR, screenshotName), path.join(OUT_DIR, `header-${viewport.name}-after.png`));
      }

      results.pages.push({ page: pageDef.name, path: pageDef.path, viewport: viewport.name, status, overflow, checks, metadata, consoleErrors, failedRequests, pass: failures.length === 0, failures, screenshot: screenshotName });
      results.summary.checked += 1;
      if (failures.length) results.summary.failures += 1;
      await page.close();
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

results.summary.staticSeoIssues = results.staticSeo.issues.length;
results.summary.duplicateTitles = results.staticSeo.duplicateTitles.length;
results.summary.brokenLinks = results.brokenLinks.length;
results.summary.requiredScreenshotsPresent = [...screenshotAllow].filter((name) => fs.existsSync(path.join(OUT_DIR, name))).length;

fs.writeFileSync(RESULT_PATH, JSON.stringify(results, null, 2), 'utf8');
console.log(JSON.stringify(results.summary, null, 2));
