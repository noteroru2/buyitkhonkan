# Batch 7 — Google Search Console Indexing Baseline

เอกสารนี้ระบุเกณฑ์และค่าสถิติเริ่มต้น (Baseline) ของดัชนีเว็บไซต์ของ **WINNER IT ขอนแก่น** ใน Google Search Console หลังจากที่ Property ได้รับการยืนยันความเป็นเจ้าของสิทธิ์แล้ว

---

## 1. Indexing Status Summary (ภาพรวมสถานะการทำดัชนี)
*สถานะ ณ วันที่ 15 กรกฎาคม 2026: **GSC VERIFIED — DATA COLLECTION PENDING***
*(หมายเหตุ: ข้อมูลตัวเลขเริ่มต้นแสดงค่าเป็น "Pending" หรือ "N/A" เนื่องจากระบบยืนยันสิทธิ์สำเร็จเรียบร้อย แต่อยู่ระหว่างรอรอบเวลาในการเก็บรวบรวมและประมวลผลข้อมูลของ Google Crawler)*

| Metric / Category | GSC Report Name | Baseline Value (Pages) | Target Value (Pages) | Notes |
|---|---|---|---|---|
| **Submitted URLs** | URL ที่ส่งทั้งหมด | Pending | up to 86 | หน้าทั้งหมดจาก Sitemap |
| **Indexed URLs** | หน้าที่ทำดัชนีแล้ว | Pending | monitor and prioritize | ทยอยเก็บดัชนีหน้าไทยใหม่เป็นลำดับสำคัญ |
| **Not indexed URLs** | หน้าที่ไม่ได้ทำดัชนี | Pending | monitor known old URLs | หน้าเก่าอังกฤษเดิมที่จะถูกถอนออกจากดัชนี |
| **Redirect pages** | หน้าที่มีการเปลี่ยนเส้นทาง | Pending | monitor known old URLs | หน้าเก่าอังกฤษเดิมที่ทำ 308 redirect |
| **Crawled currently not indexed** | รวบรวมข้อมูลแล้ว แต่ยังไม่ได้ทำดัชนี | Pending | Pending | กลุ่มหน้าที่รอคิวจัดทำดัชนี |
| **Discovered currently not indexed** | พบหน้าแล้ว แต่ยังไม่ได้รวบรวมข้อมูล | Pending | Pending | กลุ่มหน้าที่ Google ทราบแต่ยังไม่ได้ Crawler เข้าไป |
| **Duplicate/Canonical issues** | หน้าซ้ำที่ Google เลือกหน้าอื่น | Pending | 0 | เป้าหมายคือไม่มีปัญหา canonical |
| **Soft 404** | Soft 404 | Pending | 0 | เป้าหมายคือ 0 |
| **Server errors** | ข้อผิดพลาดเกี่ยวกับเซิร์ฟเวอร์ | Pending | 0 | เป้าหมายคือ 0 |
| **Blocked by robots** | บล็อกโดย robots.txt | Pending | 0 | หน้าปกติไม่มีการบล็อก |
| **Excluded by noindex** | ยกเว้นโดยแท็ก noindex | Pending | Unexpected noindex on indexable URLs: 0 | หน้าปกติหลักต้องไม่มี tag noindex |

---

## 2. เกณฑ์การประเมินเบื้องหลังการย้ายระบบ (Migration Indexing Guidelines)
เนื่องจากการย้ายโครงสร้าง URL ใหม่เพิ่งมีผลบังคับใช้งานบนระบบจริง:
1. **การทะยอยจัดทำดัชนี (Prioritized Indexing)**: ไม่มีข้อกำหนดทางเทคนิคที่บังคับว่าทั้ง 86 หน้าต้องจัดทำดัชนีเสร็จสิ้นภายใน 30 วันแรก กระบวนการจะเป็นการทยอยประมวลผลตามพฤติกรรมของ Googlebot
2. **การเฝ้าระวังข้อผิดพลาด (Zero-Error Targets)**:
   * เป้าหมายข้อผิดพลาดการเปลี่ยนเส้นทาง (Redirect errors target) = 0
   * เป้าหมายข้อผิดพลาดด้าน Canonical (Canonical errors target) = 0
   * เป้าหมาย Soft 404 (Soft 404 target) = 0
   * เป้าหมาย Server errors (Server errors target) = 0
   * Unexpected noindex on indexable URLs = 0
   * Unknown URL HTTP status = 404
   * 404 URLs in sitemap = 0
3. **การหลีกเลี่ยงการเร่งดัชนีสุ่ม (Indexing Spam)**: ให้ใช้เครื่องมือ Request Indexing ใน Search Console เฉพาะกับหน้าหลัก (Core URLs) ที่สำคัญจริง ๆ เท่านั้น ห้ามส่งรีเควสต์พร้อมกัน 86 หน้าเด็ดขาด
