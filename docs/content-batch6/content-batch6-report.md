# Content Batch 6 — Condition & Problem Intent

## Verdict

**PASS_WITH_BUILD_WARNING**

## Scope

Batch 6 promotes the complete prepared condition/problem-intent architecture from structure-only to released content. The release adds **24 condition-specific pages** while preserving the existing 5 broad/general condition pages.

### Released clusters

- Notebook conditions: 5
- MacBook conditions: 4
- iPhone conditions: 4
- iPad conditions: 3
- GPU conditions: 3
- Camera conditions: 2
- Monitor conditions: 2
- Game console conditions: 1
- **Total: 24**

## URL and H1 cleanup before release

Because these 24 pages had never been released/indexed, their technical architecture slugs were converted to human-readable public paths before promotion. Examples:

- `/รับซื้อโน้ตบุ๊กบานพับแตก-ขอนแก่น/`
- `/รับซื้อmacbook-จอเป็นเส้น-ขอนแก่น/`
- `/รับซื้อiphone-จอแตก-ขอนแก่น/`
- `/รับซื้อการ์ดจอภาพแตก-artifact-ขอนแก่น/`
- `/รับซื้อจอคอมมี-dead-pixel-ขอนแก่น/`

Latin product names in H1 now include natural spacing, e.g. `รับซื้อ MacBook จอเป็นเส้น ขอนแก่น` rather than `รับซื้อMacBook...`.

## Content contract

Each released condition page includes:

1. Unique SEO title and meta description
2. Product-specific problem-intent introduction
3. Observable symptoms
4. Safe inspection / evidence checklist
5. Condition-specific valuation factors
6. Seller LINE checklist
7. Actions to avoid before inspection
8. Four FAQs
9. Authoritative manufacturer/support reference
10. Parent/category links, released model links, related condition links, guides and local-area discovery
11. Trust/LINE conversion UX inherited from the existing Money Page system
12. Breadcrumb, Service and FAQ structured data

No fixed current buy-price numbers were introduced.

## Intent ownership

The 5 existing condition pages continue to own broad intents such as:

- จอแตก / จอมีเส้น
- เปิดไม่ติด
- แบตบวม / แบตเสื่อม
- ติดบัญชี
- ไม่มีกล่อง

The 24 Batch 6 pages own product-specific condition intents such as iPhone screen damage, MacBook screen lines, notebook hinge damage, GPU artifact, camera fungus and monitor dead pixels. This separation is intentional to reduce cannibalization between broad and specific queries.

## Internal-link / discovery changes

Condition discovery was expanded so that:

- Category Money Pages can surface released condition pages relevant to that product category.
- Released Model Pages surface product-specific condition pages before broad/general condition pages.
- The Condition Hub includes both broad and specific released condition pages.
- Every released condition page links back to its category, relevant released models, sibling/related conditions, guides and local areas.
- HOLD_NOINDEX pages remain forbidden discovery targets.

Discovery audit after release:

- Contexts audited: **127**
- Unique live internal targets: **189**
- Broken discovery links: **0**
- HOLD_NOINDEX leaks: **0**
- Thin discovery contexts: **0**

## Architecture status after Batch 6

- Architecture records: **311**
- INDEX: **112**
- HOLD_NOINDEX: **199**
- Released Model/Series pages: **88**
- Released specific Condition pages: **24**
- Remaining model pages HOLD: **92**
- Condition architecture remaining HOLD: **0**
- Forecast total routes remains **398+**

## Audit results

### Content Batch 6 Audit

**PASS**

- Released conditions: 24/24
- Missing content: 0
- Invalid content fields: 0
- Parent mismatch: 0
- Invalid related conditions: 0
- Missing authoritative source: 0
- Invalid source domain/URL: 0
- Unsafe claims: 0
- Fixed numeric buy-price claims: 0
- Duplicate long editorial copy: 0
- Duplicate title/description intent: 0
- Unlinked released pages: 0
- Route integration problems: 0
- Structured-data integration problems: 0

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

### Regression Audit

**PASS**

Protected files compared with Content Batch 5 were byte-identical, including category, brand, legacy model, legacy condition, local data, model architecture/content, homepage, Base layout and Astro configuration.

## Build warning

A full Astro build could not be completed inside this sandbox. `npm ci --prefer-offline` did not finish before the environment timeout, consistent with previous batches. Partial `node_modules` was removed before packaging.

Static JavaScript checks, Astro frontmatter checks, Content Audit, Architecture Audit, Discovery Audit and Regression Audit all passed.

## Commands

```bash
npm ci
npm run content:condition:audit
npm run content:condition:regression
npm run architecture:audit
npm run discovery:audit
npm run architecture:registry
npm run build
```
