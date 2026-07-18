# Proposed Image Architecture

## Recommendation: hybrid Astro assets + stable public assets

```text
src/assets/images/
  brand/ team/ business/ process/
  products/{notebook,macbook,iphone,ipad,desktop,gpu,monitor,camera,console}/
  conditions/ areas/ articles/
public/images/
  og/ icons/ diagrams/
assets-source/   # outside deploy artifact or controlled storage; RAW/license/releases
```

ใช้ `src/assets` สำหรับ content photos เพราะ Astro สร้าง hashed AVIF/WebP, responsive dimensions และ cache-busting ได้. ใช้ `public` เฉพาะ favicon, OG ที่ต้องมี stable crawler URL, QR และ SVG diagram ที่ผ่าน review. ไม่ย้ายไฟล์จริงใน Batch 13.

## Conventions

- `subject-action-context-v01.ext`; lowercase ASCII; version เฉพาะ master ไม่ใส่ขนาดในชื่อ source.
- Import ผ่าน central manifest ต่อ intent เช่น `src/data/imageManifest.js`; ห้าม hardcode path ซ้ำหลายหน้า.
- `<Picture>` สำหรับ art direction; `<Image>` สำหรับ crop เดียว. `widths`, `sizes`, formats และ quality กำหนดจาก dimension matrix.
- Original master/RAW, release, license และ checksum เก็บนอก public deploy. Web-ready generated outputไม่ commit หาก Astro สร้างใน build.
- Vercel/CDN cache ใช้ hashed immutable asset; OG/QR stable URL ใช้ versioned filename เมื่อเปลี่ยนเนื้อหา.

## Duplicate and lifecycle controls

หนึ่ง master ต่อ subject; reuse ผ่าน manifest ไม่ copy. Audit checksum ก่อน merge. Asset record มี owner/source/license/consent/expiry/focal point/alt/caption/allowed pages. Deprecate โดยค้น references, รอหนึ่ง release, แล้วลบใน batch แยก. OG fallback และ schema reference ต้องเปลี่ยนพร้อมกัน.

## Build/CDN behavior

CI ต้อง fail เมื่อ content photo เป็น PNG, ไม่มี width/height/alt policy, source เกิน master limit, `loading=lazy` บน declared LCP หรือ external host ไม่ได้รับอนุญาต. ตรวจ generated HTML ว่ามี AVIF/WebP srcset และ sizes. CDN ไม่ควร transform QR/SVG แบบ lossy.

## Suggested component contract

`ContentImage` รับ `src`, `alt`, `caption`, `slotId`, `widths`, `sizes`, `loading`, `fetchpriority`, `objectPosition`; evidence-risk slotsบังคับ caption/provenance id. Local/transaction slotsที่ `DEFERRED` ต้อง render nothing ไม่ fallback เป็นภาพ generic ที่ชวนเข้าใจผิด.
