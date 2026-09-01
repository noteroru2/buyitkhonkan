# Batch 14D — Browser QA and release report

Date: 2026-07-18

## Preflight

- Source branch and origin matched at `9b18306b7f9edbf7497a2fc6f04b435bc64c01ab`.
- Pre-existing `docs/audits/batch-3-live-smoke-results.json` remained modified locally and was never reset, staged, or committed.
- Production build passed: 87 pages.

## Browser release gate

Tested the homepage and all eight image-enabled category routes using the production preview.

- Homepage: eight auditable product-image slots; exactly one H1; no horizontal overflow.
- Categories: notebook, smartphone, computer, game console, camera, MacBook, iPad/tablet, and monitor.
- Every tested category: one product image slot, one H1, zero broken images, no horizontal overflow, canonical retained.
- Desktop viewport: 1440×900.
- Mobile viewport: 390×844.
- Responsive sources, lazy loading, fixed dimensions, AVIF/WebP remained intact.

## QA correction

The initial category implementation placed the large product image before the H1. Browser QA showed the H1 below the desktop fold. The image was moved after the existing introduction. No copy, URL, canonical, H1 text, or search intent changed. After correction the desktop H1 began at 263px and the image at 718px; mobile H1 began at 229px.

Screenshots are stored in `docs/batch-14d/screenshots/`.
