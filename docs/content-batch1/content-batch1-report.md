# Content Batch 1 — Core Money Pages

Date: 2026-09-01

## Verdict

`PASS_WITH_WARNING`

Static content, architecture and discovery audits pass. A full Astro build was not completed in this sandbox because `npm ci` could not finish due the environment network timeout. The partially installed `node_modules` directory was removed before packaging.

## Scope

Content Batch 1 upgrades all 15 currently released category money pages through a separate editorial overlay:

1. Notebook
2. Smartphone / Android
3. Computer / PC
4. Gadget / accessories
5. Game console
6. Camera / lens
7. MacBook
8. iPhone
9. iPad / tablet
10. GPU
11. Monitor
12. Drone / action camera
13. Smartwatch
14. Bulk IT buyout
15. Office IT equipment

The new content lives in `src/data/coreMoneyContent.js` so future content work can be done by cluster without changing route ownership or duplicating page templates.

## SEO ownership preserved

The Content Batch 1 overlay does **not** own or overwrite:

- route path
- page title
- H1
- canonical
- robots
- lifecycle

The existing `src/data/categories.js`, `src/data/site.js`, `src/data/architectureRegistry.js`, and `src/data/discoveryLinks.js` are unchanged from Batch 5.

Category meta descriptions now prefer the editorial overlay description. Each of the 15 descriptions is unique and avoids timing / coverage promises such as “today” or “every district”.

## Content changes

Each money page now has:

- two product-specific hero/editorial paragraphs;
- two decision-focused paragraphs instead of generic “why choose us” sales copy;
- four product-specific accepted-product / condition sections;
- a six-item seller information checklist;
- product-specific valuation factors;
- a “before handover” risk / account / data checklist;
- four product-specific FAQs;
- an explicit distinction between preliminary LINE estimate and final inspected price;
- safer local service wording based on queue, distance and item suitability;
- existing Discovery UX and Trust/Proof modules retained.

The active content avoids unverified claims found in the legacy data, including fixed same-day completion, weekly price-update claims, universal pickup coverage, “best/highest” pricing, and blanket acceptance statements.

## Price tables

Existing numeric price-range tables are intentionally preserved for now because removing them would change an existing search/value proposition without a replacement data source.

They are no longer labelled as if freshly updated. The page now states:

> “ช่วงราคาอ้างอิงในชุดข้อมูลเว็บไซต์ ณ 12 กรกฎาคม 2569 — กรุณาเช็กราคาปัจจุบันอีกครั้งก่อนตัดสินใจ”

These price tables should be revalidated in a later pricing-data batch before their date is advanced.

## Template additions

`src/pages/[slug].astro` now:

- imports `CORE_MONEY_CONTENT`;
- uses the overlay for live category editorial copy;
- uses overlay FAQ content for both visible FAQ and FAQ structured data;
- uses unique overlay meta descriptions;
- adds a `เตรียมข้อมูล` quick-navigation item;
- adds a responsive seller checklist grid;
- adds a pre-handover / privacy / account readiness box;
- removes the active pickup-fee blanket claim;
- preserves the existing H1 and title source.

## Audit results

### Core content audit

- Core pages: 15/15
- Unique meta descriptions: 15/15
- Exact duplicated editorial paragraphs: 0
- High-risk claim findings in active overlay: 0
- Overlay-owned H1/title/path/canonical: 0
- Verdict: `PASS`

Run locally with:

```bash
npm run content:core:audit
```

### Architecture regression

- Structure-only pages: 311
- Forecast built routes minimum: 398
- Duplicate paths: 0
- Duplicate titles: 0
- Duplicate H1: 0
- Route collisions: 0
- Missing parents: 0
- Product × district doorway matrix: 0
- Verdict: `PASS`

### Discovery regression

- Live discovery contexts: 79
- Unique internal targets: 77
- Broken discovery links: 0
- HOLD_NOINDEX leaks: 0
- Thin discovery contexts: 0
- Verdict: `PASS`

## Build warning

`npm ci` was attempted but the sandbox network timed out before Astro could be installed. Therefore `npm run build` was not used as a release gate in this environment. No partial `node_modules` is included in the ZIP.

Recommended local verification after extraction:

```bash
npm ci
npm run content:core:audit
npm run architecture:audit
npm run discovery:audit
npm run build
```

## Recommended next content batch

Do not release the 311 skeleton pages yet. The next useful content step is **Content Batch 2 — High-Intent Model/Series Pages**, selecting a small cluster from the existing `HOLD_NOINDEX` registry (for example notebook gaming, MacBook Air/Pro, Gaming PC and RTX) and releasing only pages that pass unique-content and intent checks.
