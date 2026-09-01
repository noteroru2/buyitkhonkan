# Priority Fix List (Batch 4)

This document lists the priority P0 and P1 On-Page SEO fixes identified during the audit phase.

---

## 1. P0 Fixes (Critical Compliance & Misleading Claims)

### Claim cleanups in [categories.js](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/src/data/categories.js)
- **`game-console` (เครื่องเกมคอนโซล)**:
  - Remove `"จ่ายสดทันที"` from description.
- **`macbook` (MacBook)**:
  - Remove `"จ่ายสดทันที"` from title.
  - Remove `"จ่ายสดทันที"` from description.
  - Replace `"ให้ราคาสูงที่สุด"` with `"เป็นกลุ่มที่ราคาสูญเสียช้ากว่า"`.
- **`iphone` (iPhone)**:
  - Remove `"จ่ายสดทันที"` from description.
- **`ipad-tablet` (iPad)**:
  - Remove `"จ่ายสดทันที"` from H1 header.
- **`monitor` (จอมอนิเตอร์)**:
  - Remove `"จ่ายสดทันที"` from description.
  - Remove `"ไม่กดราคาเพราะยี่ห้อ"` from body description.
- **`drone-gopro` (โดรน)**:
  - Remove `"จ่ายสดทันที"` from description.
  - Remove `"จ่ายสดทันที"` from H1 header.
- **`smartwatch` (สมาร์ทวอทช์)**:
  - Remove `"จ่ายสดทันที"` from description.
  - Remove `"จ่ายสดทันที"` from H1 header.
- **`notebook` (โน้ตบุ๊ค)**:
  - Remove `"จ่ายเงินสดทันที"` from description.
  - Remove `"ทุกสภาพ"` from short description.
- **`smartphone` (มือถือ)**:
  - Remove `"ทุกสภาพ"` from short description.
- **`gpu` (การ์ดจอ)**:
  - Remove `"ทุกสภาพ"` from short description.

### Claim cleanups in Blog Articles
- **[gpu-resale-price.astro](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/src/pages/blog/gpu-resale-price.astro)**:
  - Change `"รับซื้อการ์ดจอทุกรุ่นทุกสภาพ"` to `"รับซื้อการ์ดจอตามรุ่นและสภาพการใช้งานจริง"`.

---

## 2. P1 Fixes (Template Copy & Intent Consistency)

### Dynamic template headings in [[slug].astro](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/src/pages/[slug].astro)
- Change `"เคสรับซื้อจริงของ..."` to `"ตัวอย่างเคสการให้บริการรับซื้อ..."`.
- Change `"เคสรับซื้อจริงในพื้นที่..."` to `"ตัวอย่างเคสการให้บริการรับซื้อในพื้นที่..."`.
- These changes remove any implication of real customer transaction logs in illustrative case studies.
