# SmartComms NZ — Release 1 Implementation Evidence

**Implemented:** 2026-09-20 · Commits A–D on `main` (local; push pending owner review)
**Brief:** SMARTCOMMS_AGENT_READY_IMPLEMENTATION_BRIEF 1.0.0 (Release 1 only)

## Commits

| Commit | Scope |
|---|---|
| A `SC-01: agent-ready profile...` | docs/agent-ready/SMARTCOMMS_PROFILE.md, README tools/tests refresh, AGENTS current-policy section. No runtime change. |
| B `SC-02/SC-03: shared pricing boundary validation...` | `src/lib/pricing/validation.ts` (new), output-log route rebuilt (schema v2, server-recomputed, 16 KiB pre-parse body bound, `PRICING_LOG_DISABLED` kill-switch, PDF scope parity), pricing model version + provenance, URL cfg hardening + visible "fresh estimate" notice, `npm run test:validation` (14 assertions). |
| C `SC-04/SC-05: attribution expiry + URL allowlist...` | attribution 180-day expiry enforced on read/write (purge + exclusion from submission), landing-page URL bounded to allowlisted params (utm_*, partner, industry), `/insights` guard in `track()` and attribution capture, Clarity production-host-only (+ QA override), /privacy Clarity paragraph (reviewed date bumped 2026-09-20), honest **4MB combined** upload limit client + server (request cap 4.4MB < Vercel 4.5MB). |
| D `SC-03/SC-06: honest content dates...` | content-meta: strict helpers (`reviewedDateStrict`/`publishedDateStrict` throw on missing entries), legacy helpers no longer fabricate `2026-09-11` (warn in dev, empty → omitted in sitemap), `/systems/ip-intercom` datePublished now uses the published source, school-compare JSON-LD `<`→`\u003c` real escape, funding (`smartcomms-nz-funding-v2`) / finance (`smartcomms-nz-finance-v1`) version ids, robots: GPTBot training opt-out + `/insights/`,`/api/` excluded in every agent group. |

## Gate results (exact commands)

- `npx --no-install tsc --noEmit` → **exit 0**
- `npm run lint` → **exit 0** (0 errors, 0 warnings after fix)
- `npm run test:pricing` → all assertions passed (A: $10,276–$12,845; safety: $11,792; interactive: $14,072; endpoints 34 — unchanged)
- `npm run test:validation` → all 14 assertions passed (null-speaker semantics, false/0 preservation, unknown-field rejection incl. injected `email`/`note`, enum/count/station/two-way bounds, older-cfg defaults, interactive fixture $14,072–$17,590)
- `npm run test:finance` → all assertions passed
- `npm run test:aged-care` → passed (NZ$11,892–$14,865, 13 endpoints — unchanged)
- `npm run test:public-project-examples` → all 17 checks passed
- `npm run build` → see build result below

## Fixture-table status

Numerical fixtures (10-room B Essential / C-unsure / Safety / Interactive / aged-care example / presets): all **unchanged**, verified via test:pricing + test:validation + test:aged-care. Forged low/high/breakdown: can no longer alter stored records — server recomputes from validated state; legacy client totals only ever set a boolean `legacy_client_mismatch` marker. Malformed cfg → fresh calculator start + brief notice, no completion log (validation + no-scope rejection). Logger/storage failure → visitor calculator unaffected (fire-and-forget 204 preserved; kill-switch added).

## Expected visible difference (verified against brief)

None on main pages/tools/navigation/modal. Exceptions, exactly as allowed: (1) /privacy Clarity paragraph; (2) upload helper/error text now "up to 4MB total"; (3) concise notice for malformed saved links.

## Deployment gaps (owner action required — blocks sign-off, not this code)

1. **Vercel Firewall/WAF:** verify enforced (not log-only) rate limits on `POST /api/inquiry`, `POST /api/pricing-tool/output-log`, `POST /insights/pricing-logs/login`. In-app limiter in the log route is per-instance only.
2. **Preview/staging protection:** confirm non-production previews access-controlled and non-indexable.
3. **Clarity project settings:** verify masking/consent configuration and replay with synthetic data (code-side masking points added; dashboard verification outstanding). Note: Clarity now loads on production hosts only — confirm dev/preview QA override path if needed.
4. **GA4 automatic page/referrer capture** for public→private client-side navigation: runtime verification outstanding (initial-path script gating + track() guard added in code).
5. **Screenshots at 390/1440px:** visual baseline capture requires a running browser session against the built site; not performed in this pass — pages are unchanged by design and all numerical/UI state fixtures are frozen in tests.

## Rollback

- Commit A: revert independently (docs only).
- Commit B: `validation.ts` + route are additive; worst case set `PRICING_LOG_DISABLED=true` (calculator unaffected). Do NOT revert to trusting client totals to restore logging.
- Commit C: revert measurement changes independently; keep accurate 4MB limits.
- Commit D: metadata/serializer/robots revert independently; robots change should not be reverted without owner decision on GPTBot policy.

**Stopping here for owner review, per the brief.**

## Owner decisions (2026-09-20 14:08, Shaun)

- Vercel rate-limit rules and preview protection: **deferred until go-live** (site is in testing phase). Code-side baselines remain; dashboard controls are a go-live checklist item.
- Clarity masking: owner reports **Balanced** mode in project settings.
- Upload limit: **4MB confirmed** by owner.
- Release 1 **pushed to production `main`** (2026-09-20, commit 6b8d39e).
- Release 2 authorised to start immediately.

## Release 2 � IMPLEMENTED (2026-09-20, commit c68a9a5) + Release 2.1 (this pass)

- **Capability:** read-only pricing assessment, result_type `budget_estimate`, schema_version 1, `smartcomms-nz-pricing-v1`.
- **Route:** `POST /api/business/v1/assessments` (+ gated `GET` discovery).
- **Canonical request (2.1):** `{ assessment_type: "pricing", input: { state: <cfg-format calculator state>, industry?: "schools"|"aged-care"|"industrial"|"commercial" } }` � industry is contextual only, never merged into state; unknown top-level input fields rejected.
- **Engine + validation:** same `parseCalculatorState` + `calculateEstimate` as the public site; server-recomputed; client totals never authoritative (output-log authority re-verified: schema v2 route recomputes from validated state; regression covered by test:assessment "forged low/high/breakdown" + test:validation).
- **Statuses:** canonical set `ok | needs_input | not_supported | requires_human_review | unavailable`; "unsupported" removed from contracts.
- **Next actions:** absolute URLs derived from `site.url` (cfg deep link to /pricing-tool; /contact, or /tools/finance-check for industry=aged-care).
- **Feature flag:** `BUSINESS_API_ENABLED` � **currently DISABLED in all environments**; GET and POST both return 404 while off; no config values exposed. Rollback: unset the env var (or revert commit); no data migrations involved.
- **Telemetry:** one JSON console line per request (req id, capability, adapter=http, status, elapsed, model version) � no PII, no bodies.
- **Side effects:** none � no email, lead, provider contact, booking, subscription or data mutation (test:assessment asserts statelessness of result; route performs no writes).
- **Deployment dependency:** durable rate limiting on the route BEFORE enabling the flag (owner action � see checklist below).

### Release 2.1 additional changes

- Contract standardised to `input.state`; `not_supported` canonical; absolute next-action URLs; GET+POST gated identically; telemetry added.
- Sitemap now uses `reviewedDateStrict` (exported `SITEMAP_ROUTES`); new `npm run test:content-meta` fails if a public sitemap route lacks a CONTENT_META record (28 routes verified).
- Clarity documentation corrected to match reality: project-level **Balanced** masking (owner-confirmed dashboard setting); QA override is `window.__CLARITY_QA__ = true` before page load on non-production hosts (comment previously named a non-existent env var � Option B fix, comment only).
- README test list now includes `test:assessment` and `test:content-meta`.

### Gates (Release 2.1) � actual results

- `npm run test:assessment` ? 16/16 passed
- `npm run test:content-meta` ? 28/28 sitemap routes registered
- `npm run test:validation` ? 14/14 passed
- `npm run test:pricing` ? passed (A $10,276�$12,845; safety $11,792; interactive $14,072)
- `npm run test:finance` ? passed � `npm run test:aged-care` ? passed � `npm run test:public-project-examples` ? all passed
- `npx --no-install tsc --noEmit` / `npm run lint` / `npm run build` ? see final report

### Visible difference: none. Pricing model, calculator, tools, pages untouched.
