# Mobile Navigation QA — Batch 12.1

Verdict: **PASS (Chromium)**

- Production preview: Astro build served locally on an isolated preview port.
- Viewports passed: 7/7 — 360×800, 390×844, 430×932, 768×1024, 1024×768, 1440×900, 1920×1080.
- Mobile: hamburger visible, 44×44 px, `aria-expanded` changes, and `aria-controls="mobile-menu"` resolves.
- Mouse and keyboard opening work. Focus moves into the drawer.
- Focus trap passed in both directions; Escape closes and returns focus to the hamburger.
- Overlay closes the drawer. Body scroll lock is added and removed correctly.
- Drawer links close the drawer; desktop navigation remains visible at desktop widths.
- Sticky CTA remains visible below the drawer without covering its links.
- LINE and telephone anchors remain valid and tracking does not prevent navigation.
- Reduced-motion rule is present. Close control is 44×44 px.
- Console errors: 0. Horizontal overflow: 0 at all seven viewports.
- `PUBLIC_GTM_ID` was absent during preview; the page and CTA interactions continued without an error.

Browser limitation: Firefox/WebKit were not available in the in-app browser environment; Chromium was tested.

## Bugs found and fixed

1. Closed drawer created 325 px horizontal overflow at 360 px. Fixed by removing it from layout while `aria-hidden="true"`.
2. Overlay rendered visually but had a 0 px click box inside the filtered sticky header. Fixed with an explicit viewport-height overlay.
3. Conversion bootstrap was made inline so its fail-safe is not dependent on deferred module execution order.

## Screenshots

- `screenshots/homepage-360-closed.png`
- `screenshots/homepage-360-open.png`
- `screenshots/homepage-390-open.png`
- `screenshots/homepage-430-open.png`
- `screenshots/category-notebook-390.png`
- `screenshots/local-area-390.png`
- `screenshots/homepage-1440.png`
