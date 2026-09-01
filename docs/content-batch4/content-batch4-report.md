# Content Batch 4 — Camera + Game Console + PC Components

## Verdict

**PASS_WITH_BUILD_WARNING**

Batch 4 expands high-intent commercial coverage into three new clusters without changing the existing URL/H1/canonical ownership model.

## Release Summary

- Baseline released Model/Series pages: **41**
- Batch 4 newly released: **22**
- Total released Model/Series pages after Batch 4: **63**
- Model/Series pages remaining `HOLD_NOINDEX`: **117**
- Architecture records total: **311**
- Forecast route floor remains: **398+**

### Camera — 7 pages

1. Sony A6000
2. Sony A6400
3. Sony A7 III
4. Canon EOS R6
5. Canon EOS R7
6. Fujifilm X-T5
7. Nikon Z5

Content differentiates sensor format, shutter/IBIS, EVF/display, card slots, mount condition, battery, lens bundle and camera-specific failure modes.

### Game Console / Handheld — 7 pages

1. PlayStation 5
2. PlayStation 5 Slim
3. PlayStation 4 Pro
4. Nintendo Switch
5. Nintendo Switch OLED
6. Steam Deck
7. ASUS ROG Ally

Content differentiates model codes/revisions, Disc vs Digital, display type, controllers, dock/drive/storage, charging ports, handheld controls and account/data handoff checks.

### CPU / PC Components — 8 pages

1. Intel Core i5-12400F
2. Intel Core i5-13400F
3. Intel Core i5-14400F
4. Intel Core i7-12700
5. Intel Core i7-13700
6. AMD Ryzen 5 5600
7. AMD Ryzen 5 7500F
8. AMD Ryzen 7 7800X3D

Content differentiates LGA1700 vs AM4/AM5 inspection, F vs non-F graphics behavior, CPU contact/pin condition, board/socket risk, stress-test evidence, platform RAM and bundle valuation.

## Content Policy

Every released page includes:

- unique SEO title and meta description;
- model-specific introduction;
- at least four variant/specification notes;
- at least four inspection checks;
- at least four price factors;
- at least four seller checklist items;
- at least three risks;
- four model-specific FAQs;
- released-only related internal links;
- a manufacturer/source reference;
- no fixed numeric buy-price claim.

The pages intentionally do **not** claim a live buy price because there is no verified pricing feed in this repository. Users are directed to send the real model, condition and accessories through LINE for current valuation.

## Source Quality

Batch 4 specifications were checked against manufacturer-owned sources, including Sony, Canon, Fujifilm, Nikon, PlayStation, Nintendo, Valve/Steam Deck, ASUS ROG, Intel and AMD.

Manufacturer references are stored directly in each page's content record. They support product identification/specification only and are not used as WINNER IT price sources.

## Internal Link / Discovery

- Newly released pages are automatically eligible for live discovery because lifecycle is `INDEX`.
- Category discovery is sufficient for all 22 Batch 4 pages.
- ROG Ally additionally receives ASUS brand discovery.
- Related model links are restricted to released pages only.
- `HOLD_NOINDEX` pages remain forbidden discovery targets.

Discovery audit after release:

- released architecture models: **63**
- unique live internal targets: **140**
- broken discovery links: **0**
- HOLD leaks: **0**
- thin discovery contexts: **0**

## Architecture Regression

Architecture audit remains **PASS**:

- duplicate IDs: 0
- duplicate paths: 0
- duplicate titles: 0
- duplicate H1: 0
- route collisions: 0
- missing parents: 0
- invalid lifecycle: 0
- missing content contracts: 0
- Product × District doorway matrix: 0

The following ownership-critical files remain byte-identical to Content Batch 3:

- `src/data/categories.js`
- `src/data/brandPages.js`
- `src/data/modelPages.js`
- `src/data/conditionPages.js`
- `src/data/localPages.js`
- `src/data/site.js`
- `src/data/architecture/models.js`
- `src/pages/[slug].astro`
- `src/layouts/Base.astro`
- `astro.config.mjs`
- `src/data/discoveryLinks.js`

Intentional source changes:

- `src/data/highIntentModelContent.js` — imports Batch 4 content.
- `src/data/highIntentModelContentBatch4.js` — new 22-page content module.
- `src/components/ReleasedModelPage.astro` — exposes `data-release-batch` while preserving existing template behavior.
- `scripts/audits/content-batch4-audit.mjs` — new release gate.
- `package.json` — adds `content:model:batch4:audit`.

## Release Gates

### Content Batch 4 audit: PASS

- Batch 4 pages: 22/22
- Released total: 63/63
- Missing content: 0
- Invalid required fields: 0
- Invalid lifecycle: 0
- Bad related links: 0
- Parent mismatch: 0
- Unlinked released pages: 0
- Missing manufacturer source: 0
- Duplicate titles: 0
- Duplicate descriptions: 0
- Duplicate long editorial strings: 0
- Unsafe claims: 0
- Fixed numeric buy-price claims: 0

### Existing model content audit: PASS

The previous Batch 3 model release audit also continues to pass with the expanded 63-page release set.

### Architecture audit: PASS

### Discovery audit: PASS

### Regression audit: PASS

## Build Warning

A full Astro build could not be completed in the sandbox because `npm ci` did not complete before the environment timeout. This is an environment/dependency-fetch warning rather than a detected source-code failure.

`node_modules` created by the incomplete install was removed before packaging.

Recommended local/CI release command:

```bash
npm ci
npm run content:model:batch4:audit
npm run architecture:audit
npm run discovery:audit
npm run build
```

Do not deploy if any of the four release commands after `npm ci` fail.
