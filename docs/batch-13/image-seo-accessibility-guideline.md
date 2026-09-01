# Image SEO and Accessibility Guideline

## Alt text

- Content image: บอกสิ่งที่เห็นและเหตุผลในบริบท เช่น `ช่างตรวจสภาพพอร์ตและตัวเครื่องโน้ตบุ๊กก่อนประเมินราคา`.
- ไม่ขึ้นต้น “รูปภาพของ”, ไม่ยัดคำค้น, ไม่กล่าว “ขอนแก่น/ลูกค้า/เคสจริง” หากภาพไม่พิสูจน์.
- Product/model alt ต้องตรงรุ่นที่เห็น; ถ้าไม่แน่ใจใช้ระดับ category.
- Decorative: `alt=""` และไม่รับ focus/ไม่ถูก screen reader อ่าน. SVG decorative ใช้ `aria-hidden="true" focusable="false"`.
- Meaningful SVG ใช้ `<title>`/accessible name หรือข้อความข้างเคียงที่ครบ โดยไม่ประกาศซ้ำ.

## Caption and provenance

Caption จำเป็นกับ business/transaction evidence, สถานที่, เอกสาร, safety/condition และ AI ที่อาจดูเหมือนจริง. ระบุ “ภาพประกอบ” สำหรับ AI/illustration; ระบุ context จริงอย่างแคบสำหรับ evidence. Caption ไม่ใช่ที่ซ่อน keyword.

## File names

ใช้ lowercase ASCII kebab-case: `notebook-inspection-ports.webp`, `macbook-condition-check.webp`, `khon-kaen-service-area-map.svg`. ห้าม `IMG_1234.jpg`, ชื่อไทยสุ่ม, version “final2”, keyword chain หรือข้อมูลลูกค้า/serial.

## Technical delivery

- Future content photos import จาก `src/assets/images` ผ่าน Astro `<Picture>`/`<Image>` เพื่อสร้าง AVIF/WebP, `srcset`, `sizes`, width/height.
- LCP image: `loading="eager"`, `fetchpriority="high"`; ห้าม lazy. Preload ได้สูงสุด 1 ภาพเมื่อ measurement ยืนยัน.
- Below fold: `loading="lazy"`, `decoding="async"`; ระบุ intrinsic dimensions/aspect-ratio เพื่อ CLS.
- `sizes` ต้องตรง container: hero split `(max-width: 860px) calc(100vw - 32px), 480px`; article `(max-width: 900px) calc(100vw - 32px), 760px`; card `(max-width: 560px) calc(100vw - 32px), (max-width: 1020px) 50vw, 33vw` หลังหัก gap.
- Photo: AVIF/WebP; PNG เฉพาะ transparency/QR; SVG สำหรับ icon/diagram. ห้าม rasterize text table.
- Mobile art direction ใช้ `<source media>` เมื่อ focal crop ต่างจริง; ไม่ใช้ CSS background สำหรับ semantic/LCP content.

## SEO/social

ใช้ image URL canonical และ crawlable; ห้าม noindex asset path. OG 1200×630, alt เฉพาะหน้า/intent, safe area 96 px รอบขอบ. Structured data `image` ใช้เฉพาะภาพที่เป็นตัวแทนหน้าจริง. Image sitemap ยังไม่จำเป็นจนมี original indexable images หลายสิบไฟล์; ประเมินใหม่หลัง Phase B.

## QA checklist

Keyboard/screen-reader semantics, broken source fallback, alt duplication, 200 response/MIME/cache, natural dimensions, DPR crop, CLS, LCP, mobile payload, copyright/consent และไม่มี PII/EXIF location ที่ไม่จำเป็น.
