# Private Image Intake

โฟลเดอร์นี้เป็นทางเข้าสำหรับภาพจริงเท่านั้นและถูก `.gitignore` ป้องกันไม่ให้ต้นฉบับถูก commit.

1. วางไฟล์ต้นฉบับใน `pending/`; ห้ามแก้หรือเขียนทับต้นฉบับ.
2. ตั้งชื่อชั่วคราวที่ไม่มีชื่อ เบอร์โทร ที่อยู่ หรือข้อมูลลูกค้า.
3. กรอก manifest จาก `docs/batch-14a/asset-manifest-template.json` และตรวจสิทธิ์/consent.
4. รัน `npm run images:audit` แบบ read-only ก่อน แล้วใช้ `npm run images:process -- --dry-run`.
5. ตรวจด้วยคนเรื่องใบหน้า เด็ก serial/IMEI หน้าจอ QR ใบเสร็จ การโอน ป้ายทะเบียน สถานที่และโลโก้.
6. ไฟล์ที่ไม่ผ่านย้ายไป `rejected/` โดยไม่ลบต้นฉบับ; ไฟล์ผ่าน review จึงคัดลอกไป `approved-source/`.
7. Script สร้างไฟล์ใหม่ใน `src/assets/images/`; ห้ามนำ RAW/HEIC/ไฟล์ส่วนตัวเข้า Git.

โครงสร้าง local ที่ต้องสร้าง: `pending/`, `rejected/`, `approved-source/`. โฟลเดอร์และไฟล์ภายในถูก ignore ทั้งหมด. ห้ามใส่ภาพลูกค้าหรือธุรกรรมหากไม่มี consent และห้ามใช้ AI/stock ทดแทน evidence.
