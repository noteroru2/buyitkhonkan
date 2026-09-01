# UX/UI Batch 5 — Internal Link & Discovery UX

## Verdict

**PASS WITH BUILD WARNING**

Batch 5 upgrades live discovery and internal-link UX without releasing any HOLD_NOINDEX architecture pages.

## What changed

- Added `DiscoveryHub.astro`, a reusable visual discovery component for live pages.
- Added `discoveryLinks.js`, a relationship layer that builds links from existing Category / Brand / Model / Condition / Local data only.
- Category money pages now expose deliberate discovery groups: model/brand children, conditions, service areas, guides, and neighbouring product categories.
- Brand / Model / Condition money pages now expose parent categories, related models/brands, relevant conditions, service areas, and guides.
- Local pages now expose product categories, nearby live areas, and preparation guides.
- Article layout now links guides back into live money pages, condition pages, and service-area pages.
- `/พื้นที่ให้บริการ/` is upgraded into an Area Discovery Hub.
- `/สภาพสินค้าที่ขายได้/` is upgraded into a Condition Discovery Hub.
- Breadcrumb links now have clearer visual hierarchy and `breadcrumb_click` event tracking.
- Discovery cards emit `internal_discovery_click` with a group-specific `data-cta-location`.
- Added `npm run discovery:audit`.

## Discovery audit

- Contexts audited: **79**
- Unique internal targets: **77**
- Broken discovery links: **0**
- Links leaking to HOLD_NOINDEX architecture: **0**
- Thin live discovery contexts: **0**
- Money-page integration: **PASS**
- Article integration: **PASS**
- Breadcrumb tracking: **PASS**

## Architecture regression

- Structure-only pages: **311**
- Forecast routes minimum: **398**
- Route collisions: **0**
- Duplicate paths: **0**
- Duplicate titles: **0**
- Duplicate H1: **0**
- Missing parents: **0**
- Product × district doorway matrix: **0**

## SEO safeguards

- Existing `src/data/**` files from Batch 4 remain byte-for-byte unchanged; Batch 5 adds only `src/data/discoveryLinks.js`.
- Homepage source remains unchanged.
- `Base.astro` canonical/robots logic remains unchanged.
- No new HOLD_NOINDEX page is linked from live Discovery UI.
- Existing URL/H1/title/canonical intent data is preserved.

## Build warning

A full Astro build could not be completed in this runtime. `npm ci` timed out during dependency installation, leaving `astro` unavailable (`astro: not found`). The partial `node_modules` directory is removed before packaging.

Successful checks in this environment:

- `npm run architecture:audit` — PASS
- `npm run discovery:audit` — PASS
- Node syntax checks for new JavaScript — PASS
- JavaScript syntax checks for modified Astro frontmatter — PASS
- Existing data-file integrity comparison against Batch 4 — PASS

Recommended local release command:

```bash
npm ci
npm run architecture:audit
npm run discovery:audit
npm run build
```
