# SmartComms — Implementation and QA evidence

**23 September 2026. Code implemented; not deployed.**

## Scope and authority

Baseline: `smartcomms-nz-current-source-2026-09-23.zip`, exported from `main` at `840b6dd61256f9f66d6a3895ad544dc6d2eda187`. The source ZIP SHA256 is `114042ad86f60e03db0f862567e056beab5ab46ce0396fa2124c6dd0b7bc7aa6`.

`CURRENT_REPOSITORY_EXPORT.md` remains the historical baseline record. Its passing build statement applies to the incoming version, not these new changes. The current design authority is `SMARTCOMMS_DESIGN_UX_STANDARD.md`. The per-route record is `PAGE_AUDIT.md`.

## Implemented changes

1. Correct CSS cascade layers so Tailwind width, selected-state and text-colour utilities work as intended. Preserve existing brand values; add semantic surface tokens rather than scatter new colour literals.
2. Establish consistent readable widths, headline hierarchy, paragraph rhythm, cards, table surfaces, buttons, form controls, focus and responsive spacing. Isolate embedded controls from prose styles.
3. Share comparison section headings, evidence references, badges, horizontal table regions and contents navigation across the existing three studies.
4. Add contextual enquiry access to appropriate authorities, system pages, technical guides and hubs. Preserve tools/results as useful self-service. No extra commercial panels in policy pages. Every page has the same optional header help action.
5. Use the existing enquiry form inside a native body-portal dialog. Preserve its endpoint, fields, copy, validation and SmartComms-only recipient policy. Reset/focus the top on open, reopen and success; restore opener focus and body scrolling on close.
6. Standardise result-first tool presentation without changing questions or calculations. The introduction remains in the questionnaire and returns on restart. Improve pricing stepper targets, help popovers, expandable breakdown and restart confirmation.
7. Keep the existing home animation, source content, rankings, operating policies, URLs, metadata and data/rules. Only the obsolete cabling CTA wording is replaced with recommendation-only wording.
8. Add `npm run test:design-ux` and current design instructions for future agents.

## Actual checks completed

| Check | Actual result | What it proves / does not prove |
|---|---|---|
| Existing domain scripts | Eight scripts passed through a local TypeScript ESM audit loader | Existing pricing, validation, assessment, metadata, finance, aged-care, industrial and project assertions hold. Not an npm/tsx production run. |
| New design structural test | `node scripts/test-design-ux.mjs`: 60 assertions passed | Shared patterns and declared invariants exist. Not a browser or accessibility certification. |
| TypeScript/TSX syntax transpilation | 86 source files, zero syntax errors | Syntax only, not project-wide type checking with real React/Next types. |
| Public page matrix | 29 non-redirect public routes at 320, 390, 768 and 1440 px | No detected document-width overflow, duplicate IDs, missing local anchors, missing/multiple main H1s or render exceptions in this harness. |
| Main browser interaction suite | 100 assertions passed | Modal top/focus/reopen, Tab containment, Escape/focus return, mocked submission/success; pricing and finance paths including industrial context. |
| Additional modal checks | 24 assertions passed | Body portal, native modal state, server-error display, retained form data, reverse Tab, focus return, clean reopen and backdrop closure at 320/390/1440. |
| Funding completion/restart | Maintenance-only result at 390/1440, correct text, one H1 and top-of-page result/restart | Presentation still represents the existing engine. Broader classifications also covered by unchanged-source checks; exhaustive funding browser branches remain an agent QA task. |
| Pricing help popovers | 15 cases at 320/390/768 passed | Visible, inside horizontal viewport, open with keyboard and close with Escape. |
| Expanded comparison tables | Nine route/width cases passed | All disclosures open without document overflow; hints only where horizontal scrolling is needed. |
| Source preservation | 40 protected files byte-identical; no original files deleted | Core/rules/data/API/assets/config preservation. JSX text audit records moved helper strings and one intentional CTA change. |

The eight existing commands were executed in the audit environment as:

```bash
node --loader <audit-only-typescript-loader> scripts/test-pricing.mjs
node --loader <audit-only-typescript-loader> scripts/test-validation.mjs
node --loader <audit-only-typescript-loader> scripts/test-assessment.mjs
node --loader <audit-only-typescript-loader> scripts/test-content-meta.mjs
node --loader <audit-only-typescript-loader> scripts/test-finance.mjs
node --loader <audit-only-typescript-loader> scripts/test-aged-care.mjs
node --loader <audit-only-typescript-loader> scripts/test-industrial.mjs
node --loader <audit-only-typescript-loader> scripts/test-public-project-examples.mjs
node scripts/test-design-ux.mjs
```

This custom loader is a local test accommodation, not a replacement for the repository's `tsx` dependency. Do not change production versions to match the audit runtime. Local browser tests are recorded in `qa/*.json`; core-test logs are alongside them. The raw full-page DOM snapshots are omitted to keep the repo compact.

## Browser harness limitations

The isolated preview rendered actual components with locally available **React 18.2, Tailwind 4.1.10, Chromium and Playwright**. The repository itself still targets **React 19.2.8 and Next 16.3.4**, exactly as supplied.

Preview navigation was disabled by the managed browser environment. The audit did not change that policy: pages were loaded via Playwright `set_content` with local scripts/styles/assets, and Next routing, Image and font integration were shimmed. Screenshots show this isolated preview, not production. Native DOM, layout, hooks and dialog interactions were real; framework SSR, hydration and full navigation were not exercised.

No font files, installed vendor bundles, credentials, private enquiry data or preview shims are included in the repository. Preview images may be supplied separately for visual review.

The earlier baseline batch-preview attempt timed out. Consequently this is not a full before/after pixel-diff certification. Preservation is supported by the source audit and isolated rendered checks, with final actual-app visual review still required.

## What could not run

`npm ci --ignore-scripts --no-audit --no-fund` could not complete due repeated `EAI_AGAIN` errors resolving `registry.npmjs.org`. The partial dependency directory was removed before packaging. Therefore the actual locked **Next build, full TypeScript type check and ESLint** were not completed here. They are release gates for the implementation agent, not reported passes.

The following also remain unverified: Safari/iOS; actual Next route/anchor restoration; production PDF generation; actual email delivery; live analytics/Clarity recording; production WAF/flags; external API enablement; live indexing. No deployment, paid action, real enquiry or external capability call was performed.

## Content preservation detail

All original paragraphs, table data, FAQs, product recommendations and source records remain. The JSX-text comparison reports a few strings absent from their original local file because they moved into shared components/props:

- evidence labels and horizontal-scroll hint → shared UI;
- restart title/warning/buttons → confirmation props;
- obsolete “Be put in touch with the right people” → “Ask who can help with cabling”.

New headings and enquiry invitations describe existing site functions. No new manufacturer, funding, finance or clinical claims were researched or introduced. Review/source dates were not bumped merely because presentation changed.

## Production release procedure

See the root `DESIGN_UX_IMPLEMENTATION_HANDOFF.md` for the exact native npm commands, staging browser matrix, mocking instructions, owner approval and rollback. The code is delivered; the agent should integrate and verify it, not restyle it again. Native form submission tests must use an approved staging inbox or a mock, never uncontrolled real leads.
