# SmartComms NZ — Agent-Ready Profile

**Profile version:** 1.0.0 · 2026-09-20
**Repository:** smartcomms-nz (production branch `main`)
**Site:** https://smartcomms.co.nz
**Standard:** AGENT_READY_WEBSITE_STANDARD_v0.1.0(2).md — Release 1 (protect and document) implemented.

This is the single active agent-facing profile for this repository. Older handoff docs
(AUDIT_IMPLEMENTATION.md, FREE-TOOLS-* plans) are historical records; where they conflict
with this file, this file wins.

## What this site is

- Single-business **NZ research / planning site** for IP paging, PA, bell, intercom and
  integrated communication systems. It is **not** an installer, lender, government
  assessor, or merchant stock catalogue, and it does not sell or stock compared products.
- Owner-operated by T3 Labs (SmartComms NZ brand), NZD, en-NZ locale, GST excluded
  pricing. Source of truth for identity/locale: `src/lib/site.ts`.

## Model / rule versions (SC-03)

| Rule set | Version id | Source | Review basis |
|---|---|---|---|
| Pricing allowances & band | `smartcomms-nz-pricing-v1` | `src/lib/pricing/config.ts` | Owner-reviewed 2026-09-16. **Owner-confirmed provenance:** indicative planning allowances informed by multiple partner/supplier pricing inputs. NOT a live supplier-price feed, observed min/max, or statistical range. |
| School funding guidance | `smartcomms-nz-funding-v2` | `src/lib/funding-check/config.ts` | Existing cited sources; not revalidated in this engineering pass. |
| Finance conversation guidance | `smartcomms-nz-finance-v1` | `src/lib/finance-check/config.ts` | Conversation readiness guidance, not lending eligibility. |

Pricing description to preserve publicly: "An indicative SmartComms planning range
informed by supplier and installation pricing, for the scope entered. Actual project
quotes can differ."

## Submission / enquiry policy

- Human enquiry form only. No agent `submit_enquiry` operation, no autonomous writes.
- Enquiries go **only** to the configured SmartComms inbox (env-configured, no repo
  fallback). SmartComms replies to the user with recommended providers' **public** contact
  details. Customer data is never forwarded to providers.
- No model/AI calls in Release 1. No chatbot. External agent writes disabled.

## Public routes (current)

Homepage `/`, `/schools`, `/systems/*` (5), `/guides/*` (3), `/pricing`, `/pricing-tool`,
`/funding`, `/financing`, `/tools`, `/tools/funding-check`, `/tools/finance-check`
(`/tools/system-planner` is a legacy redirect), `/compare` (comparison **hub**),
`/compare/schools`, `/industries/aged-care-retirement-villages`, `/about/*`, `/privacy`,
`/contact`. Internal: `/insights/*` (authenticated pricing-log viewer, excluded from
tracking and crawlers).

> Route correction: `/compare` is the hub; the long school guide lives at
> `/compare/schools`. Older handoffs describing `/compare` as the school guide are
> superseded.

## Authority map (what to reuse, never bypass)

| Authority | Code |
|---|---|
| Identity, locale, currency, canonical origin | `src/lib/site.ts` |
| Pricing allowances, band (0.8–1.0), disclaimers | `src/lib/pricing/config.ts` |
| Pricing calculation (pure, deterministic) | `src/lib/pricing/calculate.ts` → `calculateEstimate()` |
| Calculator state shape & defaults | `src/lib/pricing/types.ts`, `presets.ts` → `defaultState()` |
| **Boundary validation (all untrusted input)** | `src/lib/pricing/validation.ts` → `parseCalculatorState()` |
| Funding assessment | `src/lib/funding-check/` |
| Finance conversation guidance | `src/lib/finance-check/` |
| Page dates registry | `src/lib/content-meta.ts` |
| Enquiry submission | `src/app/api/inquiry/route.ts` + `ProjectEnquiryModal.tsx` |
| Pricing output records (server-recomputed) | `src/app/api/pricing-tool/output-log/route.ts` |

Rules of the engine that must not change silently:

- `null` speaker override = approved default (NOT zero speakers).
- `tier: "unsure"` = tier-B-based scope; site-wide cabling excluded (disclaimer), not an uplift.
- `twoWayMode: "package"` = documented package default (interactive → every standard room).
- Explicit `false` / `0` / `null` must never be collapsed by `value || fallback`.
- Client-side calculation is allowed (public assumptions); server records are recomputed
  server-side from validated inputs and never trust client totals.

## Data handling

- Pricing log records are non-personal **by construction**: only allowlisted calculator
  fields are accepted; extra/nested fields are rejected, not stored.
- Analytics: GA4 (env-gated) + Microsoft Clarity (public project, excludes `/insights`,
  masked). Never send names, emails, org names, free text, attachments or raw tool
  payloads as analytics properties.
- Attribution: localStorage first/last-touch, 180-day expiry enforced on read and write;
  URL capture limited to an allowlisted parameter set.
- Internal `/insights` routes: no trackers, no crawler access, authenticated.

## Owner-confirmed vs reviewed vs unknown

- **Owner-confirmed:** pricing provenance (partner/supplier-informed), enquiry flow
  (SmartComms inbox, no provider forwarding), Clarity retention, public calculator
  assumptions, 80–100% band.
- **Reviewed in code (2026-09-20):** everything in the authority map above; validation,
  logging, enquiry and robots behaviour.
- **Unknown / deployment-layer (verify in Vercel/Clarity dashboards before sign-off):**
  enforced Vercel Firewall rate-limit rules, preview protection, deployed Clarity
  masking/consent settings, GA4 automatic page capture. See
  `IMPLEMENTATION_EVIDENCE.md` §Deployment gaps.
