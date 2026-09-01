# Required Real Assets

This project currently has no verified real business photos in `public` beyond the favicon and the generic branded OG graphic.

> [!IMPORTANT]
> **Status Check (July 13, 2026)**: Real business photos (such as team members, storefronts, actual diagnostic setups, or customer transactions) have **NOT** yet been received from the website owner.
>
> All current placeholder photos are strictly marked as illustrations ("ภาพประกอบ") and have a visible layout disclaimer on the homepage. They must not be registered in schema metadata or represented as actual proof of operations.

Do not use fake storefront, fake team, fake customer, fake review, or fake case study images.

## Priority Assets To Prepare

| Priority | Asset | Suggested file path | Notes |
| --- | --- | --- | --- |
| P1 | Homepage trust photo | `public/images/trust/homepage-work-photo.webp` | Real work/service photo, no private customer data visible |
| Completed | Default OG PNG | `public/images/og/default-og.png` | [Completed in Batch 2] Rendered full-bleed from SVG source |
| P1 | Money page product photos | `public/images/money/` | Real product/category photos, not stock |
| P1 | Local meeting point photos | `public/images/local/` | Only public/safe locations actually used for appointments |
| P2 | Anonymized LINE process screenshot | `public/images/trust/line-process.webp` | Blur names, phone numbers, addresses, serial numbers |
| P2 | Case study proof photos | `public/images/cases/` | Only with permission and no sensitive data |
| P2 | Company proof/logo asset | `public/images/brand/` | Logo or company identity asset if available |

## Minimum Requirements

- Use descriptive alt text based on what is visible.
- Add `width` and `height` attributes when rendering.
- Use lazy loading below the fold.
- Do not imply a storefront in Khon Kaen unless a verified storefront asset and business fact are provided.
- Do not add Review or AggregateRating schema from these assets.
