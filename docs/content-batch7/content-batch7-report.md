# CONTENT BATCH 7 — B2B / CORPORATE / BULK INTENT

## Verdict

**PASS_WITH_BUILD_WARNING**

Content, architecture, discovery, lifecycle and regression gates passed. Full Astro build could not be completed in the sandbox because `npm ci` did not finish before the environment disconnected. No partial `node_modules` directory is included in the release ZIP.

## Scope

Batch 7 promotes the complete B2B architecture cluster:

- B2B authority hub: **1 page**
- B2B / corporate intent pages: **22 pages**
- Total new INDEX architecture pages in this batch: **23**

Architecture lifecycle after release:

- Total architecture records: **311**
- INDEX: **135**
- HOLD_NOINDEX: **176**
- Released model/series pages preserved: **88**
- Released specific condition pages preserved: **24**
- Released B2B pages: **22**
- B2B hub: **INDEX**

## B2B information architecture

The hub `/รับซื้อยกล็อต-บริษัท/` now acts as the parent for all 22 B2B pages. Discovery is split into four user journeys:

1. Asset type — laptop, desktop, monitor, phone, iPhone, iPad, MacBook.
2. Business scenario — office clearance, relocation, closure, old IT assets, mixed lots, aging stock.
3. Organization type — school, university, gaming cafe, internet cafe, hotel, factory, retail/POS.
4. Process / documents — corporate quotation and Asset List workflow.

The existing money page `/รับเหมาอุปกรณ์ไอที-ขอนแก่น/` remains the commercial parent above the B2B authority hub.

## URL cleanup before first index

The original structure-only B2B records used technical English slugs. Because these URLs had never been released for indexing, Batch 7 replaces them before launch with readable long-term URLs such as:

- `/รับซื้อโน้ตบุ๊กบริษัท-ขอนแก่น/`
- `/รับซื้อคอมบริษัท-ขอนแก่น/`
- `/รับซื้อจอคอมบริษัท-ขอนแก่น/`
- `/รับซื้ออุปกรณ์ไอทีก่อนย้ายออฟฟิศ-ขอนแก่น/`
- `/รับซื้อคอมร้านเกมยกล็อต-ขอนแก่น/`
- `/รับซื้อ-iphone-บริษัท-ขอนแก่น/`
- `/ใบเสนอราคารับซื้ออุปกรณ์ไอทีบริษัท-ขอนแก่น/`

No redirect is required because the previous skeleton URLs were never released to index.

## Content contract

Each released B2B page contains:

- specific audience / use case;
- Asset List requirements;
- lot grouping rules;
- preliminary → inspection → final workflow;
- corporate document checklist;
- data / MDM / identity handover guidance;
- blockers that require extra verification;
- four intent-specific FAQs;
- contextual B2B, product, guide and area links;
- authoritative external references where device-management or data-handling guidance is mentioned.

The B2B template intentionally does not publish fixed buy prices. A preliminary value is described as dependent on the supplied list; final value is confirmed only after actual model, specification, condition, quantity and lot constraints are checked.

## Data and device-management references

Current authoritative sources used by the released content include:

- NIST SP 800-88 Rev. 2 (2025) for media sanitization program guidance.
- Microsoft Learn for Windows Autopilot registration/deregistration context.
- Apple Support for releasing sold/transferred devices from Apple Business.
- Android Enterprise Help for company-owned device management.
- Dell pixel guidance for corporate monitor lots.

These sources support technical/device-management guidance only and do not determine WINNER IT buy prices.

## Internal link / discovery result

Discovery audit after Batch 7:

- contexts audited: **127**
- unique live internal targets: **212**
- broken discovery links: **0**
- HOLD_NOINDEX leaks: **0**
- thin discovery contexts: **0**
- B2B template integration: **PASS**

The B2B hub links to all 22 released pages, so no released B2B page is orphaned.

## Content audit result

- Batch 7 B2B pages: **22 / 22**
- Missing content: **0**
- Invalid lifecycle: **0**
- Bad parent: **0**
- Bad related links: **0**
- Missing / invalid authoritative source: **0**
- Unsafe marketing claims: **0**
- Fixed numeric buy-price claims: **0**
- Duplicate title / description intent: **0**
- Duplicate intro editorial copy: **0**
- Unlinked released page: **0**
- HOLD leak: **0**
- Technical English-only release slug: **0**
- Route integration errors: **0**
- Schema integration errors: **0**

## Architecture audit result

- Verdict: **PASS**
- Duplicate ID: **0**
- Duplicate path: **0**
- Duplicate title: **0**
- Duplicate H1: **0**
- Route collision: **0**
- Missing parent: **0**
- Invalid lifecycle: **0**
- Missing content contract: **0**
- Product × district doorway matrix: **0**

## Regression

Protected Batch 6 SEO/content ownership files checked: **14**.
Unexpected changes: **0**.

Preserved exactly from Batch 6 include homepage source, category/brand/model/legacy-condition/local data, model and condition architecture, released model and condition content, Base canonical/robots logic and Astro sitemap configuration.

Expected Batch 7 changes are limited to B2B content, B2B architecture/hub lifecycle, B2B rendering/schema, discovery integration, audit scripts and registry/report outputs.

## Commands

```bash
npm run architecture:registry
npm run architecture:audit
npm run discovery:audit
npm run content:b2b:batch7:audit
npm run content:b2b:batch7:regression
npm ci
npm run build
```

Run `npm ci && npm run build` in a network-enabled environment before production merge/deploy.
