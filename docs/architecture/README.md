# Local Authority Architecture — Structure-Only Expansion

สถานะ: `ARCHITECTURE_READY / CONTENT_HOLD`

## เป้าหมาย

ขยายเว็บ Local ขอนแก่นให้รองรับมากกว่า 350 หน้า โดยไม่สร้าง doorway pages และไม่ปล่อยหน้า skeleton เข้า Google ก่อนมีเนื้อหาคุณภาพ

## จำนวนหน้าใหม่ใน Registry

- Model / Series: 180
- Supporting Guides: 60
- Condition intents: 24
- B2B / Bulk intents: 22
- District pages: 21 (เติมอำเภอที่ยังไม่มี District Page ให้ครบ 26 อำเภอ เมื่อรวม District ที่มีอยู่เดิม)
- New authority hubs: 4
- รวมหน้า Structure-only: **311**
- Existing released/static routes detected by audit: **87**
- Forecast minimum built routes: **398**

> Existing route count includes 404/static detection; sitemap count must be verified by a real Astro build before deployment.

## Safety model

หน้าใหม่ทุกหน้าถูกสร้างด้วย URL ปลายทางที่ตั้งใจใช้จริง แต่มี lifecycle:

`HOLD_NOINDEX`

ผลคือ:

1. `<meta name="robots" content="noindex,follow">`
2. ถูกตัดออกจาก sitemap ผ่าน `astro.config.mjs`
3. ยังไม่ถูกลิงก์จาก released money pages โดยตั้งใจ
4. มี parent / directory / cluster relationship รอเปิดใช้เมื่อเนื้อหาพร้อม

## Release gate

ห้ามเปลี่ยนหน้าใดเป็น INDEX จนผ่านครบ:

- UNIQUE_INTENT
- UNIQUE_CONTENT
- INTERNAL_LINKS
- CANONICAL
- METADATA
- QUALITY_QA

การเพิ่มจำนวน URL ไม่ถือเป็นเหตุผลให้เปิด Index

## Internal-link contract

โครงสร้างใหม่เก็บความสัมพันธ์ 4 ระดับ:

- `parent` — Money Page หรือ Hub หลัก
- `directory` — Directory/Authority Hub
- `cluster` — กลุ่ม sibling ที่ intent ใกล้กัน
- `seedLinks` — ลิงก์จาก Hub ไปหน้าที่เปิดใช้งานแล้ว

Skeleton page แสดง Parent/Directory + Cluster peers เพื่อให้ตรวจ graph ได้ก่อนเติม content จริง

**สำคัญ:** Released pages เดิมยังไม่ถูกบังคับให้ลิงก์หา HOLD pages เพื่อไม่ส่งผู้ใช้/Google ไปยังหน้าที่ยังไม่พร้อม

## URL policy

- ไม่แก้ URL เดิม
- ไม่สร้าง `สินค้า × อำเภอ`
- District ใช้ 1 Hub ต่ออำเภอ
- Model/Series ใช้ intent ของสินค้าเป็นตัวขยายจำนวนหน้า
- Condition และ B2B แยกเฉพาะ intent ที่สามารถสร้างข้อมูลเฉพาะจริงได้
- Guides อยู่ใต้ `/บทความ/`

## Files

- `src/data/architecture/models.js`
- `src/data/architecture/conditions.js`
- `src/data/architecture/b2b.js`
- `src/data/architecture/districts.js`
- `src/data/architecture/guides.js`
- `src/data/architecture/hubs.js`
- `src/data/architecture/index.js`
- `src/data/architectureRegistry.js` — compatibility re-export
- `src/components/ArchitectureSkeleton.astro`
- `src/pages/[slug].astro`
- `src/pages/บทความ/[slug].astro`
- `scripts/audits/architecture-audit.mjs`
- `docs/architecture/page-registry.csv`
- `docs/architecture/architecture-audit.json`

## Commands

```bash
npm run architecture:registry
npm run architecture:audit
npm run build
```

## ก่อน Deploy

1. `npm ci`
2. `npm run architecture:registry`
3. `npm run architecture:audit`
4. `npm run build`
4. ตรวจจำนวน sitemap เทียบ baseline production
5. ตรวจตัวอย่าง HOLD pages ว่ามี `noindex,follow`
6. ยืนยัน HOLD pages ไม่อยู่ sitemap
7. ตรวจ released 86 URLs เดิมว่า canonical / robots / H1 ไม่เปลี่ยน

## Content rollout ที่แนะนำ

เติมเนื้อหาทีละ cluster ไม่เกิน 10–20 หน้า/Batch แล้วค่อย Promote จาก `HOLD_NOINDEX` เป็น `INDEX` หลัง QA
