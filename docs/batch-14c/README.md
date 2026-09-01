# Batch 14C — Real product photography

วันที่ตรวจ: 2026-07-18

ตรวจไฟล์ต้นฉบับจริง 23 ภาพจาก private intake, อนุมัติ 18 ภาพ (17 ตรง + 1 หลังปิดข้อมูล), ปฏิเสธ 5 ภาพ และนำภาพ 8 หมวดไปใช้บน homepage/category intro โดยไม่เปลี่ยน URL, canonical, H1 หรือ search intent เดิม

ภาพทั้งหมดเป็น “ภาพประกอบประเภทสินค้า” เท่านั้น ไม่ใช่หลักฐานธุรกรรม เคสลูกค้า หรือหลักฐานว่ารับซื้อในขอนแก่น

## ผล QA

- `npm run build`: ผ่าน, 87 หน้า
- ResponsiveImage: AVIF/WebP, srcset, width/height, lazy loading
- Homepage: ใช้ 8 ภาพ ไม่เกินเพดาน 6–8
- Category intro: สูงสุด 1 ภาพต่อหน้า
- metadata: output WebP ไม่มี EXIF/GPS/XMP
- Browser QA ถูกพยายามบน local dev server แต่ in-app browser เชื่อมต่อพอร์ตใหม่ไม่เสถียร จึงไม่บันทึก screenshot ที่อาจทำให้เข้าใจผิด

ดูรายละเอียดใน `intake.csv`, `mapping.csv`, `approved-real-product-assets.json`, `trust-review.md`, `performance.json`, `qa-report.md`
