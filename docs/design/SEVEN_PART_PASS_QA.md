# SmartComms NZ — Seven-Part Pass QA Evidence

**Date:** 23 September 2026  
**Environment:** isolated audit workspace based on `smartcomms-nz-current-source-2026-09-23-v2.zip`.

## Deterministic tests run here

Passed:

- `scripts/test-growth-ux.mjs` — **48 checks passed**
- `scripts/test-design-ux.mjs` — **60 checks passed**
- `scripts/test-public-project-examples.mjs` — all assertions passed
- `scripts/test-pricing.mjs` through an isolated TypeScript loader — all assertions passed
- `scripts/test-validation.mjs` through an isolated TypeScript loader — **14 assertions passed**
- `scripts/test-assessment.mjs` through an isolated TypeScript loader — **17 assertions passed**
- `scripts/test-content-meta.mjs` through an isolated TypeScript loader — **29 sitemap routes registered**
- `scripts/test-finance.mjs` through an isolated TypeScript loader — all assertions passed
- `scripts/test-aged-care.mjs` through an isolated TypeScript loader — **8 profiles / 6 use cases / 44 sources**
- `scripts/test-industrial.mjs` through an isolated TypeScript loader — **8 profiles / 7 use cases / 12 FAQs**
- TypeScript `transpileModule` syntax check — **27 changed TS/TSX files passed**

The temporary audit TypeScript loader was not added to the repository. The implementation agent must use the repository's pinned `tsx` dependency and normal npm scripts.

## Not run in this environment

The supplied source ZIP did not contain `node_modules`, and this audit did not establish a complete installed Next.js dependency tree. Therefore the following remain release gates for the implementation agent:

- `npm ci`
- `npx --no-install tsc --noEmit`
- `npm run lint`
- full `npm run build`
- browser QA against the real Next.js application/runtime

Do not infer those gates passed from the isolated source/transpile tests.

## Browser QA priorities for implementation agent

Test at minimum 320 / 390 / 768 / 1024 / 1440 widths:

1. Header grouped navigation and dropdown placement.
2. Mobile hamburger + expandable Systems / Compare / Tools groups.
3. Persistent Ask SmartComms control does not crowd navigation.
4. Homepage three-tool suite and industry cards.
5. Pricing/Funding/Finance mini-navigation.
6. Pricing/funding/finance result screens and restart flows.
7. Shared enquiry modal opening/closing/focus behaviour.
8. School-bell / emergency / IP-paging / intercom evidence cards and FAQ layouts.
9. Comparison pages and horizontal table scrolling.
10. No document-level horizontal overflow.

## Business-logic preservation

This pass intentionally does not change:

- pricing model values or range calculation;
- school funding assessment rules;
- finance-fit rules;
- comparison rankings;
- enquiry/privacy routing policy;
- canonical host / sitemap policy;
- Release 2.1 external pricing capability policy.
