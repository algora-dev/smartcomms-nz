<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:smartcomms-current-policy -->
## SmartComms current policy (2026-09-20)

Active agent profile: `docs/agent-ready/SMARTCOMMS_PROFILE.md` � read it before changing
anything. Quick rules: pricing engine and validation are the only pricing authority
(`src/lib/pricing/`); never trust client-supplied totals; enquiries go only to the
SmartComms inbox and are never forwarded to providers; `/insights` stays tracker-free and
authenticated; visual design and routes must not change without owner approval.
`AUDIT_IMPLEMENTATION.md` is a historical record.
<!-- END:smartcomms-current-policy -->


## Current Design & UX authority (23 September 2026)

Read `docs/design/SMARTCOMMS_DESIGN_UX_STANDARD.md` before editing presentation.
It complements `docs/agent-ready/SMARTCOMMS_PROFILE.md`, not the business rules.
Use shared comparison/UI components, preserve source content and industry context,
and run `npm run test:design-ux` plus domain tests. See
`DESIGN_UX_IMPLEMENTATION_HANDOFF.md` and `docs/design/IMPLEMENTATION_AND_QA.md`
for this release's real verification limits. Never claim a static preview is
a full Next.js build or a live production enquiry test.
