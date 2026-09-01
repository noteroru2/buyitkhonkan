# CONTENT BATCH 3 — HIGH-INTENT EXPANSION

**Verdict: PASS_WITH_BUILD_WARNING**

## Scope

- Baseline: Content Batch 2
- Newly released model/series pages: **21**
- Released model/series pages after batch: **41**
- Model pages still `HOLD_NOINDEX`: **139**
- Architecture pages total: **311**
- Architecture pages `INDEX`: **41**
- Architecture pages `HOLD_NOINDEX`: **270**
- Forecast built routes minimum: **398**

### Batch 3 release mix

- Gaming / performance notebook: 5
- MacBook: 4
- iPhone: 4
- iPad: 4
- GPU: 4

## Editorial policy

Each released page has model-specific copy covering variant identification, inspection points, price factors, seller checklist, risks, FAQ, related live pages, and an official manufacturer source. No fixed numeric buy-price claims were added. Pages use current-day LINE appraisal for pricing instead of stale hard-coded offers.

## Discovery changes

Category discovery was expanded from 5 to 8 released architecture models and the child-card cap from 8 to 10. This keeps Apple categories with no brand hub from creating orphan released pages while preserving the `HOLD_NOINDEX` exclusion.

## QA

- Content Batch 3 Audit: **PASS**
- Architecture Audit: **PASS**
- Discovery Audit: **PASS**
- Released pages without inbound discovery link: **0**
- Duplicate SEO titles: **0**
- Duplicate meta descriptions: **0**
- Duplicate long editorial strings: **0**
- Unsafe claims: **0**
- Fixed numeric price claims: **0**
- Batch 3 pages missing manufacturer source: **0**
- Discovery unique live targets: **118**
- Broken discovery links: **0**
- HOLD leaks: **0**
- Route collisions: **0**
- Product×district doorway matrix: **0**

## SEO regression

The core URL/H1/canonical ownership files listed in `content-batch3-regression.json` are byte-identical to Batch 2. The batch changes content overlays, release discovery capacity, the reusable released-model batch marker, audit tooling, and reports only.

## Build warning

A full Astro build could not be completed in the sandbox because `npm ci` timed out before dependencies finished installing. Partial `node_modules` was removed before packaging. Run locally:

```bash
npm ci
npm run content:model:audit
npm run architecture:audit
npm run discovery:audit
npm run build
```

## Released slugs

- `asus-rog-zephyrus-g16`
- `asus-rog-strix-g16`
- `lenovo-legion-pro-5`
- `acer-predator-helios-neo-16`
- `hp-victus-16`
- `macbook-air-m4`
- `macbook-pro-14-m2-pro`
- `macbook-pro-16-m2-pro`
- `macbook-pro-14-m4`
- `iphone-13-pro`
- `iphone-13-pro-max`
- `iphone-14-pro-max`
- `iphone-15-pro`
- `ipad-a16`
- `ipad-air-m2-11`
- `ipad-pro-m2-11`
- `ipad-pro-m4-11`
- `rtx-4060`
- `rtx-4070-super`
- `rtx-5070`
- `rx-7800-xt`
