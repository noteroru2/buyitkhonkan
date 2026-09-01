# Batch 6B.1 — Live Redirect Test Plan

แผนการทดสอบนี้จัดทำขึ้นเพื่อเตรียมการตรวจสอบผลลัพธ์การทำ Redirects ทั้งหมด 49 รายการบนสภาพแวดล้อมจริง (Vercel Preview และ Production) ของโปรเจกต์ **WINNER IT ขอนแก่น**

---

## 1. วิธีสร้าง Preview Deployment
เนื่องจากการ Deploy ของโปรเจกต์นี้ทำงานผ่าน Vercel Git Integration เมื่อต้องการสร้าง Preview ให้ดำเนินการดังนี้:
1. สร้าง Branch ชั่วคราวจาก `main` เช่น `release/thai-url-migration`
2. Push branch นี้ไปยัง GitHub: `git push origin release/thai-url-migration`
3. ระบบ Vercel Git Integration จะตรวจพบและสร้าง Preview Deployment ให้โดยอัตโนมัติ

---

## 2. Preview Protection (noindex)
* **Preview Protection**: ตรวจสอบให้มั่นใจว่า Preview URL มีการป้องกันไม่ให้ Search Engine เข้าถึง (เช่น เปิดระบบ Vercel Deployment Protection หรือมีแท็ก `<meta name="robots" content="noindex, nofollow">` ในหน้าเว็บทั้งหมดที่อยู่บน Preview) เพื่อป้องกันปัญหาเนื้อหาซ้ำ (Duplicate Content)

---

## 3. วิธีการทดสอบ Request (ไม่ Follow Redirect)
ใช้เครื่องมือคอมมานด์ไลน์ เช่น `curl` หรือเขียนสคริปต์ Node.js เพื่อทดสอบโดยไม่ตาม Redirect อัตโนมัติ:
```bash
curl -sS -I --max-redirs 0 "https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/old-url/"
```
หรือบน Windows PowerShell:
```powershell
(Invoke-WebRequest -Uri "https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/old-url/" -MaximumRedirection 0 -ErrorAction SilentlyContinue).Headers.Location
```

---

## 4. เกณฑ์การยอมรับการทดสอบ (Acceptance Criteria)
สำหรับทุกการทดสอบ Redirect:
* **HTTP Status Code**: ต้องได้รับ HTTP Status **308** (Permanent Redirect) เท่านั้น
* **Location Header**: ต้องชี้ไปยัง Proposed URL ภาษาไทยที่เป็นเป้าหมายตรงตัวอักษร
* **Redirect Hops**: ต้องเป็น **Single Hop** เท่านั้น (ไม่มีการส่งต่อหลายทอด เช่น `A -> B -> C` ห้ามมีเด็ดขาด)
* **Destination HTTP Status**: ปลายทาง (Proposed URL) ต้องคืนค่า HTTP Status **200 OK**
* **Canonical Tag**: หน้าปลายทางต้องมี `<link rel="canonical" href="https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/proposed-url/">` ที่ถูกต้องตรงกับตนเอง

---

## 5. การทดสอบรูปแบบ URL พิเศษ
* **Unicode URL Test**: ทดสอบเข้าผ่านเบราว์เซอร์ด้วยตัวอักษรภาษาไทยตรง ๆ เช่น `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/บทความ/` และต้องตอบสนองด้วย HTTP 200 โดยไม่มีการเพี้ยนของตัวอักษร
* **Percent-Encoded URL Test**: ทดสอบผ่าน URL ที่แปลงเป็นรหัสแล้ว เช่น `/%E0%B8%9A%E0%B8%97%E0%B8%84...` ต้องสามารถเข้าหน้าเว็บและแปลงกลับเป็นภาษาไทยที่อ่านออกได้สมบูรณ์ในเบราว์เซอร์
* **Query String Test**: ทดสอบเรียก URL พร้อม Query String เช่น `/old-url/?utm_source=test` ปลายทางต้อง Redirect ไปพร้อมกับรักษา Query String ไว้โดยไม่เกิดลูป
* **404 Test**: ทดสอบเรียก Unknown URL ต้องตอบสนองด้วย HTTP 404 และแสดงหน้า Custom 404 UI เสมอ โดยห้ามทำการ Redirect ไปยังหน้าแรก

---

## 6. การตรวจสอบ Sitemap & Canonical & Internal Links
* **Sitemap Test**: Sitemap (`dist/sitemap-0.xml`) ต้องมีเพียง 86 URLs (37 KEEP + 49 Proposed) ห้ามมี 404 หรือ Redirect Source
* **Canonical Test**: หน้าปลายทางต้องระบุ Canonical เป็นตนเองด้วย Production Domain
* **Internal Link Crawl**: ตรวจสอบลิงก์ภายในของหน้าทั้งหมด (เช่น Ticker, Header, Footer, บทความ) ต้องชี้ไปยัง URL ภาษาไทยใหม่โดยตรงและห้ามวิ่งผ่าน 308 Redirect

---

## 7. เงื่อนไขการ Rollback (Rollback Conditions)
หากเกิดข้อผิดพลาดดังต่อไปนี้ในระหว่างการทดสอบ ให้ดำเนินการ Rollback ทันที:
1. หน้าแรก (Homepage) หรือหน้า Money Page สำคัญคืนค่าอื่นที่ไม่ใช่ HTTP 200
2. เกิด Redirect Loop หรือเกิด Redirect ไปหน้าแรกแทนที่จะไปหน้าใหม่
3. ระบบตอบรับ 404 ในหน้าย้ายใหม่ที่ควรเป็น 200
4. Sitemap มีการตกหล่นของหน้าเดิม ทำให้หน้าดัชนีลดลงต่ำกว่า 86 หน้า

---

## 8. รายการตรวจสอบ Redirects ทั้ง 49 รายการที่ต้องทดสอบใน Batch 6C
ทุก ๆ URL เก่าที่เปลี่ยนผ่านเป็น 308 Redirect จะต้องผ่านการรันสคริปต์สแกนตรวจทาน HTTP response ทั้งหมด 49 รายการ เพื่อบันทึกผลลงใน `batch-6c-preview-redirect-results.json` และ `batch-6c-production-redirect-results.json` ต่อไป
