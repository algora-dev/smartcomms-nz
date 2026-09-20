# SmartComms NZ

New Zealand resource for IP paging, PA, bell, intercom and integrated communication systems.

Next.js 16 (App Router) - TypeScript - Tailwind CSS 4 - Vercel

## Live tools

- `/pricing-tool` - ballpark installed pricing calculator
- `/tools/funding-check` - NZ school communications funding check
- `/tools/finance-check` - finance / leasing conversation readiness check

## Key authority pages

- `/pricing` - crawlable NZ pricing guide
- `/funding` - crawlable NZ 5YA / 10YPP school funding guide
- `/systems` - system architectures
- `/guides` - published resource hub
- `/compare` - comparison hub (school guide: `/compare/schools`)

## Development / tests

```bash
npm ci
npm run lint
npx --no-install tsc --noEmit
npm run test:pricing
npm run test:finance
npm run test:aged-care
npm run test:public-project-examples
npm run test:validation
npm run test:assessment
npm run test:content-meta
npm run test:industrial
npm run build
```

**Agent instructions:** read `docs/agent-ready/SMARTCOMMS_PROFILE.md` first. It is the
active authority map and policy record; `AUDIT_IMPLEMENTATION.md` and the
`FREE-TOOLS-*.md` plans are historical.
