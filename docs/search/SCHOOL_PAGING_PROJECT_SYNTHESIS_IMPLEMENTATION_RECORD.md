# NZ School Paging Project Synthesis — Implementation Record

**Prepared:** 24 September 2026  
**Route:** `/guides/nz-school-paging-projects`  
**State:** higher-reasoning release candidate

## User intent

Create a SmartComms resource that is more useful for cross-market school-paging research than any one installer case study by combining multiple attributed NZ project accounts with original comparison, lifecycle checks and buyer analysis.

## Project set

- Edwards — Three Kings Primary — historical 2N network paging
- Pacific AV / Australasian Audio Engineering — Ormiston Junior College — FrontRow
- NZAV — Lincoln High School — SPON
- AV Integration — Cotswold Mātāhae School — ZYCOO
- CIE Group / Pure Tech — Thorndon Primary — Axis

## Original SmartComms value

The page adds:

- normalised feature matrix based on what each project account explicitly describes;
- distinction between project evidence and manufacturer capability;
- current lifecycle checks;
- cross-project architecture lessons;
- buyer questions for similar schools;
- official emergency-planning context;
- contextual pricing/funding/enquiry actions.

It does not reproduce third-party photos or case-study narratives.

## Finalisation completed 24 September 2026

The higher-reasoning recovery pass retained the five-project concept but tightened the evidence model and buyer utility:

- publisher vs dealer/integrator roles are explicit rather than inferred;
- project/completion dates are separate from publication dates;
- amplifier-fed architecture, retained infrastructure and future equipment relocation are separate concepts;
- the matrix now uses a factual “project design angle” rather than an ambiguous reuse/staged field;
- a problem-to-example buyer relevance section was added without ranking brands;
- Ministry emergency-planning evidence now includes the April 2026 guide directly;
- the page exposes its evidence-handling method and evidence recheck date;
- visible FAQs now have matching FAQPage structured data;
- the dedicated regression suite protects these distinctions.

## Verification in recovery environment

Passed:

- `node scripts/test-school-projects.mjs`
- `node scripts/test-design-ux.mjs`
- `node scripts/test-growth-ux.mjs`
- `node scripts/test-public-project-examples.mjs`
- TypeScript syntax transpilation of the two modified TS/TSX implementation files.

The pinned dependency-backed TypeScript/lint/Next.js build could not be executed because the recovery runtime could not resolve `registry.npmjs.org` (`EAI_AGAIN`) and the supplied export contained no `node_modules`. These remain mandatory deployment-agent release gates, as documented in `SCHOOL_PAGING_PROJECT_SYNTHESIS_IMPLEMENTATION_HANDOFF.md`.
