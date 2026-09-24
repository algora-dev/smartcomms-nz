# SmartComms NZ — Seven-Part Growth / Navigation Candidate Export

## Export date
23 September 2026.

## Baseline
Built from owner-supplied:

`smartcomms-nz-current-source-2026-09-23-v2.zip`

The owner confirmed that v2 represents the currently deployed/live SmartComms baseline. The historical Git/export metadata inside that source ZIP may not reflect the final deployment packaging, so the implementation agent must compare this candidate against the current production repository before merging.

## This candidate adds

- grouped Systems / Compare / Tools navigation;
- persistent contextual SmartComms help access;
- clear Pricing Tool / Funding Checker / Finance Checker suite;
- homepage planning-tool cleanup;
- tool mini-navigation;
- internal-journey improvements;
- Search Console-led strengthening of School Bells, Emergency/Lockdown, IP Paging/PA and IP Intercom;
- diverse published NZ evidence cards;
- Design & UX Standard v1.1.0;
- growth/design regression tests and implementation records.

See:
- `SEVEN_PART_GROWTH_IMPLEMENTATION_HANDOFF.md`
- `docs/design/SEVEN_PART_PASS_CHANGE_MANIFEST.md`
- `docs/design/SEVEN_PART_PASS_QA.md`
- `docs/search/SEARCH_GROWTH_EVIDENCE_2026-09-23.md`

## Verification performed in the audit environment

PASS:
- `scripts/test-growth-ux.mjs` — 48 checks
- `scripts/test-design-ux.mjs` — 60 checks
- `scripts/test-public-project-examples.mjs`
- pricing tests via isolated TS loader
- validation tests — 14 checks
- assessment tests — 17 checks
- content-meta tests — 29 sitemap routes
- finance tests
- aged-care tests
- industrial tests
- TypeScript syntax transpilation — 27 changed TS/TSX files

## Verification still required in the implementation environment

Run the repository's pinned toolchain:

```bash
npm ci
npx --no-install tsc --noEmit
npm run lint
npm run test:pricing
npm run test:validation
npm run test:assessment
npm run test:content-meta
npm run test:finance
npm run test:aged-care
npm run test:industrial
npm run test:public-project-examples
npm run test:design-ux
npm run test:growth
npm run build
```

Then perform browser QA from `SEVEN_PART_GROWTH_IMPLEMENTATION_HANDOFF.md`.

## Business logic preserved

This candidate does not intentionally change:
- pricing assumptions / 80–100% range;
- funding rules;
- finance-fit rules;
- comparison rankings;
- enquiry/privacy operating model;
- canonical host / sitemap policy;
- Release 2.1 external pricing API policy.

## Production status

This ZIP is a **candidate implementation for agent integration and deployment**. It has not been deployed by this audit environment.

The implementation agent must compare against current production before deployment and preserve any newer legitimate changes.

## Exclusions

No `node_modules`, `.next`, `.git`, secrets, production environment files, customer data or private analytics exports are included.
