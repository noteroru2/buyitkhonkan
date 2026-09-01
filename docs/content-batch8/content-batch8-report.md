# Content Batch 8 — District / Local Area Authority

## Verdict

`PASS_WITH_BUILD_WARNING`

## Scope

Release Local District Authority pages from the existing architecture registry only after unique local content, route/service intent, internal-link discovery, metadata, schema and safety checks pass.

Released in this batch: **10 districts**

| District | Approx. distance from Mueang Khon Kaen | Route/service angle |
|---|---:|---|
| บ้านแฮด | 18 km | ใกล้เมือง / โซนใต้ / งานเดี่ยวและสำนักงาน |
| บ้านฝาง | 22 km | กลุ่มพื้นที่ใกล้เมืองฝั่งบ้านฝาง / เชื่อมรอบตะวันตก |
| พระยืน | 30 km | รอบใต้ของเมือง / ส่งข้อมูลก่อนนัด |
| หนองเรือ | 45 km | โหนดเส้นทางตะวันตก / รวมรอบภูเวียง-ชุมแพ |
| อุบลรัตน์ | 50 km | จัดรอบร่วมโซนน้ำพองตอนบน |
| ชนบท | 55 km | จัดรอบร่วมบ้านไผ่ / งานสำนักงานหลายชิ้น |
| มัญจาคีรี | 58 km | ต่างอำเภอฝั่งตะวันตกเฉียงใต้ / เน้นรายการก่อนเดินทาง |
| เขาสวนกวาง | 59 km | รอบเหนือ / เชื่อมน้ำพอง |
| กระนวน | 66 km | ต่างอำเภอระยะไกลขึ้น / เน้น high-value และ bulk readiness |
| ภูเวียง | 68 km | รอบฝั่งตะวันตก / เชื่อมหนองเรือ |

Distance values are used only as planning/reference context. They are **not** GPS distances from a seller's actual address and are not a guarantee of pickup time.

Official references:

- จังหวัดขอนแก่น — การเดินทางจากอำเภอเมืองไปอำเภอต่าง ๆ: https://khonkaen.go.th/khonkaen6/inc/t_journey.php
- จังหวัดขอนแก่น — โครงสร้างพื้นที่บริการระดับอำเภอ: https://khonkaen.go.th/khonkaen6/inc/data_struct.inc.php

## Content design

Each released district page now has its own:

- Local introduction and service intent
- Reference distance from Mueang Khon Kaen
- Route/corridor planning angle
- Meeting workflow without claiming instant availability
- Suggested meeting-point characteristics, not fake permanent branches
- Product categories appropriate for the route
- Seller checklist before LINE assessment
- Long-distance / data / company-asset cautions
- FAQ specific to district pickup planning
- Source transparency section
- Service + Breadcrumb + FAQ structured data
- Trust/LINE conversion layer
- Discovery to live Money, B2B, Guide and nearby Local pages

No real-customer case study was invented for these new pages.

## Internal linking

The area discovery system now includes:

- 8 pre-existing live Local pages
- 10 newly released District Authority pages
- 11 remaining district skeletons still blocked as `HOLD_NOINDEX`

Category/Model/Condition/B2B area discovery now mixes established Local pages with released District Authority pages instead of always filling the area cards from the original 8 pages first.

Discovery audit after Batch 8:

- Contexts audited: **137**
- Unique live internal targets: **222**
- Broken discovery links: **0**
- HOLD leaks: **0**
- Thin discovery contexts: **0**

## Lifecycle after Batch 8

Architecture registry total: **311**

- `INDEX`: **145**
- `HOLD_NOINDEX`: **166**

District architecture:

- `INDEX`: **10**
- `HOLD_NOINDEX`: **11**

Existing released clusters remain:

- Model/Series INDEX: **88**
- Specific Condition INDEX: **24**
- B2B INDEX: **22** + B2B Hub

## Release gates

### Content Batch 8 audit

`PASS`

- Missing content: 0
- Invalid fields: 0
- Invalid lifecycle: 0
- Bad parent/directory: 0
- Bad related district links: 0
- Missing/invalid official source: 0
- Unsafe claims: 0
- Fixed numeric buy-price claims: 0
- Duplicate Title intent: 0
- Duplicate editorial intro: 0
- Unlinked released districts: 0
- HOLD leaks: 0
- Route integration errors: 0
- Schema integration errors: 0
- Distance mismatches: 0
- Technical/English district slugs: 0
- Doorway/thin discovery findings: 0

### Architecture audit

`PASS`

- Total architecture records: 311
- Forecast minimum built routes: 398+
- Duplicate IDs/paths/titles/H1: 0
- Route collisions: 0
- Missing parents: 0
- Invalid lifecycle: 0
- Product × District doorway matrix: 0

### Regression audit

`PASS`

Protected against unexpected changes from Content Batch 7:

- Homepage source
- Core category/brand/model/condition/local data
- Model / condition / B2B / guide architecture ownership
- Existing high-intent Model / Condition / B2B content
- Base canonical/robots layout
- Astro sitemap configuration

Protected files changed unexpectedly: **0 / 15**

## Files added/changed

New:

- `src/data/highIntentDistrictContent.js`
- `src/components/ReleasedDistrictPage.astro`
- `scripts/audits/content-batch8-audit.mjs`
- `scripts/audits/content-batch8-regression.mjs`
- `docs/content-batch8/*`

Changed intentionally:

- `src/data/architecture/districts.js`
- `src/data/discoveryLinks.js`
- `src/pages/[slug].astro`
- `src/pages/พื้นที่ให้บริการ.astro`
- `scripts/audits/discovery-ux-audit.mjs`
- `package.json`
- `docs/architecture/page-registry.csv`

## Build warning

A full Astro production build could not be completed in this sandbox because `npm ci` did not finish before the execution/network timeout. Partial `node_modules` was removed before packaging.

This is a **build warning, not a build pass**.

Static JavaScript syntax checks and Content / Architecture / Discovery / Regression gates all passed.

Recommended local release command:

```bash
npm ci
npm run content:district:batch8:audit
npm run content:district:batch8:regression
npm run architecture:audit
npm run discovery:audit
npm run build
```
