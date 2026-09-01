# UX/UI Batch 2 — Homepage Conversion Upgrade

## Verdict

**PASS_WITH_BUILD_UNAVAILABLE**

This batch upgrades the homepage conversion flow without changing the homepage canonical intent, H1 core, released route architecture, or lifecycle rules.

## Homepage changes

1. Added a four-cell trust strip directly below the hero.
   - Legal company context
   - Free preliminary LINE assessment
   - Inspection / price agreement before payment
   - Khon Kaen service-area positioning

2. Added a decision-first conversion section near the top of the page.
   - Sell one device
   - Sell damaged / faulty device
   - Sell multiple devices / corporate lot
   - Check service area
   - Includes a prominent LINE fallback CTA

3. Added service-case cards using the existing `LOCAL_PAGES.caseStudy` records.
   - No new invented case records were introduced in this batch.
   - Each case links back to an already released local page.

4. Added a dedicated B2B conversion panel.
   - Existing released bulk-buyout page is the primary informational destination.
   - LINE is the primary lead CTA.
   - Provides a four-item preparation checklist for lot assessment.

5. Added district navigation using only `LOCAL_PAGES` routes that are already released.
   - No new `HOLD_NOINDEX` district skeleton is linked from the homepage UI.

6. Added responsive visual treatment for the new conversion components.
   - 4 → 2 → 1 column trust layout
   - 4 → 2 → 1 decision cards
   - 3 → 1 service cases
   - 2 → 1 district navigation
   - Mobile B2B and LINE actions become stacked touch-friendly controls

## SEO / architecture safeguards

- Homepage H1 core: unchanged
- Homepage title: unchanged
- Existing released URLs: unchanged
- Architecture pages: 311
- Forecast routes: 398+
- Route collision: 0
- Duplicate architecture path/title/H1: 0
- Missing architecture parent: 0
- Product × district doorway matrix: 0
- Architecture audit: PASS

## Build status

A full Astro build could not be executed in this environment because `node_modules` is not included in the source archive and `npm ci --offline` could not resolve an uncached dependency (`zwitch@2.0.4`).

Offline checks completed:

- Architecture audit: PASS
- Homepage H1 count: 1
- Homepage CSS braces: balanced
- New homepage conversion blocks: present
- New district links: sourced only from released `LOCAL_PAGES`
- New decision UI does not send users to the HOLD master product hub

## Files changed in Batch 2

- `src/pages/index.astro`
- `docs/ux-ui/homepage-conversion-batch2-report.md`
- `docs/ux-ui/homepage-conversion-batch2-audit.json`
