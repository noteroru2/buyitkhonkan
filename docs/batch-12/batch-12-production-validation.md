# Batch 12 Production Validation

Status: **PASS — RELEASED TO PRODUCTION** on 2026-07-18 (Asia/Bangkok).

## Release identity

- Batch branch HEAD: `a63d2a46396c62d7b8b67969d334576c4c1e7766`
- Batch merge commit: `0edc62ef04919e4e37ac9d6a71f687d006ad460a`
- Sitemap hotfix commit: `ad9fe9f`
- Hotfix merge commit: `c2123d3`
- Production project: `amphons-projects-bb1ec3bf/buyitkhonkan`
- Final validated deployment: `dpl_Hd5hQTnUgfk11w2vxDC4ndCTQ6Ba`
- Deployment URL: `https://buyitkhonkan-nzrkvj974-amphons-projects-bb1ec3bf.vercel.app`
- Canonical production domain: `https://รับซื้อไอทีขอนแก่น.com`

## Production gates

- `/`: 200
- `/robots.txt`: 200
- `/sitemap.xml`: 200 (sitemap index)
- `/sitemap-0.xml`: 200, 86 `<loc>` entries
- Deliberately missing URL: 404
- Build: 87 pages
- Metadata/title/description/canonical/H1/schema errors: 0
- Breadcrumb coverage: 77 pages
- Chromium console errors during final desktop run: 0

The first Batch 12 deployment (`dpl_FxrfajpkoujE9YEXBsMtQ9oSkdWv`) exposed `/sitemap.xml` as 404. Release validation stopped, a narrow static sitemap-index compatibility endpoint was added on a hotfix branch, rebuilt and audited, then merged and deployed. The final deployment above passed the gate.

## UX/UI production validation

Passed at 360x800, 390x844, 430x932, 768x1024, 1024x768, 1440x900 and 1920x1080. The mobile drawer opens, locks body scroll, has no horizontal overflow, closes with Escape and returns focus to the hamburger. Desktop navigation remains visible and the mobile trigger remains hidden. Category and service-area pages retain one clear H1, canonical URL and usable CTA hierarchy.

Evidence: `docs/batch-12/production-screenshots/` (8 screenshots).

Known limitation: Firefox and WebKit were unavailable in the in-app browser environment. Production interaction validation therefore covers Chromium; build and HTTP checks are browser-independent.

## Rollback

The immediately preceding production deployment is `dpl_FxrfajpkoujE9YEXBsMtQ9oSkdWv`; the pre-Batch-12 deployment is `dpl_DUDEjAejjgbuicoD6xoZBTf47Uso`. Roll back through Vercel deployment promotion/redeployment if necessary; do not force-push or change DNS/domain configuration.
