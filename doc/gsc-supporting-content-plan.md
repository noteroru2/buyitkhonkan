# Supporting Content จาก Query ใน GSC

อัปเดต: 12 กรกฎาคม 2569

ยังไม่มีไฟล์ export จาก Google Search Console ใน workspace รอบนี้ จึงสร้าง batch แรกจาก query intent ที่มักพบกับเว็บรับซื้อสินค้าไอทีท้องถิ่น และผูกกับ money pages ที่มีอยู่

## Batch 1 ที่สร้างแล้ว

| Query intent | URL | Target page ที่ support |
|---|---|---|
| รับซื้อสินค้าไอทีใกล้ฉัน ขอนแก่น | /blog/sell-it-near-me-khonkaen/ | /service-area/, /รับซื้อไอที-เมืองขอนแก่น/ |
| รับซื้อไอทีถึงที่ ขอนแก่น | /blog/it-buyout-pickup-khonkaen/ | /bulk-buyout/, /service-area/ |
| รับซื้อ iPhone ขอนแก่น ราคา | /blog/iphone-price-khonkaen-query/ | /iphone/, /รับซื้อ-macbook-air-ขอนแก่น/, /รับซื้อ-ipad-pro-ขอนแก่น/ |
| จอแตกขายได้ไหม | /blog/screen-crack-sell-khonkaen-query/ | /จอแตกขายได้ไหม/ |

## วิธีทำ batch ถัดไปเมื่อมี GSC export

1. Export Queries 3 เดือนล่าสุดจาก GSC
2. Filter impressions > 20 และ position 8–30
3. Group ด้วย intent: price, near me, condition, brand, local, comparison
4. Map ไป money page ที่เกี่ยวข้อง 1 หน้า
5. สร้าง supporting article 800–1,200 คำ พร้อม internal links 3–5 จุด
6. อัปเดต blog index และ submit URL inspection หลัง publish

## Query buckets ที่ควรมองหา

- “รับซื้อ [สินค้า] ขอนแก่น ราคา”
- “[สินค้า] จอแตก ขายได้ไหม”
- “ขาย [สินค้า] มือสอง ขอนแก่น”
- “รับซื้อ [brand] ขอนแก่น”
- “รับซื้อไอทีใกล้ฉัน”
- “ขายคอมเก่า / ปิดออฟฟิศ / เคลียร์สต๊อก”
