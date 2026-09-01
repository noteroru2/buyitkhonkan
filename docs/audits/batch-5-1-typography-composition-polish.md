# Batch 5.1 Typography & Desktop Composition Polish

## Executive Summary

Batch 5.1 ปรับเฉพาะงาน visual polish ตามข้อจำกัด: typography, content width, header branding, card hierarchy, 404 desktop composition และ Sticky CTA สำหรับบทความ โดยไม่เปลี่ยน URL, slug, title, meta description, canonical, robots, schema intent, Primary Keyword หรือ H1 text

ผลลัพธ์: Build ผ่าน, HTML = 87, Sitemap URLs = 86, 404 ไม่อยู่ใน sitemap, QA ผ่าน 56/56 viewport cases, broken internal links = 0, schema parse errors = 0

## Baseline

- Batch 5 เดิมผ่าน build 87 HTML files
- Sitemap มี 86 indexable URLs
- Responsive QA เดิมผ่าน 77 cases
- งานรอบนี้เป็น polish ต่อจาก design system เดิม ไม่ใช่ redesign ใหม่ทั้งระบบ

## Typography Problems

ปัญหาหลักคือ H1 ของบทความบน mobile 360-430px ดูแน่นเกินไป และหน้า Blog Index ช่วง tablet มีโอกาสเกิดการตัดบรรทัดที่ไม่สวย

การแก้ไข:

- ปรับ Article H1 ใน `src/layouts/Article.astro` ด้วย `clamp()` เฉพาะ typography
- ใช้ `text-wrap: balance` และ `overflow-wrap: break-word`
- Mobile 360-430px คุม H1 ให้อ่านง่ายขึ้นโดยไม่เปลี่ยนข้อความ
- Blog Index H1 ใน `src/pages/blog/index.astro` ปรับ max-width และ font-size ช่วง 768-1100px

ผล QA:

- Blog Article 360px: H1 3 lines
- Blog Article 390px: H1 3 lines
- Blog Article 1440px/1920px: H1 2 lines
- Blog Index 768px: H1 1 line
- Blog Index 1024px: H1 2 lines

## Article Width Changes

ปรับ layout บทความให้ใช้พื้นที่ desktop ดีขึ้นโดยยังรักษาความอ่านง่าย:

- `.post__shell`: `width: min(100% - 40px, 980px)`
- `.post__header`: `max-width: 940px`
- `.post__content`: `max-width: 820px`
- ตารางในบทความยังอยู่ในพื้นที่อ่านง่ายและไม่เกิด horizontal overflow

ผล QA:

- Article desktop header width: 940px
- Article desktop content width: 820px
- Mobile content width: 324px ที่ 360px และ 354px ที่ 390px

## 404 Composition

ปรับ `src/pages/404.astro` เฉพาะ desktop >= 1024px:

- Hero เป็น 2 columns
- ซ้ายเป็นข้อความและ CTA เดิม
- ขวาเป็น CSS/SVG visual “404” แบบ tech grid
- Mobile ยังคง layout หนึ่งคอลัมน์
- ไม่เพิ่ม SEO copy และไม่ใช้ภาพ AI

ผล QA 1440px:

- 404 desktop grid columns: `616px / 455px`
- Visual ด้านขวาแสดงผล
- H1 ยังมี 1 จุดและไม่ถูกตัด

## Header Branding

ปรับ `src/components/Header.astro`:

- `aria-label` ของ brand เป็น `WINNER IT ขอนแก่น`
- Desktop >= 1024px แสดง `WINNER IT` และ subtitle `ขอนแก่น` ในบรรทัดเดียว
- Tablet < 1024px ซ่อน subtitle
- Mobile แสดง `WINNER IT` และปุ่มโทรแบบสั้น `โทรเลย`
- Header height จาก QA อยู่ที่ 72px ไม่ wrap

## Card Variants

เพิ่ม card hierarchy ที่ `src/styles/global.css`:

- Card มี top accent line ตอน hover/focus-within
- Hover lift -2px
- Hover border primary แบบสุภาพ
- Shadow แยกระดับชัดขึ้น
- รองรับ reduced motion ผ่าน media query เดิม

นำไปกระทบเชิง visual กับ:

- Category Card
- Blog Card
- Resource Card
- 404 Link Card

## Sticky CTA Changes

ปรับ `src/components/StickyBar.astro` ให้รองรับ `variant="article"` และส่งค่าจาก `src/layouts/Article.astro` ผ่าน `src/layouts/Base.astro`

สำหรับบทความ:

- Mobile sticky height ประมาณ 56px
- LINE label เป็น `ส่งข้อมูลผ่าน LINE`
- Phone label ยังคง `โทรเลย`
- Event tracking ยังใช้ `click_line` และ `click_phone` จาก handler เดิม
- QA ยืนยันว่า sticky CTA ไม่บัง footer ใน viewport ที่ตรวจ

## Responsive QA

สคริปต์ QA:

- `docs/audits/run-batch-5-1-qa.js`
- ผลลัพธ์: `docs/audits/batch-5-1-qa-results.json`

ตรวจ 8 หน้า:

- Homepage
- Notebook
- Local Page
- Blog Index
- Blog Article MacBook
- Blog Article iPhone
- Contact
- 404

Viewports:

- 360x800
- 390x844
- 430x932
- 768x1024
- 1024x768
- 1440x900
- 1920x1080

ผลรวม:

- Checked: 56
- Failures: 0
- Horizontal overflow: 0
- Console errors: 0
- Failed first-party requests: 0

## Accessibility

- H1 ยังมี 1 จุดต่อหน้าที่ตรวจ
- Header brand มี accessible label ที่ชัดขึ้น
- Sticky CTA ยังมี aria-label และ tracking attributes เดิม
- Focus state ของ card ใช้ `focus-within`
- Reduced motion ยังถูกคุมใน global CSS

## SEO Regression Guard

ผลจาก static audit:

- HTML files = 87
- Sitemap URLs = 86
- 404 in sitemap = false
- Missing title = 0
- Duplicate title = 0
- Missing description = 0
- Missing canonical = 0
- Missing H1 = 0
- Multiple H1 = 0
- Schema parse errors = 0
- Broken internal links = 0

ไม่มีการแก้ title, meta description, canonical, robots, slug, schema content, article dates หรือ H1 text

## Files Changed

- `src/styles/global.css`
- `src/layouts/Base.astro`
- `src/layouts/Article.astro`
- `src/components/Header.astro`
- `src/components/StickyBar.astro`
- `src/pages/404.astro`
- `src/pages/blog/index.astro`
- `docs/audits/run-batch-5-1-qa.js`
- `docs/audits/batch-5-1-qa-results.json`
- `docs/audits/screenshots/batch-5-1/after/`
- `docs/audits/screenshots/batch-5-1/before/`

## Build Result

Build command:

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

Result:

- Passed
- 87 pages built
- Sitemap generated

## Screenshot Paths

Required evidence files are present in:

- `docs/audits/screenshots/batch-5-1/after/blog-index-768-after.png`
- `docs/audits/screenshots/batch-5-1/after/blog-index-1024-after.png`
- `docs/audits/screenshots/batch-5-1/after/blog-article-360-after.png`
- `docs/audits/screenshots/batch-5-1/after/blog-article-390-after.png`
- `docs/audits/screenshots/batch-5-1/after/blog-article-1440-after.png`
- `docs/audits/screenshots/batch-5-1/after/blog-article-1920-after.png`
- `docs/audits/screenshots/batch-5-1/after/404-390-after.png`
- `docs/audits/screenshots/batch-5-1/after/404-1440-after.png`
- `docs/audits/screenshots/batch-5-1/after/header-768-after.png`
- `docs/audits/screenshots/batch-5-1/after/header-1024-after.png`

## Remaining Risks

- QA เป็น automated browser check จาก local `dist/` ไม่ใช่ production smoke test
- Visual judgment ขั้นสุดท้ายยังควรดูภาพ screenshot จริงบนจอ human QA
- Screenshot ถูกสร้างไว้ใน workspace แต่ไม่ได้ commit ตามข้อกำหนดของงาน

## Final Verdict

PASS — PREMIUM UI POLISH COMPLETE
