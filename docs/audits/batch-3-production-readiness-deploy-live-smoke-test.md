# Production Readiness, Deploy & Live Smoke Test Report (Batch 3)

This report logs the production release verification, hosting configuration audits, and live custom domain smoke test execution for the WINNER IT Khon Kaen website.

---

## 1. Release Identification

- **Commit SHA**: `64875701a5ce910f5451df677d2077e68ca43ee8` (git branch: `main`)
- **Hosting Provider**: Vercel (Git-triggered Auto-deployment Integration)
- **Production URL**: `https://buyitkhonkan.vercel.app`
- **Custom Domain URL**: `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com` (`https://รับซื้อไอทีขอนแก่น.com`)
- **Deployment Status**: `READY / LIVE`
- **Release Timestamp**: July 14, 2026

---

## 2. Environment Variables & SEO Tags
- **GTM Integration**: `PUBLIC_GTM_ID` is currently pending owner configuration. Event handlers (`click_line` and `click_phone`) fallback to safe dataLayer mocked array pushes when GTM is not loaded.
- **Google Search Console**: `PUBLIC_GOOGLE_SITE_VERIFICATION` is currently pending owner configuration. Ownership verification will be finalized once the owner creates the Search Console property and provides the verification tag.

---

## 3. URL Verification & HTTP Headers Status

We executed automated smoke tests against the live deployment on the custom domain. All results are logged below:

| URL Path | Expected | Actual Status | HTTPS | Canonical URL | robots meta / header | Status |
| :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| `/` | 200 | 200 OK | Yes | `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/` | None (Indexable) | **PASS** |
| `/robots.txt` | 200 | 200 OK | Yes | None (Raw file) | None | **PASS** |
| `/sitemap-index.xml` | 200 | 200 OK | Yes | None (Raw file) | None | **PASS** |
| `/sitemap-0.xml` | 200 | 200 OK | Yes | None (Raw file) | None | **PASS** |
| `/images/og/default-og.png` | 200 | 200 OK | Yes | None (Raw file) | None | **PASS** |
| `/notebook/` | 200 | 200 OK | Yes | `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/notebook/` | None (Indexable) | **PASS** |
| `/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%8B.../` | 200 | 200 OK | Yes | `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/...` | None (Indexable) | **PASS** |
| `/blog/` | 200 | 200 OK | Yes | `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/blog/` | None (Indexable) | **PASS** |
| `/contact/` | 200 | 200 OK | Yes | `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/contact/` | None (Indexable) | **PASS** |
| `/non-existent-page-test-12345` | 404 | 404 Not Found | Yes | `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/404/` | `noindex, follow` | **PASS** |

### Key Header & SEO Audits:
- **Noindex Protection**: Staging/preview Vercel deployments correctly return `X-Robots-Tag: noindex`. The custom production domain `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/` returns **no** `noindex` header, allowing search engines to index the pages successfully.
- **Redirection**: HTTP (`http://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/`) returns a `308 Permanent Redirect` redirecting cleanly to HTTPS.
- **Sitemap Domain**: All entries in `/sitemap-0.xml` point to `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com` with 0 dev or staging URL leaks.

---

## 4. Layout & Interactivity Verification

We verified layout boundaries and interaction scripts across viewports (`360px`, `390px`, `430px`, `768px`, `1440px`):
- **Horizontal Overflows**: `0` horizontal overflows detected on any page. Layout boundaries correctly fit the viewport widths.
- **Console Errors**: `0` javascript runtime console errors or uncaught script exceptions.
- **Failed Requests**: `0` first-party resources or image failures (No broken image links).
- **CTA Interactivity**:
  - LINE CTA is mapped correctly to LINE contacts. Simulated clicks trigger dataLayer pushes with event type `click_line` exactly once.
  - Phone CTA is mapped to the tel hook. Simulated clicks trigger dataLayer pushes with event type `click_phone` exactly once.

---

## 5. Visual Gallery Trust Alignment

Before release verification, we successfully adjusted the Visual Gallery texts in [index.astro](file:///c:/Users/User/Desktop/รวมโปรเจค/รับซื้อไอทีขอนแก่น/src/pages/index.astro) to align with illustration-only disclosure:
- Heading of Card 2 changed to: `"ตัวอย่างประเภทสินค้าที่รับประเมิน"`
- Body of Card 2 changed to: `"ภาพประกอบกลุ่มโน้ตบุ๊ก มือถือ และอุปกรณ์ไอทีที่สามารถส่งข้อมูลมาประเมินได้"`
- Heading of Card 3 changed to: `"ตัวอย่างขั้นตอนตรวจสอบและชำระเงิน"`
- Body of Card 3 changed to: `"หลังตรวจสินค้าและตกลงราคากันแล้ว ลูกค้าสามารถเลือกรับเงินสดหรือเงินโอนได้"`
- All illustration alt texts prefix with `"ภาพประกอบ..."`.

No claims are made that the illustrations represent actual physical local locations, customers, inventory stock, or transactions.

---

## 6. Owner Actions Remaining

The following tasks are pending owner action before launch is fully complete:
1. **Google Search Console Property Setup**: The owner must verify ownership using the HTML tag method and populate the `PUBLIC_GOOGLE_SITE_VERIFICATION` key.
2. **Google Tag Manager Activation**: Populate the real `PUBLIC_GTM_ID` key in their environment setup on Vercel.
3. **Submit Sitemap to Google**: Once GSC ownership is verified, submit `https://xn--12cb0a0clbb5eueac5b7cya1nrb2eh.com/sitemap-index.xml` via GSC.
