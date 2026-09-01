# Content Batch 13 — Model Expansion Quality Round

## Verdict

**PASS_WITH_BUILD_WARNING**

## Scope

Batch 13 ขยาย Model / Series ที่เปิด Index จาก **88 → 112 หน้า** โดย Release เพิ่ม **24 หน้า** จากกลุ่มที่มี commercial intent ชัดและสามารถเขียนจุดตรวจเฉพาะรุ่น/ซีรีส์ได้จริง

- Notebook: **9**
- MacBook: **4**
- iPhone: **5**
- iPad / Tablet: **3**
- GPU: **3**

Model ที่ยังไม่พร้อมยังคง `HOLD_NOINDEX` **68 หน้า** และไม่ได้ถูกบังคับเปิดเพื่อให้ครบจำนวน

## Release list

### Notebook — 9 หน้า
- `asus-rog-strix-g18` — รับซื้อ ASUS ROG Strix G18 ขอนแก่น
- `asus-tuf-gaming-a14` — รับซื้อ ASUS TUF Gaming A14 ขอนแก่น
- `asus-tuf-gaming-a16` — รับซื้อ ASUS TUF Gaming A16 ขอนแก่น
- `lenovo-thinkpad-t14` — รับซื้อ Lenovo ThinkPad T14 ขอนแก่น
- `lenovo-thinkpad-x1-carbon` — รับซื้อ Lenovo ThinkPad X1 Carbon ขอนแก่น
- `acer-nitro-5` — รับซื้อ Acer Nitro 5 ขอนแก่น
- `hp-omen-16` — รับซื้อ HP Omen 16 ขอนแก่น
- `dell-g15` — รับซื้อ Dell G15 ขอนแก่น
- `msi-katana-15` — รับซื้อ MSI Katana 15 ขอนแก่น

### MacBook — 4 หน้า
- `macbook-pro-13-m1` — รับซื้อ MacBook Pro 13 M1 ขอนแก่น
- `macbook-pro-16-m1-pro` — รับซื้อ MacBook Pro 16 M1 Pro ขอนแก่น
- `macbook-pro-14-m3` — รับซื้อ MacBook Pro 14 M3 ขอนแก่น
- `macbook-pro-16-m4-pro` — รับซื้อ MacBook Pro 16 M4 Pro ขอนแก่น

### iPhone — 5 หน้า
- `iphone-12` — รับซื้อ iPhone 12 ขอนแก่น
- `iphone-12-pro-max` — รับซื้อ iPhone 12 Pro Max ขอนแก่น
- `iphone-14-pro` — รับซื้อ iPhone 14 Pro ขอนแก่น
- `iphone-15` — รับซื้อ iPhone 15 ขอนแก่น
- `iphone-16-pro` — รับซื้อ iPhone 16 Pro ขอนแก่น

### iPad / Tablet — 3 หน้า
- `ipad-gen-9` — รับซื้อ iPad Gen 9 ขอนแก่น
- `ipad-air-4` — รับซื้อ iPad Air 4 ขอนแก่น
- `ipad-mini-6` — รับซื้อ iPad mini 6 ขอนแก่น

### GPU — 3 หน้า
- `rtx-3060` — รับซื้อ GeForce RTX 3060 ขอนแก่น
- `rtx-4070` — รับซื้อ GeForce RTX 4070 ขอนแก่น
- `rtx-5060-ti` — รับซื้อ GeForce RTX 5060 Ti ขอนแก่น

## Content quality contract

ทุกหน้า Release มีเนื้อหาเฉพาะรุ่น/ซีรีส์ ได้แก่:

- วิธีแยก generation / SKU / configuration ที่มีผลต่อการประเมิน
- จุดตรวจเฉพาะรุ่น เช่น GPU, จอ, RAM, storage, battery, warranty หรือ account lock
- ปัจจัยที่ทำให้ราคาขยับขึ้น/ลงโดย **ไม่ใส่ราคารับซื้อปัจจุบันแบบเดา**
- Seller checklist สำหรับข้อมูลที่ควรส่งทาง LINE
- ความเสี่ยงหรือสิ่งที่ควรจัดการก่อนส่งมอบ
- FAQ เฉพาะ intent
- Related released models / conditions / guides
- Manufacturer / official support source

ข้อมูลที่เกี่ยวกับบัญชีและการจัดการเครื่องเน้นการดำเนินการโดยเจ้าของอุปกรณ์ เช่น Find My / Activation Lock / MDM / Autopilot และไม่มีคำแนะนำ bypass security

## Architecture state after Batch 13

- Architecture records: **311**
- Architecture `INDEX`: **235**
- Architecture `HOLD_NOINDEX`: **76**
- Model / Series total: **180**
- Model / Series `INDEX`: **112**
- Model / Series `HOLD_NOINDEX`: **68**
- Forecast built routes minimum: **398+**

## Internal Link / Discovery

เพื่อไม่ให้รุ่นใหม่เป็น orphan ได้ขยาย discovery capacity แบบ lifecycle-aware:

- Category released models: สูงสุด **16**
- Category child cards: สูงสุด **18**
- Brand released models: สูงสุด **10**
- Brand detail cards: สูงสุด **12**

ผล Discovery Audit:

- Contexts audited: **203**
- Unique live internal targets: **305**
- Broken discovery links: **0**
- Links to `HOLD_NOINDEX`: **0**
- Thin discovery contexts: **0**

## Release gates

### Content Batch 13 Audit — PASS

- Release pages: **24/24**
- Missing content: **0**
- Lifecycle mismatch: **0**
- Parent mismatch: **0**
- Bad related links: **0**
- Unlinked released pages: **0**
- HOLD leaks: **0**
- Duplicate Title: **0**
- Duplicate Description: **0**
- Duplicate Intro: **0**
- Missing / invalid manufacturer source: **0**
- Unsafe claims: **0**
- Fixed numeric buy-price claims: **0**
- Metadata length findings: **0**

### Regression — PASS

- Previous Model content preserved: **88/88**
- Unexpected changes to old Model content: **0**
- Unexpected changes to existing URL/H1 ownership: **0**
- Protected files checked: **19**
- Unexpected protected-file changes: **0**

### Architecture — PASS

- Duplicate ID / path / title / H1: **0**
- Route collision: **0**
- Missing parent: **0**
- Invalid lifecycle: **0**
- Product × District doorway matrix: **0**

### Historical audits

Batch 2, Batch 3, Batch 4 และ Batch 5 Model release audits ยัง **PASS** หลัง Model cluster ขยายเป็น 112 หน้า โดยปรับ Batch 3 historical check ให้รองรับ dynamic `releaseBatch` marker ของ component ปัจจุบันแทน hard-code รุ่นเก่า

## Build status

**BUILD WARNING**

มีการ attempt `npm ci` อีกครั้งใน sandbox แต่ dependency installation ไม่จบภายใน runtime/network timeout จึง **ไม่ได้อ้างว่า Full Astro Build ผ่าน** ไม่มี build error จาก Astro ที่ถูกยืนยันในรอบนี้

ก่อนแพ็ก release ได้ลบ `node_modules` และ `dist` ที่อาจติดตั้ง/สร้างค้างออกทั้งหมด

## Recommended next gate

ยังเหลือ Model / Series `HOLD_NOINDEX` 68 หน้า ควรทำรอบถัดไปด้วย quality selection เหมือน Batch 13 ไม่ใช่เปิดทั้งหมดพร้อมกัน โดยควรเน้น topical breadth ที่ยังบางกว่า Notebook / Apple ก่อน แล้วเก็บรุ่นที่ intent ทับกันไว้ HOLD หรือ consolidate
