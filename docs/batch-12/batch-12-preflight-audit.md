# Batch 12 Preflight Audit

- Baseline: 2026-07-18, branch `main`, commit `664e6bed9d69c936808ef36d470c6702383caaa5`.
- Working tree ก่อนเริ่มมีไฟล์เดิมเปลี่ยน 2 ไฟล์: `docs/audits/batch-3-live-smoke-results.json` และ `docs/audits/batch-4-metadata-audit.json`; ไม่ reset และบันทึกแยกจาก source Batch 12.
- Runtime: Node v22.20.0, npm 10.9.3, Astro 5.2.0. เดิมมีเฉพาะ build/dev/preview ไม่มี lint, typecheck หรือ unit test.
- Baseline build: 87 HTML, sitemap 86 URL, indexable 86, 404 noindex และไม่อยู่ใน sitemap.
- Metadata baseline: 28 issues (title ยาว 27, description หน้าแรกยาว 1), ไม่มี duplicate title/description.
- Breadcrumb baseline: Category 15 หน้าและ Article 22 หน้ามี; Brand 6, Model 21, Condition 5 และ Local 8 มี schema แบบตื้นและ visible breadcrumb เพียง 2 ระดับ.
- Mobile navigation baseline: desktop nav ถูกซ่อนต่ำกว่า 900px โดยไม่มีเมนูมือถือ.
- Tracking baseline: optional GTM ผ่าน `PUBLIC_GTM_ID`; event เดิม `click_line`/`click_phone` และเก็บ link text ซึ่งไม่จำเป็น.
- Trust baseline: พบ category case study 15 ชุดและ local case study 8 ชุดที่ไม่มีหลักฐานธุรกรรมใน repository รวมทั้งคำกล่าวอ้างเชิงประสบการณ์/ความเร็ว/ราคาสูงสุด.

Legal pages คง index และ sitemap เพราะมีเนื้อหาจริงและช่วยด้าน trust. ไม่มีการเปลี่ยน URL, canonical, robots หรือ redirect architecture.
