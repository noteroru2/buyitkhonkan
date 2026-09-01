# Batch 14A QA Report

Verdict: **PASS pipeline/regression; WARNING asset-dependent implementation**.

## Automated QA

- Build: 87 pages.
- Sitemap: 86 URLs.
- Metadata, duplicate title, duplicate description, canonical, H1, schema: 0 errors.
- Breadcrumb pages: 77.
- Image audit: broken image 0, missing content alt 0, missing dimensions 0, high-priority lazy image 0, excess preload 0, duplicate groups 0, oversized new/P0 asset 0.
- Legacy exception: trust PNG 2 files / 1,723,473 bytes remains `BLOCKED_BY_REAL_PHOTO`; no new image implementation.
- Component contract: 11/11 checks and Astro compiler transform pass.
- Approved manifest: valid, 0 assets; dry-run processor: pass, 0 output.
- Internal link audit found one pre-existing misspelled local URL in an article; href corrected to the canonical generated path and rechecked after rebuild.

## Browser QA

Chromium preview checked Home, About and Contact at 360×800, 390×844, 430×932, 768×1024, 1024×768, 1440×900 and 1920×1080: 21 page/viewport combinations. Horizontal overflow 0, broken images 0, missing alt 0, H1 failures 0, console errors 0.

Mobile drawer at 360 px: open/expanded, body scroll lock, Escape close and focus return passed. Sticky CTA remained present. Trust section, breadcrumbs, wrapping and current lazy-loaded trust images showed no regression. Ten screenshots are in `qa-screenshots/`.

## LCP and CLS

No hero/content image was added, so image payload and LCP candidate are unchanged. Existing trust images remain below the fold and lazy. CLS structural guard passes because current images have width/height and `ResponsiveImage` requires width/height. This is a no-regression result, not a field Core Web Vitals measurement; production RUM/Lighthouse must be recorded when approved assets are actually integrated.

Known browser limitation: Firefox/WebKit unavailable. Network failure coverage used build reference audit + `img.complete/naturalWidth`; Chromium console reported no failed-request error.
