# SmartComms NZ — Seven-Part Pass Change Manifest

**Baseline:** `smartcomms-nz-current-source-2026-09-23-v2.zip`  
**Implementation date:** 23 September 2026

## New implementation files

- `src/components/tool-suite-nav.tsx`
- `src/components/content/PublishedEvidenceCards.tsx`
- `src/lib/content/nz-public-evidence.ts`
- `scripts/test-growth-ux.mjs`
- `docs/design/CTA_INTERNAL_JOURNEY_AUDIT_2026-09-23.md`
- `docs/search/SEARCH_GROWTH_EVIDENCE_2026-09-23.md`
- `docs/design/SEVEN_PART_PASS_IMPLEMENTATION_RECORD.md`
- `docs/design/SEVEN_PART_PASS_QA.md`
- `docs/design/SEVEN_PART_PASS_CHANGE_MANIFEST.md`

## Navigation / layout

- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`

## Tool discovery / naming

- `src/app/tools/page.tsx`
- `src/app/pricing-tool/page.tsx`
- `src/components/pricing/PricingTool.tsx`
- `src/components/pricing/ResultView.tsx`
- `src/app/tools/funding-check/page.tsx`
- `src/app/tools/finance-check/FinanceCheckTool.tsx`
- `src/app/pricing/page.tsx`

## Hub / internal journey changes

- `src/app/systems/page.tsx`
- `src/app/guides/page.tsx`
- `src/app/schools/page.tsx`
- `src/app/guides/ip-paging-network-readiness/page.tsx`
- `src/app/guides/school-pa-specification-checklist/page.tsx`
- `src/app/guides/nz-school-pa-paging-requirements/page.tsx`
- `src/app/systems/traditional-vs-ip/page.tsx`

## Search-growth authority pages

- `src/app/systems/school-bell-announcements/page.tsx`
- `src/app/systems/emergency-lockdown/page.tsx`
- `src/app/systems/ip-paging-pa/page.tsx`
- `src/app/systems/ip-intercom/page.tsx`

## Metadata / docs / tests

- `src/lib/content-meta.ts`
- `docs/design/SMARTCOMMS_DESIGN_UX_STANDARD.md` → v1.1.0
- `README.md`
- `package.json`
- `scripts/test-design-ux.mjs`

## Terminology-only cleanup

- `src/app/api/pricing-tool/output-log/route.ts`
- `src/lib/pricing/types.ts`

These remove obsolete internal `Ballpark Pricing Tool` terminology; no calculation behaviour changes.

## Intentionally untouched

- pricing config/formula;
- funding engine/config;
- finance engine/config;
- school/aged-care/industrial comparison ranking data;
- privacy/disclosure operating model;
- canonical/sitemap/robots architecture;
- API enablement/rate-limit policy.
