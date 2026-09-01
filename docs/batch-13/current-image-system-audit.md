# Current Image System Audit

## Verdict

ระบบภาพอยู่ระดับ **2/5 (Early / template-heavy)**: metadata social มีฐานที่ถูกต้องและภาพปัจจุบันระบุขนาด HTML แต่ไม่มี Astro image pipeline, responsive `srcset`, AVIF/WebP, art direction หรือภาพหลักฐานธุรกิจจริง. หน้า 84/86 URL พึ่งข้อความ, emoji, CSS cards และ inline SVG เกือบทั้งหมด.

## Current architecture

- Production assets อยู่ใน `public/`: SVG 2, PNG 3, JPG/WebP/AVIF 0.
- ใช้ `<img>` ธรรมดา 2 จุดใน homepage; ไม่ใช้ Astro `<Image>` หรือ `<Picture>`.
- ไม่มี image service/optimization config เพิ่มเติม; `astro.config.mjs` มีเฉพาะ sitemap.
- ไม่มี responsive `srcset`/`sizes`, blur placeholder หรือ external image domain.
- ภาพ content ทั้งสองตั้ง `width="400" height="300" loading="lazy"`; ช่วยกัน CLS และไม่แย่ง LCP แต่ source เป็นสี่เหลี่ยม 1024×1024 แล้ว crop เป็น 4:3.
- ไม่มี hero image ปัจจุบัน จึงไม่มี image LCP, `fetchpriority="high"` หรือ image preload.
- OG ทุกหน้าใช้ `/images/og/default-og.png` 1200×630, 46 KB และมี alt/width/height metadata แต่ไม่เฉพาะ intent ของแต่ละหน้า.
- ไม่มี image sitemap; ยังไม่จำเป็นในสภาพปัจจุบัน แต่ควรพิจารณาเมื่อมี original photography ที่ indexable จำนวนมาก.

## Asset findings

1. `trust-inspection.png` 1024×1024, 916,976 B — แสดงจริงสูงสุดประมาณ 329×247; ใหญ่เกินงบอย่างน้อย 6–10 เท่า, crop source ไม่ตรง container, เป็นภาพประกอบไม่ใช่ evidence.
2. `trust-inventory.png` 1024×1024, 806,497 B — ความเสี่ยงเดียวกัน.
3. `default-og.png` 1200×630, 46,302 B — ขนาด/น้ำหนักดี แต่ใช้ซ้ำทุกหน้าและภาพ SVG คู่กันไม่ได้ถูกอ้างจากหน้า.
4. `favicon.svg` 242 B — เหมาะสม.
5. Inline SVG ใช้กับ sticky CTA, ticker, trust payment และ 404; เหมาะกับ UI/decorative แต่ควรรักษา `aria-hidden` สำหรับ decorative. Trust payment SVG ปัจจุบันมี `aria-label` แต่ไม่มี role ซึ่งควรตรวจตอน implementation.

## Render audit

ตรวจ Production จริง 12 page types ที่ 360×800, 390×844, 430×932, 768×1024, 1024×768, 1440×900, 1920×1080 รวม 84 viewport-page combinations. Console error 0 และไม่พบ horizontal overflow. Screenshots อยู่ใน `layout-screenshots/`.

- Homepage: hero เป็น text + dark category panel; ดูเรียบร้อยแต่ยังเป็น template. จุดภาพ trust แสดง 275–345 px บน mobile, 181 px ที่ 768 และ 329 px บน desktop.
- Category/Brand/Model/Condition/Local: hero/container สูงสุด 980 px, article bodyสูงสุด 900 px แต่ไม่มี content image; visual hierarchy ซ้ำกันมาก.
- Article: text-only; เหมาะกับบางบทความ แต่ขั้นตอน data safety และ condition ควรมี explanatory visual.
- About/Contact: container 720 px และไม่มี business evidence ซึ่งเป็นช่องว่าง trust ใหญ่ที่สุด.
- Privacy/Terms: text-only ถูกต้อง; เพิ่มภาพจะรบกวนงานอ่าน.
- 404: inline SVG เพียงพอ ไม่ควรเพิ่ม raster.

## Alt and accessibility

ไม่มี alt ว่างหรือ alt ซ้ำใน `<img>` สองรายการ แต่คำว่า “ภาพประกอบ” ช่วยลดความเสี่ยงการอ้างเป็นหลักฐานจริง. ไม่มี keyword stuffing. ภาพ decorative ส่วนใหญ่เป็น inline SVG/emoji และถูกซ่อนด้วย `aria-hidden`; ต้องตรวจ trust SVG เพิ่มเมื่อ implement.

## Highest risks and recommendations

- P0 Trust: ไม่มีภาพทีม/กระบวนการ/ฐานบริษัทจริง; ห้ามใช้ AI ทดแทน.
- P0 Performance: แปลง trust PNG เป็น responsive AVIF/WebP ที่ crop ตรง container; ห้ามเปลี่ยนใน Batch นี้.
- P0 Accuracy: ห้ามภาพหน้าร้าน/สาขาขอนแก่น/ลูกค้า/ธุรกรรม/landmark ที่ทำให้เข้าใจว่ามีทีมประจำโดยไม่มีหลักฐาน.
- P1 Architecture: ย้าย future content images เข้า `src/assets/images` และใช้ Astro `<Picture>`/`<Image>`; เก็บ OG/favicon/static diagrams ที่ต้อง URL คงที่ใน `public`.
- P1 Social: ทำ OG template แยก 5 intent groups ไม่จำเป็นต้องทำ 86 ภาพ.
