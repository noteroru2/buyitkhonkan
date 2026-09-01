# Homepage Hero Decision

Decision: **Option B — No-image Hero / BLOCKED_BY_ASSET**.

ไม่พบ real asset ใน `private-assets/image-intake/pending` หรือ approved manifest. ภาพ trust เดิมเป็น illustration และไม่มี provenance จึงไม่เหมาะเป็น real hero. Hero typography/category panel ปัจจุบันยังคงเดิม ไม่มี AI team/store/customer/vehicle/landmark และไม่มี placeholder ที่ดูเป็น evidence.

Option A จะเปิดได้เมื่อ asset ผ่าน slot `HOM-HERO-01`: real staff/process, rights + consent, privacy complete, crop desktop 3:2 และ mobile 4:3, ไม่มี false Khon Kaen storefront/presence, AVIF/WebP candidate ≤150 KB (warning >180 KB, fail >250 KB), eager + `fetchpriority=high`, CTA contrast และ 7-viewport QA ผ่าน.

Trust image replacement สองจุดเป็น `BLOCKED_BY_REAL_PHOTO`. ไม่ optimize/แปลง illustration เดิมในรอบนี้เพราะ source/rights ยังไม่ถูกบันทึกและการทำให้เบาลงไม่ได้เพิ่ม trust. Legacy exception ถูกบันทึกใน performance audit; production ไม่ได้รับผลกระทบเพราะ branch นี้ไม่ merge/deploy.
