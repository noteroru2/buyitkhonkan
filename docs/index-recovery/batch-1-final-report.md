# Index Recovery Batch 1 — Final Report

## Verdict

**PASS_WITH_WARNING**

โครงสร้าง internal link, indexability inventory, sitemap และ browser QA ผ่านโดยไม่เพิ่ม URL, ไม่เปลี่ยน URL/canonical/H1 intent ของหน้า Winner และไม่ deploy อย่างไรก็ตาม ยังไม่ควร merge/noindex/redirect หน้าที่อยู่ใน cannibalization clusters จนกว่าจะมี URL-level GSC data ยืนยัน และ global `npm` ในเครื่องมี installation path เสีย จึงใช้ Astro CLI ที่ติดตั้งในโปรเจกต์สำหรับ build แทน

## Git

- Start SHA: `ddef66aea92caea27f57a5dc2f2af62b030e3948`
- End SHA (implementation): `7e9242ff6040e358345b24749f4ad3a0cf85e3fc`
- Branch: `seo/index-recovery-batch-1`
- Commit: `7e9242ff6040e358345b24749f4ad3a0cf85e3fc` — `feat(seo): strengthen index recovery architecture`
- Push status: **NOT PUSHED**
- Pre-existing working tree changes: รายงานเดิม 7 ไฟล์ยังคงอยู่และไม่ถูกรวมใน commit นี้

## GSC Baseline

- Known URLs: ประมาณ 89
- Indexed: ประมาณ 4
- Discovered – currently not indexed: ประมาณ 82
- Redirected: ประมาณ 3
- Sitemap count: ประมาณ 86

ตัวเลขข้างต้นมาจาก baseline ที่เจ้าของเว็บให้สำหรับ Batch นี้ ไม่ได้ดึง GSC ใหม่ในรอบนี้

## URL Classification

- Tier A: **22 URLs**
- Tier B: **50 URLs**
- Tier C: **14 URLs**

Tier A:

1. `/`
2. `/รับซื้อโน้ตบุ๊ก-ขอนแก่น/`
3. `/รับซื้อคอมพิวเตอร์-ขอนแก่น/`
4. `/รับซื้อ-macbook-ขอนแก่น/`
5. `/รับซื้อ-iphone-ขอนแก่น/`
6. `/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/`
7. `/รับซื้อการ์ดจอ-ขอนแก่น/`
8. `/รับซื้อเครื่องเกม-ขอนแก่น/`
9. `/รับเหมาอุปกรณ์ไอที-ขอนแก่น/`
10. `/สภาพสินค้าที่ขายได้/`
11. `/พื้นที่ให้บริการ/`
12. `/รับซื้อไอที-เมืองขอนแก่น/`
13. `/รับซื้อโน้ตบุ๊ก-ipad-มข-กังสดาล/`
14. `/รับซื้อไอที-บ้านเป็ด/`
15. `/รับซื้อไอที-ศิลา/`
16. `/บทความ/`
17. `/บทความ/ราคารับซื้อ-macbook-มือสอง/`
18. `/บทความ/ราคารับซื้อ-การ์ดจอ/`
19. `/บทความ/ราคารับซื้อ-ps5-nintendo-switch/`
20. `/บทความ/เช็คลิสต์ก่อนขายโน้ตบุ๊ก/`
21. `/บทความ/วิธีลบข้อมูล-iphone-ก่อนขาย/`
22. `/บทความ/รับซื้อสินค้าไอทีใกล้ฉัน-ขอนแก่น/`

Inventory ครบ 86 canonical indexable URLs อยู่ที่ `batch-1-url-inventory.csv` และ `batch-1-url-inventory.json` โดยมี URL, page type, title, H1, canonical, robots, parent hub, inbound/outbound links, uniqueness, intent, cannibalization, tier และ recommended action

## Internal Linking

### Before

- Category template ใช้ `others.slice(0, 6)` ทำให้แต่ละหน้าลิงก์ตามลำดับ array มากกว่าความสัมพันธ์ของ intent
- Category hubs ไม่มีชุด child links ไป brand/model/condition ที่ชัดเจน
- Local pages ไม่มี lateral links ตามพื้นที่ใกล้เคียง
- Model relationships ที่ชี้ condition pages ไม่ถูก render
- Condition pages ใช้ product category เป็น breadcrumb parent แทน condition hub

### After

- ลบ generic related-category block ออกจาก 15 category pages
- กำหนด semantic category → child links **45 ความสัมพันธ์** สำหรับ Notebook, MacBook, iPad, Computer/GPU, iPhone, Smartphone, Game Console และ Bulk Buyout
- เพิ่ม local contextual links **16 ความสัมพันธ์** ระหว่าง 8 local pages
- render model → condition links **4 ความสัมพันธ์** ที่มีอยู่จริงในข้อมูล
- เพิ่ม condition hub → product category links 5 หมวด และ condition child → condition hub breadcrumbs 5 หน้า
- ทุก URL ใน inventory มี inbound internal link อย่างน้อย 1 ลิงก์; Tier A มี inbound เฉลี่ย 39.3 ลิงก์จากผล crawl ของ static build
- แก้ related article 12 หมวด: เปลี่ยนเป็นบทความตรง intent 6 หมวด และไม่แสดงบทความใน 6 หมวดที่ไม่มีบทความตรงเรื่อง

## Cannibalization

### Condition general

- URLs: `/สภาพสินค้าที่ขายได้/`, `/บทความ/ของพังขายได้ไหม/`
- Primary intent: ภาพรวมสภาพสินค้าที่ส่งประเมินได้
- Secondary intent: บทความอธิบายผลของอาการเสีย
- Best winner: `/สภาพสินค้าที่ขายได้/` (**PROTECTED**)
- Action: **KEEP** hub; **REVIEW** article หลังดู GSC query/page data
- Risk: Medium

### Screen damage

- URLs: `/จอแตกขายได้ไหม/`, `/บทความ/จอแตกขายได้ไหม-ขอนแก่น/`, `/รับซื้อโน้ตบุ๊กจอแตก-ขอนแก่น/`
- Primary intent: จอแตกยังขายได้หรือไม่
- Secondary intent: ข้อมูล local และบริการรับซื้อโน้ตบุ๊กจอแตก
- Best winner: `/จอแตกขายได้ไหม/` สำหรับคำถามทั่วไป; หน้ารับซื้อโน้ตบุ๊กเป็น commercial-specific support
- Action: **KEEP** condition/model pages; **REVIEW** article ก่อน merge/canonical decision
- Risk: Medium–High

### Notebook fault

- URLs: `/รับซื้อโน้ตบุ๊กเสีย-ขอนแก่น/`, `/รับซื้อโน้ตบุ๊กเปิดไม่ติด-ขอนแก่น/`, `/เปิดไม่ติดขายได้ไหม/`
- Primary intent: ขายโน้ตบุ๊กเสียในขอนแก่น
- Secondary intent: อาการเปิดไม่ติดแบบเฉพาะเจาะจง และคำถามข้ามประเภทสินค้า
- Best winner: `/รับซื้อโน้ตบุ๊กเสีย-ขอนแก่น/` สำหรับ commercial broad intent
- Action: **REVIEW** ทั้ง cluster เมื่อมี GSC page/query data; ยังไม่ merge หรือ redirect
- Risk: High

### iPhone price

- URLs: `/รับซื้อ-iphone-ขอนแก่น/`, `/บทความ/รับซื้อ-iphone-ขอนแก่น-ราคา/`, `/บทความ/ราคารับซื้อ-iphone-มือสอง/`
- Primary intent: บริการรับซื้อ iPhone ขอนแก่น
- Secondary intent: ปัจจัยราคาและข้อมูลก่อนประเมิน
- Best winner: `/รับซื้อ-iphone-ขอนแก่น/` สำหรับ commercial/local query
- Action: **KEEP** service page; **REVIEW** บทความทั้งสองเพื่อหา article winner ก่อน consolidation
- Risk: High

ไม่มีการ MERGE, NOINDEX หรือ REDIRECT ใน Batch นี้ เพราะยังไม่มี page-level GSC evidence เพียงพอ

## Content

- Pages enriched: 34 rendered URLs ได้ parent/child, sibling, breadcrumb หรือ schema relationships ที่เกี่ยวข้องมากขึ้น
- Pages unchanged: 52 URLs ไม่มีการเปลี่ยน primary content/intent
- Pages merged: 0
- Pages noindexed: 0
- Pages redirected: 0
- Winner URLs/titles/H1/canonical: คงเดิม
- ไม่มี business facts, ราคา, review, location หรือรูปสถานที่ปลอมเพิ่ม

## Structured Data

- Category pages: BreadcrumbList + Service + visible FAQPage
- Local pages: เพิ่ม FAQPage จากคำถามที่แสดงจริง พร้อม BreadcrumbList + Service
- Area hub และ Condition hub: เพิ่ม page-specific BreadcrumbList
- Homepage Organization/WebSite และ protected schemas เดิมคงไว้
- ไม่เพิ่ม Review หรือ AggregateRating

## Sitemap

- Before URL count: 86
- After URL count: 86
- Added: 0
- Removed: 0
- Redirect/noindex/404/duplicate alias in sitemap: 0 จาก static audit

## QA

- `npm install`: **ENVIRONMENT WARNING** — global npm ชี้ไปยัง `C:\Users\User\AppData\Roaming\npm\node_modules\npm\bin\npm-cli.js` ที่ไม่มีอยู่
- Dependency recovery: ใช้ bundled pnpm ติดตั้ง dependencies; build ใช้ project-local Astro CLI
- `npm run check`: **NOT AVAILABLE** — ไม่มี `check` script และ global npm ใช้งานไม่ได้
- Build: **PASS** — Astro 5.18.2, 87 pages built (86 indexable + 404), sitemap generated
- SEO audit: **PASS** — 86/86 sitemap membership, 0 broken internal links, 0 duplicate title/description/H1/canonical, 0 accidental noindex/canonical mismatch
- Sitemap audit: **PASS** — 86 canonical indexable URLs
- Lint/test scripts: **NOT AVAILABLE** ใน `package.json`
- Existing metadata/batch12 audits: ไม่รัน เพราะ output files ของ audit เหล่านี้มี user changes ค้างอยู่ก่อนเริ่ม Batch และการรันจะ overwrite งานเดิม
- Browser QA: **PASS** ที่ 390×844 และ 1440×900 สำหรับ Homepage, Notebook, MacBook, Computer/GPU hub, Condition hub, Area hub และ child pages 3 หน้า (Notebook screen crack, MacBook Air, Mueang Khon Kaen)
- Browser checks: 0 horizontal overflow, 0 broken images, 0 console warnings/errors, H1/CTA/footer/breadcrumb/mobile menu แสดงตามบริบท

## Risks

- Google ยังอาจไม่ index เพิ่มทันที เพราะ crawl demand, site authority, backlinks และ historical quality signals อยู่นอก codebase
- Tier C cannibalization clusters ต้องใช้ GSC URL/query evidence ก่อนตัดสินใจ merge/noindex/redirect
- Global npm installation ของเครื่องควรซ่อมก่อน Batch ถัดไป เพื่อให้คำสั่งมาตรฐานทำงานตรงกับ CI
- Sitemap count คงเดิมตามเป้าหมาย แต่ผล indexing ต้องติดตามหลัง crawl รอบใหม่

## Next Batch Recommendation

1. ส่ง/ตรวจ sitemap ใน GSC และทำ URL Inspection เฉพาะ 22 Tier A ตามลำดับความสำคัญ
2. เก็บ page/query/click/impression/canonical data ของ 4 cannibalization clusters อย่างน้อย 2–4 สัปดาห์
3. ตัดสินใจ consolidation เฉพาะ cluster ที่ GSC ชี้ winner ชัด โดยรักษา `/สภาพสินค้าที่ขายได้/`
4. เพิ่ม evidence จริง เช่น รูปกระบวนการ/จุดตรวจ/ข้อมูลรุ่น เฉพาะ Tier A ที่มีหลักฐานในธุรกิจ
5. ไม่ขยาย Local หรือ Brand × Model × Area URLs จนกว่า index rate ของ inventory เดิมดีขึ้น

## Deployment

**NOT DEPLOYED — NOT MERGED**
