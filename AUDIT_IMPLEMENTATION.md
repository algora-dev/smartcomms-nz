# SmartComms NZ audit implementation - 11 September 2026

This package contains the first major cleanup pass following the full-site/tool audit.

## Phase 1 - conversion and connection layer - IMPLEMENTED

- Homepage now treats the pricing calculator and school funding check as the two live primary tools.
- Pricing result now cross-links directly into the school funding check.
- Funding result now cross-links directly into the ballpark pricing calculator.
- `/tools` shows only the two live tools rather than unfinished tool placeholders.
- Old `/tools/system-planner` route redirects to `/pricing-tool`.
- Stale links to the old planner have been removed.
- Desktop navigation is visible without opening a hamburger menu.
- Homepage positioning is broader than schools so later verticals can be added without repositioning the whole site.

## Phase 2 - authority, SEO and AI-readable content - IMPLEMENTED

- `/funding` is now a substantial server-rendered 5YA / 10YPP guide with:
  - plain-English funding pathway explanation
  - strong-fit component table
  - project-case factors
  - school/property process explanation
  - new-build and state-integrated notes
  - official Ministry starting links
  - static funding FAQs + FAQ schema
  - direct links into both interactive tools
  - manual review date
- `/pricing` is now a server-rendered NZ pricing guide rather than a placeholder.
- Pricing examples are generated from the same central pricing config as the calculator.
- `/pricing-tool` FAQ pricing examples are generated from calculator presets rather than separate hand-written numbers.
- Large-site preset pricing now carries a `+` and warning context when the standard endpoint allowance is exceeded.
- Pricing review date is config-driven rather than generated from today's date.
- Guides page now surfaces published/useful resources only. No public "in development" cards.
- Compare page now contains useful architecture guidance rather than placeholder copy.
- Sitemap removes the obsolete planner and adds privacy.

## Phase 3 - tool UX and logic cleanup - IMPLEMENTED

### Pricing tool
- Default room count changed from 10 to 0 so the estimate starts from the user's actual selections.
- The result disclaimer is less self-defeating while remaining clearly indicative.
- Large-system range visually uses `+` when additional central hardware may be required.
- Pricing state now preserves existing UTM/partner URL parameters when writing the shareable `cfg` parameter.
- White-on-teal action buttons now use a darker accessible teal token.
- Funding cross-sell added directly to pricing results.

### Funding tool
- `Not sure` school type no longer silently falls through to ordinary state-school 5YA logic.
- It now returns an explicit "school type needs confirming" pathway.
- New-build projects skip the irrelevant existing-infrastructure screen.
- New-build results hide the irrelevant infrastructure summary.
- Funding results link directly to the cost calculator.
- Server now recalculates the funding result from questionnaire answers rather than trusting a client-submitted result object.
- Missing email configuration now returns a real user-visible error instead of falsely saying the request was sent.

## Phase 4 - trust, privacy and enquiry hardening - IMPLEMENTED

- Added `/privacy`.
- Enquiry forms explain that relevant project information may be passed to a trusted installation partner if the user requests delivery/quote support.
- Commercial disclosure updated to reflect the actual model:
  - SmartComms NZ is operated by T3 Labs
  - trusted partners may deliver requested work
  - partner use is optional
  - T3 Labs does not receive referral commissions or paid placement for these introductions
- Pricing inquiry API:
  - honeypot spam field
  - 8MB per-file cap
  - 20MB combined attachment cap
  - 5-file maximum
  - extension allow-list
  - Resend errors are checked rather than assumed successful
  - UTM/referrer/page URL/partner code included in enquiry email when present
- Funding lead API also records page URL/referrer in the email.
- Added global keyboard focus-visible styling.

## Environment settings that still need to be configured in Vercel

Required to make enquiry forms actually send:

```text
RESEND_API_KEY=
```

Recommended verified sender addresses:

```text
INQUIRY_EMAIL_FROM="SmartComms NZ <enquiries@YOUR-VERIFIED-DOMAIN>"
FUNDING_LEAD_EMAIL_FROM="SmartComms NZ <enquiries@YOUR-VERIFIED-DOMAIN>"
```

Optional recipient overrides (otherwise both default to insights@t3labs.co.uk):

```text
INQUIRY_EMAIL_TO=
FUNDING_LEAD_EMAIL_TO=
```

Production canonical URL:

```text
NEXT_PUBLIC_SITE_URL=https://YOUR-PRODUCTION-DOMAIN
```

## Checks completed in this package

- All TS/TSX files were parsed/transpiled with TypeScript: no syntax errors.
- Funding rules engine checked for:
  - strong state-school case
  - fixed intercom remaining a strong component
  - unknown-school route
  - new-build route
- Pricing engine previously verified at the locked $11,845 / $14,214 10-room Tier B test case, and default area state is now zero.
- Internal static href audit found no missing routes.
- Search for stale `system-planner`, `in development`, old eligibility anchors and stale pricing placeholder copy is clean.

## Build limitation in this environment

A complete `next build` could not be run because dependency installation did not finish in the audit container. The implementation agent should run:

```bash
npm ci
npm run lint
npm run build
```

before pushing live.

## Recommended next phase after partner review

Do not add large new features before NZAV / IT-partner feedback on the two tools.

After technical assumptions are confirmed, the next high-value work is:

1. Add a proper analytics provider and track tool funnel events.
2. Analyse completed project pricing and replace configuration-only examples with clearly labelled completed-project benchmarks where defensible.
3. Build the first dedicated school industry hub/page cluster.
4. Add aged-care content only after the school funnel is stable.
5. Add actual case studies and project examples as they become available.
