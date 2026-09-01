# Content Batch 15 — Remaining Architecture Quality Triage

## Verdict

**PASS_WITH_BUILD_WARNING**

Batch 15 is a planning/quality-control batch. It does **not** release, index, redirect or delete any page.
All 56 pages that were `HOLD_NOINDEX` at the end of Batch 14 remain `HOLD_NOINDEX` in this repository.

## Baseline preserved

- Architecture records: **311**
- Architecture `INDEX`: **255**
- Architecture `HOLD_NOINDEX`: **56**
- Model/series `INDEX`: **132**
- Model/series `HOLD_NOINDEX`: **48**
- Existing route/H1/title/description/lifecycle ownership changes: **0**

## Final triage of all 56 HOLD pages

| Decision | Count | Meaning |
| --- | ---: | --- |
| `RELEASE` | **42** | Strong candidate for a later content release after its dedicated content/integration gates pass. Batch 15 itself does not change lifecycle. |
| `KEEP_HOLD` | **10** | Intent is too broad, generation ownership is unclear, or legal/ownership review is still required. |
| `MERGE` | **4** | A stronger live Condition Page already owns the same search intent. Do not create a competing indexable Guide. |
| `RETIRE` | **0** | No remaining skeleton is structurally harmful enough to require immediate removal in this triage. |

### RELEASE composition

- Authority hubs: **2**
- Model/Series pages: **40**

### KEEP_HOLD composition

- Broad/multi-generation Model/Series pages: **8**
- Editorial/legal Guide pages: **2**

### MERGE composition

- Guide pages consolidating into live Condition Pages: **4**

## Two authority hubs now ready for a future content release

1. `/สินค้าที่รับซื้อ/`
   - The site now has enough live product categories to justify a true product discovery hub.
   - Future release must provide useful category navigation and avoid becoming a thin directory.

2. `/ยี่ห้อและรุ่นที่รับซื้อ/`
   - The site now has 132 live Model/Series pages, so a central model/brand directory has real structural value.
   - Future release should surface only live/indexable model clusters and must not leak HOLD pages.

## Model triage

### RELEASE — 40

These are sufficiently distinct product intents to justify dedicated content in later release batches:

- ASUS: ROG Strix SCAR 16, SCAR 18, TUF Gaming F15
- Lenovo: Legion 5i, Legion Pro 7, LOQ 16
- Acer: Predator Helios 16, Swift Go 14
- HP/MSI: Victus 15, MSI Cyborg 15, MSI Thin 15, MSI Raider GE68
- iPhone: 11, 11 Pro, 11 Pro Max, 12 mini, 12 Pro, 13 mini, 14 Plus, 15 Plus, 16, 16 Plus
- iPad: Air M2 13-inch, Pro M1 12.9-inch, Pro M2 12.9-inch, Pro M4 13-inch, mini A17 Pro
- GPU: RTX 3070 Ti, 3080 Ti, 3090, 4080, 4090, RX 6700 XT, RX 7600, RX 7700 XT, RX 7900 XT
- Camera: Fujifilm X-T20, Fujifilm X-H1, Olympus E-M5 Mark III, Panasonic G85

`RELEASE` means **content-ready candidate**, not “index now”. Each page still requires its normal content/source/internal-link QA in a later batch.

### KEEP_HOLD — 8 models

These names cover too many generations/configurations to release safely with generic family copy:

- Lenovo Legion 7
- Lenovo IdeaPad Slim 5
- Acer Aspire 3
- Acer Aspire 5
- HP EliteBook 840
- HP ProBook 440
- Dell XPS 13
- MSI Modern 14

Before release, these pages need an explicit generation/model-code ownership strategy (for example G-number, machine type, SKU or production generation). This prevents one broad page from making claims that are only true for some generations.

## Guide triage

### MERGE — 4

| HOLD Guide | Consolidate into |
| --- | --- |
| Notebook hinge-broken valuation | `/รับซื้อโน้ตบุ๊กบานพับแตก-ขอนแก่น/` |
| iPhone broken back glass | `/รับซื้อiphone-ฝาหลังแตก-ขอนแก่น/` |
| How to check a bent iPad | `/รับซื้อipad-เครื่องงอ-ขอนแก่น/` |
| Noisy GPU fan valuation | `/รับซื้อการ์ดจอพัดลมดัง-ขอนแก่น/` |

The live Condition Pages already own these exact commercial/problem intents. Opening separate Guides would create avoidable cannibalization.

### KEEP_HOLD — 2

- `iPhone ติดผ่อนตรวจยังไง`
  - Device settings alone cannot reliably prove financing/ownership status.
  - Requires provider/finance-specific evidence and Thai editorial/legal review.

- `ขายสินค้าไอทีมือสองต้องมีใบเสร็จไหม`
  - Receipt/ownership requirements depend on transaction and legal/business context.
  - Keep noindex until Thai legal/editorial review is complete.

## Projected state if all RELEASE candidates pass future content gates

This is a projection only; Batch 15 does not apply it.

- Architecture `INDEX`: **255 → 297**
- Architecture `HOLD_NOINDEX`: **56 → 14**
- Remaining 14 = 8 broad model families + 4 merge guides + 2 legal/editorial guides

The correct goal is therefore **not** “force all 311 architecture records to INDEX”. A healthier end-state can intentionally keep/merge pages that do not have a sufficiently independent intent.

## Machine-readable governance added

- `src/data/architecture/quality-triage.js`
  - Central decision registry for all 56 remaining HOLD pages.
  - Does not mutate lifecycle.
- `npm run content:architecture:batch15:triage`
  - Ensures every HOLD page has exactly one valid decision.
  - Ensures MERGE targets are live/indexable.
  - Ensures Final Guide Quality Gate decisions have not drifted.
- `npm run content:architecture:batch15:regression`
  - Verifies Batch 15 did not alter route/H1/title/description/lifecycle ownership from Batch 14.

## Release gates

- Batch 15 triage audit: **PASS**
- Batch 15 regression: **PASS**
- Architecture audit: **PASS**
- Discovery audit: **PASS**
- Historical Batch 14 content audit: **PASS**
- Historical Batch 14 regression: **PASS**
- Broken discovery links: **0**
- HOLD leaks: **0**
- Route collision: **0**
- Product × District doorway matrix: **0**

## Build status

**BUILD WARNING**

A full Astro build could not be used as a release gate because `npm ci` did not finish inside the sandbox runtime/network window. The interrupted dependency directory was removed before packaging. No `node_modules` or `dist` directory is shipped in the release ZIP.

## Recommended next step

Do **not** release all 42 candidates in one batch.

Recommended sequence:

1. **Batch 16A — Authority Hub Release**: build and release the 2 master hubs first.
2. **Batch 16B — Model Release Wave 1**: release ~15–20 of the 40 approved models, prioritizing cluster gaps and high-value exact model families.
3. **Batch 16C — Model Release Wave 2**: release the remaining approved models after observing integration/quality.
4. Keep the 10 `KEEP_HOLD` pages noindex until their specific gate is resolved; consolidate the 4 `MERGE` guides instead of indexing them.
