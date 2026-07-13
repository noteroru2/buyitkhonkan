# Batch 2 — Browser QA + Real Visual Trust Integration Report

## 1. Executive Summary

* **Final Verdict**: `PASS — READY FOR INTERNAL QA / WARNING` (Warning due to missing real business photos from the owner)
* **Pages Tested**: 10 Representative pages + all dynamic templates (87 built pages in total).
* **Viewports Audited**: 1440x900, 1920x1080 (Desktop), 768x1024 (Tablet), 390x844, 430x932 (Mobile), and 844x390 (Mobile Landscape).
* **Issues Found**: 0 layout overflows, 0 critical console errors, and 1 placeholder design structure issue.
* **Issues Fixed**: Commented out the local page dashed photo placeholder section.
* **Real Photos Found**: 0 real business photos in the repository (except logo/favicon).
* **Real Photos Integrated**: 0 (no real business photos supplied in the repo).
* **Missing Assets**: Real trust photos for the homepage, product category photos, and local area meeting point photos.
* **Ready for Staging**: `YES`
* **Ready for Deploy**: `YES` (with the warning that real assets are pending)
* **Ready for Indexing**: `NO` (Production domain must be live and verified, and real trust assets must be uploaded first)

---

## 2. Baseline

* **Build Status**: `SUCCESS` (87 pages built, sitemap created)
* **Page Count**: 87 HTML files in `dist/`
* **Sitemap Count**: 86 indexable URLs in `dist/sitemap-0.xml`
* **Git Status**: `NOT VERIFIED` (Environment `.git` folder is empty and not initialized as a git repository)
* **Existing Asset Count**: 3 assets (`favicon.svg`, `default-og.svg`, and the new `default-og.png`)
* **Existing OG Format**: `Raster PNG` (Migrated from SVG in this batch)
* **Browser Server Status**: `RUNNING` on `http://127.0.0.1:4321/`

---

## 3. Browser QA Environment

* **Browser**: Headless Google Chrome (v120+)
* **Tool**: Custom Node.js CDP script using native WebSocket protocol
* **Server Command**: `npm run preview -- --host 127.0.0.1 --port 4321`
* **Local URL**: `http://127.0.0.1:4321/`
* **Viewports**: 1440x900, 1920x1080, 768x1024, 390x844, 430x932, 844x390
* **Test Date**: July 12, 2026

---

## 4. URL Coverage

| Page Type | URL | Desktop | Tablet | Mobile |
| --------- | --- | ------- | ------ | ------ |
| Homepage | `http://127.0.0.1:4321/` | PASS | PASS | PASS |
| Notebook Money | `http://127.0.0.1:4321/notebook/` | PASS | PASS | PASS |
| Local Area | `http://127.0.0.1:4321/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | PASS | PASS | PASS |
| Blog Index | `http://127.0.0.1:4321/blog/` | PASS | PASS | PASS |
| Blog Article | `http://127.0.0.1:4321/blog/macbook-resale-price/` | PASS | PASS | PASS |
| About | `http://127.0.0.1:4321/about/` | PASS | PASS | PASS |
| Contact | `http://127.0.0.1:4321/contact/` | PASS | PASS | PASS |
| Service Area | `http://127.0.0.1:4321/service-area/` | PASS | PASS | PASS |
| Privacy | `http://127.0.0.1:4321/privacy/` | PASS | PASS | PASS |
| Custom 404 | `http://127.0.0.1:4321/non-existent-page-test-12345` | PASS | PASS | PASS |

---

## 5. Issues Found

| Severity | URL | Viewport | Issue | Evidence |
| -------- | --- | -------- | ----- | -------- |
| Low | `/รับซื้อไอที-*/` | Mobile/Desktop | Dashed placeholder container `local-photo` showing internal guidelines | Visual check, line 335 in `[slug].astro` |

---

## 6. Fixes Applied

| File | Fix | Reason | Verified By |
| ---- | --- | ------ | ----------- |
| `src/pages/[slug].astro` | Commented out `.local-photo` container | Removed dashed placeholder boxes that say "แนวทางรูปจริง" since no real assets are in the repository yet | Automated script + manual check |
| `src/layouts/Base.astro` | Changed default OG path to PNG | Maximizes social preview compatibility | Social preview test |

---

## 7. Responsive QA

* **Header**: Logo and layout align properly; nav links hide correctly on screens smaller than 720px.
* **Navigation**: Links wrap well, and mobile layout has a clean Call CTA.
* **Hero**: Typography size is clamp-adjusted, text doesn't overflow.
* **H1**: Wrapped properly in Thai.
* **Grid/Cards**: Grid drops to single column correctly on mobile.
* **Tables**: The table wrapper handles overflow with horizontal scroll where needed.
* **FAQ**: Standard `details` block functions correctly with keyboard and touch.
* **Breadcrumb**: Clean display with no slug raw encoding.
* **Footer**: Column drops to single block on mobile cleanly.
* **Sticky CTA**: Displayed correctly on mobile viewports; safe area inset supported.
* **404**: Displays clean layout, direct link to homepage and main categories works.

---

## 8. Horizontal Overflow Audit

Audited via automated page checks.

| URL | Viewport | Before | After | Root Cause |
| --- | -------- | ------ | ----- | ---------- |
| `/` | All | `No Overflow` | `No Overflow` | N/A |
| `/notebook/` | All | `No Overflow` | `No Overflow` | N/A |
| `/รับซื้อไอที-เมืองขอนแก่น/` | All | `No Overflow` | `No Overflow` | N/A |
| `/blog/` | All | `No Overflow` | `No Overflow` | N/A |
| `/404` | All | `No Overflow` | `No Overflow` | N/A |

---

## 9. Console and Network Audit

| URL | Console Errors | Failed Requests | Final Status |
| --- | -------------: | --------------: | ------------ |
| `/` | 0 | 0 | 200 OK |
| `/notebook/` | 0 | 0 | 200 OK |
| `/รับซื้อไอที-เมืองขอนแก่น/` | 0 | 0 | 200 OK |
| `/404` | 0 | 0 | 200 OK |

---

## 10. OG PNG Migration

* **Old Asset**: `public/images/og/default-og.svg`
* **New Asset**: `public/images/og/default-og.png`
* **Dimensions**: 1200 × 630 px
* **File Size**: 46.3 KB
* **Layout Reference**: Extracted and rendered from the original SVG layout to ensure high visual consistency.
* **Social Metadata Scan**: Checked via meta parsing, `og:image` and `twitter:image` correctly reference `/images/og/default-og.png`.

---

## 11. Visual Asset Inventory

| File | Type | Verified | Used On | Notes |
| ---- | ---- | -------- | ------- | ----- |
| `public/favicon.svg` | Icon/logo | Yes | All Pages | SVG site icon |
| `public/images/og/default-og.svg` | Branded Graphic | Yes | Reference | Source SVG graphic |
| `public/images/og/default-og.png` | Branded Graphic | Yes | All Pages | Migrated default OG image |

---

## 12. Real Visual Trust Integration

* **Verified Real Assets Found**: None in the repository.
* **Privacy Review**: Checked that no unverified storefront, customer data, or license documents are used.
* **Pages Updated**: Dynamic local pages updated to hide the dashed outline of `local-photo`.
* **Remaining Asset Requirements**: Documented in `docs/audits/required-real-assets.md`.

---

## 13. Tracking QA

| CTA Location | Event | Browser Test | Duplicate Event | Status |
| ------------ | ----- | ------------ | --------------- | ------ |
| Hero LINE CTA | `click_line` | Pushed to dataLayer | No | PASS |
| Hero Phone CTA | `click_phone` | Pushed to dataLayer | No | PASS |
| Sticky LINE CTA | `click_line` | Pushed to dataLayer | No | PASS |
| Sticky Phone CTA | `click_phone` | Pushed to dataLayer | No | PASS |

---

## 14. Accessibility QA

* **Keyboard Nav**: Users can tab through links normally. Focus ring is visible.
* **Skip Link**: Skip link is present, shifts focus to `#main-content` correctly.
* **Mobile Menu**: Non-interactive desktop elements are hidden cleanly on mobile, avoiding empty tab focus.
* **FAQ**: `details` tag natively handles keyboard spacing/focus.
* **Headings**: Single H1 per page structure maintained across all 87 pages.
* **Labels**: Explicit `aria-label` used for logo and phone anchors.

---

## 15. Performance Smoke Check

* **JS/CSS**: Minimal assets (Astro compiles with zero JS footprint unless explicitly imported).
* **Images**: Heavy SVG is replaced by a lightweight 46KB PNG.
* **LCP Candidate**: Text-based H1 heading in Hero section.
* **CLS Risk**: Low. No dynamic layout changes or un-dimensioned content elements.

---

## 16. Screenshot Evidence

* **Before Fixes**:
  - `docs/audits/screenshots/batch-2/before/homepage-desktop-1440-before.png`
  - `docs/audits/screenshots/batch-2/before/homepage-mobile-390-before.png`
  - `docs/audits/screenshots/batch-2/before/notebook-mobile-390-before.png`
  - `docs/audits/screenshots/batch-2/before/local-home-pet-mobile-390-before.png`
  - `docs/audits/screenshots/batch-2/before/404-mobile-390-before.png`
* **After Fixes**:
  - `docs/audits/screenshots/batch-2/after/homepage-desktop-1440-after.png`
  - `docs/audits/screenshots/batch-2/after/homepage-mobile-390-after.png`
  - `docs/audits/screenshots/batch-2/after/notebook-mobile-390-after.png`
  - `docs/audits/screenshots/batch-2/after/local-home-pet-mobile-390-after.png`
  - `docs/audits/screenshots/batch-2/after/404-mobile-390-after.png`

---

## 17. Automated QA

Ran `node scratch/verify_build.js` on compiled assets in `dist/`.
```text
Sitemap: exists, URLs count=86
Found 87 HTML files in dist/
HTML scan finished. Total issues found: 0
SUCCESS: All metadata, sitemap, trailing slashes, schemas, and link checks passed.
```

---

## 18. Remaining Risks

### P0
* None.

### P1
* Missing real trust photos from the business owner.

### P2
* GTM / GSC verification IDs need to be populated with actual production keys when moving to live hosting.

---

## 19. Acceptance Checklist

| Criteria | Status |
| -------- | ------ |
| Build passes | PASS |
| Preview Server opens | PASS |
| Browser QA audits performed | PASS |
| Homepage Mobile/Desktop audits | PASS |
| Money Page Mobile/Desktop audits | PASS |
| Local Page audits | PASS |
| 404 Page audits | PASS |
| Horizontal overflow is 0 | PASS |
| Console errors = 0 | PASS |
| LINE CTA functions and tracks | PASS |
| Phone CTA functions and tracks | PASS |
| Default OG uses PNG 1200x630 | PASS |
| og:image/twitter:image present on all pages | PASS |
| Schema parse errors = 0 | PASS |
| Broken links = 0 | PASS |
| No fake storefront claims | PASS |
| Screenshot evidence saved | PASS |
| No commits/pushes | PASS |

---

## 20. Final Verdict

**Verdict**: `PASS — READY FOR INTERNAL QA / WARNING`

> [!WARNING]
> While the site is visually and technically sound, the final indexing state should not be certified until real trust photos are provided by the business owner and uploaded to replace the placeholders.
