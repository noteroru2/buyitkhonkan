# Mobile Regression Fix Audit Report (Batch 2.1)

This report documents the diagnostic findings, root cause analysis, responsive layout fixes, and visual verification results for the mobile clipping issues on the WINNER IT ขอนแก่น website.

---

## 1. True Root Causes & CSS Selectors

### A. Header Phone CTA & Logo Overflow
- **Root Cause**: On mobile screens (360px–430px), the combined width of the full business logo text `"WINNER IT ขอนแก่น"` and the call CTA button text `"โทร 08X-XXX-XXXX"` exceeded the available horizontal space, causing the phone CTA button to overflow the viewport edge and get clipped on the right. On tablet screens (768px), the desktop menu did not hide, resulting in crammed layouts.
- **CSS Selectors Involved**: `.hdr__in`, `.hdr__name`, `.hdr__call`
- **Solution**: 
  - Wrapped phone button texts in `.hdr__call-short` ("โทรเลย") and `.hdr__call-full` ("โทร [number]").
  - Hid the full number on screens `<= 480px` via media query while keeping full accessibility via `aria-label="โทร [number]"`.
  - Scaled down `.hdr__name` font-size slightly and reduced gaps in `.hdr__in` on viewports `<= 400px` to fit 360px devices perfectly.
  - Moved the compact header layout breakpoint from `720px` to `900px` to collapse the desktop navigation menu and avoid tight layouts on tablets.

### B. Hero Paragraph & Text Clipping
- **Root Cause**: Long sequences of Thai characters without spaces (e.g. model keywords, service details) had no soft-wrap opportunities, causing text boundaries to exceed the viewport width. On 360px screens, the word "งาน" in the hero title wrapped alone as an orphan word.
- **CSS Selectors Involved**: `.hero__sub`, `.hero__points`, `.cat-hero h1`, `.lede`, `.article__body p`
- **Solution**: Added `overflow-wrap: anywhere` and `word-break: break-word` (for headers) to ensure Thai texts wrap correctly at viewport boundaries. Reduced mobile `h1` size from global minimum clamp to `1.6rem` on screens `<= 480px`. Added a media query for viewports `<= 375px` to reduce hero `h1` to `1.52rem` and apply `text-wrap: balance` to prevent orphan words.

### C. Sticky CTA Bar Overflow
- **Root Cause**: The sticky bar elements used `display: flex` with asymmetric flex sizing (`flex: 1.4` and `flex: 1`). The long Thai text and full-size icons without flex containment caused buttons to stretch and overflow on narrower viewports.
- **CSS Selectors Involved**: `.sticky-bar`, `.sticky-bar__btn`, `.sticky-bar__btn--line`, `.sticky-bar__btn--phone`
- **Solution**: 
  - Converted `.sticky-bar` display from `flex` to `grid` with equal columns: `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)`.
  - Scaled down padding, icon size, and text size on screens `<= 390px` to keep it compact and fully within the viewport.

### D. 404 Category Cards Grid
- **Root Cause**: The grid `.link-grid` used `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`. On a 390px screen with container padding, two columns could not wrap properly or fit, pushing the right column outside the viewport.
- **CSS Selectors Involved**: `.link-grid`
- **Solution**: Explicitly set `.link-grid` to `grid-template-columns: 1fr` on screens `<= 640px` to force a single-column layout. Reduced excessive section padding block to `32px` on mobile.

### E. Price Table Sizing
- **Root Cause**: The price table had a hardcoded `min-width: 620px` applied globally, which forced the table container to expand to 620px on mobile pages, throwing layout bounding rects out of bounds.
- **CSS Selectors Involved**: `.price-table`
- **Solution**: Moved the `min-width: 620px` styling into a media query (`@media (min-width: 768px)`), allowing the table to wrap to 100% width on mobile screens while still enabling horizontal scrolling inside its wrap if cell content demands it.

### F. Ticker Layout Bounding Boxes
- **Root Cause**: The animated ticker track had `width: max-content` (2300+ pixels) and translated dynamically. Although visually clipped by the parent `overflow: hidden`, its layout bounding rect coordinates fell outside the viewport boundaries, triggering the original light-DOM QA overflow script that lacked clipping awareness.
- **CSS Selectors Involved**: `.ticker-wrapper`, `.ticker-track`
- **Solution**: Replaced the custom element and Shadow DOM wrapper with standard DOM elements. Styled `.ticker-wrapper` as a standard layout boundary container with `width: 100%`, `max-width: 100%`, `overflow: hidden`, and `contain: layout paint` to isolate layout boundaries. The automated QA script was updated to dynamically check if overflowing elements are descendants of constrained containers with `overflow: hidden` / `overflow-x: hidden` that fit within the viewport width, allowing transparent verification without hiding elements.

---

## 2. Before/After Measurements (390px Viewport)

| Page / Element | Before (scrollWidth / rect.right) | After (scrollWidth / rect.right) | Status |
| :--- | :--- | :--- | :--- |
| **Homepage Layout** | `scrollWidth: 390` | `scrollWidth: 390` | **PASS** |
| **Homepage Ticker Track** | `rect.right: ~2274px` (Light DOM) | `rect.right: ~2300px` (Clipped by `.ticker-wrapper` layout containment) | **PASS** |
| **Notebook Page Layout** | `scrollWidth: 390` | `scrollWidth: 390` | **PASS** |
| **Notebook Price Table** | `rect.right: 641px` (min-width 620px) | `rect.right: 370px` (fits viewport) | **PASS** |
| **Local Page Layout** | `scrollWidth: 390` | `scrollWidth: 390` | **PASS** |
| **404 Page Layout** | `scrollWidth: 390` | `scrollWidth: 390` | **PASS** |
| **Header Phone CTA** | Clipped right | Compact fits within header | **PASS** |
| **Sticky Phone/LINE CTA** | Clipped right | Compact fits within grid (180px each) | **PASS** |

---

## 3. Browser QA & Verification Results

All tests executed via `puppeteer-core` on Google Chrome:

- **Viewport 360 × 800 (Mobile)**: `scrollWidth: 360`, 0 overflowing elements. **PASS**
- **Viewport 375 × 812 (Mobile)**: `scrollWidth: 375`, 0 overflowing elements. **PASS**
- **Viewport 390 × 844 (Mobile)**: `scrollWidth: 390`, 0 overflowing elements. **PASS**
- **Viewport 430 × 932 (Mobile)**: `scrollWidth: 430`, 0 overflowing elements. **PASS**
- **Viewport 768 × 1024 (Tablet)**: `scrollWidth: 768`, 0 overflowing elements. **PASS**
- **Viewport 1440 × 900 (Desktop)**: `scrollWidth: 1440`, 0 overflowing elements. **PASS**
- **Failed First-Party Requests**: `0`
- **Console Critical Errors**: `0`
- **Sitemap indexable URLs**: `86` (No 404 page listed)
- **Click Tracking**: Click listeners on `click_line` and `click_phone` remain functional.

---

## 4. Screenshot Paths

Saved screenshots after layout fixes:
1. **Homepage Mobile 360px**: [homepage-mobile-360-after.png](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/screenshots/batch-2-1/homepage-mobile-360-after.png)
2. **Homepage Mobile 390px**: [homepage-mobile-390-after.png](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/screenshots/batch-2-1/homepage-mobile-390-after.png)
3. **Notebook Page Mobile 390px**: [notebook-mobile-390-after.png](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/screenshots/batch-2-1/notebook-mobile-390-after.png)
4. **Local Page Mobile 390px**: [local-mobile-390-after.png](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/screenshots/batch-2-1/local-mobile-390-after.png)
5. **404 Page Mobile 390px**: [404-mobile-390-after.png](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/screenshots/batch-2-1/404-mobile-390-after.png)
6. **Homepage Tablet 768px**: [homepage-tablet-768-after.png](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/screenshots/batch-2-1/homepage-tablet-768-after.png)
7. **Homepage Desktop 1440px**: [homepage-desktop-1440-after.png](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/screenshots/batch-2-1/homepage-desktop-1440-after.png)

---

## 5. Files Changed

- `docs/audits/run-qa-screenshots.js`
- `src/components/Header.astro`
- `src/components/StickyBar.astro`
- `src/components/Ticker.astro`
- `src/data/categories.js`
- `src/pages/index.astro`
- `src/pages/[slug].astro`
- `src/pages/404.astro`
- `public/images/trust-inspection.png`
- `public/images/trust-inventory.png`
- `public/images/trust-pickup.png`

---

## 6. Build Result

- **Command**: `npm run build`
- **Result**: `Success` (87 pages generated, sitemap with 86 indexable URLs)

---

## 7. Final Verdict

**READY FOR STAGING / USER REVIEW**
- All layout overflowing elements have been reduced to 0.
- All technical developer terms have been updated to clean, customer-facing content.
- All viewports from 360px up to 1440px pass visual and layout compliance tests.
