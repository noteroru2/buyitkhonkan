# Batch 15A QA report

## Automated regression

- Astro production build: PASS, 87 pages.
- Sitemap: PASS, 86 URLs.
- Batch 12 audit: PASS; missing title 0, duplicate titles 0, duplicate descriptions 0, missing canonical 0, bad H1 0, schema errors 0.
- ResponsiveImage contract: PASS, 11 checks.
- `git diff --check`: PASS.
- AI image contract: AVIF + WebP sources, `srcset`, `sizes`, fixed dimensions, lazy loading and low fetch priority present.

The legacy `images:validate` script reports a valid empty legacy manifest; Batch 15A assets are governed by `docs/batch-14b/approved-ai-assets.json` and were separately checked against that manifest.

## Browser visual QA

Viewports: requested 390×844 and 1440×900. The in-app browser content area measured 375×844 and 1425×900 after browser chrome; both responsive breakpoints were exercised.

| Page | Mobile | Desktop | Result |
| --- | --- | --- | --- |
| Homepage | `homepage-mobile.webp` | `homepage-desktop.webp` | PASS after fixing component-boundary CSS; image width 338.7px mobile / 720px desktop, caption visible, no horizontal overflow |
| About | `about-mobile.webp` | `about-desktop.webp` | PASS; caption visible and explicitly non-documentary, no horizontal overflow |
| Contact | `contact-mobile.webp` | `contact-desktop.webp` | PASS; no AI image rendered, contact content and CTAs remain clear |

Each page retains exactly one H1 and its existing canonical. Homepage/About each contain one approved AI slot; Contact contains zero. Console inspection found no layout overflow. Screenshots use viewport/section clips rather than unreliable long-page stitching around sticky UI.

## Issue found and resolved

Initial visual QA showed the homepage image at 1136px because a scoped page selector did not cross the Astro component boundary. Selectors were changed to explicit global class selectors. Rebuild and browser QA confirmed the 720px maximum.
