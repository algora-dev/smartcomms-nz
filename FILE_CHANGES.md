# File Changes

Baseline: `775540f`  
Release: SEO + conversion simplification, 20 October 2026

## New file

- `docs/school-bell-market-source-check-2026-10-20.md`
  - Public-source recheck register for the expanded school-bell market synthesis.

## Modified files

- `docs/design/SMARTCOMMS_DESIGN_UX_STANDARD.md`
  - Updates the approved referral language, enquiry-form progressive disclosure pattern and header action.

- `scripts/test-design-ux.mjs`
  - Updates the header assertion and adds regression checks for the simplified enquiry form and privacy model.

- `scripts/test-growth-ux.mjs`
  - Updates intentional SEO expectations and adds checks for the new pricing/funding/finance conversion paths and school-bell decision content.

- `src/components/site-header.tsx`
  - Changes the generic header CTA to `Get project help` / `Get help`.

- `src/components/enquiry/ProjectEnquiryModal.tsx`
  - Rewrites the referral proposition, shortens the visible project form, reuses structured tool context and moves optional qualification fields into progressive disclosure.

- `src/components/pricing/ResultView.tsx`
  - Moves provider-referral help immediately below the estimate, adds PDF as the secondary action, removes the duplicate late quote panel and retains site-assessment help as a secondary path.

- `src/app/page.tsx`
  - Adds an early, explicit explanation of the SmartComms provider-recommendation service and strengthens the lower-page next step.

- `src/app/contact/page.tsx`
  - Clarifies that SmartComms reviews the enquiry and replies with suitable provider contacts rather than forwarding the enquiry.

- `src/app/about/page.tsx`
  - Aligns the process description and referral CTA with the actual operating model.

- `src/app/tools/page.tsx`
  - Explains how the planning tools lead into a provider recommendation.

- `src/app/pricing/page.tsx`
  - Makes the referral/formal-quote next step explicit.

- `src/app/financing/page.tsx`
  - Makes the finance-contact recommendation path explicit.

- `src/app/compare/page.tsx`
  - Reframes the help CTA around choosing a suitable approach/provider.

- `src/app/systems/page.tsx`
  - Aligns generic system-selection help with the provider-referral proposition.

- `src/app/systems/ip-paging-pa/page.tsx`
  - Updates contextual help wording only.

- `src/app/systems/ip-intercom/page.tsx`
  - Updates contextual help wording only.

- `src/app/systems/traditional-vs-ip/page.tsx`
  - Updates contextual help wording only.

- `src/app/schools/page.tsx`
  - Adds a `Start with the problem` decision layer, strengthens internal links into priority school content and makes SmartComms' referral role explicit.

- `src/app/systems/school-bell-announcements/page.tsx`
  - Retargets metadata/opening copy, adds a multi-source NZ market decision section covering scheduler-only, hybrid/network-control and integrated IP approaches, improves cost-path explanation, and strengthens referral actions.

- `src/app/systems/emergency-lockdown/page.tsx`
  - Adds a clearer answer-first explanation and referral next step while preserving the existing high-value evidence content.

- `src/app/tools/funding-check/FundingCheckTool.tsx`
  - Reworks the result CTA around quote-ready scope help and provider contacts without changing funding logic.

- `src/lib/funding-check/config.ts`
  - Updates the secondary result CTA label to `Ask who should quote this project`.

- `src/app/tools/finance-check/page.tsx`
  - Moves the finance-checker introduction/H1 server-side, scopes metadata to communications projects and fixes the prior duplicate title suffix.

- `src/app/tools/finance-check/FinanceCheckTool.tsx`
  - Accepts the server-rendered introduction and simplifies the result referral CTA without changing the finance engine.

- `src/lib/content-meta.ts`
  - Advances review dates only for materially reviewed/changed public routes in this release.

## Deliberately not changed

- `package.json` / `package-lock.json`
- `vercel.json`
- canonical host / sitemap host / `www` redirect
- analytics implementation
- `/api/inquiry` business workflow
- pricing calculation engine
- funding assessment logic
- finance assessment engine
- brand assets
