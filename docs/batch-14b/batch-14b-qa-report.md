# Batch 14B QA report

## Automated results

- Astro production build: PASS — 87 pages
- Sitemap: PASS — 86 URLs
- Metadata errors: 0
- Duplicate titles: 0
- Duplicate descriptions: 0
- Canonical errors: 0
- H1 errors: 0
- Schema errors: 0
- Broken internal links: 0
- Broken image references: 0
- Missing content alt: 0
- Missing width/height: 0
- Lazy + high-priority conflicts: 0
- Image preloads: 0
- Duplicate web-ready images: 0
- ResponsiveImage contract: PASS — 11 checks
- AI manifest/library verification: PASS — 7 outputs
- Unsupported or misclassified AI evidence introduced: 0

The image audit reports eight unused assets: seven deliberately retained AI-library files plus the pre-existing unused default OG SVG. This is expected because Batch 14B found no safe production slot that both permits AI and materially benefits from these photorealistic assets.

## Browser QA

Tested Homepage, About, Contact and the main notebook category at:

- 360 × 800
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1440 × 900
- 1920 × 1080

Total page/viewport checks: 28. Horizontal overflow, H1, alt, loading/priority and layout failures: 0.

Homepage Trust and Process sections were visually inspected on mobile and desktop. The two pre-existing trust PNGs are lazy loaded; after entering the viewport both returned HTTP 200 and `naturalWidth=1024`. The initial unloaded state is expected lazy-load behavior, not a broken image.

Mobile navigation: open/close state, `aria-expanded`, focus return and 360px width passed. Sticky contact CTA remained usable. Reduced-motion CSS rules are present. Console errors: 0. Failed local asset requests: 0.

## Visual decision

No production page renders the new AI library, so crop, disclosure and CLS risks from new assets are zero. Existing page layout remains unchanged. Screenshots are stored in `docs/batch-14b/qa-screenshots/`.
