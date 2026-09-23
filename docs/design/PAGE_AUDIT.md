# SmartComms — Page-by-page design and journey audit

Date: 23 September 2026. Baseline: `840b6dd61256f9f66d6a3895ad544dc6d2eda187` from the supplied 23 September export.

All **29 public, non-redirect page routes** were inspected and rendered in the isolated QA harness. `/tools/system-planner` is an existing redirect and is unchanged. Private `/insights` routes are out of scope; their access controls and data handling remain unchanged, though base font/focus styling is shared.

Every route now has the same **Ask SmartComms** header action. The table counts below concern page-body shared launchers in the initial state, not the header, dynamic result buttons or the general-message launcher. They are an inventory, not a quota.

| Route | Initial body help actions | Implementation / reason |
|---|---:|---|
| `/` | 1 | Preserved bespoke animated hero and intent cards; shared header help; home CSS selectors no longer collide with shared UI. |
| `/about` | 1 | Consistent reading width/type; one light provider-help panel. Ownership and business explanation unchanged. |
| `/about/disclosure` | 0 | Readable prose width and type only; no sales panel added. |
| `/about/editorial-policy` | 0 | Readable prose width and type only; no sales panel added. |
| `/about/methodology` | 0 | Readable prose width and type only; no sales panel added. |
| `/compare` | 1 | Same three comparison destinations; consistent cards and one light help panel. |
| `/compare/schools` | 3 | Shared comparison primitives and contents nav; original ranks, profiles, FAQs, source numbers and project examples retained; help after shortlist plus existing later opportunities. |
| `/contact` | 1 | Keeps general-message and project-help choices; same shared modal; differentiated secondary/help buttons. |
| `/financing` | 2 | New contents links, direct finance enquiry and final help; existing IndustryAwareToolLink preserves context. |
| `/funding` | 2 | New contents links and direct school-project help; accessible source table; all policy and evidence text unchanged. |
| `/guides` | 1 | Hub typography/cards plus one optional project-help panel. |
| `/guides/ip-paging-network-readiness` | 2 | Prose and card isolation; contextual cabling/network help at beginning/end; existing checklist retained. |
| `/guides/nz-school-pa-paging-requirements` | 2 | School-specific help at beginning/end and section navigation; no new funding eligibility claims. |
| `/guides/school-pa-specification-checklist` | 2 | Specification/quote-help at beginning/end, narrow reading text; original checklist retained. |
| `/industries/aged-care-retirement-villages` | 5 | Same comparison primitives; full existing content/ranks preserved; existing brief-specific buttons/inline help retained; no school-funding CTA added. |
| `/industries/warehouses-manufacturing-industrial` | 4 | Same comparison primitives; full existing content/ranks preserved; existing brief-specific buttons/inline help retained; no school-funding CTA added. |
| `/pricing` | 2 | Consistent heading/container/action treatment; new contents links and direct quote-help without requiring calculator completion; all examples still engine-generated. |
| `/pricing-tool` | 1 | Same questions, optional fine-tuning and maths; intro hidden only on completed result; result now first H1; 44px steppers, expandable breakdown semantics, safe help popover, native restart confirmation. |
| `/privacy` | 0 | Readable prose width and type only; existing Cece/contact/retention and tracking disclosures unchanged. |
| `/schools` | 2 | Authority hero help and final school-project help; existing pricing/funding paths retained. |
| `/systems` | 1 | Hub typography/cards plus one optional requirements-help panel. |
| `/systems/emergency-lockdown` | 2 | Existing hero modal retained; section navigation and final requirements-help added; safety/certification wording unchanged. |
| `/systems/ip-intercom` | 2 | Readable prose, section navigation, hero/final intercom-help; generic comparison goes to hub. |
| `/systems/ip-paging-pa` | 2 | Readable prose, section navigation, hero/final site-help; generic platform comparison link now uses the multi-sector hub. |
| `/systems/school-bell-announcements` | 2 | Priority early-search page: new section navigation, quiet hero help, final school-bell help; removes an unused hardcoded-date guard, not published content. |
| `/systems/traditional-vs-ip` | 2 | Shared accessible table and architecture-help actions; data and existing IP/100V distinctions unchanged. |
| `/tools` | 1 | Existing three tool cards retained; one light help action for unsure visitors. |
| `/tools/finance-check` | 0 | Same three screens and classifications; standard inputs, option surfaces and one prominent result H1; same context and enquiry. |
| `/tools/funding-check` | 0 | Same questions/rules/outcomes; server-provided introduction shown in questionnaire, not above completed result; one result H1; options, actions and enquiry unchanged. |

## Intentional exceptions

- The home animated illustration and display headline remain bespoke; the rest of the site does not inherit that marketing layout.
- Long comparisons already have several useful brief-specific actions. They were not replaced with a generic three-button quota; some are inline text links rather than large panels.
- Funding, finance and pricing give useful results before asking for contact details. Unknown/weak outcomes retain their existing help route.
- Policy pages have ordinary navigation/contact access, not repeated commercial CTA panels.
- Source registers remain numbered and expandable. No evidence is hidden solely to shorten a page.
- Tools replace introductory instructions with their result **in the visible completed state**, retaining the introduction on restart. No explanatory material was deleted from the implementation.

## Search-intent scope

The prior GSC exports inform the order of attention (school bells, emergency communication, then wider IP paging/intercom). This release does not claim a traffic uplift, change product rankings, publish new research, or rewrite pages solely because they have not yet been crawled. Search/content expansion remains a separate evidence-led pass.
