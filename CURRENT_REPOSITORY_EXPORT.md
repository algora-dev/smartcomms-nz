# SmartComms NZ — Current Repository Export (v2 — Design & UX release applied)

## Export date
2026-09-23, ~19:30 Europe/London (18:30 UTC).

## Branch
`main`

## Commit
`840bdd61256f9f66d6a3895ad544dc6d2eda187` (HEAD, unchanged — see Working tree)

## Production state
Production (smartcomms.co.nz) is still running commit `840b6dd` (live since 2026-09-20). The Design & UX standardisation release in this export is **applied to the working tree but NOT committed and NOT deployed** — deployment awaits owner approval.

## Working tree
Contains the complete Design & UX standardisation release applied on top of HEAD, uncommitted:
- 49 modified files + 29 added files exactly as listed in `DESIGN_UX_RELEASE_MANIFEST.md` (which, with `DESIGN_UX_IMPLEMENTATION_HANDOFF.md` and `docs/design/`, is included here)
- Protected set (pricing/finance/funding engines, API routes, robots, sitemap, lockfile, vercel.json, next.config, public assets) byte-identical to HEAD
- `DESIGN_UX_CHANGES.patch` (1.2 MB reference diff) intentionally excluded from this export
- Supersedes the baseline export `smartcomms-nz-current-source-2026-09-23.zip` (SHA256 `114042ad86f60e03db0f867e056beab5ab46ce0396fa2124c6dd0b7bc7aa6`)

## Verification (run by implementation agent on the real toolchain: Next.js 16.3.4 / React 19.2.8)
| Command | Result |
|---|---|
| `npm ci` | PASS |
| `npx --no-install tsc --noEmit` | PASS |
| `npm run lint` | PASS (0 errors, 4 unused-import warnings) |
| `npm run test:pricing` | PASS |
| `npm run test:validation` | PASS (14) |
| `npm run test:assessment` | PASS (17) |
| `npm run test:content-meta` | PASS (29 routes) |
| `npm run test:finance` | PASS |
| `npm run test:aged-care` | PASS (8 profiles / 44 sources) |
| `npm run test:industrial` | PASS (8/7/12) |
| `npm run test:public-project-examples` | PASS (12) |
| `npm run test:design-ux` | PASS (60 structural checks) |
| `npm run build` | PASS |

Browser QA (headless Chromium, production build, APIs stubbed — no real enquiries sent): 30/30 gates PASS —
- 42 page renders at 1440/768/390/320 with zero document-level horizontal overflow; every page has an h1
- Enquiry modal at 390 + 1440: focus management, native dialog tab trap, Escape/backdrop/button close, focus return to launcher, scroll reset on reopen, stubbed success (heading focused), stubbed error (alert shown, typed values retained)
- In-page contents anchors resolve (7/7); comparison tables scroll inside labelled `TableRegion` regions (4 present)
- Full tool journeys: pricing (site type → areas → capability → "See my estimate" → focused result h1 "Your ballpark installed price"; restart confirmation "Keep my estimate" cancels/preserves, confirm resets); funding (state school + maintenance-only → "Project funding options worth exploring"); finance (school → result + CTAs)

## Outstanding owner/deployment actions
- Commit + deploy of the design release awaits owner approval (handoff §8).
- Vercel rate limiting (`pricing-api-rate-limit`, 30 req/60 s/IP) and `BUSINESS_API_ENABLED=true` remain configured and LIVE (since 2026-09-20).
- Search Console: early impressions rising; `Discovered – currently not indexed` on many URLs — normal new-site crawl lag, no action.

## Known outstanding issues
None from the repository-export process. QA limits: PDF download not exercised at runtime (jsPDF); Safari/iOS not tested (Chromium only); 4 lint unused-import warnings.

## Exclusions applied
`node_modules/`, `.next/`, `.git/`, `tsconfig.tsbuildinfo`, `next-env.d.ts` (generated caches), `DESIGN_UX_CHANGES.patch` (reference artifact). No `.env*` files exist in the repository; no customer/enquiry data or personal analytics data present in the tree. The IndexNow key in `scripts/indexnow.mjs` is the public-by-design protocol key.
