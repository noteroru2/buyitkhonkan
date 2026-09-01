# Deployment Record (Batch 3)

This log tracks the chronological deployment steps, configuration settings, and verification markers of the release.

## 1. Hosting Environment Settings

- **Hosting Provider**: Vercel
- **Project Link Mode**: Direct GitHub Integration (`noteroru2/buyitkhonkan`)
- **Production Branch**: `main`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Astro
- **Production base URL**: `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com` (`https://รับซื้อไอทีขอนแก่น.com`)
- **Vercel Default Subdomain**: `https://buyitkhonkan.vercel.app`

---

## 2. Release Steps Log

1. **Visual Gallery Copy Alignment**:
   - Refactored text and headings to conform to illustration disclosure in [index.astro](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/src/pages/index.astro).
2. **Local Release Build Check**:
   - Clean installed dependencies with `npm ci`.
   - Built the Astro app successfully (`npm run build`). Correctly generated 87 HTML files.
3. **Changes Stage & Git Commit**:
   - Staged changes in `src/pages/index.astro` and `docs/audits/screenshots/batch-2-1/homepage-desktop-1440-after.png`.
   - Committed changes: `feat: complete production readiness and Vercel release QA`.
4. **Git Push**:
   - Pushed commit to remote repository `main` branch.
   - Remote url: `https://github.com/noteroru2/buyitkhonkan.git`.
5. **Vercel Deployment Verification**:
   - Monitored Vercel deployment over the live URLs.
   - Confirmed deployment status is `READY / LIVE`.
6. **Live Custom Domain Smoke Test**:
   - Executed automated smoke tests checking HTTP response statuses, HTTPS, canonical tags, redirects, console errors, horizontal overflows, and tracking events on the custom domain.
   - Verified that `http` redirects to `https` cleanly.

---

## 3. Deployment Artifacts

- **Smoke Test Results Log**: [batch-3-live-smoke-results.json](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/batch-3-live-smoke-results.json)
- **Deployment & Test Verification Report**: [batch-3-production-readiness-deploy-live-smoke-test.md](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/docs/audits/batch-3-production-readiness-deploy-live-smoke-test.md)
- **Release Commit SHA**: `64875701a5ce910f5451df677d2077e68ca43ee8`
