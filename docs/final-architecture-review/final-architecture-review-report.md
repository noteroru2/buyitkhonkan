# FINAL ARCHITECTURE REVIEW — 300+ INDEX STRATEGY

## Verdict

`PASS_WITH_BUILD_WARNING`

Strategy decision: **STOP_PAGE_EXPANSION_AND_HARDEN**.

The architecture has already exceeded the original scale target without releasing the 14 remaining HOLD records. The expected production surface after a successful Astro build is **383 indexable URLs**, so there is no SEO reason to promote low-confidence HOLD pages merely to reach a page-count target.

## Route inventory

- Existing indexable routes before the architecture registry: **86**
- Architecture records: **311**
- Architecture lifecycle `INDEX`: **297**
- Architecture lifecycle `HOLD_NOINDEX`: **14**
- Expected generated routes after the final production-surface gate: **384** including `/404/`
- Expected indexable routes / expected sitemap URLs: **383**
- 300-page target: exceeded by **83**
- 350-page target: exceeded by **33**

These are **static expected counts from route/data inventory**, not a claim that Google has indexed 383 URLs. Production build and deployed sitemap verification remain required.

## Final production-surface policy

Batch 16D still generated HOLD skeleton routes and relied on `noindex,follow` + sitemap filtering. The final review strengthens this:

1. Architecture dynamic routes now build **INDEX records only**.
2. Guide dynamic routes now build **INDEX records only**.
3. All 14 HOLD records remain in source/registry for editorial decisions but are **not emitted as production pages**.
4. `/404/` is explicitly excluded from sitemap generation.
5. Sitemap still defensively excludes every HOLD architecture path.
6. An INDEX architecture page without a released renderer/content contract now throws a build-time error instead of silently rendering a skeleton.
7. An INDEX guide without released content now throws a build-time error.

This makes the source registry the planning layer and the built site the quality-approved layer.

## Remaining 14 HOLD records

No `RELEASE` candidates remain.

### KEEP_HOLD — 10

Eight model-family pages remain held because their names span too many generations/SKUs for a safe generic page:

- Lenovo Legion 7
- Lenovo IdeaPad Slim 5
- Acer Aspire 3
- Acer Aspire 5
- HP EliteBook 840
- HP ProBook 440
- Dell XPS 13
- MSI Modern 14

Two guides remain held for ownership/legal/editorial review:

- วิธีตรวจสถานะเครื่องก่อนขาย iPhone
- ขายสินค้าไอทีมือสองต้องมีใบเสร็จไหม

### MERGE — 4

These guide intents should remain consolidated into the stronger Condition owner rather than becoming competing URLs:

- โน้ตบุ๊กบานพับแตกประเมินอย่างไร
- iPhone ฝาหลังแตกขายได้ไหม
- วิธีเช็ก iPad ว่าเครื่องงอหรือไม่
- การ์ดจอพัดลมดังประเมินอย่างไร

## Crawl and discovery design

Primary discovery hubs are globally reachable from Header or Footer:

- `/สินค้าที่รับซื้อ/`
- `/ยี่ห้อและรุ่นที่รับซื้อ/`
- `/พื้นที่ให้บริการ/`
- `/สภาพสินค้าที่ขายได้/`
- `/บทความ/`
- `/รับซื้อยกล็อต-บริษัท/`

The final review also added the B2B hub directly to the global Footer.

Designed discovery depth for the major architecture clusters is approximately **2 clicks from Homepage**:

- Models: Homepage → Brand/Model Directory → Model
- Guides: Homepage → Article Hub → Guide
- Districts: Homepage → Area Hub → District
- Conditions: Homepage → Condition Hub → Condition
- B2B: Homepage → B2B Hub → B2B intent

Lifecycle-aware hub coverage:

- Model directory: all **172 INDEX models** generated from live lifecycle data
- Article hub: all **54 INDEX guides**
- District authority pages: **21/21** covered
- Specific condition pages: **24/24** covered
- B2B pages: **22/22** covered

HOLD records are excluded from discovery.

## Architecture mix

- Models: **172 INDEX / 8 HOLD**
- Specific Conditions: **24 INDEX / 0 HOLD**
- B2B: **22 INDEX / 0 HOLD**
- District Authority: **21 INDEX / 0 HOLD**
- Guides: **54 INDEX / 6 HOLD**
- Authority hubs: released as planned

This mix is sufficiently broad for a Local Authority site. Further scale should be driven by GSC/query evidence, not a fixed page target.

## Final release gates

- Final Architecture Review Audit: `PASS`
- Architecture Audit: `PASS`
- Discovery Audit: `PASS`
- Historical/static audit suite: **36/36 PASS**
- Final regression vs Batch 16D protected SEO/content ownership: `PASS`
- Route collision: `0`
- Duplicate architecture Path/Title/H1: `0`
- Missing parent: `0`
- HOLD production-route leak: `0`
- HOLD discovery leak: `0`
- Product × District doorway matrix: `0`
- Remaining HOLD with decision `RELEASE`: `0`

## Build warning

The user-local build on **2026-09-01** successfully completed `npm ci` and reached Astro/Vite compilation, then exposed one source syntax defect in `src/pages/บทความ/index.astro`: the legacy `posts` array was missing its closing `];` before `const releasedGuidePosts`. This checkpoint fixes that defect. Frontmatter syntax and all architecture/discovery gates now pass.

A full Astro rebuild still could not be rerun inside the sandbox because `npm ci` does not finish within the sandbox runtime/network window. Therefore this checkpoint remains **PASS_WITH_BUILD_WARNING** until the patched repo is rebuilt in the user-local environment. `node_modules`, `dist`, and `.astro` are excluded from the packaged repo.

Before deployment, run on a normal networked environment:

```bash
npm ci
npm run architecture:registry
npm run architecture:final-review
npm run architecture:audit
npm run discovery:audit
npm run build
```

After build/deploy, verify:

- sitemap contains **383 URLs** as the expected target count;
- `/404/` is absent from sitemap;
- all 14 HOLD URLs return 404 because HOLD routes are no longer built;
- canonical is self-referencing on indexable pages;
- no `noindex` page appears in sitemap;
- production crawl has no broken internal links.

## Recommendation

**Do not create more pages now.** The site already meets the 350+ quality-content route goal in the expected production indexable surface. The next work should be deployment QA, sitemap/GSC observation, conversion measurement, and query-led improvements to pages that receive impressions but underperform on CTR/position.
