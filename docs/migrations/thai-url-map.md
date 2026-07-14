# Thai URL Migration Map and Collision Audit (Batch 6A)

## 1. Executive Summary
รายงานฉบับนี้จัดทำขึ้นเพื่อเตรียมการเปลี่ยนโครงสร้าง URL ของเว็บไซต์ **WINNER IT ขอนแก่น** จากเดิมที่เป็น URL ภาษาอังกฤษผสมภาษาไทย (Mixed Slugs) ไปสู่โครงสร้าง **Thai URL Hybrid** อย่างเป็นระบบ เพื่อประสิทธิภาพสูงสุดด้าน On-Page SEO และการเข้าถึงข้อมูลของผู้ใช้งานในท้องถิ่นขอนแก่น

### สรุปตัวเลขสถิติ:
- **จำนวนหน้าทั้งหมดในระบบ (Sitemap Indexable URLs)**: 86 หน้า
- **จำนวนหน้า Custom 404 (Excluded from sitemap)**: 1 หน้า (`/404.html`)
- **สถานะการจัดทำ Redirect Map**:
  - **KEEP (คงเดิม)**: 37 หน้า (ส่วนใหญ่เป็น URL ภาษาไทยและภาษาไทยไฮบริดที่ถูกต้องอยู่แล้ว)
  - **308 PERMANENT (เปลี่ยนและย้าย)**: 49 หน้า (ประกอบด้วยหน้าหมวดหมู่ภาษาอังกฤษ, หน้า static และบทความบล็อก)
  - **MANUAL REVIEW (ต้องตรวจสอบ/อนุมัติเพิ่มเติม)**: 0 หน้า
- **อัตราการเกิด Collision (ชนกันของ URL)**: **0 จุด** (ความขัดแย้งของ URL = 0)

---

## 2. URL Naming Rules
การกำหนด URL โครงสร้างภาษาไทยแบบ Hybrid ดำเนินการตามกฎเกณฑ์ดังนี้:
1. **คีย์เวิร์ดภาษาไทยธรรมชาติ**: ใช้คำที่ผู้ใช้ท้องถิ่นเข้าใจและค้นหาจริง (เช่น `รับซื้อ`, `ขอนแก่น`, `จอแตก`)
2. **ขีดกลางคั่นคำ**: ใช้ `-` ในการแยกคำเพื่อให้อ่านง่ายและเหมาะสมกับ SEO Crawler ของ Google
3. **รักษาคำอังกฤษที่สำคัญ**: คงแบรนด์และชื่อรุ่นเฉพาะทางเป็นตัวพิมพ์เล็ก (เช่น `iphone`, `macbook`, `rtx`)
4. ** evergreen URL**: ไม่มีวันเดือนปีหรือคำบ่งบอกเวลาใน URL บทความเพื่อป้องกันลิงก์เสียในอนาคต
5. **ป้องกัน Keyword Stuffing**: หลีกเลี่ยงคำซ้ำซ้อน เช่น `รับซื้อ-รับซื้อ` หรือ `ขอนแก่น-ขอนแก่น`

---

## 3. Full Mapping
ตารางแสดงโครงสร้าง URL ทั้งหมด 86 หน้า:

| # | Current URL | Proposed Thai Hybrid URL | Page Type | Source File/Data | Redirect Status | Collision Status |
|---|---|---|---|---|---|---|
| 1 | `/` | `/` | Home Page | `src/pages/index.astro` | **KEEP** | No Collision |
| 2 | `/%E0%B8%88%E0%B8%AD%E0%B9%81%E0%B8%95%E0%B8%81%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B9%84%E0%B8%94%E0%B9%89%E0%B9%84%E0%B8%AB%E0%B8%A1/` | `/จอแตกขายได้ไหม/` | Condition Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 3 | `/%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%9A%E0%B8%B1%E0%B8%8D%E0%B8%8A%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B9%84%E0%B8%94%E0%B9%89%E0%B9%84%E0%B8%AB%E0%B8%A1/` | `/ติดบัญชีขายได้ไหม/` | Condition Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 4 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-acer-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-acer-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 5 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-asus-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-asus-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 6 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-cpu-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-cpu-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 7 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-dell-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-dell-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 8 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-hp-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-hp-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 9 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-ipad-air-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-ipad-air-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 10 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-ipad-gen-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-ipad-gen-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 11 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-ipad-mini-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-ipad-mini-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 12 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-ipad-pro-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-ipad-pro-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 13 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-lenovo-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-lenovo-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 14 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-macbook-air-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-macbook-air-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 15 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-macbook-intel-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-macbook-intel-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 16 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-macbook-m1-m5-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-macbook-m1-m5-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 17 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-macbook-pro-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-macbook-pro-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 18 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-msi-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-msi-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 19 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-ram-ssd-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-ram-ssd-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 20 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-rtx-30-series-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-rtx-30-series-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 21 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-rtx-40-series-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-rtx-40-series-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 22 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-rtx-50-series-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-rtx-50-series-ขอนแก่น/` | Brand/Model Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 23 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD-workstation-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อ-workstation-ขอนแก่น/` | Dynamic Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 24 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%A2%E0%B8%81%E0%B8%A5%E0%B9%87%E0%B8%AD%E0%B8%95-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อคอมยกล็อต-ขอนแก่น/` | Dynamic Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 25 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อคอมสำนักงาน-ขอนแก่น/` | Dynamic Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 26 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%A1%E0%B8%A1%E0%B8%B4%E0%B9%88%E0%B8%87-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อคอมเกมมิ่ง-ขอนแก่น/` | Dynamic Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 27 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%82%E0%B8%99%E0%B9%8A%E0%B8%95%E0%B8%9A%E0%B8%B8%E0%B9%8A%E0%B8%84%E0%B8%88%E0%B8%AD%E0%B9%81%E0%B8%95%E0%B8%81-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อโน้ตบุ๊กจอแตก-ขอนแก่น/` | Model Page (Spelling Redirect) | `src/pages/[slug].astro` | **308 PERMANENT** | No Collision |
| 28 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%82%E0%B8%99%E0%B9%8A%E0%B8%95%E0%B8%9A%E0%B8%B8%E0%B9%8A%E0%B8%84%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B8%B4%E0%B8%94-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อโน้ตบุ๊กเปิดไม่ติด-ขอนแก่น/` | Model Page (Spelling Redirect) | `src/pages/[slug].astro` | **308 PERMANENT** | No Collision |
| 29 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%82%E0%B8%99%E0%B9%8A%E0%B8%95%E0%B8%9A%E0%B8%B8%E0%B9%8A%E0%B8%84%E0%B9%80%E0%B8%81%E0%B8%A1%E0%B8%A1%E0%B8%B4%E0%B9%88%E0%B8%87-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อโน้ตบุ๊กเกมมิ่ง-ขอนแก่น/` | Model Page (Spelling Redirect) | `src/pages/[slug].astro` | **308 PERMANENT** | No Collision |
| 30 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%82%E0%B8%99%E0%B9%8A%E0%B8%95%E0%B8%9A%E0%B8%B8%E0%B9%8A%E0%B8%84%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B8%A2-%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อโน้ตบุ๊กเสีย-ขอนแก่น/` | Model Page (Spelling Redirect) | `src/pages/[slug].astro` | **308 PERMANENT** | No Collision |
| 31 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%82%E0%B8%99%E0%B9%89%E0%B8%95%E0%B8%9A%E0%B8%B8%E0%B9%8A%E0%B8%84-ipad-%E0%B8%A1%E0%B8%82-%E0%B8%81%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%94%E0%B8%B2%E0%B8%A5/` | `/รับซื้อโน้ตบุ๊ก-ipad-มข-กังสดาล/` | Local Page (Spelling Redirect) | `src/pages/[slug].astro` | **308 PERMANENT** | No Collision |
| 32 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B9%81%E0%B8%9E/` | `/รับซื้อไอที-ชุมแพ/` | Local Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 33 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94/` | `/รับซื้อไอที-บ้านเป็ด/` | Local Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 34 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%9C%E0%B9%88/` | `/รับซื้อไอที-บ้านไผ่/` | Local Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 35 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B8%9E%E0%B8%A5/` | `/รับซื้อไอที-พล/` | Local Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 36 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%9E%E0%B8%AD%E0%B8%87/` | `/รับซื้อไอที-น้ำพอง/` | Local Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 37 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B8%A8%E0%B8%B4%E0%B8%A5%E0%B8%B2/` | `/รับซื้อไอที-ศิลา/` | Local Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 38 | `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/` | `/รับซื้อไอที-เมืองขอนแก่น/` | Local Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 39 | `/%E0%B8%AA%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B9%84%E0%B8%94%E0%B9%89/` | `/สภาพสินค้าที่ขายได้/` | Static Page (Thai) | `src/pages/สภาพสินค้าที่ขายได้.astro` | **KEEP** | No Collision |
| 40 | `/%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B9%84%E0%B8%94%E0%B9%89%E0%B9%84%E0%B8%AB%E0%B8%A1/` | `/เปิดไม่ติดขายได้ไหม/` | Condition Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 41 | `/%E0%B9%81%E0%B8%9A%E0%B8%95%E0%B8%9A%E0%B8%A7%E0%B8%A1%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B9%84%E0%B8%94%E0%B9%89%E0%B9%84%E0%B8%AB%E0%B8%A1/` | `/แบตบวมขายได้ไหม/` | Condition Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 42 | `/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A1%E0%B8%B5%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B9%84%E0%B8%94%E0%B9%89%E0%B9%84%E0%B8%AB%E0%B8%A1/` | `/ไม่มีกล่องขายได้ไหม/` | Condition Page | `src/pages/[slug].astro` | **KEEP** | No Collision |
| 43 | `/about/` | `/เกี่ยวกับเรา/` | Static Page | `src/pages/about.astro` | **308 PERMANENT** | No Collision |
| 44 | `/appliance/` | `/รับซื้ออุปกรณ์ไอทีสำนักงาน-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 45 | `/blog/` | `/บทความ/` | Blog Index | `src/pages/blog/index.astro` | **308 PERMANENT** | No Collision |
| 46 | `/blog/close-office-it-asset/` | `/บทความ/เคลียร์อุปกรณ์ไอที-ย้ายออฟฟิศ/` | Blog Article | `src/pages/blog/close-office-it-asset.astro` | **308 PERMANENT** | No Collision |
| 47 | `/blog/damaged-device-can-sell/` | `/บทความ/ของพังขายได้ไหม/` | Blog Article | `src/pages/blog/damaged-device-can-sell.astro` | **308 PERMANENT** | No Collision |
| 48 | `/blog/documents-for-selling-it/` | `/บทความ/เอกสารขายของไอที/` | Blog Article | `src/pages/blog/documents-for-selling-it.astro` | **308 PERMANENT** | No Collision |
| 49 | `/blog/erase-iphone-before-selling/` | `/บทความ/วิธีลบข้อมูล-iphone-ก่อนขาย/` | Blog Article | `src/pages/blog/erase-iphone-before-selling.astro` | **308 PERMANENT** | No Collision |
| 50 | `/blog/gaming-notebook-resale-price/` | `/บทความ/ราคารับซื้อ-โน้ตบุ๊กเกมมิ่ง/` | Blog Article | `src/pages/blog/gaming-notebook-resale-price.astro` | **308 PERMANENT** | No Collision |
| 51 | `/blog/gpu-resale-price/` | `/บทความ/ราคารับซื้อ-การ์ดจอ/` | Blog Article | `src/pages/blog/gpu-resale-price.astro` | **308 PERMANENT** | No Collision |
| 52 | `/blog/iphone-price-khonkaen-query/` | `/บทความ/รับซื้อ-iphone-ขอนแก่น-ราคา/` | Blog Article | `src/pages/blog/iphone-price-khonkaen-query.astro` | **308 PERMANENT** | No Collision |
| 53 | `/blog/iphone-resale-price/` | `/บทความ/ราคารับซื้อ-iphone-มือสอง/` | Blog Article | `src/pages/blog/iphone-resale-price.astro` | **308 PERMANENT** | No Collision |
| 54 | `/blog/it-buyout-pickup-khonkaen/` | `/บทความ/รับซื้อไอทีถึงที่-ขอนแก่น/` | Blog Article | `src/pages/blog/it-buyout-pickup-khonkaen.astro` | **308 PERMANENT** | No Collision |
| 55 | `/blog/it-selling-scams/` | `/บทความ/กลโกงขายของไอทีออนไลน์/` | Blog Article | `src/pages/blog/it-selling-scams.astro` | **308 PERMANENT** | No Collision |
| 56 | `/blog/kku-student-sell-notebook-ipad/` | `/บทความ/นักศึกษา-มข-ขายโน้ตบุ๊ก-ipad/` | Blog Article | `src/pages/blog/kku-student-sell-notebook-ipad.astro` | **308 PERMANENT** | No Collision |
| 57 | `/blog/macbook-resale-price/` | `/บทความ/ราคารับซื้อ-macbook-มือสอง/` | Blog Article | `src/pages/blog/macbook-resale-price.astro` | **308 PERMANENT** | No Collision |
| 58 | `/blog/notebook-checklist-before-sell/` | `/บทความ/เช็คลิสต์ก่อนขายโน้ตบุ๊ก/` | Blog Article | `src/pages/blog/notebook-checklist-before-sell.astro` | **308 PERMANENT** | No Collision |
| 59 | `/blog/ps5-switch-resale-price/` | `/บทความ/ราคารับซื้อ-ps5-nintendo-switch/` | Blog Article | `src/pages/blog/ps5-switch-resale-price.astro` | **308 PERMANENT** | No Collision |
| 60 | `/blog/screen-crack-sell-khonkaen-query/` | `/บทความ/จอแตกขายได้ไหม-ขอนแก่น/` | Blog Article | `src/pages/blog/screen-crack-sell-khonkaen-query.astro` | **308 PERMANENT** | No Collision |
| 61 | `/blog/sell-iphone-before-new-model/` | `/บทความ/ขาย-iphone-ตอนไหนดี/` | Blog Article | `src/pages/blog/sell-iphone-before-new-model.astro` | **308 PERMANENT** | No Collision |
| 62 | `/blog/sell-it-near-me-khonkaen/` | `/บทความ/รับซื้อสินค้าไอทีใกล้ฉัน-ขอนแก่น/` | Blog Article | `src/pages/blog/sell-it-near-me-khonkaen.astro` | **308 PERMANENT** | No Collision |
| 63 | `/blog/sell-whole-computer-vs-parts/` | `/บทความ/ขายคอมทั้งเครื่อง-vs-แยกชิ้นส่วน/` | Blog Article | `src/pages/blog/sell-whole-computer-vs-parts.astro` | **308 PERMANENT** | No Collision |
| 64 | `/blog/shop-vs-facebook-group/` | `/บทความ/ขายร้าน-vs-ขายเอง-facebook/` | Blog Article | `src/pages/blog/shop-vs-facebook-group.astro` | **308 PERMANENT** | No Collision |
| 65 | `/blog/trade-in-vs-buyout-shop/` | `/บทความ/เทิร์นเครื่องศูนย์-vs-ขายร้านรับซื้อ/` | Blog Article | `src/pages/blog/trade-in-vs-buyout-shop.astro` | **308 PERMANENT** | No Collision |
| 66 | `/blog/upgrade-computer-sell-old/` | `/บทความ/อัปเกรดคอมใหม่-ขายของเก่า/` | Blog Article | `src/pages/blog/upgrade-computer-sell-old.astro` | **308 PERMANENT** | No Collision |
| 67 | `/blog/where-to-sell-it-khonkaen/` | `/บทความ/ขายของไอทีที่ไหนดี-ขอนแก่น/` | Blog Article | `src/pages/blog/where-to-sell-it-khonkaen.astro` | **308 PERMANENT** | No Collision |
| 68 | `/bulk-buyout/` | `/รับเหมาอุปกรณ์ไอที-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 69 | `/buyout-terms/` | `/เงื่อนไขการรับซื้อ/` | Static Page | `src/pages/buyout-terms.astro` | **308 PERMANENT** | No Collision |
| 70 | `/camera/` | `/รับซื้อกล้อง-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 71 | `/computer/` | `/รับซื้อคอมพิวเตอร์-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 72 | `/contact/` | `/ติดต่อเรา/` | Static Page | `src/pages/contact.astro` | **308 PERMANENT** | No Collision |
| 73 | `/drone-gopro/` | `/รับซื้อโดรน-gopro-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 74 | `/gadget/` | `/รับซื้อแกดเจ็ต-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 75 | `/game-console/` | `/รับซื้อเครื่องเกม-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 76 | `/gpu/` | `/รับซื้อการ์ดจอ-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 77 | `/ipad-tablet/` | `/รับซื้อ-ipad-แท็บเล็ต-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 78 | `/iphone/` | `/รับซื้อ-iphone-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 79 | `/macbook/` | `/รับซื้อ-macbook-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 80 | `/monitor/` | `/รับซื้อจอคอม-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 81 | `/notebook/` | `/รับซื้อโน้ตบุ๊ก-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 82 | `/privacy/` | `/นโยบายความเป็นส่วนตัว/` | Static Page | `src/pages/privacy.astro` | **308 PERMANENT** | No Collision |
| 83 | `/service-area/` | `/พื้นที่ให้บริการ/` | Static Page | `src/pages/service-area.astro` | **308 PERMANENT** | No Collision |
| 84 | `/smartphone/` | `/รับซื้อมือถือ-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 85 | `/smartwatch/` | `/รับซื้อสมาร์ทวอทช์-ขอนแก่น/` | Category Page | `src/data/categories.js (CATEGORIES)` | **308 PERMANENT** | No Collision |
| 86 | `/terms/` | `/ข้อกำหนดการใช้บริการ/` | Static Page | `src/pages/terms.astro` | **308 PERMANENT** | No Collision |

---

## 4. Collision Audit
ตรวจสอบการทับซ้อนและโครงสร้างชนกันของ URL (Collision Analysis):
- **Unicode normalization collision**: ตรวจสอบด้วยมาตรฐาน NFC/NFD สลัดสระซ้ำซ้อน = **0 จุดผ่าน**
- **Case collision**: คัดกรองตัวพิมพ์เล็ก-ใหญ่ทั้งหมดเป็นพิมพ์เล็ก = **0 จุดผ่าน**
- **URL-encoded collision**: เปรียบเทียบความสัมพันธ์หลังถอดรหัส (decodeURIComponent) = **0 จุดผ่าน**
- **Static vs Dynamic route collision**: ตรวจสอบหน้า static ไม่ให้ทับซ้อนกับ dynamic slug ใน `[slug].astro` = **0 จุดผ่าน**
- **Blog route vs Money page**: บทความใช้ prefix `/บทความ/` แยกเลเยอร์จาก Money Page ชัดเจน = **0 จุดผ่าน**

---

## 5. Long URL Audit
ตรวจสอบความยาวเพื่อคงประสิทธิภาพในการแสดงผลและแชร์ข้อมูล:
- URL ใหม่ทั้งหมดไม่มีลิงก์ใดมีความยาวเกิน 75 ตัวอักษร
- ทุกหน้าบทความใช้คำกระชับเพื่อความสวยงามในผลการค้นหา (SERPs)

---

## 6. Cannibalization Risk
- หน้าย่อยของโน้ตบุ๊คที่มีตำหนิ เช่น จอแตก (`/รับซื้อโน้ตบุ๊คจอแตก-ขอนแก่น/`) และหน้าเงื่อนไขจอแตก (`/จอแตกขายได้ไหม/`) ถูกแยก Intent อย่างชัดเจน (หน้าแรกขายเครื่องพัง อีกหน้าตอบคำถามเรื่องขายได้ไหม) ปราศจากความเสี่ยงทับซ้อนกัน

---

## 7. Redirect Strategy
- กลไกการย้ายจะใช้ **Vercel native redirection** ผ่านโครงสร้าง `vercel.json` หรือใช้วิธี **Astro configuration redirect** ใน Batch 6B เพื่อผลตอบรับแบบ Server-side 308 Permanent Redirection (ส่งต่อคะแนน SEO เต็มร้อย)

---

## 8. Files expected to change in Batch 6B
ในขั้นตอนแก้ไขจริง จะต้องเปลี่ยนไฟล์หลักดังนี้:
1. `src/data/categories.js` (เปลี่ยนฟิลด์ slug ของแต่ละหมวดหมู่)
2. `src/data/modelPages.js` (แก้ไข slug ของรุ่นย่อยที่มีการสะกด ไม้ตรี -> ไม้โท)
3. `astro.config.mjs` / `vercel.json` (สำหรับใส่ตาราง Redirection Map)
4. โฟลเดอร์บล็อก: ย้ายไฟล์จาก `src/pages/blog/*.astro` ไปอยู่ในโครงสร้าง `src/pages/บทความ/*.astro` หรือสร้าง Dynamic routing แทน

---

## 9. Production Migration Risks
- **ความเสี่ยงดัชนีเก่าหลุด (Index Drop)**: ป้องกันด้วยการส่ง 308 Permanent และอัปเดต XML Sitemap ทันทีหลัง Deploy เพื่อให้ Googlebot รับรู้ที่อยู่ใหม่เร็วที่สุด
- **ลิงก์เสียภายใน (Broken Internal Links)**: ต้องทำการสแกนแทนที่ลิงก์เก่าด้วยลิงก์ใหม่ทั้งหมดใน Batch 6B

---

## 10. Recommended Approval List
ขอแนะนำให้อนุมัติรายการย้ายทั้งสิ้น **48 รายการ** (ดังระบุในตารางที่แสดงสถานะ **308 PERMANENT**) เนื่องจากได้มาตรฐาน SEO สากลและรองรับการสะกดภาษาไทยที่ถูกต้องเรียบร้อยแล้ว
