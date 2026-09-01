# Current Website State Audit

Audit date: 2026-07-12  
Scope: source code and generated `dist` in this repo only  
Rule followed: no source/content/slug changes, no commit, no push, no deploy

## 1. Executive Summary

เว็บไซต์นี้เป็น Astro static site สำหรับบริการรับซื้อสินค้าไอทีในจังหวัดขอนแก่น ภายใต้แบรนด์ WINNER IT / บริษัท อำพล เทรดดิ้ง จำกัด โดย source วางตัวเป็น service-area business ไม่มีหน้าร้านให้เดินเข้าใช้บริการในขอนแก่น หลักฐาน: `src/data/site.js` มี `hasStorefront: false` และ `address: 'บริการนัดรับทั่วจังหวัดขอนแก่น...'`.

สถานะปัจจุบันมี build output 86 หน้า, sitemap 86 URL, dynamic route สำหรับ service/category, brand, model, condition และ local pages ผ่าน `src/pages/[slug].astro`. จุดแข็งคือโครงสร้างหน้า SEO ถูกแยกเป็น data-driven, มี title/description/canonical/H1 ครบจาก build output, มี CTA LINE/phone ชัดเจน และมี NAP ชุดกลางใน `src/data/site.js`.

จุดอ่อนหลักที่ตรวจพบคือไม่มี `og:image` ทุกหน้า, ไม่มี measurement/tracking ที่ตรวจพบจาก source, robots.txt ชี้ sitemap คนละโดเมนกับ `astro.config.mjs`, public assets มีเพียง favicon ไม่มีรูปจริง/รูปสินค้า/รูปเคส, และ Git command ไม่สามารถตรวจสถานะได้ใน environment นี้แม้มี `.git` directory แสดงใน listing.

Verdict: READY FOR INTERNAL QA. ยังไม่ควรสรุปว่า ready for indexing จนกว่าแก้ robots sitemap domain, เพิ่มภาพจริง/OG image, ติดตั้ง measurement และตรวจ browser/mobile เพิ่ม.

## 2. Current Project Snapshot

| รายการ | สถานะปัจจุบัน |
| --- | --- |
| Framework | Astro `^5.2.0` จาก `package.json` |
| Node version ที่รัน audit | `v22.20.0` จาก `node --version` |
| Package manager | npm มี `package-lock.json` |
| Build status | PASS: `npm run build` สำเร็จ, 86 page(s) built |
| จำนวนหน้าทั้งหมด | 86 HTML pages ใน `dist` |
| Indexable pages | 86 URL ใน `dist/sitemap-0.xml`; ไม่มี meta robots noindex ที่ตรวจพบ |
| Service pages | 15 category pages จาก `src/data/categories.js` |
| Local pages | 8 จาก `src/data/localPages.js` |
| Articles | 22 blog article files + 1 blog index |
| Schema | Organization/WebSite/Service/FAQPage/BreadcrumbList/Article |
| Sitemap | มี `dist/sitemap-index.xml` และ `dist/sitemap-0.xml` |
| Robots | มี `public/robots.txt` แต่ sitemap URL เป็น `https://www.itbuy-khonkaen.com/sitemap-index.xml` |
| Analytics | NOT FOUND จาก `rg` patterns สำหรับ GA/GTM/GSC/Pixel/event |
| Conversion tracking | NOT FOUND; มี CTA href แต่ไม่พบ event tracking |
| Business entity | ระบุ WINNER IT และบริษัท อำพล เทรดดิ้ง จำกัด ใน `src/data/site.js` |
| Real images | ไม่พบใน `public` นอกจาก `favicon.svg` |

## 3. What Exists Now

Technical foundation:

- `astro.config.mjs`: static output โดย default, `site: 'https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com'`, `integrations: [sitemap()]`, `compressHTML: true`.
- `package.json`: scripts มีเฉพาะ `dev`, `build`, `preview`; dependencies มี `astro` และ `@astrojs/sitemap`.
- ไม่มี `src/content.config.*` และไม่พบ content collections จาก `rg --files`.

Page templates:

- `src/layouts/Base.astro`: global meta, canonical, favicon, Open Graph basic, Twitter card, JSON-LD injection, Header/Footer/StickyBar.
- `src/layouts/Article.astro`: article wrapper และ Article schema สำหรับ blog.
- `src/pages/[slug].astro`: dynamic route สำหรับ 15 category + 6 brand + 21 model + 5 condition + 8 local pages.

Content and SEO data:

- `src/data/categories.js`: 15 money/category pages, price rows, FAQ, case studies.
- `src/data/brandPages.js`: 6 brand pages.
- `src/data/modelPages.js`: 21 model/series pages.
- `src/data/conditionPages.js`: 5 condition pages.
- `src/data/localPages.js`: 8 local area pages.
- `src/data/site.js`: NAP, service model, phone, LINE, email, service areas, hours.

UX and CTA:

- `src/components/Header.astro`, `Footer.astro`, `StickyBar.astro`, `Ticker.astro`.
- Sticky mobile CTA has LINE and phone links via `SITE.lineHref` and `SITE.phoneHref`.
- No form component detected.

Images and assets:

- `public/favicon.svg` only.
- No product image, store image, team image, case study image, OG image asset found in `public`.

Scripts/audits:

- Existing docs in `doc/`: GSC supporting plan, citations/NAP plan, backlink outreach, Thai SEO plan.
- No test/lint/check script in `package.json`.

## 4. Page Inventory

Build reconciliation:

| ประเภทหน้า | จำนวน | ที่มาของข้อมูล | ตัวอย่าง URL | Indexable หรือไม่ |
| --- | ---: | --- | --- | --- |
| Homepage | 1 | `src/pages/index.astro` | `/` | Yes, in sitemap |
| Static trust/legal/service utility | 7 | `.astro` files | `/about/`, `/contact/`, `/service-area/` | Yes, in sitemap |
| Blog index | 1 | `src/pages/blog/index.astro` | `/blog/` | Yes, in sitemap |
| Blog articles | 22 | `.astro` files under `src/pages/blog` | `/blog/macbook-resale-price/` | Yes, in sitemap |
| Service/category pages | 15 | `src/data/categories.js` via `[slug].astro` | `/notebook/`, `/iphone/` | Yes, in sitemap |
| Brand pages | 6 | `src/data/brandPages.js` via `[slug].astro` | `/รับซื้อ-dell-ขอนแก่น/` | Yes, in sitemap |
| Model pages | 21 | `src/data/modelPages.js` via `[slug].astro` | `/รับซื้อ-macbook-air-ขอนแก่น/` | Yes, in sitemap |
| Condition pages | 5 | `src/data/conditionPages.js` via `[slug].astro` | `/จอแตกขายได้ไหม/` | Yes, in sitemap |
| Local area pages | 8 | `src/data/localPages.js` via `[slug].astro` | `/รับซื้อไอที-บ้านเป็ด/` | Yes, in sitemap |
| 404 page | 0 | not found in `src/pages` | n/a | Not present |
| Redirect pages | 0 | not found | n/a | Not present |
| Noindex pages | 0 | no meta robots found in build | n/a | Not present |

Dynamic data counts verified by Node import:

```text
categories: 15
brands: 6
models: 21
conditions: 5
locals: 8
totalExpected: 86
```

Sitemap/build consistency:

- `dist` HTML count: 86.
- `dist/sitemap-0.xml` URL count: 86.
- Source pages count: 32 `.astro` files under `src/pages`.
- No page detected as built but missing from sitemap in this audit.

## 5. Keyword and Content Coverage

| Cluster | มีหน้าแล้ว | URL หลัก | หน้าสนับสนุน | ช่องว่างที่ยังขาด |
| --- | --- | --- | --- | --- |
| Core IT buyout | Yes | `/` | `/service-area/`, blog | Needs measurement and stronger trust assets |
| Notebook | Yes | `/notebook/` | Dell/HP/Lenovo/ASUS/Acer/MSI, gaming/damaged pages | More model-specific notebook pages only after evidence |
| Computer/PC | Yes | `/computer/` | `/รับซื้อคอมเกมมิ่ง-ขอนแก่น/`, `/รับซื้อคอมสำนักงาน-ขอนแก่น/` | B2B case study pages not standalone |
| iPhone | Yes | `/iphone/` | iPhone pricing/prep articles | No iPhone model split visible from source |
| iPad | Yes | `/ipad-tablet/` | `/รับซื้อ-ipad-pro-ขอนแก่น/`, `/รับซื้อ-ipad-air-ขอนแก่น/` | Good start; add only from GSC evidence |
| MacBook | Yes | `/macbook/` | Air/Pro/Intel/M1-M5 pages | Needs real images/proof |
| GPU | Yes | `/gpu/` | RTX 30/40/50, CPU, RAM/SSD pages | Good cluster, no tracking |
| Game console | Yes | `/game-console/` and `/gadget/` | PS5/Switch article | Need avoid overlap between gadget and game-console in copy |
| Condition intent | Yes | 5 condition URLs | condition hub `/สภาพสินค้าที่ขายได้/` | Missing no-adapter / old condition pages |
| Local intent | Yes | 8 local URLs | `/service-area/` | Local proof images still placeholders/briefs |
| Appliance | Yes but lower priority | `/appliance/` | none detected | Should remain de-emphasized unless demand exists |

## 6. Technical SEO Status

| Check | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Build | PASS | `npm run build` -> `86 page(s) built` | No build error observed |
| Sitemap generation | PASS | `@astrojs/sitemap` created files in `dist` | 86 URLs |
| robots.txt exists | WARNING | `public/robots.txt` | Sitemap points to `https://www.itbuy-khonkaen.com/...`, not Astro `site` domain |
| Canonical exists | PASS | metadata scan: missing canonical = 0 | Generated from `Base.astro` |
| Title exists | PASS | metadata scan: missing title = 0 | No duplicate titles found |
| Meta description exists | PASS | missing desc = 0 | One homepage description >170 chars |
| H1 count | PASS | missing H1 = 0, multiH1 = 0 | Build output scan |
| Open Graph basic | WARNING | `Base.astro` has og:type/title/desc/url | `og:image` missing on all 86 pages |
| Twitter card | PASS | missing twitter card = 0 | Uses `summary` |
| Meta robots | WARNING | missing robots = 86 | Absence is not automatically noindex, but not explicit |
| hreflang | NOT VERIFIED | not found in `Base.astro` | Thai-only site may not need it |
| Browser QA | NOT VERIFIED | not run | Requested if tool/server available; not executed in this audit |

Metadata issues table:

| Severity | URL | ปัญหา | หลักฐาน | ผลกระทบ |
| --- | --- | --- | --- | --- |
| P1 | All pages | Missing `og:image` | metadata scan: `ogImage: 86` missing | Poor social preview and lower trust in shares |
| P1 | `/robots.txt` | Sitemap domain mismatch | `public/robots.txt` vs `astro.config.mjs site` | Search engines may discover wrong sitemap domain |
| P2 | All pages | No explicit robots meta | metadata scan: `robots: 86` missing | Usually acceptable, but harder to audit index directives |
| P2 | `/` | Description long | scan found homepage descLen 203 | SERP snippet may truncate |

## 7. Local SEO and Entity Status

Entity consistency matrix:

| ข้อมูล | ค่าที่พบ | พบในไฟล์ใด | สอดคล้องหรือไม่ | ความเสี่ยง |
| --- | --- | --- | --- | --- |
| Brand | WINNER IT | `src/data/site.js`, `Base.astro` | Consistent in central data | Low |
| Legal company | บริษัท อำพล เทรดดิ้ง จำกัด | `src/data/site.js` | Consistent in central data | Low |
| Phone | `095-547-9408` / `tel:0955479408` | `site.js`, Sticky CTA | Consistent | Low |
| LINE | `@buyhub` | `site.js`, Sticky CTA, pages | Consistent | Low |
| Email | `amphontrading@gmail.com` | `site.js` | Present | Low |
| Address/service area | service-area business, no walk-in storefront | `site.js`, `service-area.astro` | Consistent by source | Medium: must match external citations |
| Hours | เปิดทุกวัน 09:00-19:30 | `site.js`, Organization schema | Present | Medium: external citations not verified |
| Google Maps/GBP | Not found in source | `rg` docs only mention plan | Not verified | High for Local SEO |
| Logo | favicon only | `public/favicon.svg` | Limited | Medium |
| Real store/team photos | Not found | `public` image inventory | Missing | High for trust |

Business positioning from source: Service-area business / นัดรับ ไม่มีหน้าร้านให้เดินเข้าใช้บริการในขอนแก่น. Do not claim storefront based on current repo.

## 8. Schema Status

Schema types counted from built HTML:

| Schema type | Count |
| --- | ---: |
| Article | 22 |
| BreadcrumbList | 15 |
| FAQPage | 16 |
| Organization | 3 |
| Service | 55 |
| WebSite | 3 |

Schema coverage table:

| ประเภทหน้า | Schema ที่ใช้ | สถานะ | จุดอ่อน | ความเสี่ยง |
| --- | --- | --- | --- | --- |
| Homepage/About/Contact | Organization, WebSite on pages with `includeOrganization` | Good baseline | No logo/image/sameAs/geo | Medium |
| Category pages | Service, BreadcrumbList, FAQPage | Present | Breadcrumb only for category pages, not brand/model/local | Medium |
| Brand/model/condition/local | Service | Present | No BreadcrumbList/FAQPage for many detail pages despite visible FAQ on local | Medium |
| Blog articles | Article | Present | Article schema lacks `datePublished`/`dateModified` from observed `Article.astro` snippet | Medium |
| Reviews/ratings | Not found | Safer than unsupported claims | Need verified review source before adding | Low |
| LocalBusiness/Store | Not used | Appropriate caution for no storefront | Could add ServiceAreaBusiness-style schema later with evidence | Medium |

No invalid JSON-LD was detected in the build scan.

## 9. Content Quality Status

What looks strong from source:

- Category pages include price tables, FAQ, case studies, cluster links and external references in `src/data/categories.js`.
- Brand/model pages have specific fields rather than only swapped names (`demand`, `inspection`, `priceSignals`, `specificData`).
- Local pages now include area-specific meeting style, real meeting point names, service-window caveats, case study text, demand and FAQ in `src/data/localPages.js`.

Risks:

- Local `photo.brief` fields are instructions/placeholders for future real images, not actual images. Evidence: `src/pages/[slug].astro` renders `<div class="local-photo__mark">ภาพพื้นที่</div>`.
- Real case studies are text-only. No photo, receipt, anonymized chat, or source artifact in `public`.
- Some claims such as fast response/payment are marketing claims; acceptable only where phrased as process, not guaranteed timing. Continue avoiding over-guarantees.
- Blog article length/quality was not fully word-count audited in this pass.

## 10. Internal Link Architecture

Current architecture from source:

- Homepage links into key category and selected brand/model/condition/local pages (`src/pages/index.astro`).
- `[slug].astro` builds category cluster links from `cat.cluster` in `categories.js`.
- Brand/model pages link to related categories/brands/models through `detailCategories`, `relatedBrands`, `relatedModels`.
- Local pages link only to category money pages listed in each local page's `primary`.
- Blog articles include contextual links into money/local/condition pages.
- Footer links to main pages, service area, condition hub and contact/legal pages.

Assessment: Internal linking is cluster-oriented, not only footer-driven. Remaining risk is lack of automated broken-link audit command and no explicit report of orphan pages beyond sitemap/source count reconciliation.

## 11. UX and Conversion Status

CTA inventory:

| CTA | ตำแหน่ง | Destination | Tracking | สถานะ |
| --- | --- | --- | --- | --- |
| LINE button | Header/hero/category/detail/sticky | `https://line.me/R/ti/p/@buyhub` | Not found | Functional href, untracked |
| Phone button | Header/hero/category/detail/sticky | `tel:0955479408` | Not found | Functional href, untracked |
| Sticky mobile CTA | `src/components/StickyBar.astro` | LINE + phone | Not found | Present on mobile CSS |
| Form submit | Not found | n/a | n/a | Missing |

Mobile/UX source observations:

- Sticky CTA has `aria-label`, `role="complementary"`, and mobile-only CSS.
- Tables have overflow wrappers in category pages for price tables.
- Thai long headings are present; browser screenshot QA was not run, so visual overflow is NOT VERIFIED.
- No skip link found in `Base.astro`.
- Focus state coverage not audited beyond source CSS inspection.

## 12. Image and Trust Asset Status

Image inventory:

| ประเภทรูป | จำนวน | ใช้อยู่หน้าใด | มี alt หรือไม่ | ความเสี่ยง |
| --- | ---: | --- | --- | --- |
| Favicon/logo svg | 1 | site-wide icon | n/a favicon | Low |
| Product images | 0 | n/a | n/a | High |
| Store/team images | 0 | n/a | n/a | High |
| Case study images | 0 | n/a | n/a | High |
| Local area photos | 0 actual files | local pages have brief/placeholder block | Text brief only | High |
| OG images | 0 detected | all pages | n/a | High |

Trust signals:

| Trust Signal | มีหรือไม่ | URL/ไฟล์ | คุณภาพ | สิ่งที่ยังขาด |
| --- | --- | --- | --- | --- |
| About page | Yes | `src/pages/about.astro` | Basic | Team/photo evidence |
| Contact page | Yes | `src/pages/contact.astro` | Has contact route | Map/GBP not verified |
| Company information | Yes | `src/data/site.js` | Centralized | Registration proof not linked |
| Privacy policy | Yes | `src/pages/privacy.astro` | Present | Not legal-reviewed |
| Terms | Yes | `src/pages/terms.astro`, `buyout-terms.astro` | Present | Browser QA not done |
| Device prep guides | Yes | blog articles | Useful | Needs conversion tracking |
| Customer reviews | Text mention only | `where-to-sell-it-khonkaen.astro` mentions reviews | Not evidence-backed in repo | GBP/review source |
| Complaint channel | Partial | phone/LINE/contact | Basic | Explicit complaint process |

## 13. Build and QA Results

Commands run:

```text
node --version
npm run build
node imports/count scripts against src data
node metadata/schema scan against dist
rg tracking/schema/TODO patterns
git status --short
git branch --show-current
git log --oneline -10
git diff --stat
```

Results:

- `node --version`: `v22.20.0`.
- `npm run build`: PASS, `86 page(s) built in 1.82s`.
- Dist HTML count: 86.
- Sitemap URL count: 86.
- CSS assets in `dist/_astro`: 3 files, about 4.7-5.8 KB each.
- No client-side JS assets detected in `dist/_astro` listing.
- `npm run check`, `npm run lint`, `npm run test`: not run because scripts do not exist in `package.json`.
- Browser QA: NOT VERIFIED.
- Lighthouse/CWV: NOT VERIFIED; no Lighthouse dependency was added.

## 14. Git Status and Recent Development

Git command results in this environment:

| Command | Result |
| --- | --- |
| `git status --short` | FAIL: `fatal: not a git repository...` |
| `git branch --show-current` | FAIL: `fatal: not a git repository...` |
| `git log --oneline -10` | FAIL: `fatal: not a git repository...` |
| `git diff --stat` | FAIL: `warning: Not a git repository...` |

Important nuance: `Get-ChildItem -Force` shows a `.git` directory exists, but Git itself does not recognize the current working tree during this audit. Branch, recent commits, diff stat, modified files and uncommitted files are NOT VERIFIED.

Existing audit/planning docs found:

- `doc/gsc-supporting-content-plan.md`
- `doc/local-citations-nap.md`
- `doc/khon-kaen-backlink-outreach.md`
- `doc/แผน-SEO-WINNER-IT-ขอนแก่น.md`

## 15. Critical Issues

### P0 — ต้องแก้ก่อน deploy หรือก่อน index

1. Robots sitemap domain mismatch
   - Files/URLs: `public/robots.txt`, `astro.config.mjs`
   - Evidence: robots uses `https://www.itbuy-khonkaen.com/sitemap-index.xml`; Astro site uses `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com`
   - Impact: Search engines may be pointed to the wrong sitemap host.
   - High-level fix: align robots sitemap URL with canonical production domain.

2. Git state not verifiable
   - Files/URLs: repository root
   - Evidence: all Git audit commands returned fatal not-a-repository errors.
   - Impact: Cannot safely confirm current branch, uncommitted work, or recent commit history before deploy.
   - High-level fix: verify repo/worktree state outside this audit before deployment.

### P1 — ต้องแก้ก่อนเริ่มขยาย SEO

1. Missing OG image across all pages
   - Files/URLs: `src/layouts/Base.astro`, all built pages
   - Evidence: metadata scan found `ogImage: 86` missing.
   - Impact: Social shares look weak and trust proof is reduced.
   - High-level fix: create real branded OG images and add `og:image`/Twitter image.

2. No analytics or conversion tracking detected
   - Files/URLs: `src`, `public`, `astro.config.mjs`
   - Evidence: `rg` found no GA/GTM/GSC verification, LINE click event, phone click event, or dataLayer patterns.
   - Impact: Cannot measure SEO traffic, LINE clicks, phone clicks, or conversion flow.
   - High-level fix: add measurement plan and event tracking after deciding GA4/GTM/consent approach.

3. No real visual proof assets
   - Files/URLs: `public`, `src/pages/[slug].astro`
   - Evidence: `publicImages: 1` and only `public/favicon.svg`; local pages render `ภาพพื้นที่` placeholder block.
   - Impact: Local SEO and E-E-A-T proof are weaker.
   - High-level fix: add real work photos, local meeting photos, product photos, anonymized case photos with alt/width/height.

### P2 — ควรทำเพื่อเพิ่มอันดับและ conversion

1. Breadcrumb schema limited to category pages
   - Evidence: `[slug].astro` creates BreadcrumbList only when `cat` exists.
   - Impact: Brand/model/local/condition pages have weaker structured navigation.
   - High-level fix: add breadcrumb schema per detail page type.

2. Article schema lacks clear publish/modified dates
   - Evidence: `src/layouts/Article.astro` schema snippet has Article author/publisher but no observed date fields.
   - Impact: Content freshness is less explicit.
   - High-level fix: add date fields per article only where dates are known.

3. No 404 page detected
   - Evidence: no `src/pages/404.astro`.
   - Impact: Poor recovery for wrong Thai slugs and old URLs.
   - High-level fix: create helpful 404 with search/cluster links.

### P3 — งานปรับปรุงระยะต่อไป

1. Add browser QA for desktop/mobile pages.
2. Add explicit robots meta only if index/noindex control is needed.
3. Add skip link/focus-state audit improvements.
4. Add automated broken-link or HTML audit script if this project will keep scaling.
5. Expand iPhone model pages only after GSC evidence shows demand.

## 16. Current Readiness Score

| ด้าน | คะแนน | เหตุผล |
| --- | ---: | --- |
| Technical SEO | 7/10 | Build/sitemap/canonical solid; robots sitemap mismatch remains |
| On-page SEO | 8/10 | Titles/descriptions/H1 present; OG image missing |
| Content coverage | 8/10 | Strong clusters across category/brand/model/condition/local |
| Local SEO | 6/10 | Local pages and NAP exist; external GBP/citations and real local photos not verified |
| Entity/E-E-A-T | 5/10 | Company/contact/legal present; proof assets/reviews/team photos missing |
| Internal links | 7/10 | Cluster linking exists; orphan/broken link audit not automated |
| Mobile UX | 6/10 | Sticky CTA and responsive CSS present; browser QA not verified |
| Conversion | 6/10 | LINE/phone CTAs present; no form or event tracking |
| Schema | 6/10 | Useful schema present; detail breadcrumbs/date/image gaps |
| Measurement | 1/10 | Analytics/tracking not found |

Overall readiness estimate: 60/100.

## 17. Final Verdict

READY FOR INTERNAL QA

เหตุผล: เว็บไซต์ build ได้และมีโครงสร้าง SEO/local/content ที่ตรวจจาก source และ `dist` แล้วเป็นรูปเป็นร่างมากพอสำหรับ QA ภายใน แต่ยังไม่ควรเรียกว่า ready for indexing/deploy โดยไม่มีเงื่อนไข เพราะ robots sitemap domain mismatch, ไม่มี OG/real images, ไม่มี tracking และ Git state ไม่สามารถยืนยันได้ใน environment นี้.

## 18. Recommended Next Batch

Batch name: Pre-Index Technical Trust Fix

Goal: แก้ blocker ก่อนส่ง index และก่อนขยาย SEO เพิ่ม

สิ่งที่ต้องทำ:

- Align `public/robots.txt` sitemap URL กับ canonical production domain ใน `astro.config.mjs`.
- Add real OG image system in `Base.astro` with at least one branded default image.
- Add real visual assets for homepage, key money pages, and local pages.
- Add GA4/GTM/GSC verification and track LINE/phone click events.
- Add `404.astro` for old/wrong Thai slugs.
- Add browser QA pass for homepage, money page, local page, blog page on desktop/mobile.

ไฟล์ที่คาดว่าจะเกี่ยวข้อง:

- `public/robots.txt`
- `public/*`
- `src/layouts/Base.astro`
- `src/pages/404.astro`
- `src/components/StickyBar.astro`
- `src/pages/index.astro`
- `src/pages/[slug].astro`

สิ่งที่ห้ามแตะใน batch นี้:

- ห้ามเพิ่มหน้า local/brand/model ใหม่จนกว่า P0/P1 จะปิด
- ห้ามเพิ่ม review/rating schema ถ้าไม่มี source รีวิวจริง
- ห้าม claim มีหน้าร้านในขอนแก่นถ้าไม่มีหลักฐาน

Acceptance criteria:

- `npm run build` passes.
- `dist/sitemap-0.xml` URL count matches built HTML count.
- robots sitemap URL matches `astro.config.mjs site`.
- At least one `og:image` exists in every generated HTML page.
- GSC/GA/GTM or chosen measurement tags are visible in build output.
- LINE and phone clicks have explicit event hooks.
- Browser QA screenshots/checks completed for representative pages.

QA commands:

```text
npm run build
node --version
rg "og:image|google-site-verification|GTM-|gtag|dataLayer|click_line|click_phone" dist src public
```

Do not execute this batch as part of the current audit.
