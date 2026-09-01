# Content Batch 2 — High-Intent Model & Series Pages

Date: 2026-09-01

## Verdict

**PASS_WITH_BUILD_WARNING**

Static content, architecture, lifecycle and discovery gates pass. A full Astro production build could not be completed in the sandbox because `npm ci` repeatedly timed out before installing Astro. Partial `node_modules` was removed before packaging.

## Goal

Release a deliberately small first set of high-commercial-intent model pages from the 180-page model architecture. Pages are released only when they have model-specific editorial content and valid live internal-link paths. The remaining architecture stays `HOLD_NOINDEX`.

## Released scope — 20 pages

### Notebook / business notebook — 6
- ASUS ROG Zephyrus G14
- ASUS TUF Gaming A15
- Lenovo Legion 5
- Lenovo LOQ 15
- Acer Nitro V 15
- Dell Latitude 7440

### MacBook — 4
- MacBook Air M1
- MacBook Air M2
- MacBook Air M3
- MacBook Pro 14-inch M1 Pro

### iPhone — 4
- iPhone 13
- iPhone 14
- iPhone 15 Pro Max
- iPhone 16 Pro Max

### iPad — 3
- iPad Gen 10
- iPad Air 5
- iPad Pro M1 11-inch

### GPU — 3
- GeForce RTX 3060 Ti
- GeForce RTX 4060 Ti
- GeForce RTX 5060

See `released-model-pages.csv` for the exact path, title, H1, parent category and lifecycle.

## Content contract

Every released page has its own:
- SEO title and meta description
- intro written for the specific model/series
- configuration / variant identification guidance
- inspection points specific to the product
- factors that can increase or reduce valuation
- seller checklist for sending useful information in LINE
- risk / handover notes (account locks, MDM, Find My, repair history, warranty, accessories where relevant)
- FAQ content
- contextual links to live parent/category/brand/condition/guide pages
- optional official manufacturer specification reference when available

No released page publishes an invented “today” buy price. Price guidance is deliberately qualitative until a current pricing source/feed is available.

## Lifecycle changes

- Model architecture total: 180
- Model pages changed to `INDEX`: 20
- Model pages remaining `HOLD_NOINDEX`: 160
- Architecture total: 311
- Architecture pages now `INDEX`: 20
- Architecture pages remaining `HOLD_NOINDEX`: 291

Only the 20 released architecture paths are treated as live discovery targets. HOLD pages remain `noindex,follow` and excluded from sitemap by the existing sitemap filter.

## Rendering and SEO integration

A new `ReleasedModelPage.astro` renders released model pages. It includes:
- breadcrumb navigation
- one model-specific H1
- primary LINE conversion card
- trust/proof module
- quick section navigation
- configuration/spec identification section
- inspection section
- valuation-factor section
- seller checklist
- contextual discovery module
- FAQ section
- final LINE CTA

`src/pages/[slug].astro` now branches released model architecture pages to the rich model template while HOLD pages continue to render `ArchitectureSkeleton`.

Structured data for released pages includes BreadcrumbList, Service and FAQPage. Existing Base canonical/robots behavior remains the ownership layer.

## Internal link release behavior

`discoveryLinks.js` now treats released architecture models as live targets and can surface them from their category and relevant brand contexts. It never promotes the remaining HOLD model pages.

The discovery audit was updated so lifecycle `INDEX` architecture pages count as live targets while lifecycle `HOLD_NOINDEX` paths remain forbidden targets.

## Existing SEO ownership regression

The following existing live-data ownership files are byte-for-byte unchanged from Content Batch 1:
- `src/data/categories.js`
- `src/data/brandPages.js`
- `src/data/modelPages.js`
- `src/data/conditionPages.js`
- `src/data/localPages.js`
- `src/data/site.js`

This batch intentionally adds new model-page ownership via the architecture release layer rather than rewriting existing category/brand/model/local H1 or path records.

## Source discipline

For configuration-sensitive products, official manufacturer pages were used as reference points where available, including ASUS/ROG, Lenovo, Dell, Apple and NVIDIA. The website content does not copy specification tables wholesale; references are used to avoid making generic or inaccurate statements about series that vary by SKU/year.

## Release gates

### Content model audit — PASS
- Released: 20 / expected 20
- Missing content: 0
- Invalid fields: 0
- Invalid lifecycle: 0
- Parent mismatch: 0
- Bad related links: 0
- Released pages without inbound discovery link: 0
- Duplicate titles: 0
- Duplicate descriptions: 0
- Duplicate long editorial strings: 0
- Unsafe claims: 0
- Fixed numeric buy-price claims: 0

### Architecture audit — PASS
- Architecture pages: 311
- Forecast built routes minimum: 398
- Route collisions: 0
- Duplicate path/title/H1: 0
- Missing parent: 0
- Invalid lifecycle: 0
- Product × district doorway matrix: 0

### Discovery audit — PASS
- Live contexts audited: 79
- Unique internal targets: 97
- HOLD architecture links: 0
- Broken discovery links: 0
- Thin discovery contexts: 0

### Core Money Content regression — PASS
Content Batch 1 core category layer remains valid.

### Static syntax — PASS
Frontmatter and modified JavaScript/audit modules pass `node --check` extraction/checks.

## Build warning

`npm ci` could not complete in the sandbox because network/package installation timed out; `astro` was therefore not installed and a full `npm run build` was not available as a release gate here. No incomplete `node_modules` directory is included in the delivered ZIP.

Recommended local verification before deployment:

```bash
npm ci
npm run architecture:audit
npm run discovery:audit
npm run content:core:audit
npm run content:model:audit
npm run build
```

Do not deploy solely from the sandbox static checks if the local production build fails.
