# KHON KAEN K2 — GSC Observation + URL Hygiene

Date: 2026-09-25 (Asia/Bangkok)
Latest finalized GSC date used: 2026-09-22

## Verdict

`PROTECT_WINNERS / NO_PAGE_EXPANSION / URL_HYGIENE_ONLY`

## Site movement

Latest 7 days (2026-09-16 → 2026-09-22):
- 12 clicks
- 165 impressions
- CTR 7.27%
- Avg position 8.37

Previous 7 days (2026-09-09 → 2026-09-15):
- 10 clicks
- 143 impressions
- CTR 6.99%
- Avg position 9.11

Latest 28 days (2026-08-26 → 2026-09-22):
- 32 clicks
- 435 impressions
- CTR 7.36%
- Avg position 9.00

Previous 28 days (2026-07-29 → 2026-08-25):
- 1 click
- 22 impressions
- CTR 4.55%
- Avg position 7.14

The site is in a breakout discovery phase. Do not add more indexable pages; the deployed sitemap already contains 383 URLs.

## K1 post-deploy observation

Comparison: 2026-09-10 → 2026-09-22 vs 2026-08-28 → 2026-09-09.

- Game-console owner: 40 impressions / 2.5% CTR / pos 12.05 → 110 / 9.09% / pos 8.73.
- Mobile owner: 11 / 18.18% / pos 10.45 → 68 / 5.88% / pos 9.32.
- Homepage: 19 / 0% / pos 7.16 → 34 / 2.94% / pos 8.44.
- Service-area hub: 10 / 0% / pos 13.6 → 19 / 5.26% / pos 9.21.
- IT documents article: 6 / 0% / pos 7.17 → 13 / 7.69% / pos 4.15.
- Computer owner: 8 / 25% / pos 15.5 → 11 / 9.09% / pos 9.91.
- Notebook owner: 1 / 0% / pos 4 → 3 / 33.33% / pos 6.33.
- Gadget owner: 6 / 0% / pos 7 → 7 / 0% / pos 13.29. Data is too sparse for rollback.

Decision: freeze K1 metadata. No second title/description rewrite in K2.

## Protected winners

- /รับซื้อเครื่องเกม-ขอนแก่น/
- /รับซื้อมือถือ-ขอนแก่น/
- /พื้นที่ให้บริการ/
- /บทความ/เอกสารขายของไอที/
- /รับซื้อคอมพิวเตอร์-ขอนแก่น/
- /รับซื้อโน้ตบุ๊ก-ขอนแก่น/
- homepage

## URL hygiene

GSC still exposed malformed legacy URLs that now return 404. Where intent and canonical ownership are unambiguous, K2 adds Vercel permanent redirects. For malformed paths with unstable Thai codepoints, the production rule uses the byte-exact percent-encoded source returned by GSC:

- /ข้อกำหนดการใช้บิการ/ → /ข้อกำหนดการใช้บริการ/
- /ข้อำำหนดการใช้บริรัการ/ → /ข้อกำหนดการใช้บริการ/
- /บทความ/เอกสารขาลองไอที/ → /บทความ/เอกสารขายของไอที/
- /รัปซื้อเน็อตบุ๊ก-ขอนกูน → /รับซื้อโน้ตบุ๊ก-ขอนแก่น/
- /รัปเหมาอุปกรณ์ไอที-ขอนกง้/ → /รับเหมาอุปกรณ์ไอที-ขอนแก่น/
- /รัูนซือเครืเอกเกม-ขอนก่ม-การสด-winner-it/ → /รับซื้อเครื่องเกม-ขอนแก่น/
- /รััปซื้อเครื่องเกม-ขอนแกีณ/ → /รับซื้อเครื่องเกม-ขอนแก่น/

Malformed URLs whose intent cannot be mapped confidently remain 404.

## Guardrails

- no new indexable pages
- no homepage rewrite
- no K1 override rewrite
- no H1/body/canonical changes
- no sitemap expansion
- no ownership transfer
- no speculative redirect for ambiguous garbage URLs

## Next measurement

Use finalized GSC data through at least 2026-09-29 for the next 7-day sanity review. Use 14–21 post-K2 finalized days for any decision to edit or roll back a K1 target.
