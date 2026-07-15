# Batch 7 — Thai URL Migration Monitoring Schedule

เทมเพลตแผนกำหนดการติดตามผลการย้ายโครงสร้าง URL ของเว็บไซต์ **WINNER IT ขอนแก่น** ในช่วงระยะเวลา 30 วันแรก โดยเริ่มนับ Day 0 ณ วันที่ระบบยืนยันสิทธิ์สำเร็จ

---

## 📅 Day 0 — Verification & Initial Submission (15 กรกฎาคม 2026)
* **ผู้รับผิดชอบ**: Technical SEO Auditor
* **ภารกิจ**:
  - [x] ตรวจสอบสถานะ Property Verification เป็น `Success` (Verified: DNS TXT)
  - [x] ส่งแผนผังเว็บไซต์หลัก `sitemap-index.xml` (Sitemap status: Success, Discovered pages: Pending)
  - [x] บันทึกค่าเริ่มต้นของ Core URLs ทั้ง 13 หน้าลงใน `batch-7-url-inspection-baseline.csv`
  - [x] เริ่มต้นประมวลผลดัชนีภาพรวม (Baseline status: DATA COLLECTION PENDING)

---

## 📅 Day 3 — Initial Discovery & Fetch Checks (18 กรกฎาคม 2026)
* **ผู้รับผิดชอบ**: Technical SEO Auditor
* **ภารกิจ**:
  - [ ] ตรวจเช็กสถานะการอ่าน Sitemap (Sitemap Fetch Status)
  - [ ] ตรวจสอบว่า Google เริ่มพบข้อผิดพลาดของการย้ายทาง (Redirect Errors) หรือไม่
  - [ ] ตรวจสถานะการนำทาง URL สำคัญ (Core Page Discovery)

---

## 📅 Day 7 — Canonical Matching & Index Verification (22 กรกฎาคม 2026)
* **ผู้รับผิดชอบ**: Senior Technical SEO Analyst
* **ภารกิจ**:
  - [ ] ตรวจสถานะการจัดทำดัชนีเปรียบเทียบ (English vs Thai URLs) ใน GSC
  - [ ] ตรวจหน้าปลายทางใหม่ใน GSC: Google เลือก URL ภาษาไทยใหม่เป็น Canonical หรือไม่ (Google-selected Canonical)
  - [ ] ตรวจการรับรู้การเปลี่ยนเส้นทาง (Redirect status) ของ URL อังกฤษเดิม
  - [ ] ตรวจทานและสแกนสอบทานความเสถียรของ Live Redirects

---

## 📅 Day 14 — Performance Baselines & Cannibalization (29 กรกฎาคม 2026)
* **ผู้รับผิดชอบ**: Senior Technical SEO Analyst
* **ภารกิจ**:
  - [ ] สรุปยอดหน้าดัชนีสะสมภาษาไทยใหม่ (Indexed URLs Count)
  - [ ] ตรวจสอบทราฟฟิกแยกตามกลุ่มประเภทคำหลัก (Brand, Product, Local Queries)
  - [ ] ตรวจสอบการทับซ้อนของคำค้นหา (Cannibalization check) ระหว่างหน้าเดิมและหน้าใหม่
  - [ ] ประเมินประสิทธิภาพ CTR และ Position ของหน้า Proposed ใน Search Console

---

## 📅 Day 30 — Stability Summary & Content Audit (14 สิงหาคม 2026)
* **ผู้รับผิดชอบ**: GSC Migration Lead
* **ภารกิจ**:
  - [ ] สรุปความมั่นคงและความเสถียรของดัชนีใหม่ทั้งหมด (ดัชนีหน้าไทยควรได้รับการรวบรวมเป็นปกติ)
  - [ ] ตรวจทานการส่งต่อลิงก์ในระบบ Redirects 308 (Redirect Coverage)
  - [ ] สรุปเปรียบเทียบประสิทธิภาพก่อน-หลังการย้ายระบบ (Pre- vs Post-migration CTR and Position)
  - [ ] ระบุรายการหน้าเว็บปลายทางที่จำเป็นต้องได้รับการพัฒนาเนื้อหาเพิ่มเติมเพื่อเร่งทราฟฟิก (Pages requiring content improvement)
