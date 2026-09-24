# SmartComms NZ — CTA & Internal Journey Audit

**Reviewed:** 23 September 2026  
**Baseline:** 23 September 2026 Design/UX production-equivalent repository  
**Purpose:** Keep every useful page answer-first while ensuring a relevant next step is easy to find.

## Operating rule

SmartComms does not force an enquiry before providing public information. The default journey is:

> **Answer the question → offer the most useful next resource/tool → offer SmartComms help where the reader is likely to have a real project.**

A substantive commercial/technical page normally needs two or three *opportunities* to progress, but not two or three repeated sales panels. The persistent header action counts as one site-wide help route.

All contextual project enquiries use the existing `ProjectHelpLauncher` / shared enquiry modal. Do not create page-specific lead forms without a real requirement.

## Page-family CTA standard

| Family | Expected help treatment | Notes |
|---|---|---|
| Comparison / industry | Strong | Hero/planning action + contextual/final project help. Keep research usable without enquiry. |
| Pricing / funding / finance authority | Strong | Tool action plus direct SmartComms help; tool completion is not mandatory. |
| Technical system guide | Moderate | Relevant tool/resource + contextual project help after useful explanation. |
| Search-focused guide/checklist | Moderate | Continue-planning resources + help option where a real project may exist. |
| Hub | Light | Primarily navigation; one low-pressure help route at most in body, plus header. |
| About | Light | Normal contact route is sufficient. |
| Privacy / disclosure / methodology / editorial policy | None in body | Persistent navigation/contact remains available; do not commercialise policy pages. |

## Current route review

### `/`
**Intent:** orient a visitor who may not know the right system or next step.  
**Implemented:** three-tool planning suite, system/industry paths, compare path, contextual SmartComms help.  
**Status:** good. Avoid adding another large enquiry panel.

### `/tools`
**Intent:** choose Pricing, Funding or Finance.  
**Implemented:** three equal tool choices; header help remains available.  
**Status:** good. The hub should remain primarily navigational.

### `/pricing` / `/pricing-tool`
**Intent:** understand cost / calculate a range.  
**Journey:** pricing explanation → Pricing Tool → school Funding or general Finance as context requires → formal-quote/project-help enquiry.  
**Status:** good after tool-suite naming and cross-navigation.

### `/funding` / `/tools/funding-check`
**Intent:** understand/check NZ school property-funding pathway.  
**Journey:** guidance → Funding Checker → Finance when appropriate → SmartComms project help.  
**Status:** good. Keep school scope explicit.

### `/financing` / `/tools/finance-check`
**Intent:** understand finance/leasing and determine whether discussion is useful.  
**Journey:** guidance → Finance Checker → SmartComms finance/project enquiry.  
**Status:** good.

### `/compare`
**Intent:** choose a site-type comparison.  
**Implemented:** hub to Schools / Aged Care / Industrial.  
**Status:** good. Generic Compare navigation now points here rather than assuming school intent.

### `/compare/schools`
**Intent:** compare school systems.  
**Status:** mature reference comparison. Existing contextual help remains; no conversion redesign required.

### `/industries/aged-care-retirement-villages`
**Intent:** compare aged-care / retirement-village communications.  
**Status:** mature reference comparison with pricing, finance and enquiry paths.

### `/industries/warehouses-manufacturing-industrial`
**Intent:** compare industrial/workplace communications.  
**Status:** mature comparison with pricing, finance and enquiry paths. Homepage and navigation provide strong discovery.

### `/systems/school-bell-announcements`
**Intent:** school bell / announcement / paging search landing page.  
**Implemented this pass:** stronger search-language title/H1, NZ examples, FAQs, direct project help, comparison/specification/funding next steps.  
**Status:** high-priority growth page; monitor Search Console.

### `/systems/emergency-lockdown`
**Intent:** school lockdown/emergency communications.  
**Implemented this pass:** official planning context, NZ examples, FAQs, project help.  
**Status:** high-priority growth page; preserve distinction from fire/voice-alarm compliance.

### `/systems/ip-paging-pa`
**Intent:** broad IP paging/PA research.  
**Implemented this pass:** stronger NZ wording, diverse architecture examples, FAQs, project help, Pricing/Funding/Finance paths.  
**Status:** important authority-growth page.

### `/systems/ip-intercom`
**Intent:** school/general IP intercom research.  
**Implemented this pass:** stronger search wording, current/local examples, FAQs, project help, finance path.  
**Status:** important authority-growth page.

### `/systems/traditional-vs-ip`
**Intent:** architecture decision.  
**Status:** contextual help present; no further conversion change required now.

### `/systems`
**Intent:** system architecture hub.  
**Implemented this pass:** compare-by-site-type and Finance planning links.  
**Status:** good hub.

### `/schools`
**Intent:** school planning hub.  
**Status:** existing planning journeys retained. Avoid duplicating the school comparison here.

### `/guides`
**Intent:** resource discovery.  
**Implemented this pass:** Pricing/Funding/Finance routes are visible and finance authority content is represented.  
**Status:** good hub.

### Network/specification/requirements guides
Routes:
- `/guides/ip-paging-network-readiness`
- `/guides/school-pa-specification-checklist`
- `/guides/nz-school-pa-paging-requirements`

**Status:** contextual SmartComms help plus related-resource journeys are present. Do not add repeated sales cards.

### `/about`
**Intent:** identity/trust.  
**Status:** light contact treatment is sufficient.

### Policy/trust pages
Routes:
- `/privacy`
- `/about/disclosure`
- `/about/methodology`
- `/about/editorial-policy`

**Status:** intentionally no body sales panels. Keep them calm and informational.

## Internal journey rules for future pages

1. A page must not end in a dead end: provide a relevant resource/tool or human-help route.
2. Do not send every visitor to the Pricing Tool when the user's current question can be answered directly.
3. Funding is school-specific; do not surface it contextually for industrial/aged-care visitors.
4. Finance is the general payment-pathway alternative for non-school organisations and can also be relevant to schools.
5. Comparisons link to pricing/finance/funding according to sector, not one generic funnel.
6. Human help is an alternative to continuing self-service, not a mandatory gate.
7. Reuse the shared enquiry modal so privacy/process behaviour remains consistent.
