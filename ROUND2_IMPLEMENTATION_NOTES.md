# SmartComms NZ Round 2: Tools Discovery + School Requirements Mega Guide

Date: 20 October 2026

Baseline: `smartcomms-nz-seo-conversion-full-source-2026-10-20.zip` from the immediately preceding SEO/conversion implementation pass.

## Purpose

This release does two things without redesigning the site or changing calculator logic:

1. promotes the three free planning tools as a primary SmartComms proposition; and
2. turns the existing NZ school PA/paging requirements URL into a deep specification guide built from current Ministry guidance plus multiple public NZ supplier/project sources.

No analytics/Clarity instrumentation was added in this round.

## 1. Free planning tools promoted in the header

The ordinary `Tools` navigation group has been removed.

A dedicated **Free planning tools** action now sits beside **Get project help** on desktop/tablet. Its dropdown exposes:

- Get a price estimate
- Check school funding
- Check finance options

On small screens the header uses a compact **Free tools** action, and the mobile menu opens with the three planning tools prominently listed before the ordinary navigation groups.

This keeps the two main SmartComms propositions visually distinct:

- self-service answer: free planning tools
- human help: get project help

## 2. Homepage tool proposition moved ahead of referral help

Immediately after the hero, the homepage now explains the three tools as a planning suite rather than a set of utility links.

The visitor is told that the tools can answer questions that otherwise require research/calls, that results are indicative, and that no sales call is required.

The three actions are:

1. Get a price estimate
2. Check a funding pathway for NZ schools
3. Explore finance options

The SmartComms provider-recommendation panel now follows that section, creating the intended journey:

`answer the planning question -> ask SmartComms who to contact when ready`

## 3. Tools hub strengthened

`/tools` now has the H1:

`Free planning tools: pricing, funding & finance`

The introduction explains that users can use one tool or move through all three before speaking to suppliers.

No calculator, funding-assessment or finance-assessment logic changed.

## 4. Mega guide: NZ School PA, Paging & Bell System Requirements

Existing URL retained:

`/guides/nz-school-pa-paging-requirements`

This avoids creating a competing/cannibalising school-specification URL. The shorter `/guides/school-pa-specification-checklist` remains the attach-to-RFQ checklist; the upgraded requirements page is the deep research/specification guide.

### New guide structure

The guide now covers:

- the short version of what a school should specify
- what current Ministry design guidance actually requires
- the boundary between an emergency plan and the communications technology
- coverage, zones and speech intelligibility
- bell schedules and daily announcements
- lockdown/emergency workflows and trigger design
- visual-warning/accessibility considerations
- three architecture paths: retain/control-only, hybrid, full network audio
- network, cabling, PoE, support and responsibility boundaries
- three published NZ school project patterns
- a detailed like-for-like supplier brief table
- how to compare proposals beyond equipment price
- a practical planning sequence linked to pricing, funding and finance tools

### Primary official sources

- Ministry of Education: Designing standards for New Zealand schools
- Ministry of Education: emergency/traumatic incident planning
- Ministry of Education: ICT contractor standards/processes
- Ministry of Education: ICT network upgrade/maintenance process

### NZ market/project evidence used

- Edwards Sound Systems: Three Kings Primary School
- Edwards Netbell school bell/controller material
- Pacific AV: Ormiston Junior College / FrontRow
- Pacific AV: FrontRow network-to-100V interface material
- CIE Group / Pure Tech: Thorndon Primary School / Axis
- SchoolBells.nz existing-bell scheduling approach
- New Era Technology NZ school paging/bell material

Source verification notes are in:

`docs/nz-school-communications-requirements-source-check-2026-10-20.md`

Supplier examples are presented as public evidence of design approaches. They are not SmartComms endorsements, partnership claims, independent performance tests or current quotes.

## Important editorial boundary

The guide explicitly states that generic paging/emergency-message capability is not automatically a compliant fire alarm or voice-alarm system. Actual building/fire/life-safety requirements must be established for the project by the appropriate professionals.

## QA completed in this environment

The repository package does not contain `node_modules`, and the npm registry was not reachable from this container (`npm ping` timed out). A clean `npm ci` therefore could not complete, so Next.js build and ESLint could not be executed here.

The following checks were completed successfully:

- pricing business-logic assertions: pass
- validation assertions: 14/14 pass
- pricing assessment assertions: 17/17 pass
- content metadata: 30/30 sitemap routes pass
- industrial assertions: pass
- school-project evidence assertions: pass
- finance assertions: pass
- aged-care assertions: pass
- public-project evidence assertions: pass
- design/UX structural assertions: 65/65 pass
- growth/navigation structural assertions: 60/60 pass
- TypeScript/TSX syntax/transpile parser check: 91/91 source files, zero errors

For the TypeScript-backed test scripts, Node 22's type stripping plus a local extension resolver was used because the normal `tsx` package could not be installed. The test files themselves were not changed to depend on that workaround.

## Required agent release gates

Run from the repository root with normal registry access:

```bash
npm ci
npm run build
npm run test:pricing
npm run test:validation
npm run test:assessment
npm run test:content-meta
npm run test:industrial
npm run test:school-projects
npm run test:finance
npm run test:aged-care
npm run test:public-project-examples
npm run test:design-ux
npm run test:growth
npm run lint
```

Expected requirement: build must have zero errors and lint must introduce no new errors versus baseline.

## Files intentionally untouched

- `package-lock.json`
- `package.json`
- `vercel.json`
- canonical hostname strategy
- calculator pricing configuration
- funding decision logic
- finance decision logic
- enquiry API/referral workflow
- analytics/Clarity instrumentation
