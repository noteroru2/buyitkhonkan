# Image Implementation Roadmap

## Phase A — Trust Foundation

- Slots: HOM-HERO-01, HOM-TRUST-01/02, ABOUT-OWNER/BASE/DOC, CONTACT-TEAM/QR (8 P0 + QR).
- Assets: 8 real evidence/product shots + verified QR; dependency consent, base/location wording, privacy/legal review.
- Risk: highest evidence/privacy risk; prohibit AI fallback.
- Expected impact: Trust +++ / Conversion +++ / E-E-A-T ++ / SEO indirect ++.
- Cost: initial payload +150 KB maximum; below-fold +300 KB; replace current 1.72 MB trust sources so net transfer should improve.

## Phase B — Money Page Visuals

- Slots: CAT-HERO/PROC, BRD-HERO, MOD-HERO, condition heroes and original product library.
- Assets: 9 category masters, then exact model images only where accurate; target 12–18 source shots with reusable crops.
- Dependency: asset manifest, Astro Picture component, product ownership/license.
- Risk: wrong model/trademark, request explosion.
- Impact: SEO/CTR ++ / UX ++ / Trust ++; cost ≤210 KB initial per money page and ≤8 requests total.

## Phase C — Condition and Education

- Slots: condition detail, article hero/inline, comparison and blog thumbnails.
- Assets: 6 real condition/safety shots + 4–8 SVG/AI educational visuals.
- Dependency: safety supervision and technical review; disclosure policy.
- Risk: unsafe or exaggerated damage; AI UI inaccuracies.
- Impact: topical authority +++ / UX +++ / conversion +; cost ≤200 KB initial article, lazy remainder.

## Phase D — Local and Authority Evidence

- Slots: LOCAL-MAP and only verified LOCAL-EVID/TXN/REVIEW slots.
- Assets: 1 abstract map now; real local/transaction assets remain deferred until consent/provenance.
- Dependency: evidence register, location proof, review policy.
- Risk: critical false-presence/local claim.
- Impact when verified: Local trust/SEO +++; before evidence, no-image is safer.

## Delivery sequence

1. Implement image component/manifest and CI audit without changing claims.
2. Replace two oversized trust PNGs with approved truthful photos.
3. Measure LCP/CLS/mobile transfer in preview; choose hero inclusion only if CWV budget passes.
4. Roll out one template cluster at a time; monitor Search Console/CTA analytics for 28 days.
5. Do not create 86 unique images. Reuse by intent and only use exact-model visuals where accurate.

Rollback per phase: revert template/manifest references while retaining approved source masters outside deploy. Never restore oversized PNG as LCP; use no-image/CSS fallback.
