# SmartComms NZ — Seven-Part Growth/Navigation Implementation Handoff

## What this repository contains

This repository is an implemented change-set based on the owner-supplied `smartcomms-nz-current-source-2026-09-23-v2.zip`.

The implementation covers the approved seven-part pass:

1. grouped Systems / Compare / Tools navigation;
2. a clear Pricing / Funding / Finance tool suite;
3. `Pricing Tool` as the primary UI name instead of `Ballpark Price`;
4. a stronger homepage planning-tool section;
5. consistent tool/internal journeys;
6. Search Console-led strengthening of School Bells, Emergency/Lockdown, IP Paging/PA and IP Intercom;
7. diverse NZ public evidence where it materially improves those answers.

The code is implemented. **Do not recreate or redesign it from scratch.**

## Read first

- `docs/design/SMARTCOMMS_DESIGN_UX_STANDARD.md`
- `docs/design/CTA_INTERNAL_JOURNEY_AUDIT_2026-09-23.md`
- `docs/search/SEARCH_GROWTH_EVIDENCE_2026-09-23.md`
- `docs/design/SEVEN_PART_PASS_IMPLEMENTATION_RECORD.md`
- `docs/design/SEVEN_PART_PASS_CHANGE_MANIFEST.md`
- `docs/design/SEVEN_PART_PASS_QA.md`

## Agent task

1. Compare this repository with the current production branch/commit.
2. Preserve any legitimate production changes newer than the supplied baseline.
3. Integrate the supplied implementation; do not independently redesign navigation/content.
4. Install the pinned dependencies and run the complete verification suite.
5. Fix only genuine integration/type/lint/build/runtime issues.
6. Deploy to preview/staging and manually QA desktop/mobile journeys.
7. Do not deploy production without normal owner approval.

## Required commands

Run at minimum:

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

Run any additional current repository tests too.

Do not weaken a test merely to make it pass.

## Manual QA

### Navigation
- desktop grouped Systems / Compare / Tools menus;
- dropdown keyboard/focus/Escape/outside-click behaviour;
- mobile hamburger and expandable groups;
- Pricing/Funding/Finance are obvious and correctly labelled;
- persistent Ask SmartComms opens the shared enquiry portal;
- header fits comfortably around the `lg` breakpoint and above.

### Homepage
- three-tool planning section is clear;
- generic project cards no longer duplicate the three tools;
- comparison and industry links work;
- no regression in existing SmartComms hero/animation.

### Tools
- Pricing Tool intro/result/restart;
- Funding Checker intro/result/restart;
- Finance Checker intro/result/restart;
- three-tool mini-navigation works on each tool;
- existing context-aware cross-sell behaviour remains intact;
- no pricing/funding/finance calculation output changes.

### Search-growth pages
Check:
- `/systems/school-bell-announcements`
- `/systems/emergency-lockdown`
- `/systems/ip-paging-pa`
- `/systems/ip-intercom`

Confirm:
- headings/metadata render correctly;
- published NZ evidence cards render and open in a new tab;
- visible FAQs are readable;
- contextual SmartComms help opens the shared modal;
- existing source/technical qualifications remain intact;
- no content is accidentally truncated/removed.

### Responsive/layout
Test at least:
- 320px
- 390px
- 768px
- 1024px
- 1440px

Confirm no document-level horizontal overflow, clipped menus, hidden CTA text or overlapping controls.

## Source/evidence spot-check

Before production, open the public sources newly referenced in this pass and ensure the expected source/page still loads:

- NZ Ministry of Education emergency planning guidance
- Edwards — Three Kings Primary
- Pacific AV — Ormiston Junior College
- Edwards — Richmond Road Primary
- Audio Connect — Sanitarium Auckland
- G&S Technologies — Summerset St Johns
- Sektor NZ — 2N IP Verso 2.0

If a source fails, do not invent a replacement or delete the associated statement blindly. Report it and use an authoritative replacement only if verified.

## Important non-changes

Do not alter unless an actual regression is discovered:

- pricing assumptions / 80–100% band;
- funding rules;
- finance rules;
- comparison rankings;
- enquiry/privacy process;
- canonical host;
- sitemap/robots policy;
- Release 2.1 external pricing API enablement/rate-limit policy.

## Expected visible result

The site should feel like the same SmartComms website, but:

- navigation is less crowded and more understandable;
- the three planning tools are obvious;
- “Pricing Tool” is the standard UI name;
- relevant pages have clearer next steps and SmartComms help;
- the four early search-opportunity pages provide stronger NZ-specific answers/evidence;
- no policy/trust page has been turned into a sales page;
- no major content has been removed.

## Return to owner

Return:

1. final merged ZIP/repository state;
2. current branch/commit and production-difference note;
3. concise list of integration fixes made by the agent;
4. exact output/result for every required test/build command;
5. preview URL if available;
6. any source link that could not be verified;
7. any visual/runtime issue still open;
8. confirmation that pricing/funding/finance logic and comparison rankings were unchanged;
9. confirmation that `SMARTCOMMS_DESIGN_UX_STANDARD.md` v1.1.0 remains the future page standard.
