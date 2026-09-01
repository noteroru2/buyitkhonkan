# Batch 1 - Pre-Index Technical Trust Fix

Date: 2026-07-12  
Site: `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/`  
Scope: Technical trust fixes before indexing. No new SEO landing pages were added. No commit, push, or deploy was performed.

## 1. Executive Summary

Batch 1 technical trust fixes were implemented and verified with local build/static-output checks.

Final verdict: **PASS - READY FOR INTERNAL QA**

Not ready for index submission yet because browser QA could not be verified in this environment, no real business photos have been provided, and production-domain ownership/live availability was not externally verified.

## 2. Baseline Before Changes

| Check | Result |
| --- | --- |
| Node | `v22.20.0` |
| npm | `10.9.3` via `npm.cmd` |
| Initial build | PASS, 86 pages built |
| Git status | NOT VERIFIED: `fatal: not a git repository` |
| Existing old robots sitemap domain | Found and fixed |
| Real business photos in `public` | Not found |

Git was not initialized or repaired during this task.

## 3. Files Changed

| File | Purpose |
| --- | --- |
| `.env.example` | Added empty GTM and Google verification env variables |
| `public/robots.txt` | Corrected sitemap domain |
| `public/images/og/default-og.svg` | Added generic branded default OG image |
| `src/layouts/Base.astro` | Added OG/Twitter image system, env-only GTM/GSC support, skip link, click events, safer schema image/logo |
| `src/layouts/Article.astro` | Added main landmark id and CTA tracking |
| `src/components/Header.astro` | Added phone CTA tracking |
| `src/components/StickyBar.astro` | Added LINE and phone CTA tracking |
| `src/styles/global.css` | Added global focus-visible styling |
| `src/pages/404.astro` | Added custom noindex 404 page |
| `src/pages/index.astro` | Added main landmark id and CTA tracking |
| `src/pages/[slug].astro` | Added detail breadcrumbs, main landmark ids, CTA tracking, safer local visual label |
| `src/pages/about.astro` | Added main landmark id |
| `src/pages/buyout-terms.astro` | Added main landmark id |
| `src/pages/contact.astro` | Added main landmark id and CTA tracking |
| `src/pages/privacy.astro` | Added main landmark id |
| `src/pages/service-area.astro` | Added main landmark id |
| `src/pages/terms.astro` | Added main landmark id |
| `src/pages/blog/index.astro` | Added main landmark id and reduced overclaim wording |
| `src/pages/สภาพสินค้าที่ขายได้.astro` | Added main landmark id |
| `src/data/categories.js` | Reduced overclaim wording |
| `src/pages/blog/gaming-notebook-resale-price.astro` | Reduced overclaim wording |
| `src/pages/blog/gpu-resale-price.astro` | Reduced overclaim wording |
| `src/pages/blog/iphone-resale-price.astro` | Reduced overclaim wording |
| `src/pages/blog/ps5-switch-resale-price.astro` | Reduced overclaim wording |
| `src/pages/blog/macbook-resale-price.astro` | Reduced overclaim wording |
| `src/pages/blog/notebook-checklist-before-sell.astro` | Reduced overclaim wording |
| `src/pages/blog/sell-iphone-before-new-model.astro` | Reduced overclaim wording |
| `src/pages/blog/sell-whole-computer-vs-parts.astro` | Reduced overclaim wording |
| `src/pages/blog/shop-vs-facebook-group.astro` | Reduced overclaim wording |
| `src/pages/blog/upgrade-computer-sell-old.astro` | Reduced overclaim wording |
| `src/pages/blog/where-to-sell-it-khonkaen.astro` | Reduced overclaim wording |
| `docs/audits/required-real-assets.md` | Added real-asset requirements |
| `docs/audits/batch-1-pre-index-technical-trust-fix.md` | Added this implementation report |

## 4. Domain and Robots Fix

| Item | Result |
| --- | --- |
| `astro.config.mjs` site domain | `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com` |
| `robots.txt` sitemap | `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/sitemap-index.xml` |
| Old `itbuy-khonkaen.com` domain in source | PASS: not found |
| `localhost` / `example.com` in app source | PASS: not found |
| `http://` findings | Only SVG namespace values |

## 5. OG Image System

Default OG support was added in `Base.astro`.

| Item | Result |
| --- | --- |
| Default OG path | `/images/og/default-og.svg` |
| Default OG absolute URL | Generated from `Astro.site` |
| `og:image` | PASS: 87/87 built HTML files |
| `og:image:alt` | PASS |
| `og:image:width` / `og:image:height` | PASS: 1200 x 630 |
| `twitter:card` | PASS: `summary_large_image` |
| `twitter:image` | PASS: 87/87 built HTML files |

Note: the current default OG is an SVG. `docs/audits/required-real-assets.md` recommends adding a real raster PNG/WebP version if social platforms require raster previews.

## 6. Visual Asset Handling

No fake storefront, team, customer, review, or case-study images were added.

`docs/audits/required-real-assets.md` now lists the real assets required before stronger trust claims are made.

The local page visual placeholder label was changed from a phrase that could imply an actual area photo to a safer asset-planning label.

## 7. Analytics and Event Tracking

Environment-only support was added.

| Env variable | Purpose | Current value |
| --- | --- | --- |
| `PUBLIC_GTM_ID` | Enables GTM script and noscript iframe only when provided | Empty in `.env.example` |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Enables Google site verification meta only when provided | Empty in `.env.example` |

No fake GTM ID or fake Google verification token was added.

Event hooks:

| Event | Trigger |
| --- | --- |
| `click_line` | LINE link click or explicit `data-track-event="click_line"` |
| `click_phone` | `tel:` link click or explicit `data-track-event="click_phone"` |

CTA links continue to work without GTM because tracking is non-blocking and does not prevent default link behavior.

## 8. 404 Page

Custom `404.html` was added.

| Item | Result |
| --- | --- |
| Built output | PASS: `dist/404.html` |
| Meta robots | PASS: `noindex, follow` |
| Included in sitemap | PASS: not included |
| Useful internal links | PASS |
| CTA links | PASS |
| Fake review/storefront claims | PASS: not added |

## 9. Schema Changes

Schema was kept conservative. No `Review`, `AggregateRating`, fake coordinates, fake map, or fake LocalBusiness storefront schema was added.

Built schema inventory:

| Type | Count |
| --- | ---: |
| `Organization` | 3 |
| `WebSite` | 3 |
| `BreadcrumbList` | 55 |
| `Service` | 55 |
| `FAQPage` | 16 |
| `Article` | 22 |

JSON-LD parse errors: **0**

## 10. Accessibility Fixes

| Fix | Result |
| --- | --- |
| Skip link | Added globally |
| Main landmark target | Added to templates/pages |
| Focus-visible styling | Added globally |
| Single H1 check | PASS: 0 pages with multiple H1 |
| Missing H1 check | PASS: 0 |

## 11. Browser QA

Status: **NOT VERIFIED**

Reason: the local server could start in foreground, but could not be kept alive as a background process long enough for browser verification. Browser attempts to open `http://127.0.0.1:4322` returned `net::ERR_CONNECTION_REFUSED`.

No browser screenshots were produced. This must be repeated manually or in an environment where the preview/static server can remain running.

## 12. Automated QA Results

Build:

| Check | Result |
| --- | --- |
| `npm.cmd run build` | PASS |
| Built pages | 87 |
| Build time | 3.05s |

Sitemap:

| Metric | Result |
| --- | ---: |
| HTML pages | 87 |
| Sitemap URLs | 86 |
| Has `404.html` | true |
| Sitemap contains 404 | false |

Metadata:

| Check | Missing |
| --- | ---: |
| Title | 0 |
| Description | 0 |
| Canonical | 0 |
| H1 | 0 |
| OG image | 0 |
| Twitter image | 0 |

Internal links:

| Check | Result |
| --- | --- |
| Broken internal links | 0 |
| Malformed no-trailing-slash internal links | 0 |

Trust language scan:

| Query group | Result |
| --- | --- |
| `อันดับ 1`, `ราคาสูงสุด`, `ดีที่สุด`, `ประเมินใน 5 นาที`, `รับถึงที่ทุกพื้นที่` | PASS: no matches after cleanup |

## 13. Remaining Risks

| Priority | Risk | Recommendation |
| --- | --- | --- |
| P1 | Browser QA not verified | Run preview/static server and verify homepage, money pages, local pages, CTA clicks, 404, and mobile layout |
| P1 | No real business photos available | Add real, privacy-safe assets listed in `required-real-assets.md` |
| P1 | GTM/GSC values not provided | Add real env values only after accounts/properties are confirmed |
| P1 | Production-domain live status not externally verified | Verify DNS, HTTPS, canonical domain, robots, sitemap, and GSC property after deployment |
| P2 | SVG OG may not preview on every social platform | Add raster `default-og.png` or `.webp` if platform previews fail |
| P2 | Git status unavailable | Check repository metadata before committing in a future batch |

## 14. Final Acceptance Checklist

| # | Item | Status |
| ---: | --- | --- |
| 1 | Build passes | PASS |
| 2 | Robots sitemap uses real Thai domain | PASS |
| 3 | No placeholder/old domain in app source | PASS |
| 4 | `og:image` exists on all built pages | PASS |
| 5 | `twitter:image` exists on all built pages | PASS |
| 6 | Default OG asset exists | PASS |
| 7 | Page-specific OG support exists through layout props | PASS |
| 8 | `.env.example` added | PASS |
| 9 | No fake GTM/GSC IDs | PASS |
| 10 | GTM renders only from env | PASS |
| 11 | LINE click event exists | PASS |
| 12 | Phone click event exists | PASS |
| 13 | CTA links work without GTM | PASS |
| 14 | Custom 404 exists | PASS |
| 15 | 404 is not in sitemap | PASS |
| 16 | Broken internal links | PASS: 0 |
| 17 | JSON-LD parse errors | PASS: 0 |
| 18 | No Review/AggregateRating schema | PASS |
| 19 | No fake storefront/coordinate/map claims added | PASS |
| 20 | Local visual placeholder made safer | PASS |
| 21 | Real asset requirement report created | PASS |
| 22 | Browser QA | NOT VERIFIED |
| 23 | Commit/push/deploy avoided | PASS |

## 15. Final Verdict

**PASS - READY FOR INTERNAL QA**

The codebase now has a safer pre-index technical trust foundation: corrected robots domain, sitewide OG/Twitter image coverage, env-only GTM/GSC support, click tracking hooks, custom 404, conservative schema, accessibility improvements, and documented real-asset requirements.

Do not submit for indexing yet. First complete browser QA, add real business assets where needed, provide real GTM/GSC values if tracking is required, and verify the production domain after deployment.
