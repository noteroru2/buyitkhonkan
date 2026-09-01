# Batch 12 Final Report

## Final Release Addendum — 2026-07-18

**PASS — merged to `main`, deployed and production-validated.** Batch branch `a63d2a4` merged as `0edc62e`. The first deployment revealed `/sitemap.xml` returned 404, so validation stopped and the narrow hotfix `ad9fe9f` was merged as `c2123d3`. Final validated Vercel deployment is `dpl_Hd5hQTnUgfk11w2vxDC4ndCTQ6Ba` on `https://รับซื้อไอทีขอนแก่น.com`.

Final gates: build 87 pages; sitemap 86 URLs; automated SEO/schema audit 0 errors; home/robots/sitemap endpoints 200; missing URL 404; Chromium UX passed all 7 requested viewports with no horizontal overflow or console error. Production evidence is in `docs/batch-12/production-screenshots/`. Firefox/WebKit remain untested because they are unavailable in the browser environment. See `batch-12-production-validation.md` for deployment and rollback details.

## Executive Summary and Verdict

**PASS for branch QA / NOT DEPLOYED** — core regression และ Chromium interaction QA ผ่านครบ 7 viewport แล้ว พร้อมส่ง branch เพื่อ review; ยังไม่อ้างว่า production ผ่านเพราะยังไม่ได้ merge/deploy.

- Source commit: `664e6bed9d69c936808ef36d470c6702383caaa5`
- Implementation commit: `146398c`
- Initial QA/report commit: `958468f`
- Browser QA commit: `3f55dee`
- Final branch HEAD before report update: `3f55dee`
- Branch: `batch-12-trust-ctr-mobile-tracking`
- Trust: case study ที่ไม่มีหลักฐาน 23 ชุดหยุดแสดงเป็นธุรกรรมจริงและแปลงเป็น explicit example scenario; ไม่มี verified case ใน repository.
- Metadata: baseline 28 issues; final 0 issues. Title ที่แก้บันทึกใน CSV และ description หน้าแรกย่อเหลือข้อความเดียวที่ตรง intent.
- Breadcrumb: ก่อนแก้ detail types เป็น 2 ระดับ; หลังแก้ Category/Brand/Model/Condition/Local/Article รวม 77 หน้า มี visible + JSON-LD สอดคล้องกัน.
- Mobile navigation: lightweight accessible drawer, no dependency ใหม่, ลด header mobile เหลือ brand + hamburger และคง hero/sticky CTA.
- Tracking: GTM เดิมผ่าน env `PUBLIC_GTM_ID`; dataLayer fallback, sanitized parameters, fail-safe links.
- Sitemap/indexing: 86 URL คงเดิม, legal pages คง index, 404 noindex/outside sitemap, URL/canonical/robots/redirect ไม่เปลี่ยน.
- Build: 87 pages PASS. Automated audit PASS ทุก critical field.
- Browser QA: Chromium ผ่าน 7/7 viewport; horizontal overflow 0, console error 0, focus trap/Escape/overlay/scroll lock ผ่าน.
- Screenshots: `docs/batch-12/screenshots/` จำนวน 7 ภาพ.
- Bugs fixed during QA: closed-drawer overflow, zero-height overlay hit area, และ tracking bootstrap execution order.
- Known limitations: Firefox/WebKit ไม่มีใน browser environment; production validation ยังไม่รัน.
- Deferred: merge, deploy และ production validation ตาม release gate.
- Deployment status: NOT DEPLOYED.

Rollback: revert Batch 12 commits บน branchหรือ redeploy production deployment ก่อนหน้า; ห้ามเปลี่ยน redirect/domain. ไฟล์ผลเดิมสองไฟล์ใน working tree ถูกเก็บไว้และไม่ reset.
