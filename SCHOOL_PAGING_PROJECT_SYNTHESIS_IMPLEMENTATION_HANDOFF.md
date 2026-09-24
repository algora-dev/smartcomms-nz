# SmartComms NZ — School Project Synthesis Final Deployment Handoff

**Prepared:** 24 September 2026  
**Release candidate:** higher-reasoning finalisation of the supplied `smartcomms-nz-school-project-synthesis-2026-09-24` baseline  
**Route:** `/guides/nz-school-paging-projects`

## Deployment intent

Deploy the supplied repository as the release candidate for the SmartComms authority page:

> **How NZ schools are using paging systems for bells, lockdowns & emergency communication**

Do **not** rebuild this page from scratch. The supplied repository contains the original five-project synthesis plus a final evidence/UX refinement pass.

## What the finalisation pass changed

The original page concept was retained. The changes are deliberately narrow and evidence-led:

1. **Publisher and delivery roles are separated.** A company publishing a project account is no longer automatically labelled as the installer. Where the public source explicitly names a dealer or integrator, that role is shown separately.
2. **Project dates and publication dates are separated.** Article dates are no longer presented as installation dates unless the source establishes that timing.
3. **Architecture, infrastructure reuse and equipment relocation are no longer conflated.**
   - Ormiston is described as network control/decoders feeding conventional amplifier channels.
   - Lincoln is described as equipment planned for later removal and re-installation.
   - Neither point is treated as proof that existing speaker/cable infrastructure was retained.
4. **A buyer relevance layer was added.** “Which published example is most relevant to your school?” maps four common design problems to the project accounts that actually demonstrate them, without ranking brands.
5. **The comparison matrix now includes a factual project-design angle** and removes the former ambiguous reuse/staged column.
6. **Evidence methodology is visible on-page.** The page states how “Not stated” works, how roles/dates are handled, and that lifecycle claims are checked separately from project claims.
7. **Official emergency-planning evidence is stronger.** The page now links both the Ministry’s main emergency guidance and its April 2026 planning guide.
8. **FAQ structured data was added** for the visible FAQ set, alongside the existing Article, Breadcrumb and ItemList data.
9. **Regression coverage was expanded** so the recovered attribution/date/architecture distinctions are harder to accidentally undo later.

## Evidence model to preserve

The five public project accounts remain:

- Three Kings Primary School — Edwards Sound Systems — historical 2N network paging
- Ormiston Junior College — Pacific AV; Australasian Audio Engineering named as dealer — FrontRow
- Lincoln High School — NZAV — SPON
- Cotswold Mātāhae School — AV Integration — ZYCOO
- Thorndon Primary School — CIE Group; Pure Tech named as integrator — Axis

Keep the following editorial rules:

- “Not stated” means the public project account does not establish the feature; it is **not** a negative product score.
- Keep project facts, current manufacturer/lifecycle evidence and SmartComms analysis visibly separate.
- Do not copy third-party case-study prose, photographs or diagrams.
- Do not turn the page into a brand ranking or preferred-provider list.
- Historical bills of materials are architecture evidence, not current purchasing recommendations.
- A network-controlled amplifier-fed design is not automatically infrastructure reuse.
- Planned future relocation of installed equipment is not automatically infrastructure reuse.

The detailed source record is:

`docs/school-paging-projects-source-check-2026-09-24.md`

## Files changed from the supplied baseline

The higher-reasoning finalisation changes only these implementation files:

```text
src/lib/content/school-paging-projects.ts
src/app/guides/nz-school-paging-projects/page.tsx
scripts/test-school-projects.mjs
docs/school-paging-projects-source-check-2026-09-24.md
SCHOOL_PAGING_PROJECT_SYNTHESIS_IMPLEMENTATION_HANDOFF.md
docs/search/SCHOOL_PAGING_PROJECT_SYNTHESIS_IMPLEMENTATION_RECORD.md
```

No pricing, funding, finance, enquiry-policy, API-policy or navigation-architecture changes are part of this finalisation.

## Verification completed in the recovery environment

Passed after the final refinements:

```bash
node scripts/test-school-projects.mjs
node scripts/test-design-ux.mjs
node scripts/test-growth-ux.mjs
node scripts/test-public-project-examples.mjs
```

The dedicated school-project suite now covers the role/date/architecture distinctions, Ministry guide, buyer-relevance section, evidence method and FAQ schema.

The two modified TS/TSX implementation files also passed syntax transpilation with TypeScript 5.8.3.

### Full build limitation in this environment

The supplied ZIP intentionally did not include `node_modules`. Multiple attempts to restore the pinned dependencies with `npm ci` failed because this runtime could not resolve `registry.npmjs.org` (`EAI_AGAIN`); the local npm cache is incomplete. Therefore **do not treat the full Next.js build as passed here**.

This is an environment/dependency-access limitation, not a bypassed release gate.

## Mandatory agent-side release gates

From the repository root, with normal npm registry access:

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
npm run test:school-projects
npm run test:design-ux
npm run test:growth
npm run build
```

Run any newer production-repository checks too. **Do not weaken tests to make the release pass.** If production has moved beyond this exported repository, merge these six finalisation files/changes into the newer tree rather than overwriting newer unrelated work.

## Manual staging QA

Check `/guides/nz-school-paging-projects` on desktop and mobile:

- authority hero and contents navigation render correctly;
- the comparison table scrolls inside its table region on narrow screens with no document-level overflow;
- the new “Which published example is most relevant to your school?” cards jump to the correct project anchors;
- all five project cards show publisher/delivery/timing metadata coherently;
- “Not stated” remains neutral and is not rendered as a failure/score;
- evidence links open the intended external sources;
- Ministry guidance links open correctly;
- enquiry, pricing, funding and comparison actions work;
- Article, Breadcrumb, ItemList and FAQPage JSON-LD validate;
- no third-party project imagery is introduced.

Also smoke-test the existing inbound links from:

```text
/guides
/schools
/compare/schools
/systems/school-bell-announcements
/systems/emergency-lockdown
```

## Deployment decision

If the mandatory agent-side checks and staging QA pass, deploy through the normal SmartComms production workflow. No further content redesign or research is required for this release candidate.
