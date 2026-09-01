# CONTENT BATCH 14 — MODEL EXPANSION: TOPICAL BREADTH ROUND

## Verdict

**PASS_WITH_BUILD_WARNING**

This release expands model-level commercial coverage without increasing the category discovery-card cap or releasing low-differentiation long-tail pages.

## Scope

20 new Model / Series pages moved from `HOLD_NOINDEX` to `INDEX`:

- Camera: **9**
- Game Console: **3**
- PC / CPU: **2**
- GPU: **6**

### Released Camera pages

- Sony A6600
- Sony A7 IV
- Canon EOS R
- Canon EOS R10
- Fujifilm X-T30
- Fujifilm X-T4
- Fujifilm X-S10
- Olympus OM-D E-M10 Mark III
- Panasonic Lumix GH5

### Released Console pages

- Nintendo Switch Lite
- Xbox Series X
- Xbox Series S

### Released CPU pages

- AMD Ryzen 5 5500
- AMD Ryzen 7 5700X

### Released GPU pages

- GeForce RTX 3070
- GeForce RTX 3080
- GeForce RTX 4070 Ti SUPER
- GeForce RTX 4080 SUPER
- Radeon RX 6600
- Radeon RX 7900 XTX

## Why the batch stops at 20

After this release both `camera` and `gpu` have exactly **16 live architecture models**, which fits the existing category discovery cap. Releasing additional pages in those clusters in the same batch would either create unlinked pages or require expanding category-page UI density. The remaining pages therefore stay HOLD for another quality round.

## Content rules applied

Every new page includes:

- variant / generation differentiation;
- model-specific inspection points;
- price-factor explanation without a fixed current buy-price claim;
- LINE seller checklist;
- risk / do-not-do guidance;
- four FAQs;
- only related model links that are already live;
- a manufacturer / official technical source.

No page claims a current guaranteed buy price and no page creates a product × district combination.

## Manufacturer-source examples used for editorial verification

- Sony A6600 specifications: `https://www.sony.com/electronics/support/e-mount-body-ilce-6000-series/ilce-6600m/specifications`
- Sony A7 IV specifications: `https://www.sony.com/electronics/support/e-mount-body-ilce-7-series/ilce-7m4/specifications`
- Canon EOS R archive: `https://global.canon/en/c-museum/product/dslr877.html`
- Canon EOS R10 archive: `https://global.canon/en/c-museum/product/dslr902.html`
- Fujifilm X-T4: `https://www.fujifilm-x.com/th-th/products/cameras/x-t4/`
- Fujifilm X-S10: `https://www.fujifilm-x.com/global/products/cameras/x-s10/`
- OM-D E-M10 Mark III support: `https://learnandsupport.getolympus.com/support/e-m10-mark-iii`
- Panasonic GH5 specifications: `https://help.na.panasonic.com/answers/features-and-specifications-lumix-g-series-dc-gh5/`
- Nintendo Switch specifications: `https://www.nintendo.com/us/gaming-systems/switch/tech-specs/`
- Xbox Series X: `https://www.xbox.com/en-US/consoles/xbox-series-x`
- Xbox Series S: `https://www.xbox.com/en-US/consoles/xbox-series-s`
- AMD Ryzen 5000 data sheet: `https://www.amd.com/content/dam/amd/en/documents/products/processors/ryzen/5000/amd-ryzen-5000-datasheet.pdf`
- NVIDIA RTX 3070 family: `https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3070-3070ti/`
- NVIDIA RTX 3080 family: `https://www.nvidia.com/th-th/geforce/graphics-cards/30-series/rtx-3080-3080ti/`
- NVIDIA RTX 4070 family: `https://www.nvidia.com/th-th/geforce/graphics-cards/40-series/rtx-4070-family/`
- NVIDIA RTX 4080 family: `https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4080-family/`
- AMD RX 6600: `https://www.amd.com/en/products/graphics/desktops/radeon/6000-series/amd-radeon-rx-6600.html`
- AMD RX 7900 XTX: `https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7900xtx.html`

These sources are used to support product characteristics only. They do not determine WINNER IT buy prices.

## Architecture state after Batch 14

- Architecture records: **311**
- Architecture INDEX: **255**
- Architecture HOLD_NOINDEX: **56**
- Model records: **180**
- Model INDEX: **132**
- Model HOLD_NOINDEX: **48**
- Forecast built routes minimum: **398+**

## Remaining Model HOLD by cluster

- Notebook ASUS: 3
- Notebook Lenovo: 5
- Notebook Acer: 4
- Notebook HP / Dell / MSI: 8
- iPhone: 10
- iPad: 5
- GPU: 9
- Camera: 4

Console and CPU architecture pages are now fully released.

## Release gates

### Batch 14 content audit — PASS

- release pages: 20/20
- missing content: 0
- invalid required fields: 0
- duplicate title: 0
- duplicate description: 0
- duplicate intro: 0
- invalid manufacturer source: 0
- unsafe claims: 0
- fixed numeric buy-price claims: 0
- unlinked released pages: 0
- HOLD related-link leaks: 0
- category discovery overflow: 0

### Regression — PASS

Compared with Content Batch 13:

- 112 previous Model pages preserved;
- changed previous Model content: 0;
- changed previous URL / H1 / metadata ownership: 0;
- unexpected protected-file changes: 0;
- new Model content: 20.

### Architecture — PASS

- duplicate IDs: 0
- duplicate paths: 0
- duplicate titles: 0
- duplicate H1: 0
- route collisions: 0
- missing parents: 0
- invalid lifecycle: 0
- product × district doorway matrix: 0

### Discovery — PASS

- released architecture models: **132**
- contexts audited: **203**
- unique live internal targets: **325**
- broken discovery links: 0
- HOLD links: 0
- thin discovery contexts: 0

### Historical model QA

Historical Batch 2–5 audits were executed during this round and returned PASS. Batch 13 historical audit / regression were updated so they validate Batch 13 ownership and content rather than incorrectly requiring the whole site to remain at the old total page count. Both now PASS after Batch 14.

### JavaScript syntax — PASS

All JS / MJS files under `src/` and `scripts/` passed `node --check`.

## Build warning

A full Astro production build could not be used as a release gate in this sandbox because `npm ci` did not finish before the runtime/network timeout. This is recorded as **BUILD_WARNING**, not a build pass.

No partially installed `node_modules` or `dist` directory is included in the release ZIP.

Recommended local release command:

```bash
npm ci
npm run content:model:batch14:audit
npm run content:model:batch14:regression
npm run architecture:audit
npm run discovery:audit
npm run architecture:registry
npm run build
```

## Files added / intentionally changed

- `src/data/highIntentModelContentBatch14.js`
- `src/data/highIntentModelContent.js` — merge Batch 14 content only
- `scripts/audits/content-batch14-audit.mjs`
- `scripts/audits/content-batch14-regression.mjs`
- `scripts/audits/content-batch13-audit.mjs` — historical-count fix
- `scripts/audits/content-batch13-regression.mjs` — historical-count fix
- `package.json` — Batch 14 audit scripts
- `docs/content-batch14/*`
- `docs/architecture/page-registry.csv` — regenerated lifecycle registry
- `docs/architecture/architecture-audit.json` — current snapshot

