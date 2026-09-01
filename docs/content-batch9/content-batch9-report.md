# CONTENT BATCH 9 — DISTRICT EXPANSION ROUND 2

## Verdict

**PASS_WITH_BUILD_WARNING**

Content, architecture, discovery and regression gates pass. A full Astro build could not be completed in the sandbox because `npm ci` did not finish before the runtime timeout. No partial `node_modules` directory is included in the release ZIP.

## Scope

Released the remaining 11 District Authority pages from `HOLD_NOINDEX` to `INDEX`:

1. ซำสูง — 39 km reference
2. โนนศิลา — 58 km reference
3. แวงใหญ่ — 72 km reference
4. โคกโพธิ์ไชย — 75 km reference
5. เปือยน้อย — 80 km reference
6. หนองนาคำ — 80 km reference
7. แวงน้อย — 96 km reference
8. หนองสองห้อง — 96 km reference
9. ภูผาม่าน — 109 km reference
10. สีชมพู — 114 km reference
11. เวียงเก่า — **no numeric distance published in the cited provincial travel table; the page deliberately requires an actual location/pin before routing**

Provincial sources used for district structure and travel context:

- https://khonkaen.go.th/khonkaen6/inc/t_journey.php
- https://khonkaen.go.th/khonkaen6/inc/data_struct.inc.php
- https://www.khonkaen.go.th/khonkaen6/detailmanage.php?id=4134 (additional Wiang Kao / Phu Wiang geographic context)

## Local coverage after Batch 9

The website now has Local coverage for all 26 official districts of Khon Kaen through:

- 5 existing district-level Local Pages: เมืองขอนแก่น, น้ำพอง, บ้านไผ่, ชุมแพ, พล
- 21 District Authority pages from Batches 8–9
- Additional non-district Local Zones remain separate: มข./กังสดาล, บ้านเป็ด, ศิลา

No Product × District matrix was created.

## Content approach

Each new district page has its own:

- corridor / route-planning context
- meeting workflow
- travel note
- reference-point types
- suitable product groups
- seller checklist
- cautions
- related districts
- FAQ
- official source links

The copy avoids promises of immediate pickup, invented cases, fixed buy prices, or claims of permanent branches in those districts.

## Wiang Kao transparency fix

The provincial travel table lists `เวียงเก่า` but leaves the kilometer field blank. Batch 9 therefore:

- stores `distanceKm: null`
- does not invent a number
- renders “ใช้พิกัดจริง — แหล่งจังหวัดไม่ระบุตัวเลขระยะทาง”
- adds provincial geopark context connecting Phu Wiang and Wiang Kao
- uses the seller's actual location before route planning

## Release state

- Architecture records: **311**
- Architecture INDEX: **156**
- Architecture HOLD_NOINDEX: **155**
- District Authority INDEX: **21**
- District Authority HOLD_NOINDEX: **0**
- Model/Series INDEX: **88**
- Specific Condition INDEX: **24**
- B2B INDEX: **22**
- Forecast built routes minimum: **398+**

## Internal discovery

Discovery audit after release:

- Contexts audited: **148**
- Unique internal targets: **233**
- Broken discovery links: **0**
- HOLD leaks: **0**
- Thin discovery contexts: **0**

The Area Hub now lists the complete district coverage and handles districts without a published numeric distance safely.

## QA gates

### Content Batch 9 Audit — PASS

- Batch 9 release: 11/11
- Total District Authority INDEX: 21/21
- Missing content: 0
- Invalid lifecycle: 0
- Bad parent: 0
- Bad related districts: 0
- Missing/invalid sources: 0
- Unsafe claims: 0
- Fixed buy-price claims: 0
- Duplicate title/description: 0
- Duplicate editorial intro: 0
- Unlinked district pages: 0
- HOLD leaks: 0
- Technical slug findings: 0
- Doorway/thin findings: 0
- Distance transparency findings: 0

### Architecture Audit — PASS

- Duplicate IDs: 0
- Duplicate paths: 0
- Duplicate titles: 0
- Duplicate H1: 0
- Route collisions: 0
- Missing parents: 0
- Invalid lifecycle: 0
- Product × District doorway matrix: 0

### Regression — PASS

Protected SEO ownership files from Batch 8 remain byte-identical:

- Homepage
- categories / brands / legacy model / legacy condition / legacy local data
- model / condition / B2B / guide architecture
- model / condition / B2B content
- Base canonical/robots logic
- Astro config

Batch 8 District pages remain INDEX and the Batch 8 historical content audit still passes after the expansion.

## Build warning

A full `npm ci && npm run build` could not be completed inside this sandbox because dependency installation exceeded the runtime limit. The partial dependency directory was deleted before packaging.

Recommended local release command:

```bash
npm ci
npm run architecture:audit
npm run discovery:audit
npm run content:district:batch9:audit
npm run content:district:batch9:regression
npm run build
```
