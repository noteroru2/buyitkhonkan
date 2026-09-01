import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com';

const URLS_TO_TEST = [
  { path: '/', expectedStatus: 200 },
  { path: '/robots.txt', expectedStatus: 200, isRaw: true },
  { path: '/sitemap-index.xml', expectedStatus: 200, isRaw: true },
  { path: '/sitemap-0.xml', expectedStatus: 200, isRaw: true },
  { path: '/images/og/default-og.png', expectedStatus: 200, isRaw: true },
  { path: '/notebook/', expectedStatus: 200 },
  { path: '/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/', expectedStatus: 200 },
  { path: '/blog/', expectedStatus: 200 },
  { path: '/contact/', expectedStatus: 200 },
  { path: '/non-existent-page-test-12345', expectedStatus: 404 }
];

const VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 }
];

async function runSmokeTests() {
  console.log(`Starting Live Smoke Test on: ${BASE_URL}\n`);
  
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
  ];
  let executablePath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      executablePath = p;
      break;
    }
  }
  if (!executablePath) {
    console.error('Could not find Google Chrome installation.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    urlsTested: [],
    overallSuccess: true,
    errors: []
  };

  try {
    for (const test of URLS_TO_TEST) {
      const fullUrl = `${BASE_URL}${test.path}`;
      console.log(`Testing URL: ${fullUrl}`);
      
      const page = await browser.newPage();
      
      const consoleErrors = [];
      const failedRequests = [];
      
      page.on('pageerror', (err) => consoleErrors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Filter out standard 404 network failure logs in Chrome console
          if (!text.includes('Failed to load resource') && !text.includes('favicon.ico')) {
            consoleErrors.push(text);
          }
        }
      });
      page.on('requestfailed', (req) => {
        const url = req.url();
        // Only track failure of first-party requests and exclude standard favicon.ico
        if ((url.includes(BASE_URL) || url.startsWith('/')) && !url.includes('favicon.ico')) {
          failedRequests.push(`${req.method()} ${url} - ${req.failure().errorText}`);
        }
      });

      const response = await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      const status = response.status();
      const headers = response.headers();
      
      console.log(`  HTTP Status: ${status} (Expected: ${test.expectedStatus})`);
      
      const statusPass = status === test.expectedStatus;
      
      let canonical = '';
      let robotsMeta = '';
      let hasNoindex = false;
      let hasWrongCanonical = false;
      let hasStagingCanonical = false;
      let overflowIssues = {};

      if (!test.isRaw) {
        canonical = await page.evaluate(() => {
          const link = document.querySelector('link[rel="canonical"]');
          return link ? link.getAttribute('href') : '';
        });
        
        robotsMeta = await page.evaluate(() => {
          const meta = document.querySelector('meta[name="robots"]');
          return meta ? meta.getAttribute('content') : '';
        });
        
        hasNoindex = (robotsMeta && robotsMeta.toLowerCase().includes('noindex')) || 
                     (headers['x-robots-tag'] && headers['x-robots-tag'].toLowerCase().includes('noindex'));
        
        if (canonical) {
          if (!canonical.startsWith(BASE_URL)) {
            hasWrongCanonical = true;
          }
          if (canonical.includes('localhost') || canonical.includes('vercel.app')) {
            hasStagingCanonical = true;
          }
        }

        for (const vp of VIEWPORTS) {
          await page.setViewport(vp);
          await new Promise(r => setTimeout(r, 200));
          
          const overflowElements = await page.evaluate(() => {
            const docWidth = document.documentElement.scrollWidth;
            const bodyWidth = document.body.scrollWidth;
            const windowWidth = window.innerWidth;
            
            if (docWidth > windowWidth || bodyWidth > windowWidth) {
              const badElements = [];
              const all = document.querySelectorAll('*');
              for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.right > windowWidth) {
                  let parent = el.parentElement;
                  let clipped = false;
                  while (parent) {
                    const style = window.getComputedStyle(parent);
                    if (style.overflowX === 'hidden' || style.overflow === 'hidden') {
                      clipped = true;
                      break;
                    }
                    parent = parent.parentElement;
                  }
                  if (!clipped) {
                    badElements.push({
                      tag: el.tagName.toLowerCase(),
                      id: el.id,
                      class: el.className,
                      right: rect.right
                    });
                  }
                }
              }
              return badElements;
            }
            return [];
          });
          
          if (overflowElements.length > 0) {
            overflowIssues[`${vp.width}x${vp.height}`] = overflowElements;
          }
        }
      } else {
        if (test.path.endsWith('.txt') || test.path.endsWith('.xml')) {
          const text = await response.text();
          if (test.path.includes('robots.txt')) {
            if (!text.includes(BASE_URL)) {
              results.errors.push(`robots.txt does not contain production base URL: ${BASE_URL}`);
            }
          }
          if (test.path.includes('sitemap')) {
            if (text.includes('localhost') || text.includes('vercel.app')) {
              results.errors.push(`Sitemap contains dev/staging references!`);
            }
          }
        }
      }

      let ctaLineWorks = false;
      let ctaPhoneWorks = false;
      let lineEventFired = false;
      let phoneEventFired = false;
      
      if (!test.isRaw && status === 200) {
        ctaLineWorks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a'));
          return links.some(l => l.href.includes('line.me') || l.href.includes('lin.ee'));
        });
        
        ctaPhoneWorks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a'));
          return links.some(l => l.href.startsWith('tel:'));
        });

        lineEventFired = await page.evaluate(() => {
          window.dataLayer = window.dataLayer || [];
          const lineLink = Array.from(document.querySelectorAll('a')).find(l => l.href.includes('line.me') || l.href.includes('lin.ee'));
          if (lineLink) {
            lineLink.addEventListener('click', (e) => e.preventDefault());
            lineLink.click();
            return window.dataLayer.some(e => e.event === 'click_line');
          }
          return false;
        });

        phoneEventFired = await page.evaluate(() => {
          window.dataLayer = window.dataLayer || [];
          const phoneLink = Array.from(document.querySelectorAll('a')).find(l => l.href.startsWith('tel:'));
          if (phoneLink) {
            phoneLink.addEventListener('click', (e) => e.preventDefault());
            phoneLink.click();
            return window.dataLayer.some(e => e.event === 'click_phone');
          }
          return false;
        });
      }

      const urlSuccess = statusPass && !hasWrongCanonical && !hasStagingCanonical && 
                         (test.expectedStatus === 404 ? hasNoindex : !hasNoindex) &&
                         Object.keys(overflowIssues).length === 0 &&
                         consoleErrors.length === 0 &&
                         failedRequests.length === 0;

      if (!urlSuccess) {
        results.overallSuccess = false;
        results.errors.push({
          path: test.path,
          statusPass,
          hasWrongCanonical,
          hasStagingCanonical,
          hasNoindexMismatch: test.expectedStatus === 404 ? !hasNoindex : hasNoindex,
          overflowIssues,
          consoleErrors,
          failedRequests
        });
      }

      results.urlsTested.push({
        path: test.path,
        status,
        expectedStatus: test.expectedStatus,
        canonical,
        robotsMeta,
        hasNoindex,
        overflowIssues,
        consoleErrors,
        failedRequests,
        ctaLineWorks,
        ctaPhoneWorks,
        lineEventFired,
        phoneEventFired,
        success: urlSuccess
      });

      await page.close();
    }
  } catch (err) {
    console.error('Error executing tests:', err);
    results.overallSuccess = false;
    results.errors.push(`Execution error: ${err.message}`);
  } finally {
    await browser.close();
  }

  const outputFilePath = path.join(__dirname, 'batch-3-live-smoke-results.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nSmoke Tests finished! Results saved to: ${outputFilePath}`);
  console.log(`Overall Success: ${results.overallSuccess ? 'PASS' : 'FAIL'}`);
}

runSmokeTests();
