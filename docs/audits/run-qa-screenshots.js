import { spawn } from 'child_process';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

// Make sure output folder exists
const screenshotDir = path.join(process.cwd(), 'docs', 'audits', 'screenshots', 'batch-2-1');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

// User-supplied overflow checker script
const checkOverflowJs = () => {
  const isClippedByConstrainedAncestor = (el) => {
    let parent = el.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      const parentStyle = getComputedStyle(parent);
      const isOverflowHidden = parentStyle.overflow === 'hidden' || parentStyle.overflowX === 'hidden';
      if (isOverflowHidden) {
        const parentRect = parent.getBoundingClientRect();
        // If the clipping ancestor itself fits horizontally within the viewport (with a small margin of error)
        if (parentRect.left >= -1.5 && parentRect.right <= window.innerWidth + 1.5) {
          return true;
        }
      }
      parent = parent.parentElement;
    }
    return false;
  };

  const overflowing = [...document.querySelectorAll('body *')]
    .map((el) => ({
      el,
      rect: el.getBoundingClientRect(),
      styles: getComputedStyle(el)
    }))
    .filter(({ el, rect, styles }) => {
      if (styles.position === 'fixed' && rect.width === 0) return false;
      
      const overflowsViewport = (
        rect.right > window.innerWidth + 1.5 ||
        rect.left < -1.5 ||
        rect.width > window.innerWidth + 1.5
      );
      
      if (!overflowsViewport) return false;
      
      // If it is inside a clipping ancestor that fits in the viewport, it's not a real visual overflow
      if (isClippedByConstrainedAncestor(el)) return false;
      
      return true;
    });

  return overflowing.map(({ el, rect }) => ({
    tagName: el.tagName,
    className: el.className,
    id: el.id,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    viewport: window.innerWidth
  }));
};

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Building project...');
  await new Promise((resolve, reject) => {
    const buildProcess = spawn('cmd.exe', ['/c', 'npm run build'], { stdio: 'inherit' });
    buildProcess.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build failed with code ${code}`));
    });
  });

  console.log('Starting Astro preview server...');
  const previewProcess = spawn('cmd.exe', ['/c', `npx astro preview --port ${PORT}`]);

  previewProcess.stdout.on('data', (data) => {
    // console.log(`[Server]: ${data}`);
  });

  previewProcess.stderr.on('data', (data) => {
    console.error(`[Server Error]: ${data}`);
  });

  // Wait for server to boot
  await wait(3000);

  console.log('Connecting to Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const tests = [
    {
      page: '/',
      viewport: { width: 360, height: 800 },
      filename: 'homepage-mobile-360-after.png',
    },
    {
      page: '/',
      viewport: { width: 390, height: 844 },
      filename: 'homepage-mobile-390-after.png',
    },
    {
      page: '/notebook/',
      viewport: { width: 390, height: 844 },
      filename: 'notebook-mobile-390-after.png',
    },
    {
      page: `/${encodeURIComponent('รับซื้อไอที-เมืองขอนแก่น')}/`,
      viewport: { width: 390, height: 844 },
      filename: 'local-mobile-390-after.png',
    },
    {
      page: '/some-random-404-url-that-does-not-exist',
      viewport: { width: 390, height: 844 },
      filename: '404-mobile-390-after.png',
    },
    {
      page: '/',
      viewport: { width: 768, height: 1024 },
      filename: 'homepage-tablet-768-after.png',
    },
    {
      page: '/',
      viewport: { width: 1440, height: 900 },
      filename: 'homepage-desktop-1440-after.png',
    },
  ];

  let hasTotalErrorsOrOverflow = false;

  for (const t of tests) {
    const page = await browser.newPage();
    await page.setViewport(t.viewport);

    const url = `${BASE_URL}${t.page}`;
    console.log(`\nTesting Page: ${t.page} at Viewport ${t.viewport.width}x${t.viewport.height}...`);
    
    // Capture page errors or failed requests
    const pageErrors = [];
    const failedRequests = [];
    
    page.on('pageerror', (err) => {
      pageErrors.push(err.toString());
    });
    
    page.on('requestfailed', (req) => {
      const url = req.url();
      // Only care about first-party requests (from localhost)
      if (url.includes('localhost') || url.startsWith('/')) {
        failedRequests.push(`${req.method()} ${url} - ${req.failure().errorText}`);
      }
    });

    await page.goto(url, { waitUntil: 'networkidle0' });
    await wait(500); // extra wait for layout stability and animations

    // Check scroll dimensions
    const scrollDimensions = await page.evaluate(() => {
      return {
        documentElementScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth,
      };
    });

    console.log(`Scroll Dimensions:`);
    console.log(`  document.documentElement.scrollWidth: ${scrollDimensions.documentElementScrollWidth}`);
    console.log(`  document.body.scrollWidth: ${scrollDimensions.bodyScrollWidth}`);
    console.log(`  window.innerWidth: ${scrollDimensions.windowInnerWidth}`);

    // Verify Scroll Dimensions
    if (scrollDimensions.documentElementScrollWidth !== scrollDimensions.windowInnerWidth) {
      console.error(`[ERROR] documentElement.scrollWidth (${scrollDimensions.documentElementScrollWidth}) !== window.innerWidth (${scrollDimensions.windowInnerWidth})`);
      hasTotalErrorsOrOverflow = true;
    }
    if (scrollDimensions.bodyScrollWidth > scrollDimensions.windowInnerWidth) {
      console.error(`[ERROR] body.scrollWidth (${scrollDimensions.bodyScrollWidth}) > window.innerWidth (${scrollDimensions.windowInnerWidth})`);
      hasTotalErrorsOrOverflow = true;
    }

    // Verify Ticker Wrapper Rect and Animation
    const tickerCheck = await page.evaluate(() => {
      const wrapper = document.querySelector('.ticker-wrapper');
      if (!wrapper) return { exists: false };
      const rect = wrapper.getBoundingClientRect();
      const track = document.querySelector('.ticker-track');
      let isAnimated = false;
      if (track) {
        const style = window.getComputedStyle(track);
        isAnimated = style.animationName !== 'none' && style.animationPlayState !== 'paused';
      }
      return {
        exists: true,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        isAnimated,
      };
    });

    if (tickerCheck.exists) {
      console.log(`Ticker Check:`);
      console.log(`  wrapper.left: ${tickerCheck.left}`);
      console.log(`  wrapper.right: ${tickerCheck.right}`);
      console.log(`  wrapper.width: ${tickerCheck.width}`);
      console.log(`  isAnimated: ${tickerCheck.isAnimated}`);

      if (tickerCheck.left < -1 || tickerCheck.right > scrollDimensions.windowInnerWidth + 1) {
        console.error(`[ERROR] Ticker wrapper rect is outside the viewport! Left: ${tickerCheck.left}, Right: ${tickerCheck.right}`);
        hasTotalErrorsOrOverflow = true;
      } else {
        console.log(`[PASS] Ticker wrapper rect is within viewport.`);
      }

      if (!tickerCheck.isAnimated) {
        console.error(`[ERROR] Ticker track animation is not running!`);
        hasTotalErrorsOrOverflow = true;
      } else {
        console.log(`[PASS] Ticker track animation is running.`);
      }

      // Emulate prefers-reduced-motion: reduce
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      const isAnimatedReduced = await page.evaluate(() => {
        const track = document.querySelector('.ticker-track');
        if (!track) return false;
        const style = window.getComputedStyle(track);
        return style.animationName !== 'none' && style.animationPlayState !== 'paused' && style.animationDuration !== '0s';
      });
      // Restore normal state
      await page.emulateMediaFeatures([]);

      if (isAnimatedReduced) {
        console.error(`[ERROR] Ticker animation is still running under prefers-reduced-motion: reduce!`);
        hasTotalErrorsOrOverflow = true;
      } else {
        console.log(`[PASS] Ticker animation is stopped/disabled under prefers-reduced-motion: reduce.`);
      }
    } else {
      console.log(`Ticker wrapper not found on this page.`);
    }

    // Check for overflow elements
    const overflows = await page.evaluate(checkOverflowJs);

    if (overflows.length > 0) {
      console.warn(`[WARNING] Found ${overflows.length} overflowing elements:`);
      console.table(overflows);
      hasTotalErrorsOrOverflow = true;
    } else {
      console.log(`[PASS] No overflowing elements found.`);
    }

    if (pageErrors.length > 0) {
      console.error(`[ERROR] Console errors detected:`, pageErrors);
      hasTotalErrorsOrOverflow = true;
    } else {
      console.log(`[PASS] Zero console errors.`);
    }

    if (failedRequests.length > 0) {
      console.error(`[ERROR] Failed requests detected:`, failedRequests);
      hasTotalErrorsOrOverflow = true;
    } else {
      console.log(`[PASS] Zero failed first-party requests.`);
    }

    // Save screenshot
    const savePath = path.join(screenshotDir, t.filename);
    await page.screenshot({ path: savePath, fullPage: false });
    console.log(`Screenshot saved to: docs/audits/screenshots/batch-2-1/${t.filename}`);

    await page.close();
  }

  await browser.close();
  console.log('\nShutting down Astro preview server...');
  previewProcess.kill('SIGINT');

  console.log('\nQA Run completed.');
  if (hasTotalErrorsOrOverflow) {
    console.error('\nResult: FAIL. Layout overflows, console errors, or failed requests detected.');
    process.exit(1);
  } else {
    console.log('\nResult: SUCCESS. Zero horizontal overflow, zero console errors, zero failed requests.');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('Fatal error during QA run:', err);
  process.exit(1);
});

