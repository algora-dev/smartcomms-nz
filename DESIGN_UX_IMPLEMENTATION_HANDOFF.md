# SmartComms NZ — Design & UX Standardisation Release

**Date:** 23 September 2026  
**Status:** Code implemented; full repository build and production deployment checks remain with the implementation agent.  
**Baseline:** `smartcomms-nz-current-source-2026-09-23.zip` / commit `840b6dd61256f9f66d6a3895ad544dc6d2eda187`.

## 1. What you are receiving

This is a **complete updated repository**, not an instruction to recreate the changes. Use the supplied code and review its diff. The implementation already includes:

- `docs/design/SMARTCOMMS_DESIGN_UX_STANDARD.md` — the new design authority;
- `docs/design/PAGE_AUDIT.md` — all 29 public page routes and their treatment;
- shared comparison typography, table regions, badges and source references;
- contextual page-help panels and in-page contents navigation;
- shared colour/type/container/button/focus styles;
- the existing enquiry form using native modal behaviour and a body portal;
- a matching restart confirmation;
- header help and active/mobile navigation;
- result-first pricing/funding/finance presentation;
- `scripts/test-design-ux.mjs` and `npm run test:design-ux`;
- audit records in `docs/design/IMPLEMENTATION_AND_QA.md` and `qa-summary.json`.

**Do not start another redesign or reproduce the work from scratch.** The new standard records the actual implementation, not an alternative visual direction.

## 2. Merge against the correct branch

1. Record current production commit and working-tree state. Do not reset/discard unrelated work.
2. If the repository still matches the supplied baseline, apply this release's changed/new files.
3. If later changes exist, merge the included `DESIGN_UX_CHANGES.patch` after reviewing conflicts. Do not overwrite newer API, pricing, funding, finance, privacy or source content.
4. `CURRENT_REPOSITORY_EXPORT.md` is the original baseline export record, not evidence that this new release has been built or deployed. This file and `DESIGN_UX_RELEASE_MANIFEST.md` describe the new work.
5. No package dependencies or lockfile changes are required. `package.json` adds only the design test command.

## 3. Preserve these invariants

Do not change prices, the 80–100% band, formula, validators, funding/finance outcome rules, industry-context policy, product ordering, research/source records or public evidence. No new facts were authorised in this visual pass.

Do not modify the read-only assessment API, WAF/rate settings, `BUSINESS_API_ENABLED`, environment variables, analytics configuration, canonical host, robots, sitemap, review dates or deployment redirects.

Enquiries remain SmartComms-only. The team replies to the user with suggested provider contact details; no enquiry is forwarded to a provider. The current form fields, endpoint, 4 MB attachment validation and consent/privacy wording are retained.

The site stays useful without an enquiry. Policy pages do not acquire sales panels. Known non-school tool journeys retain their finance route and do not gain school-funding suggestions.

## 4. Why the main CSS change matters

The previous unlayered global rules outranked Tailwind v4 utilities. That prevented narrower page widths, white links and selected surfaces from consistently winning. Base and component styles now live in their respective CSS layers. Do not move them back outside the layers as a quick visual fix.

Long-form paragraphs now use a real narrower reading width. Tables keep independent horizontal scrolling. `not-prose` is explicitly respected so prose H2/list/paragraph rules do not leak into CTA cards or embedded controls.

The home illustration keeps its own design; its formerly global `sc-actions`/`sc-eyebrow` classes are now home-specific to prevent collisions.

## 5. Test in a proper repository environment

The audit environment could not install the pinned dependencies because npm DNS requests failed. It used real component rendering in an isolated React 18.2 / Tailwind 4.1.10 browser harness. That is useful behavioural/layout evidence, **not a substitute for the production React 19.2.8 / Next 16.3.4 build**.

Run these with the project's lockfile:

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
npm run build
```

Report actual outcomes. Fix integration/build defects surgically; do not silence checks, alter expected prices or downgrade packages to create a passing report.

## 6. Browser release gates — staging first

Use desktop 1440px, tablet 768px, mobile 390px and narrow 320px. Check Safari/iOS as well as Chromium where available. Existing URLs and content must remain accessible.

### Reading and navigation

- Home animation, controls and both original hero links still work; reduced-motion mode remains usable.
- Header fits without collision; active location is clear; mobile menu opens, scrolls and closes after selection/Escape.
- “Ask SmartComms” opens the existing enquiry form from every page.
- Skip link reaches the main content. In-page contents links reach the correct H2 below the sticky header.
- All comparison tables scroll inside their labelled region, not the whole document. A scroll hint appears only when needed.
- Expand all comparison disclosures; verify no clipping, missing sources, changed rankings or whole-page overflow.
- Read a technical guide, funding/finance article and policy page; verify there is no oversized prose line length or inherited CTA heading style.

### Modal behaviour — test this, do not assume it

Open from header, a boxed authority hero, a prose guide, each comparison and each tool result. On each:

1. Open from a scrolled page; title is visible, panel is at the top, title receives focus.
2. Tab/Shift+Tab stay inside the native modal; background cannot be interacted with.
3. Close by button, Escape and backdrop. Focus returns to the invoking control without jumping the page.
4. Scroll the modal down, close and reopen: it starts at the top.
5. Mock a successful enquiry: success title receives focus at scroll-top zero.
6. Mock an error: error is announced and typed fields remain.

**Do not send real test leads.** Stub `/api/inquiry` and `/api/pricing-tool/output-log` in browser QA. A mocked request only proves UI behaviour; separately confirm real mail delivery using an owner-approved staging inbox when authorised.

### Tool journeys

- Pricing: all three steps, Back, fine-tune, entry voice/video, monitoring, breakdown, edit and restart. The result is the first heading after completion. Check PDF download in the actual runtime.
- Restart confirmation initially focuses “Keep my estimate”. Cancel preserves values; confirm resets as before.
- Funding: state school plus maintenance-only, a strong case, a private-school case and unknown answers. Same results/CTAs; no permanent introductory header above the result.
- Finance: known/unknown values, zero deposit, low budget and industrial/aged-care preselection. No newly introduced credit rejection.
- Industrial/aged-care → pricing → finance retains estimate and industry. An explicit organisation change still overrides incoming context.
- Saved calculator links and intentional hash links work. Do not modify global scroll-restoration code merely because a mocked preview cannot reproduce Next routing.

## 7. Source/content preservation

The audit compares the new source with the supplied baseline. All original source files remain. All `src/lib` data/rules, API routes, sitemap/robots, lockfile and public assets included in the protected-file set were byte-identical at verification.

Page JSX prose/list/table text is preserved. Moved source labels/scroll hints now live in shared components. The pricing restart warning moved unchanged into the confirmation props. One obsolete CTA changes from “Be put in touch with the right people” to “Ask who can help with cabling”; this matches the existing recommendation-only service.

Tool introductions still exist and reappear when starting/restarting; they are not shown above the completed result. No product profile, FAQ, evidence card or calculator result has been removed.

## 8. Publication and rollback

Deploy only after owner approval and the checks above. Record the actual new commit/deployment ID. There are no DB migrations or environment changes.

Rollback is a revert of the presentation release commit(s). Do not roll back the underlying R2.1 API or industrial content. If a component fails in staging, fix or revert that isolated component before production; do not launch a partial broken enquiry experience.

## 9. Return to owner

Provide the final ZIP/commit, real build/test results, desktop/mobile screenshots, browser/device list, changed files and any remaining limits. Confirm explicitly:

- pricing and domain tests still pass;
- source/ranking content was not altered;
- all enquiries still reach only SmartComms;
- no production config was changed without approval;
- no user-visible content was deleted;
- the native dialogs and route/anchor scroll behaviour passed in the real application.

No commercial-campus page, new ranking study, SEO copy expansion, model/MCP integration or evidence refresh is included in this release.
