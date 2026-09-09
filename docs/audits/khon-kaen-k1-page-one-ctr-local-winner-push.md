# KHON KAEN K1 — Page-One CTR + Local Winner Push

Date: 2026-09-09 (Asia/Bangkok)

## Verdict

`TARGETED_PUSH / EXACT_PATH_ONLY / WINNER_SAFE`

## GSC baseline

Finalized window: 2026-08-10 → 2026-09-06.

- Site: 9 clicks / 113 impressions / CTR 7.96% / avg position 9.41
- `/รับซื้อเครื่องเกม-ขอนแก่น/`: 2 / 55 / 3.64% / 8.67 — primary CTR target
- `/`: 0 / 9 / 0% / 6.78 — page-one homepage CTR target
- `/พื้นที่ให้บริการ/`: 0 / 7 / 0% / 9.00
- `/บทความ/วิธีเช็กรุ่นโน้ตบุ๊กก่อนขาย/`: 0 / 6 / 0% / 7.67
- `/บทความ/เอกสารขายของไอที/`: 0 / 4 / 0% / 6.00
- `/รับซื้อแกดเจ็ต-ขอนแก่น/`: 0 / 3 / 0% / 4.00 — low-data page-one opportunity

## Protected

- `/รับซื้อมือถือ-ขอนแก่น/`: CTR 22.22%; no K1 override.
- `/รับซื้อโน้ตบุ๊ก-ขอนแก่น/`: position 4 but only 1 impression; insufficient evidence for a change.

## Implementation

K1 uses a central exact-path override map in `src/data/k1SeoOverrides.js`, applied by `src/layouts/Base.astro`.

The override changes only:

- HTML title
- meta description
- Open Graph title/description
- matching top-level Article / Service / WebPage / CollectionPage schema title or description fields where applicable

It does not change H1, body copy, canonical, URL, lifecycle, robots, redirects, or internal architecture.

## Observation rule

Do not judge K1 until production deployment is verified. After production pass, freeze the six targets and count only finalized GSC days after deployment. Use 7 days as a sanity review and 14 days as the primary decision window; extend to 21–28 days if target impressions remain sparse.
