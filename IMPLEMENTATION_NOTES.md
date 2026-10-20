# SmartComms NZ SEO + Conversion Release

Date: 20 October 2026  
Baseline: `775540f`  
Scope: conversion simplification + targeted search/content improvements  

## Objective

Improve the chance that qualified visitors who arrive through school communications research or use the SmartComms planning tools ask SmartComms for help, without turning the site into a hard-sell lead-generation experience.

The operating model implemented in this release is intentionally specific:

1. A visitor sends project information to SmartComms only.
2. SmartComms reviews the project, site/region and any tool result supplied.
3. SmartComms replies to the visitor with the provider or providers it believes are best suited, their public contact details, and useful context about why they may fit.
4. The visitor decides whom to contact.
5. SmartComms does **not** forward the visitor's contact details, project information or attachments to recommended providers.

No new provider-forwarding or direct-introduction workflow has been added.

## Why this release is focused rather than a redesign

The supplied Search Console and Clarity exports show relevant early search visibility, especially around school bells, paging and lockdown communications. The site is technically fast and the evidence-heavy pages are already beginning to appear in Google's AI/generative surfaces. The highest-leverage issue is therefore the handoff from research/tool use to human help, not a visual rebuild or a large expansion of thin SEO pages.

The release preserves substantive content and existing calculators while simplifying the decision layer around them.

## Conversion changes

### Site-wide proposition

- Header action now says `Get project help` (`Get help` on mobile).
- Homepage adds a clear explanation that SmartComms can review a real project and reply with suitable NZ provider contacts.
- Contact, About, Tools, Systems, Compare, Pricing and Financing pages use the same referral model and more specific calls to action.

### Shared project enquiry

`src/components/enquiry/ProjectEnquiryModal.tsx` is still the single shared enquiry flow and still submits to the existing `/api/inquiry` endpoint.

For project enquiries the visible default form is now deliberately short:

- contact name
- organisation/school
- email
- town/region
- a short project summary only when the visitor has **not** arrived with structured tool context

Phone, existing-provider details, brand preference, extra notes and attachments are under `Add more project details (optional)`.

Tool-originated enquiries reuse the structured answers already attached by the tool instead of forcing the visitor to describe the project again. Context-specific launchers also no longer repeat a generic `What help do you need?` selector; the launcher context determines the mode.

The privacy/process statement explicitly says SmartComms replies to the visitor with recommended providers and does not forward the enquiry data to those providers.

### Pricing calculator result

The highest-intent CTA now sits directly below the calculated estimate:

- `Recommend providers for this project`
- secondary `Download my estimate`

The copy tells the visitor that calculator answers are attached automatically. The previous later-stage duplicate quote panel has been removed. Site-assessment help remains available as a secondary path after the result detail and planning links.

No pricing formula or estimate logic changed.

### Funding checker result

The result now leads toward `Get help scoping this project` and makes the boundary clear: SmartComms cannot confirm Ministry funding eligibility or approval, but can help translate the technical scope into a quote-ready project and reply with relevant provider contacts.

No funding-decision logic changed.

### Finance checker

The finance checker is now explicitly scoped to communications-system projects rather than generic machinery/equipment finance traffic. Its crawlable page now has a server-rendered H1 and useful introduction, rather than relying on the client component to provide the introduction.

Its title is now `Communications System Finance Checker NZ`, which also removes the previous duplicated brand suffix in generated metadata.

No finance assessment logic changed.

## SEO and content changes

### School bell + paging guide

This is the largest content change because the supplied Search Console data shows the clearest near-page-one opportunity around `school bell systems`, `school bell NZ`, `school bells`, and related paging intent.

The page now:

- targets `School Bell & Paging Systems NZ` more directly in metadata and opening copy;
- gives an answer-first explanation near the top;
- distinguishes three practical upgrade paths rather than assuming every school needs a full replacement:
  1. retain the bell hardware and replace scheduling/control;
  2. use a network/hybrid control layer while retaining suitable infrastructure;
  3. integrate bells, paging and emergency messaging on a broader IP platform;
- references current public NZ examples from SchoolBells.nz, TimeLab BellMinder, Edwards Netbell, Pacific AV FrontRow and Bosch PROSPERO;
- explains the practical decision rule before sending the reader deeper into schedules, announcements, emergency use, costs and specification;
- strengthens the referral action without presenting editorial inclusion as a provider endorsement.

The public-claim recheck register is in `docs/school-bell-market-source-check-2026-10-20.md`.

### Schools hub

The schools page now has a `Start with the problem` decision section so visitors can move directly to the right next step:

- bell/timetable issue
- emergency/lockdown issue
- announcements/zones/coverage issue
- immediate budget question

This is intended to simplify the hub while strengthening internal links into the highest-value school cluster.

### Emergency/lockdown guide

This page was intentionally not rebuilt because it already has comparatively strong standard-search and AI-feature visibility. Changes are restrained:

- clearer answer-first framing of a school lockdown communication system;
- stronger separation between emergency procedures and the communications technology that supports them;
- clearer referral CTA.

The existing evidence depth remains intact.

### Other system and decision pages

IP paging, IP intercom, traditional-vs-IP, system hub, comparison, pricing, financing and related decision pages received small CTA/proposition updates so the visitor is not given different interpretations of what SmartComms will do.

## Competitor/content strategy used

This release does not copy competitor layouts or product marketing. The content pattern is to compare what different public NZ sources reveal about the same buyer decision and turn that into a neutral decision framework.

Examples checked on 20 October 2026 include:

- SchoolBells.nz: existing-bell scheduling/control model.
- TimeLab BellMinder: PC-based scheduling, interview, evacuation and lockdown modes.
- Edwards Netbell: network-based school bells, live announcements and emergency alerts.
- Pacific AV FrontRow: integrated Audio-over-IP school paging/bells with published NZ installations.
- Pacific AV Bosch PROSPERO: IP paging/bell platform with scheduling, stored messages and live zoned paging.
- Ministry of Education emergency-management guidance: schools require current emergency plans and communication planning; communications technology supports but does not replace those procedures.

This synthesis-first approach should be repeated on future priority pages only where multiple sources genuinely add buyer value.

## Intentionally unchanged

- Analytics / Microsoft Clarity instrumentation: no new measurement integration was added.
- Existing `/api/inquiry` referral backend and internal routing.
- Pricing formulas and calculator assessment logic.
- Funding-check decision logic.
- Finance assessment engine.
- Canonical hostname strategy, sitemap hostname and `www` redirect.
- Package dependencies and lockfile.
- Brand assets and deployment configuration.
- Privacy model: customer information is not sent to recommended providers.

Existing analytics calls were retained on the consolidated pricing CTA so removal of the duplicate UI does not silently remove the prior quote/open signal.

## Verification completed in this workspace

The following checks passed against the modified source:

- pricing assertions: PASS
- validation assertions: 14/14 PASS
- assessment assertions: 17/17 PASS
- content metadata: all 30 sitemap routes PASS
- industrial guide tests: PASS
- finance tests: PASS
- aged-care compare tests: PASS
- school-project synthesis tests: PASS
- public-project evidence tests: PASS
- design/UX structural checks: 64 PASS
- growth/navigation structural checks: 52 PASS
- TypeScript syntax/transpile check: 91/91 source TS/TSX files PASS

The TypeScript-domain tests that normally use local `tsx` were also run successfully through Node 22's TypeScript stripping plus a temporary resolver because the local dependencies could not be installed in this container.

### Gates not executable here

`npm ci` was attempted repeatedly but the workspace could not reach `registry.npmjs.org` (`EAI_AGAIN` / transport timeout). As a result, the local `next`, `eslint`, React type packages and `tsx` binaries were unavailable, so these dependency-backed release gates could not truthfully be run here:

- `npm run build`
- `npm run lint`
- project-level `tsc --noEmit`
- the npm-script wrappers that depend on local `tsx`

This is an environment/network limitation, not a reported pass. The implementation agent must run the normal handoff gates after `npm ci` and before deployment.

## Agent release checklist

1. Apply the patch to baseline `775540f`, or use the complete modified source package.
2. Run `npm ci` in an environment with npm registry access.
3. Run:
   - `npm run build`
   - `npm run test:pricing`
   - `npm run test:validation`
   - `npm run test:assessment`
   - `npm run test:content-meta`
   - `npm run test:industrial`
   - `npm run test:school-projects`
   - `npm run test:finance`
   - `npm run test:aged-care`
   - `npm run test:public-project-examples`
   - `npm run test:design-ux`
   - `npm run test:growth`
   - `npm run lint`
   - ideally `npx --no-install tsc --noEmit`
4. Preview QA on desktop and approximately 390px mobile:
   - generic header `Get project help` requires a short project summary;
   - pricing, funding and finance tool enquiries reuse attached tool context and do not force the visitor to type the project again;
   - optional fields remain inside the expandable details section;
   - pricing PDF still downloads;
   - pricing edit/restart still work;
   - funding and finance restart/navigation still work;
   - success state states that SmartComms will reply to the visitor;
   - no page says the visitor's data is forwarded to a provider.
5. Inspect the server-rendered `/tools/finance-check` response for its H1/title/intro.
6. Confirm the apex canonical and permanent `www` redirect are unchanged.
7. Deploy a preview, click every modified CTA, and submit at least one non-production test enquiry if the preview email/backend environment is safe to use.

## Post-release evaluation

Do not optimise this release around total impressions alone. The useful outcomes are:

- stronger NZ visibility for school bell/paging and lockdown communications intent;
- qualified use of the three planning tools;
- more visitors progressing from a useful result into a SmartComms project enquiry;
- enquiries containing enough structured context for SmartComms to recommend the right providers without a long back-and-forth;
- less irrelevant generic finance traffic even if that reduces some impressions.

With current traffic volume, manual Clarity review plus the actual quality/volume of enquiries is sufficient for the first iteration, as requested.
