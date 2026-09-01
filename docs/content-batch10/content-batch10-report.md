# CONTENT BATCH 10 — GUIDE / PRICE / INFORMATIONAL AUTHORITY

Date: 2026-09-01  
Verdict: **PASS_WITH_BUILD_WARNING**

## Scope

Released 20 new Guide pages from `HOLD_NOINDEX` to `INDEX` and released the Price Hub at `/ศูนย์ข้อมูลราคา/`.

The batch intentionally avoids publishing the remaining 40 Guide skeletons until they receive unique content and QA.

### Guide release mix

- Notebook: 4
- MacBook: 4
- iPhone: 3
- iPad: 2
- Computer: 2
- GPU: 2
- Camera: 1
- Monitor: 1
- Game console: 1
- Price Hub: 1

## Content principles

- No invented current buy-price figures.
- Price-intent guides explain *factors* rather than fixed deductions.
- Technical steps use manufacturer or platform documentation where relevant.
- Account/password guidance never asks users to share passwords with the buyer.
- Safety-sensitive cases (swollen batteries, opening PSU, stressed failing GPU) include stop/avoid guidance.
- Each released Guide has a unique title, H1, meta description, intro, checklist, steps and FAQ.

## Core source families used

- Apple Support — iPhone/iPad preparation, Parts and Service History, Mac cycle count, Find My / Activation Lock.
- Microsoft Support — Windows device specifications, battery report, system tools / dxdiag.
- PlayStation Support — transferring/disposal/reset guidance for PS5.
- Dell Support — display pixel guidance.
- Nikon Support — camera product/support reference.

These sources validate technical steps only; they do not determine WINNER IT buy prices.

## New UX / IA integration

- New `ReleasedGuidePage.astro` for article-quality Guide pages.
- New `ReleasedPriceHub.astro` for price and valuation-factor discovery.
- `/บทความ/` now lists the 20 released Guides, Price Hub and legacy articles together.
- Existing article discovery can surface released Guide pages.
- Money / Model / Condition / Local / B2B discovery can surface released Guides only when lifecycle is `INDEX`.
- Price Hub links to existing price articles, released price-factor guides and Money Pages.
- No `HOLD_NOINDEX` Guide is linked through the discovery system.

## Structured data

Released Guide pages receive:

- `Article`
- `BreadcrumbList`
- `FAQPage`

Price Hub receives:

- `CollectionPage`
- `BreadcrumbList`

## Lifecycle after Batch 10

- Architecture records: 311
- `INDEX`: 177
- `HOLD_NOINDEX`: 134
- Model INDEX: 88
- Condition INDEX: 24
- B2B INDEX: 22
- District INDEX: 21
- Guide INDEX: 20
- Guide HOLD: 40
- Price Hub: INDEX

## Release gates

### Content Batch 10 Audit — PASS

- Released Guides: 20 / 20
- Missing content: 0
- Duplicate titles: 0
- Duplicate meta descriptions: 0
- Duplicate intros: 0
- Missing sources: 0
- Invalid sources: 0
- Unsafe claims: 0
- Fixed numeric buy-price claims: 0
- Orphan Guide pages: 0
- HOLD leaks: 0
- Thin discovery contexts: 0
- Route/schema integration findings: 0
- Price Hub findings: 0

### Architecture Audit — PASS

- Duplicate paths: 0
- Duplicate titles: 0
- Duplicate H1: 0
- Route collisions: 0
- Missing parents: 0
- Invalid lifecycle: 0
- Product × District doorway matrix: 0

### Discovery Audit — PASS

- Contexts audited: 169
- Unique live internal targets: 251
- Broken discovery links: 0
- HOLD leaks: 0
- Thin contexts: 0
- Released Guide integration: PASS
- Price Hub integration: PASS

### Regression — PASS

- Protected Batch 9 SEO/data files checked: 16
- Unexpected protected changes: 0
- Legacy article files checked: 22
- Legacy article file changes: 0
- Existing Model / Condition / B2B / District release counts preserved.

## Build warning

`npm ci --prefer-offline --no-audit --no-fund` did not finish within the sandbox time limit (35 seconds), so a full Astro build could not be executed in this environment.

`node_modules` was removed after the attempt. JavaScript / MJS syntax checks and all current release audits passed.

Recommended local release command:

```bash
npm ci
npm run content:guide:batch10:audit
npm run architecture:audit
npm run discovery:audit
npm run content:guide:batch10:regression
npm run build
```
