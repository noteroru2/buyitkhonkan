# UX/UI Conversion Refresh — 2026-09-01

## Verdict
PASS_WITH_BUILD_WARNING

## Scope
UX/UI only. No URL migration, canonical change, H1 rewrite, architecture lifecycle change, or content expansion.

## Conversion hierarchy
1. LINE is the primary conversion action.
2. Phone is the secondary conversion action.
3. Desktop: LINE CTA in header + hero + persistent floating LINE CTA.
4. Mobile: LINE CTA in header + mobile drawer + hero + persistent bottom sticky CTA.
5. Existing footer LINE contact remains available.

## Files changed
- `src/components/Header.astro`
- `src/components/StickyBar.astro`
- `src/components/FloatingLine.astro` (new)
- `src/layouts/Base.astro`
- `src/pages/index.astro`
- `src/styles/global.css`

## SEO / architecture safeguards
- Homepage H1 preserved: `รับซื้อสินค้าไอที ขอนแก่น นัดรับถึงที่ จ่ายสดหน้างาน`
- Existing URL architecture preserved.
- Architecture registry remains 311 HOLD structure pages.
- Forecast minimum routes remains 398.
- Architecture audit: PASS.
- Route collision: 0.
- Duplicate path/title/H1 findings: 0.
- Product × district doorway matrix: 0.

## UX improvements
- Conversion-first sticky header with a high-contrast LINE action.
- Compact LINE action remains visible in mobile header.
- Mobile navigation opens with a large LINE valuation card.
- Hero LINE action is larger and includes clear action guidance.
- Desktop floating LINE contact stays visible while scrolling.
- Mobile sticky bar gives LINE more visual weight than phone.
- Refined spacing, card radius, shadows, section labels, and responsive padding.
- CTA tracking attributes preserved / expanded with location labels.
- Reduced-motion behavior retained.

## QA
- `npm run architecture:audit`: PASS.
- Homepage H1 string verified unchanged.
- LINE CTA placement checks: header, mobile header, mobile menu, hero, mobile sticky, desktop floating.

## Build warning
A complete Astro build could not be executed in the sandbox because dependency installation did not complete reliably in the environment. No dependency or package version changes were made. Run locally:

```bash
npm ci
npm run architecture:audit
npm run build
```

before production deployment.
