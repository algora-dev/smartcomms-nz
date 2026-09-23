# SmartComms Design & UX release manifest

Date: 23 September 2026. **Implementation complete; not built/deployed in production here.**

## Baseline
- Archive: `smartcomms-nz-current-source-2026-09-23.zip`
- Archive SHA256: `114042ad86f60e03db0f862567e056beab5ab46ce0396fa2124c6dd0b7bc7aa6`
- Supplied branch/commit: `main` / `840b6dd61256f9f66d6a3895ad544dc6d2eda187`
- This archive contains changes on top of that supplied source, not a new committed production revision.
- The original export manifest remains unchanged; do not attribute its test passes to this release.

## Read first
1. `DESIGN_UX_IMPLEMENTATION_HANDOFF.md` — merge, verify and deploy with approval.
2. `docs/design/SMARTCOMMS_DESIGN_UX_STANDARD.md` — current design authority.
3. `docs/design/PAGE_AUDIT.md` — route-by-route treatment.
4. `docs/design/IMPLEMENTATION_AND_QA.md` — actual evidence and limitations.
5. `docs/design/qa-summary.json` — compact machine-readable results.
6. `DESIGN_UX_CHANGES.patch` — reference diff against the supplied baseline.

## Invariants
No original files deleted. All `src/lib` data/rules, API routes, public assets, sitemap/robots, Next configuration and lockfile in the protected set are byte-identical (40 files). No new dependency, price/ranking change, dataset migration, production config change or real enquiry. `package.json` adds only `test:design-ux`.

## Modified existing files
- `AGENTS.md`
- `README.md`
- `package.json`
- `src/app/about/disclosure/page.tsx`
- `src/app/about/editorial-policy/page.tsx`
- `src/app/about/methodology/page.tsx`
- `src/app/about/page.tsx`
- `src/app/compare/page.tsx`
- `src/app/compare/schools/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/financing/page.tsx`
- `src/app/funding/page.tsx`
- `src/app/globals.css`
- `src/app/guides/ip-paging-network-readiness/page.tsx`
- `src/app/guides/nz-school-pa-paging-requirements/page.tsx`
- `src/app/guides/page.tsx`
- `src/app/guides/school-pa-specification-checklist/page.tsx`
- `src/app/industries/aged-care-retirement-villages/page.tsx`
- `src/app/industries/warehouses-manufacturing-industrial/page.tsx`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/pricing-tool/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/schools/page.tsx`
- `src/app/smartcomms-hero.css`
- `src/app/systems/emergency-lockdown/page.tsx`
- `src/app/systems/ip-intercom/page.tsx`
- `src/app/systems/ip-paging-pa/page.tsx`
- `src/app/systems/page.tsx`
- `src/app/systems/school-bell-announcements/page.tsx`
- `src/app/systems/traditional-vs-ip/page.tsx`
- `src/app/tools/finance-check/FinanceCheckTool.tsx`
- `src/app/tools/finance-check/page.tsx`
- `src/app/tools/funding-check/FundingCheckTool.tsx`
- `src/app/tools/funding-check/page.tsx`
- `src/app/tools/page.tsx`
- `src/components/content/AtAGlance.tsx`
- `src/components/content/AuthorityHero.tsx`
- `src/components/content/ContinuePlanning.tsx`
- `src/components/enquiry/ProjectEnquiryModal.tsx`
- `src/components/enquiry/ProjectHelpLauncher.tsx`
- `src/components/home/smartcomms-hero.tsx`
- `src/components/pricing/ContactLauncher.tsx`
- `src/components/pricing/PricingTool.tsx`
- `src/components/pricing/ResultView.tsx`
- `src/components/site-footer.tsx`
- `src/components/site-header.tsx`
- `src/components/tool-cross-sell.tsx`

## Added files (excluding this manifest and generated patch)
- `DESIGN_UX_IMPLEMENTATION_HANDOFF.md`
- `docs/design/IMPLEMENTATION_AND_QA.md`
- `docs/design/PAGE_AUDIT.md`
- `docs/design/SMARTCOMMS_DESIGN_UX_STANDARD.md`
- `docs/design/qa-summary.json`
- `docs/design/qa/content-audit.json`
- `docs/design/qa/extra-checks.json`
- `docs/design/qa/funding-interactions.json`
- `docs/design/qa/interactions.json`
- `docs/design/qa/modal-final.json`
- `docs/design/qa/page-inventory.json`
- `docs/design/qa/test-aged-care.log`
- `docs/design/qa/test-assessment.log`
- `docs/design/qa/test-content-meta.log`
- `docs/design/qa/test-design-ux.log`
- `docs/design/qa/test-finance.log`
- `docs/design/qa/test-industrial.log`
- `docs/design/qa/test-pricing.log`
- `docs/design/qa/test-public-project-examples.log`
- `docs/design/qa/test-validation.log`
- `scripts/test-design-ux.mjs`
- `src/components/content/PageContents.tsx`
- `src/components/content/ProjectHelpPanel.tsx`
- `src/components/ui/ConfirmationDialog.tsx`
- `src/components/ui/TableRegion.tsx`
- `src/components/ui/comparison.tsx`
- `docs/design/source-preservation.json`

## Verification
Eight existing assertion scripts passed under an isolated TypeScript loader; 60 structural design assertions passed; 86 TS/TSX files syntax-transpiled. All 29 public non-redirect pages rendered at four widths without measured overflow/ID/anchor/H1 failures. 100 principal browser interaction assertions and 24 extra modal assertions passed, plus tooltips and expanded comparisons. See the QA record for details and runtime limitations.

**Full project typecheck/lint/build and real Next browser QA are required before production.** npm registry DNS was unavailable in the audit environment. Browser rendering used React18.2/Tailwind4.1.10 in an offline harness, not the pinned React19/Next runtime. No production sign-off is claimed.

## Rollback
Revert the presentation release commit/diff. No schema or deployment migration is involved. Keep API/R2.1, underlying industrial content and business data intact.
