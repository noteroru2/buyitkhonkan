# CONTENT BATCH 12 — FINAL GUIDE QUALITY GATE

## Verdict

**PASS_WITH_BUILD_WARNING**

Batch 12 intentionally does **not** release all remaining guide skeletons. The final 20 guide candidates were reviewed for search intent ownership, content uniqueness, technical/source support, internal-link utility, commercial cannibalization, and editorial/legal risk.

## Final decision

| Decision | Count | Result |
|---|---:|---|
| RELEASE | 14 | Promoted to `INDEX` with full guide content |
| MERGE_OR_CONSOLIDATE | 4 | Kept `HOLD_NOINDEX`; existing Condition page owns the stronger commercial intent |
| KEEP_HOLD | 2 | Kept `HOLD_NOINDEX`; requires ownership/legal/editorial review |
| Total final-gate candidates | 20 | Complete |

## Released guides (14)

1. `วิธีเช็กประกันโน้ตบุ๊ก`
2. `โน้ตบุ๊กมีรอยบุบขายได้ไหม`
3. `โน้ตบุ๊กจอมีเส้นราคาตกแค่ไหน`
4. `วิธีเช็ก-battery-health-macbook`
5. `macbook-คีย์บอร์ดอังกฤษขายได้ไหม`
6. `macbook-จอเป็นรอยประเมินยังไง`
7. `iphone-ไม่มีกล่องราคาตกไหม`
8. `apple-pencil-เพิ่มราคาขาย-ipadไหม`
9. `ขายคอมประกอบต้องส่งข้อมูลอะไร`
10. `ขายคอมทั้งชุดพร้อมจอคุ้มไหม`
11. `ชุดน้ำมีผลต่อราคาคอมมือสองไหม`
12. `วิธีดูรุ่นการ์ดจอใน-windows`
13. `การ์ดจอขุดเหมืองขายได้ไหม`
14. `วิธีเทสการ์ดจอก่อนขาย`

Each released page includes a unique SEO title, H1, meta description, editorial introduction, short answer, four-step workflow, valuation factors, seller checklist, caution, four FAQs, technical source, Money/Model/Condition/Guide/Area discovery, LINE conversion path, Article schema, FAQ schema and Breadcrumb schema.

## Merge / consolidate candidates (4)

These skeleton routes remain `HOLD_NOINDEX` and are **not** linked from live Discovery UX.

| Guide skeleton | Stronger existing owner |
|---|---|
| `โน้ตบุ๊กบานพับแตกประเมินยังไง` | `/รับซื้อโน้ตบุ๊กบานพับแตก-ขอนแก่น/` |
| `iphone-ฝาหลังแตกขายได้ไหม` | `/รับซื้อiphone-ฝาหลังแตก-ขอนแก่น/` |
| `วิธีเช็ก-ipad-งอ` | `/รับซื้อipad-เครื่องงอ-ขอนแก่น/` |
| `การ์ดจอพัดลมดังประเมินยังไง` | `/รับซื้อการ์ดจอพัดลมดัง-ขอนแก่น/` |

No redirect is created in this batch because these guide skeletons were never released for indexing. The decision is recorded so they can later be retired or consolidated deliberately instead of accidentally becoming competing pages.

## Keep HOLD (2)

### `iphone-ติดผ่อนตรวจยังไง`

Kept `HOLD_NOINDEX`. A device setting alone cannot reliably establish finance/ownership status. Provider/finance-specific evidence and an editorial/legal review are required before a public guide can make safe claims.

### `ขายไอทีมือสองต้องมีใบเสร็จไหม`

Kept `HOLD_NOINDEX`. Receipt, proof-of-ownership and transaction documentation requirements vary by context. This page should not be released until Thai legal/editorial wording is reviewed.

## Technical/source verification

The released set uses technical references from official/support sources such as Apple Support, Microsoft Support, ASUS Support, Dell Support, NVIDIA and CORSAIR. Sources are used to support device-identification, battery-health, warranty, keyboard/input, display-care, Apple Pencil compatibility, Windows/GPU identification and AIO handling. They do not set WINNER IT buy prices.

Content rules preserved:

- No invented current buy prices.
- No fixed numeric deduction formulas.
- No claims that mining history automatically proves a GPU is good/bad.
- No claims that warranty covers every physical-damage scenario.
- No public recommendation to post full Serial/IMEI when unnecessary.
- No attempt to infer ownership/finance status from device settings alone.

## Architecture state after Batch 12

- Architecture records: **311**
- Architecture `INDEX`: **211**
- Architecture `HOLD_NOINDEX`: **100**
- Guide records: **60**
- Guide `INDEX`: **54**
- Guide `HOLD_NOINDEX`: **6**
- Forecast built routes minimum: **398**
- Product × District doorway matrix: **0**

The six remaining Guide HOLD pages are the 4 merge/consolidation candidates plus the 2 editorial/legal HOLD pages.

## Internal-link / Discovery state

- Discovery contexts audited: **203**
- Unique live internal targets: **281**
- Broken discovery links: **0**
- Links to `HOLD_NOINDEX`: **0**
- Thin discovery contexts: **0**
- Released Guide integration: **PASS**

## Regression protection

Compared with Content Batch 11:

- Previous 40 released Guide content records changed unexpectedly: **0**
- Previous Guide URL/H1/title ownership changed unexpectedly: **0**
- Protected SEO/route files changed unexpectedly: **0 / 20**
- Homepage, Money/Model/Condition/B2B/District ownership: preserved
- Canonical/robots routing: preserved
- Discovery source: preserved

Historical audits were made scope-safe so Batch 10 and Batch 11 continue to PASS after later Guide releases.

## Release gates

- Content Batch 12 audit: **PASS**
- Content Batch 12 regression: **PASS**
- Architecture audit: **PASS**
- Discovery audit: **PASS**
- Batch 10 historical audit/regression: **PASS**
- Batch 11 historical audit/regression: **PASS**
- Static JavaScript syntax checks: **PASS**

## Build warning

A full Astro build could not be completed in this sandbox because `npm ci` did not finish within the network/runtime window. The incomplete `node_modules` directory was removed and is not included in the release archive.

This is recorded as **BUILD WARNING**, not a build PASS.

Recommended local release command:

```bash
npm ci
npm run content:guide:batch12:audit
npm run content:guide:batch12:regression
npm run architecture:audit
npm run discovery:audit
npm run build
```

## Files

- `src/data/finalGuideQualityGate.js` — Batch 12 content + final decisions
- `src/data/highIntentGuideContent.js` — merges the final approved content into the live Guide content registry
- `scripts/audits/content-batch12-audit.mjs`
- `scripts/audits/content-batch12-regression.mjs`
- `docs/content-batch12/released-guide-pages.csv`
- `docs/content-batch12/guide-quality-decisions.csv`
- `docs/content-batch12/content-batch12-audit.json`
- `docs/content-batch12/content-batch12-regression.json`
- `docs/architecture/page-registry.csv` — regenerated lifecycle registry
