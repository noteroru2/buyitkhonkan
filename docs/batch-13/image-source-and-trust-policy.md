# Image Source and Trust Policy

## Decision rule

ภาพทุกภาพต้องถูกจัดเป็นประเภทเดียวใน inventory และมี provenance ก่อน publish: เจ้าของไฟล์, ผู้ถ่าย/ผู้สร้าง, วันที่, สิทธิ์ใช้งาน, consent, การแก้ไข และหน้าที่อนุญาต. ถ้าพิสูจน์ไม่ได้ให้ `DEFERRED` ไม่ใช้ AI หรือ stock สร้างแทน.

### A. Real Business Evidence

ใช้ภาพจริงเท่านั้น: เจ้าของ/ทีมจริง, โต๊ะและเครื่องมือตรวจจริง, ขั้นตอนจริง, สินค้าที่ธุรกิจครอบครองโดยชอบ, รถ/ฐานธุรกิจ/เอกสารที่เปิดเผยได้. ต้องมี consent และ privacy review. AI, face replacement, compositing บุคคล/สถานที่ และการเพิ่มอุปกรณ์ที่ไม่มีจริงเป็นข้อห้าม.

### B. Verified Transaction Evidence

ต้องมี transaction provenance, สิทธิ์เผยแพร่ และการปิดชื่อ ใบหน้า เบอร์โทร บัญชี, IMEI/serial, address, QR และยอดเงินตามความจำเป็น. หากไม่มีหลักฐานให้คง Example Scenario แบบข้อความและตั้ง slot `DEFERRED`.

### C. Original Product Photography

ธุรกิจถ่ายเอง ใช้กับ category/model/condition/article ได้. เช็ก ownership, model accuracy, serial/account reflection และ metadata EXIF. ห้ามจัดฉากความเสียหายแล้วอ้างเป็นเคสจริง.

### D. Licensed Manufacturer Asset

เก็บ URL ต้นทาง, license/press-kit terms, download date, brand guideline และ expiry. ห้าม Google Images, marketplace, รีวิวบุคคลอื่น หรือภาพคู่แข่ง. Logo ใช้เท่าที่จำเป็นต่อการระบุ brand ไม่สร้าง endorsement.

### E. AI Illustration

ใช้ได้กับ concept, article education, abstract service area, process diagram, background และ decorative category visual. ต้องไม่สร้างทีม ลูกค้า ธุรกรรม รีวิว ใบประเมิน หน้าร้าน จุดนัดรับ หรือ landmark เพื่อสื่อ presence. ไม่ทำ logo/รุ่นสินค้าเพี้ยน. Caption “ภาพประกอบ” เมื่อผู้ชมอาจตีความเป็นเหตุการณ์จริง.

### F. Icon/SVG

เหมาะกับ process, payment, contact, data safety, FAQ diagram และ general factual badges. ใช้ stroke, corner, color และ optical size ชุดเดียวกัน. Decorative ใช้ `aria-hidden="true"`; meaningful ต้องมี accessible name หรือข้อความข้างเคียง.

### G. No Image

เลือกสำหรับ legal, FAQ ที่ชัด, pricing/table, link grid หนาแน่น, final CTA และส่วนที่ภาพไม่เพิ่มการตัดสินใจ. No-image เป็นการออกแบบที่ตั้งใจ ไม่ใช่ asset gap.

## Local truth safeguards

- ห้ามภาพหน้าร้าน/ป้ายสาขา/พนักงานประจำขอนแก่น เพราะบริการนี้ไม่มี walk-in branch ในขอนแก่น.
- แผนที่ต้องบอก “พื้นที่นัดรับตามคิว” ไม่ใช่จุดสาขา.
- ภาพสถานที่หรือ landmark ใช้ได้เมื่อมีสิทธิ์และไม่สื่อว่าเคยให้บริการ; โดยทั่วไปไม่แนะนำ.
- Location caption ต้องแยกระหว่างฐานบริษัท, พื้นที่ครอบคลุม และจุดนัดครั้งเดียว.

## Publish gate

ก่อน merge implementation ต้องมี asset register, consent/license, privacy redaction review, model/location accuracy, alt/caption review, responsive output check และ performance-budget check. ผู้ตรวจต้องไม่ใช่ผู้สร้าง asset เพียงคนเดียวสำหรับ evidence-risk High/Critical.
