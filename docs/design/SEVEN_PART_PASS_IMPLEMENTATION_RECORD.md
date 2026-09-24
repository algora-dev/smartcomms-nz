# SmartComms NZ — Seven-Part Growth / Navigation Implementation Record

**Date:** 23 September 2026  
**Baseline:** `smartcomms-nz-current-source-2026-09-23-v2.zip`

## Approved scope

1. Simplify desktop/mobile navigation into Systems / Compare / Tools.
2. Make Pricing / Funding / Finance an obvious three-tool suite.
3. Replace UI/navigation use of “Ballpark Price” with “Pricing Tool”; retain “ballpark” only as descriptive estimate language where useful.
4. Strengthen the homepage three-tool planning section.
5. Add consistent tool cross-navigation and relevant internal journeys.
6. Strengthen existing pages already earning early Search Console impressions.
7. Add diverse NZ evidence/case-study content where it improves the answer.

## Key implementation decisions

- Existing SmartComms Design & UX Standard remains authoritative and is updated to v1.1.0.
- No new visual brand, font, dependency or pricing/funding/finance rule set is introduced.
- Header now uses grouped navigation rather than adding more flat top-level links.
- Persistent `Ask SmartComms` remains available without forcing body CTAs on policy pages.
- Tool suite naming is stable: **Pricing Tool / Funding Checker / Finance Checker**.
- Published evidence cards are reusable and source-attributed.
- Search strengthening targets existing authority pages rather than creating query-variant pages.
- Source diversity is deliberate; partner-only evidence is not the default.

## New files

- `src/components/tool-suite-nav.tsx`
- `src/components/content/PublishedEvidenceCards.tsx`
- `src/lib/content/nz-public-evidence.ts`
- `scripts/test-growth-ux.mjs`
- `docs/design/CTA_INTERNAL_JOURNEY_AUDIT_2026-09-23.md`
- `docs/search/SEARCH_GROWTH_EVIDENCE_2026-09-23.md`
- `docs/design/SEVEN_PART_PASS_IMPLEMENTATION_RECORD.md`

## Materially changed areas

- Header / footer navigation
- Homepage planning-tool and intent structure
- Tools/guides/systems hubs
- Pricing tool naming / result labelling
- Funding + finance tool suite discovery
- School-bell authority page
- Emergency/lockdown authority page
- IP paging/PA authority page
- IP intercom authority page
- Supporting guides/next-step journeys
- Content review dates for substantively reviewed routes
- Design & UX Standard v1.1.0

## Explicitly unchanged business logic

No intended change to:
- pricing formula / public price band;
- funding engine;
- finance-fit engine;
- comparison rankings;
- enquiry/privacy operating model;
- canonical host / sitemap policy;
- Release 2.1 capability enablement policy.

## Verification performed in the audit environment

Passed:
- `node scripts/test-growth-ux.mjs` — 48 structural checks
- `node scripts/test-design-ux.mjs` — 60 structural checks
- `node scripts/test-public-project-examples.mjs` — all assertions passed
- TypeScript `transpileModule` syntax check — 27 changed TS/TSX files passed

Not fully executed here because the supplied source ZIP does not contain installed project dependencies:
- full Next.js build
- repository TypeScript semantic check
- ESLint
- `tsx`-based domain scripts through the project's pinned dependency tree

The deployment agent must run the full repository test/build suite before production.
