# Privacy and Image Sanitization Policy

## Non-destructive workflow

ต้นฉบับอยู่ใน ignored `pending/` และห้ามเขียนทับ/ลบ. การ review เปลี่ยนสถานะผ่าน manifest; output ใหม่เท่านั้นจึงเข้า `approved-source/` และ web-ready. Log ใช้เฉพาะ `assetId`, dimensions และชื่อ output ห้าม OCR text, EXIF value หรือ PII.

## Required human inspection

ตรวจที่ 100% zoom และ crop ทุก variant: บุคคล/ลูกค้า/เด็ก, serial/IMEI/service tag, screen/account/notification, ชื่อ/เบอร์/address, QR/barcode, ใบเสร็จ/ยอด/การโอน, ป้ายทะเบียน, reflection, EXIF GPS, watermark/คู่แข่ง, location/signage และสิทธิ์. OCR ใช้ครั้งเดียวเฉพาะเมื่อ reviewer เห็นเหตุให้สงสัย ไม่สุ่มหลายรอบและห้ามบันทึกข้อความที่พบลง log.

## Sanitization order

1. Crop PII ออกเมื่อไม่กระทบ subject.
2. ใช้ solid redaction ที่ flatten ลง output สำหรับข้อมูลที่ต้องคงบริบท; ขยายขอบอย่างน้อย 8–12 px.
3. หลีกเลี่ยง blur/pixelation เพราะอาจย้อนหรืออ่านข้อความได้ โดยเฉพาะ QR/ตัวเลข.
4. ลูกค้าที่ไม่มี consent ให้ crop ออกหรือ solid-mask ใบหน้าและลักษณะระบุตัว; เด็กต้องมี consent ชัด มิฉะนั้น reject.
5. ลบ metadata โดย decode → auto-orient → encode ไฟล์ใหม่; ห้าม `withMetadata()` ใน web output.
6. Reviewer คนที่สองตรวจ final output และ crop variants ก่อนตั้ง `privacyEditsCompleted=true`.

## Status rules

- `APPROVED`: rights/consent/privacy/quality ครบ.
- `APPROVED_AFTER_EDIT`: ต้องสร้าง output ใหม่และ re-review.
- `REJECTED_PRIVACY`: PII เอาออกไม่ได้โดยไม่ทำลายภาพ.
- `REJECTED_QUALITY` / `REJECTED_RIGHTS`: คุณภาพหรือสิทธิ์ไม่ผ่าน.
- `DEFERRED_CONSENT` / `DEFERRED_INFORMATION`: ห้ามนำเข้าเว็บจนข้อมูลครบ.

Script `images:process` ทำ normalization, auto-orientation, metadata stripping, dimension cap และ new-file-only หลัง manifest gate เท่านั้น; ไม่รับหน้าที่ตัดสิน PII อัตโนมัติ.
