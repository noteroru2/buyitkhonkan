# Batch 14A — Real Evidence Intake and Image Pipeline Foundation

## 1. Final Verdict

**WARNING** — pipeline, provenance, privacy, component and regression QA pass, but no approved real photo exists. Hero and two trust replacements are correctly blocked; production is unaffected because this branch is not merged/deployed.

## 2–9. Git and asset intake

- Branch: `batch-14a-real-evidence-image-pipeline`.
- Final SHA: recorded in handoff after final commit.
- Intake candidates found: 2 legacy trust illustrations; real intake images: 0.
- Approved: 0; Rejected: 0; Deferred information: 2.
- Privacy risks found in actual intake: 0 because no real intake file exists. Legacy illustrations show no detected PII but lack provenance/rights records.
- Provenance: schema/template operational; master inventory valid and empty. No fictional asset records.
- Real P0 images still missing: 8/8.

## 10–11. Pipeline and component

`private-assets/**` is ignored except intake README. Pending/rejected/approved-source remain local and untracked. Manifest validator gates rights, consent, privacy, reviewer, pages, slots and alt. Processor reads only approved-source, auto-orients, caps at 2000 px, strips metadata via new WebP encode, prevents upscale/overwrite, supports dry run and critical non-zero exit.

`ResponsiveImage.astro` provides AVIF/WebP/JPEG-or-PNG format support through Astro `getImage`, responsive srcsets/sizes, mobile art direction, intrinsic dimensions, aspect ratio, fit/position, alt/decorative/caption, loading/fetch priority/decoding, classes and slot ID with no client JavaScript. It fails for missing content alt/dimensions and lazy high-priority images.

## 12–16. Trust, hero and performance

- Trust before: 916,976 + 806,497 = 1,723,473 bytes; 1024² PNG illustrations; lazy below-fold; rendered maximum ~329×247.
- Trust after: unchanged on this branch; documented legacy exception `BLOCKED_BY_REAL_PHOTO`. New/P0 oversized images: 0.
- Hero: Option B No-image, unchanged typography/graphic. No AI/stock/evidence placeholder.
- Images implemented: 0, intentionally.
- Payload before/after: unchanged; no LCP image added. LCP regression: none expected. CLS layout guard: pass; field measurement deferred until real integration.

## 17–20. Regression results

- Build 87; sitemap 86.
- SEO: metadata/title/description/canonical/H1/schema errors 0; URL/H1/intent/schema unchanged. One broken internal href spelling corrected to existing canonical local URL.
- Accessibility: missing content alt 0, missing dimensions 0; component fail-fast and decorative semantics present.
- Browser: 21 combinations / 7 viewports, overflow/broken images/console/mobile interaction failures 0; 10 screenshots.

## 21–22. Limitations and blocked slots

No real image, consent release or photographer/ownership data was supplied. Visual privacy/quality scoring and real processor output cannot be validated. Firefox/WebKit and field CWV unavailable. Blocked slots: `HOM-HERO-01`, `HOM-TRUST-01`, `HOM-TRUST-02`, `ABOUT-OWNER-01`, `ABOUT-BASE-01`, `ABOUT-DOC-01`, `CONTACT-TEAM-01` plus real process/workbench usage planned under P0 foundation.

## 23. Recommended Batch 14B

First intake only: capture the Batch 13 P0 shot list, collect releases/provenance, human privacy review, process approved files, integrate at most Hero/Trust/About/Contact approved slots, then measure preview LCP/CLS/payload. Money pages remain out of scope until that gate passes.

## 24. Rollback

No deployment. Revert Batch 14A commits or drop the branch. Component/scripts are unused by production templates. The single href correction can be reverted independently if repository routing changes; do not reset the user smoke file.

## 25. Files changed

`.gitignore`, `package.json`, intake README, manifest schema/template/inventory/audit, privacy/hero/QA/final docs, `ResponsiveImage.astro`, image process/validate/performance/component-test scripts, 10 QA screenshots, generated image audit JSON, and one corrected internal article href. No image binary, customer data, AI evidence, canonical, H1, schema, redirect, layout or deployment config changed.
