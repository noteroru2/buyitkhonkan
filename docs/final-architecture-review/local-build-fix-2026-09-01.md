# Local Build Fix — 2026-09-01

## Trigger

User-local build reached Astro/Vite successfully after `npm ci`, then failed while compiling `src/pages/บทความ/index.astro` with:

`Unexpected "const"` at line 143.

## Root cause

The `const posts = [` array was missing its closing `];` after the final legacy article object. As a result, `const releasedGuidePosts = ...` was parsed as if it appeared inside the array expression.

## Fix

Added the missing `];` immediately before `const releasedGuidePosts` in:

`src/pages/บทความ/index.astro`

No URL, H1, title, description, canonical, robots, lifecycle, or content ownership data was changed.

## Verification completed in sandbox

- Extracted Astro frontmatter passes `node --check`.
- `npm run architecture:registry` — PASS (`297 INDEX / 14 HOLD`).
- `npm run architecture:final-review` — PASS (`383` expected indexable URLs).
- `npm run architecture:audit` — PASS.
- `npm run discovery:audit` — PASS.
- HOLD discovery leaks — 0.
- Broken discovery links — 0.

## Build status

A full Astro rebuild still cannot be rerun inside the sandbox because `npm ci` times out in the sandbox network environment. The user-local environment already demonstrated successful dependency installation, so the next required check is to rerun `npm run build` locally using this patched source.
