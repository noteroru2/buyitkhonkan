# Batch 13 — Visual Trust and Image Architecture Audit

## 1. Executive Summary / Final Verdict

**PASS สำหรับ Audit และ Production Planning; WARNING สำหรับ maturity ปัจจุบัน.** ระบุ slots/specification ครบและวาง guardrail ป้องกันหลักฐานปลอมได้ แต่ implementation ต้องรอภาพจริง P0, consent และ provenance. ไม่มีภาพถูกสร้าง/ดาวน์โหลด/ใส่เว็บ ไม่มี source production ถูกแก้ และไม่มี merge/deploy.

## 2–5. Scores and risk

- Current Image Maturity: **40/100 (2/5)** — social fallback และ dimensions มีแล้ว แต่ pipeline/responsive/original library ยังไม่มี.
- Current Trust Image Score: **24/100** — ไม่มีภาพเจ้าของ ทีม ฐานบริษัท หรือ process จริง; ภาพ trust ปัจจุบันเป็น illustration.
- Current Performance Risk: **High** — trust PNG 2 ไฟล์รวม 1,723,473 B สำหรับ rendered width สูงสุด ~329 px; ไม่มี AVIF/WebP/srcset.
- Current accessibility: **Moderate-Pass** — `<img>` มี descriptive alt และ dimensions; meaningful trust SVG semantics ต้องทบทวนตอน implementation.

## 6–10. Inventory totals

- Image slots: **36** — P0 8, P1 16, P2 6, NO-IMAGE 6.
- Real Photo Required: **17**.
- AI Allowed: **12** (เฉพาะ illustration/diagram/social/decorative; บาง slot “No image needed” ยังอนุญาต vector refinement).
- Deferred for Evidence: **3** — local service evidence, transaction case, review evidence.
- Current assets: SVG 2, PNG 3, WebP/AVIF/JPG 0; content `<img>` 2; external images 0; duplicate hash 0.

## 11. Homepage plan

P0 คือ real inspection hero หรือคง no-image จนมีภาพจริง, แทน trust illustrations สองจุดด้วย inspection/product photography, คง payment เป็น SVG. Category grid ไม่ควรโหลด 12 photos; ใช้หนึ่ง editorial stripหรือ icon system. Process ใช้ SVG. Area ใช้ abstract coverage map. Pricing, FAQ และ final CTA คง no-image เพื่อความชัด.

## 12–14. Page recommendations

- Money pages: exact category/model photo + product-specific inspection; ไม่มีรูปตรงรุ่นให้ใช้ category genericหรือ no-image ห้ามรุ่นอื่นปลอม.
- Local: ใช้ service-area diagram; ห้าม storefront/staff/landmark/pickup claim จนมีหลักฐาน.
- Articles: hero/diagram เฉพาะที่ช่วยเรียนรู้; original condition photoสำหรับ safety และ AI illustration ที่เปิดเผยได้; ไม่ใส่เพื่อ SEO อย่างเดียว.
- About/Contact: priority สูงสุดสำหรับ owner/team/base/document/verified QR จริง.
- Legal/404: no-image / vector เดิม.

## 15. Exact dimension summary

Production measurements: containers 345–415 px mobile; 720 legal; 900 article; 980 detail hero; 1200 homepage container. Hero masters 1400–1600 px, content 1200–1600, cards 960–1200, OG 1200×630. Responsive candidatesและ budgets อยู่ใน `image-dimension-matrix.md` และ inventory.

## 16. Performance budget

Mobile initial image payload 90–180 KB ตาม page type; desktop 140–240 KB; LCP 0–150 KB; preload สูงสุด 1; below fold lazy; width/height required; AVIF/WebP photos; SVG diagrams. Homepage trust imagesปัจจุบันไม่ผ่าน future budgetและต้องถูกแทน/optimizeใน implementation.

## 17–22. Policy, production and risks

Alt บอกสิ่งที่เห็น ไม่ยัด keyword/กล่าวอ้างสถานที่. Evidence มี caption/provenance/consent. Real shot list 20 ชุดครอบคลุม P0/P1/P2. AI brief 12 รายการและห้ามใช้กับ people, business, transaction, review, storefront, pickup evidence. Architecture เป็น hybrid `src/assets` + stable `public`; rollout 4 phases Trust → Money → Education → Verified Local.

Critical prohibited uses: ภาพหน้าร้านขอนแก่นปลอม, ทีม/ลูกค้า/ธุรกรรม/รีวิว/เอกสารปลอม, landmark สื่อ presence, wrong model, PII/serial, unlicensed manufacturer/competitor images, unsafe battery staging และ image requests ที่ทำลาย CWV.

## 23. Recommended next batch

**Batch 14A — Real Evidence Capture and Image Pipeline Foundation**: เก็บ consent/provenance, ถ่าย P0, สร้าง Astro image component/manifest, แทน trust PNG สองไฟล์, วัด LCP/CLS/transfer ใน preview. ห้ามเริ่ม local transaction case จน evidence gate ผ่าน.

## 24. Files created

`batch-13-preflight.md`, `current-image-system-audit.md`, `current-image-assets.json`, `image-slot-inventory.csv`, `image-source-and-trust-policy.md`, `image-performance-budget.json`, `image-seo-accessibility-guideline.md`, `image-dimension-matrix.md`, `real-photo-shot-list.md`, `ai-image-production-list.md`, `visual-photography-direction.md`, `proposed-image-architecture.md`, `image-implementation-roadmap.md`, `layout-screenshots/` (84), `scripts/audits/batch-13-image-audit.mjs`, และรายงานนี้.

## 25. Git

Branch: `batch-13-image-architecture-audit`. Audit/inventory commit: `b6a59f1`; policy/specification commit: `7c94262`. Final report commit และ branch HEAD บันทึกใน release handoff หลัง commit; branch เท่านั้น ห้าม merge/deploy.

Known limitation: browser audit ใช้ Chromium; ไม่มี Firefox/WebKit. Container widths วัดจาก layout ปัจจุบัน; implementation ที่เปลี่ยน grid ต้องวัดใหม่. ไม่มี verified case study หรือ consent register ใน repository จึงไม่รับรอง local/transaction evidence.
