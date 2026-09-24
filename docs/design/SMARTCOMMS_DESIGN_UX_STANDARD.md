# SmartComms NZ — Design & UX Standard

Version: **1.1.0** · implementation baseline: **23 September 2026**  
Derived from the current SmartComms 23 September 2026 Design/UX baseline and updated after the navigation, tool-discovery and Search Console growth pass.

This is the **internal SmartComms standard**, not a claim of third-party certification. It complements, rather than replaces, `docs/agent-ready/SMARTCOMMS_PROFILE.md`. It governs presentation and human journeys; it does not authorise pricing, product, funding, finance, privacy-policy or API changes.

## 1. Design intent

Keep the recognisable SmartComms navy, blue, teal, Inter typography and existing content. Make the information easier to scan, and make human help available at a relevant decision point without forcing a visitor through a tool. The website must remain useful to someone who never enquires.

**Reading → useful next resource or tool → optional SmartComms enquiry.**

Use approved patterns rather than inventing a new visual language for each page. Consistency is not identical page composition: a calculator, technical guide, comparison and privacy statement solve different tasks.

## 2. Sources of design authority

| Responsibility | Source of truth |
|---|---|
| Colours, text scale, container widths, buttons, focus, surfaces | `src/app/globals.css` |
| Bespoke home illustration/animation | `src/components/home/smartcomms-hero.tsx`, `src/app/smartcomms-hero.css` |
| Authority-page hero | `src/components/content/AuthorityHero.tsx` |
| Comparison headings, badges, evidence references | `src/components/ui/comparison.tsx` |
| Accessible horizontal comparison/data region | `src/components/ui/TableRegion.tsx` |
| Contextual help panel | `src/components/content/ProjectHelpPanel.tsx` |
| Related resources | `src/components/content/ContinuePlanning.tsx` |
| Every project enquiry trigger | `src/components/enquiry/ProjectHelpLauncher.tsx` |
| The actual enquiry form and process | `src/components/enquiry/ProjectEnquiryModal.tsx` |
| Navigation/footer | `src/components/site-header.tsx`, `src/components/site-footer.tsx` |
| Planning-tool mini-navigation | `src/components/tool-suite-nav.tsx` |
| Published NZ evidence cards on authority pages | `src/components/content/PublishedEvidenceCards.tsx` |
| Business rules, public facts and dates | Existing `src/lib/*` authorities; never the design system |

Do not extract a component for every paragraph. Extract a pattern when there is a repeated interaction, repeated semantics, or repeated complex styling that needs to remain identical. Page-specific source wrappers may adapt their own typed evidence registers to the shared renderer.

## 3. Brand and colour semantics

Existing brand values stay unchanged:

| Token | Value | Use |
|---|---|---|
| `--sc-navy`, `--sc-blue-900` | `#0b2d5b` | Heading hierarchy, strong/dark surfaces |
| `--sc-blue-700` | `#2a5286` | Emphasised links, primary hover |
| `--sc-blue-600`, `--sc-accent` | `#3b6ea5` | Primary blue actions |
| `--sc-teal` | `#2cb1a5` | Decorative accent; **not small body text on white** |
| `--sc-teal-strong` | `#1f7f77` | Accessible teal actions and emphasis |
| `--sc-charcoal` | `#1f2937` | Body/default text |
| `--sc-slate` | `#46536a` | Supporting body copy |
| `--sc-blue-50` | `#eff4f9` | Information and section surfaces |
| `--sc-teal-50` | `#edf8f6` | Quiet accent surface |
| `--sc-border` | `#e5e7eb` | Card/table/section separation |

Use the same brand palette on school, aged-care and industrial pages. Do not allocate a new brand colour to each sector. Semantic warning/success colours are allowed only for actual warnings/status, not rankings or conversion pressure.

`--sc-warning-*` and `--sc-caution-*` retain the existing warning colours and name their semantic roles.

White-on-blue/teal buttons use the strong tokens. On dark surfaces use white text and light/outlining button variants, never a bare default-blue anchor. Do not use opacity to make material qualifications unreadable.

### CSS cascade rule

Base element styles belong in `@layer base`; component styles belong in `@layer components`. Tailwind utilities may then override intentionally. **Do not add unlayered `a`, `.sc-container` or `.sc-prose h2` rules**: those can defeat utilities such as `text-white`, `max-w-3xl` and local card headings.

`not-prose` is explicitly implemented by SmartComms prose selectors. It is not assumed to exist because a typography plugin might normally supply it. Mark embedded cards, tables, forms and CTA components as `not-prose`.

## 4. Typography

Font: **Inter**, loaded by the existing `next/font` integration, with system fallback. No additional font downloads or families. Keep the homepage wordmark/hero treatment as a deliberate exception.

| Role | Class/pattern | Size and rhythm |
|---|---|---|
| Editorial/authority H1 | `sc-title` | 2.125rem mobile, 3rem from 640px; 1.12 line height; bold |
| Tool title | `sc-tool-title` | 1.875rem mobile, 2.5rem from 640px; 1.15 |
| H2 / section title | `sc-section-title` | 1.5rem mobile, 1.875rem from 768px; 1.25 |
| Card / FAQ H3 | `sc-card-title` or current 18–20px utility | Semibold/bold; 1.4 |
| Lead | `sc-lead` | 1.125rem; 1.65; maximum 68ch |
| Main body | inherited / `sc-prose` | 1rem; 1.75 in long-form text |
| Support | `text-sm leading-relaxed` | 0.875rem; never compress essential answers into this |
| Source/date labels | `text-xs leading-relaxed` | 0.75rem; sources remain readable and selectable |
| Eyebrow | `sc-eyebrow` | 0.75rem, uppercase, semibold, spaced letters |

One page H1. Existing meaningful H2/H3 wording is preserved. Dialog titles are correctly labelled. A completed tool replaces its introductory H1 with the result H1, rather than displaying two competing page titles. Never reduce long answer text to fit a fixed-height card; cards expand.

## 5. Containers and vertical rhythm

- `sc-container`: centred, full available width; default maximum **72rem**.
- Mobile gutter **1rem**, from 640px **1.5rem**.
- `sc-container-prose`: **48rem**; long-form reading, policy pages, technical guides.
- `sc-container-reading`: **64rem**; editorial heroes, profiles and mixed-content sections.
- `sc-container-wide`: **72rem**; comparison tables, hub cards and rich overviews.
- `sc-container-tool`: **48rem**; the principal questionnaire surface.
- Existing local `max-w-*` utilities remain supported for justified exceptions.
- `sc-section`: 3rem vertical, 4rem from 768px; use compact 2rem sections only for adjacent supporting content.
- Hero: 3rem top/bottom mobile, 4rem desktop. The boxed authority hero keeps its existing form.
- Grid gap normally 1.25–1.5rem; card padding normally 1.25rem mobile, 1.5–1.75rem desktop.
- H2 and anchor destinations have a sticky-header offset. Never hide a title under the 80px site header.

Do not crop page overflow globally to hide layout bugs. A table can scroll horizontally; the whole document should not.

## 6. Page families

### Homepage
Preserve its bespoke diagram and reveal animation. It is the one marketing-led exception, not a template for articles. Keep direct access to all three tools, comparisons, system types and the existing final help opportunity.

### Hubs (`/systems`, `/guides`, `/tools`, `/compare`)
Clear introduction → navigable existing cards → one concise optional help panel. No wall of additional CTA buttons. Existing destinations and descriptions remain intact. Do not turn every hub card into an enquiry; browsing remains a valid next step.

### Authority pages and technical guides
Use `AuthorityHero`, where already present, then the existing facts/sections in order. `AtAGlance` remains a compact summary. Use reading-width prose. Add a contextual help option after a useful answer or in `ContinuePlanning`, and optionally a compact hero help action. Preserve funding and pricing links: help is an alternative, not a replacement.

### Detailed comparisons
Shared hero typography → contents navigation → use-case shortlists → tables → existing profiles and alternatives → practical example/cost → FAQs → final CTA → methodology/sources. Preserve individual content order where there is a reason. Use shared heading/badge/table/evidence primitives. Do not change rankings or source data during a visual pass.

### Pricing/funding/finance authority pages
Keep their different subject matter and existing examples. Add direct contextual help so a completed calculator is not mandatory. School funding remains explicitly school-scoped. Industry-aware links preserve the existing finance pathway for non-school contexts.

### Tools
The question and primary action remain the focus. Keep question count, state shape, result logic, calculation outputs and URL handoff behaviour unchanged. Results must be immediately visible. Do not add a sales card inside every step. Existing result enquiries remain; a small help action outside the questionnaire may support a visitor who needs clarification before completing it.

### About and policy pages
About may end with one low-pressure contact action. Privacy, disclosure, methodology and editorial policy are not sales landing pages: no promotional enquiry panels. Header/contact navigation remains available. Preserve all legal/business disclosures.

## 7. Buttons, links and CTA hierarchy

- `sc-btn-primary`: blue, filled, pill, minimum 44px target height.
- `sc-btn-secondary`: blue outline/white, same size/shape.
- `sc-btn-help`: strong teal, same shape; explicit human-help action when appropriate.
- `sc-btn-light` / `sc-btn-outline-light`: use on navy CTA surfaces.
- `sc-text-action`: underlined, generous target, quiet third option near existing hero actions.
- `sc-actions`: wrapping action group; at narrow widths buttons can stack without clipping.
- Icon-only controls: 44 × 44px target with accessible name.
- Button = action/state/modal; link = destination. Do not use anchors with `href="#"` as buttons.
- No automatic modal opening, exit-intent prompts, floating overlay sales widgets or enforced lead gates.

A substantive article usually needs two well-placed help opportunities; long comparisons may have three. This is **not a quota**. Prefer the user's decision points. A nav help action makes assistance accessible without multiplying in-body prompts.

Every enquiry trigger uses the same `ProjectHelpLauncher` / `ProjectEnquiryModal`, with an appropriate `mode`, stable `sourceTopic`, and non-personal context. No duplicated forms or parallel email API. Do not send free text or contact data into analytics events.

Approved wording examples: school bells — “Ask about your school bell project”; pricing — “Get help with a formal quote”; funding — “Ask about your project pathway”; finance — “Discuss finance options”; technical scope — “Ask about your site”. The modal, not every CTA card, explains the provider-recommendation process.

## 8. Enquiries, dialogs and form controls

The operating model is unchanged: enquiry to SmartComms only → team replies with suggested providers and public contact details → visitor decides whether to contact them. No provider data transfer.

- Portal the shared dialog to `document.body` so transformed cards/ancestors and prose styles cannot trap or recolour it.
- Use the browser's native modal dialog for focus containment and inert background behaviour.
- On open, focus the top heading with `preventScroll`, reset the panel to the top, and keep the title visible.
- On success, focus the success heading and reset to the top; the dialog retains a valid accessible name.
- On close, restore focus to the invoking control without jumping the page.
- Escape and the visible close control close it. Backdrop close must not trigger from a click inside the form.
- Retain validated required fields, attachment limits, error handling and submit API.
- Text/select controls use `sc-input`: full width, 16px text (avoid mobile zoom), 44px minimum height, visible keyboard focus. Quantity steppers are 44px; compact inline information buttons use a deliberate 24px minimum with spacing and keyboard/click access.
- Errors use a visible error/status region; never clear all user input after a failed request.
- Responsive max-height uses dynamic viewport units with a fallback; scrolling is confined to the dialog panel.
- No hidden honeypot receives initial focus. User-entered context and attachments stay masked from session replay.

A render/screenshot check is not proof of screen-reader conformance. Manual keyboard and actual browser tests are release gates.

Restart confirmation uses `ConfirmationDialog`, the same native dialog surface with the non-destructive action initially focused. Its original clear-estimate behaviour is unchanged.

## 9. Tables, sources and progressive disclosure

Use `TableRegion` for tables wider than their text column. It provides a labelled, keyboard-scrollable region and a hint **only when the table actually overflows**. Preserve HTML table/caption/th scope semantics. Never hide columns or delete caveats to fit mobile.

Use `SectionHeading`, `Badge` and `EvidenceReferences` from the shared module. Neutral badges identify categories, not invented quality scores. Existing source numbers, labels, URLs and technical/local-evidence distinctions remain unchanged.

Use native `details/summary` for extra design and evidence detail. Summary has a visible affordance, focus ring and comfortable target. Essential conclusions, scope limitations and the main answer remain outside collapsed blocks.

## 10. Navigation, motion and accessibility

- Visible-on-focus “Skip to content” link targets the one main landmark.
- Header shows active location and has a modest “Ask SmartComms” action; the same action remains visible in the mobile header.
- Mobile menu is scrollable within the viewport, closes after selection/Escape and does not cut off its last links.
- Normal navigation, tool state transitions, explicit anchors and modal scrolling are separate responsibilities. Preserve intentional anchors and existing saved-estimate links.
- Hover elevation belongs to clickable cards, not every static information card.
- Avoid scaling navigation text or strong glowing shadows that move the reading target.
- Respect `prefers-reduced-motion`; no smooth movement required to reach content.
- Test reflow at 320/390/768/1440px, text zoom, keyboard use and contrast. Automated checks are evidence, not a blanket WCAG certification.

## 11. Content/data invariants

No content or business logic is removed to standardise the layout. Preserve:

- every substantive paragraph/list/table/profile/FAQ and existing external evidence link;
- existing URLs, canonicals, structured data and publisher/source attribution;
- current pricing/funding/finance functions, inputs, conditions and outputs;
- settled comparison order and model boundaries;
- non-school industry context, including no contextual school-funding suggestion for aged care/industrial;
- enquiry privacy and response-only model;
- current API flags, protection, logging authority and deployment settings.

New CTA copy is allowed. Do not bump a source verification date simply because presentation changed. Record the presentation release separately.

## 12. Workflow for every future page/edit

1. Choose a page family and reference existing siblings.
2. Use shared tokens/components; justify exceptions in the page note.
3. Render useful content server-side; keep interactive islands small.
4. Place enquiry help after the useful answer, not in place of it.
5. Test all links and context handoffs; perform a no-content-loss check.
6. Run domain tests plus design checks; review desktop/mobile screenshots.
7. Record modified files, test results and remaining untested behaviours.
8. Deploy only after approval; preserve a rollback commit.

No extra UI library, CSS framework, icon library or font is required for this release.

## 13. References for engineering choices

Reviewed 23 September 2026. These support implementation patterns, not commercial uplift or complete accessibility certification.

- W3C APG modal dialog: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- W3C modal example and focus placement: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/
- WCAG 2.2 target-size guidance: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- Tailwind custom styles and layers: https://tailwindcss.com/docs/adding-custom-styles
- Next.js server/client boundaries: https://nextjs.org/docs/app/getting-started/server-and-client-components

## 14. Verification status

See `IMPLEMENTATION_AND_QA.md` in this directory for the exact tests executed in this workspace, isolated-preview limitations, production merge checks and rollback guidance. The standard alone is not proof of a successful build or deployment.

## 19. Navigation information architecture (v1.1)

The desktop header keeps a small number of top-level choices. Do not add a new top-level navigation item for every future page. Use these groups:

- **Systems** — system architecture and function guides.
- **Compare** — site-type comparison hub plus current school, aged-care and industrial comparisons.
- **Tools** — Pricing Tool, Funding Checker, Finance Checker and the tools hub.
- **Guides** — practical planning resources.
- **About** — ownership/methodology entry point.
- **Ask SmartComms** — persistent human-help action; opens the shared enquiry portal.

Desktop uses compact disclosure menus; mobile uses the hamburger plus expandable groups. Navigation labels describe the destination plainly. Generic comparison links go to `/compare`; school-specific links may still go to `/compare/schools`.

Do not restore a standalone pricing button to the main header merely because pricing is important: the Tools group and homepage tool suite provide deliberate discovery without recreating header clutter.

## 20. Planning-tool suite

Treat **Pricing Tool**, **Funding Checker** and **Finance Checker** as one recognisable suite.

Naming:

- **Pricing Tool** — navigation/card/tool title. “Ballpark” may remain descriptive body copy explaining the estimate, but is not the primary product name.
- **Funding Checker** — explicitly scoped to eligible NZ school/property pathways.
- **Finance Checker** — broader finance/leasing conversation screener.

Each tool introduction includes the same compact tool-suite navigation. A completed result remains the most prominent result content; cross-tool next actions stay contextual rather than forcing the user back through a hub.

Homepage tool cards use the same names and make the three routes visually equal.

## 21. Search-growth page pattern

For existing pages that begin earning relevant Search Console impressions, strengthen the **answer and evidence before creating a new page**. The preferred sequence is:

1. align title/H1/description with the genuine query intent without keyword stuffing;
2. answer the question clearly near the top;
3. fill substantive information gaps;
4. add visible FAQs only where they answer real adjacent questions;
5. improve internal links to the relevant comparison/tool;
6. add published NZ examples or official guidance when they materially improve the answer;
7. preserve the contextual SmartComms enquiry route.

Do not rewrite a page solely because its early ranking is low. New-site crawl/index lag and small impression counts are not evidence of poor content.

## 22. Evidence diversity for authority pages

For technical capability claims, prefer first-party manufacturer/official documentation. For New Zealand project or supply context, use genuine local evidence from the organisation that published the project/listing. Do not make NZAV, Sound Choice Pro Audio, or any other preferred partner the default source when independent local evidence exists.

Published examples should identify who published the account and its limitations. They are evidence of a published project/application, not SmartComms performance audits or proof of current product availability unless the source actually supports that claim.

