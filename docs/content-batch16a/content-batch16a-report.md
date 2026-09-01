# CONTENT BATCH 16A — AUTHORITY HUB RELEASE

## Verdict

**PASS_WITH_BUILD_WARNING**

Baseline: **Content Batch 15 — Remaining Architecture Quality Triage**

This batch releases exactly two authority hubs that Batch 15 approved for future release. No model, guide, condition, B2B or district lifecycle is promoted in this batch.

## Released pages

1. `/สินค้าที่รับซื้อ/`
   - Role: Master Product Directory
   - Lifecycle: `HOLD_NOINDEX → INDEX`
   - Represents all **15 live Money Categories** exactly once.
   - Shows the number of released Model/Series pages under each applicable category.
   - Routes users onward to Brand/Model, Condition, Price and B2B hubs instead of competing with the category Money Pages.

2. `/ยี่ห้อและรุ่นที่รับซื้อ/`
   - Role: Brand / Model Directory
   - Lifecycle: `HOLD_NOINDEX → INDEX`
   - Links only Model Architecture records whose lifecycle is `INDEX`.
   - Current live directory: **132 Model/Series pages across 14 clusters**.
   - Includes **6 existing Brand Pages** for notebook discovery.
   - `HOLD_NOINDEX` Model pages are not linked from the directory.

## Architecture state

| Metric | Batch 15 | Batch 16A |
| --- | ---: | ---: |
| Architecture records | 311 | 311 |
| INDEX | 255 | **257** |
| HOLD_NOINDEX | 56 | **54** |
| Live Model/Series | 132 | 132 |
| HOLD Model/Series | 48 | 48 |
| Remaining Batch-15 RELEASE candidates still HOLD | 42 | **40** |

The remaining 54 HOLD records are:

- 48 Model/Series records
  - 40 Batch-15 `RELEASE` candidates awaiting dedicated content batches
  - 8 `KEEP_HOLD`
- 6 Guide records
  - 4 `MERGE`
  - 2 `KEEP_HOLD`

## Internal-link changes

The new product hub is now a real structural parent rather than an isolated future route.

Intentional entry-point upgrades:

- Desktop Header: `สินค้าที่รับซื้อ` → `/สินค้าที่รับซื้อ/`
- Mobile menu: `สินค้าที่รับซื้อ` → `/สินค้าที่รับซื้อ/`
- Footer: direct links to both authority hubs
- Money/Brand/Model breadcrumbs: product parent now points to `/สินค้าที่รับซื้อ/`
- Discovery shortcut: `สินค้า` → `/สินค้าที่รับซื้อ/`
- Existing `ดูสินค้าทั้งหมด` discovery links now point to the product hub instead of the homepage anchor
- Category Model discovery exposes a `ดูยี่ห้อและรุ่นทั้งหมด` path to `/ยี่ห้อและรุ่นที่รับซื้อ/`
- Brand/Model discovery also exposes the Brand/Model directory
- Homepage primary “ขายเครื่องเดียว” conversion path now enters the master product hub
- About page product-directory reference now enters the master product hub

The homepage H1 was not changed by this batch.

## Hub UX / content contract

### Master Product Hub

- Product-first navigation rather than keyword stuffing
- Four practical product groups
- All 15 Money Categories represented once
- Live-model count shown only where Architecture Model pages are actually released
- Explicit routes to Brand/Model, Condition, Price and B2B hubs
- LINE remains the primary conversion CTA
- TrustProofSystem reused from the site-wide conversion system

### Brand / Model Hub

- Live directory generated from `MODEL_ARCHITECTURE.filter(lifecycle === 'INDEX')`
- Notebook Brand Pages exposed as a separate entry layer
- Model links grouped into 14 live topical clusters
- `<details>` groups keep the directory usable while keeping crawlable links in the document
- Fallback instructs users to return to the Product Hub when an exact model is not listed
- No implication that a missing model is not accepted

## Structured data

Both released authority hubs receive:

- `BreadcrumbList`
- `CollectionPage`

They do **not** impersonate a LocalBusiness branch or create a duplicate Service entity for every directory entry.

## Release gates

### Batch 16A Authority Hub Audit

**PASS**

- Authority hubs released: 2/2
- Product categories represented: 15/15
- Live Model directory entries: 132/132
- Live Model clusters represented: 14/14
- HOLD model leak risk: 0
- Placeholder metadata: 0
- Old `/#categories` structural shortcuts in Header/Discovery/route: 0
- Remaining Batch-15 release candidates still HOLD: 40

### Regression

**PASS**

- Batch-15 protected files checked: 22
- Unexpected protected changes: 0
- Architecture records: 311 → 311
- Intended lifecycle promotions: exactly 2 authority hubs

### Architecture Audit

**PASS**

- Duplicate IDs: 0
- Duplicate paths: 0
- Duplicate titles: 0
- Duplicate H1: 0
- Route collisions: 0
- Missing parents: 0
- Invalid lifecycle: 0
- Product × District doorway matrix: 0

### Discovery Audit

**PASS**

- Released Product Hub detected: true
- Released Brand/Model Hub detected: true
- Broken discovery links: 0
- HOLD architecture links: 0
- Thin discovery contexts: 0

### Historical Batch 15

**PASS after compatibility update**

Batch 15 is now audited as a decision checkpoint rather than requiring all `RELEASE` candidates to remain HOLD forever. `KEEP_HOLD` and `MERGE` decisions are still required to remain noindex unless a later quality decision explicitly supersedes them.

## Build status

**BUILD WARNING — full Astro build not completed in this sandbox.**

A fresh `npm ci --prefer-offline` attempt did not complete before the sandbox timeout. Therefore this report does not claim that `astro build` passed.

Offline/non-network release gates completed successfully:

- JS syntax checks
- Astro frontmatter JavaScript parse checks for modified Astro files
- Architecture audit
- Discovery audit
- Batch 16A content/integration audit
- Batch 16A regression audit
- Historical Batch 15 triage/regression audit
- Architecture registry regeneration

`node_modules`, `dist` and `.astro` are removed before packaging.

## Next recommended batch

**Batch 16B — Model Release Round 1**

Use the 40 Model records already classified `RELEASE` in Batch 15, but release them in smaller content groups. The two authority hubs are now ready to absorb and redistribute internal-link equity as those models are promoted.
