# SmartComms NZ - Search Visibility / Webmaster Handoff

Use this after deploying the updated site.

## Goal

Confirm that the production site is technically discoverable by Google, Bing and AI search crawlers, then identify only the items that require manual owner action.

## 1. Production URL and canonical checks

Confirm the live canonical hostname is exactly the intended production domain (currently expected to be `https://www.smartcomms.co.nz`).

Check:

- `NEXT_PUBLIC_SITE_URL` in Vercel matches the canonical production domain.
- HTTP -> HTTPS redirect works.
- non-canonical host redirects to canonical host.
- `/robots.txt` returns 200.
- `/sitemap.xml` returns 200.
- important pages return 200 and do not contain `noindex`.
- page canonical tags point to the final production URL, not the Vercel preview domain.

Priority URLs:

- `/`
- `/schools`
- `/pricing`
- `/pricing-tool`
- `/funding`
- `/tools/funding-check`
- `/systems`
- `/systems/traditional-vs-ip`
- `/guides`

## 2. Google Search Console

Using the Search Console access already available:

1. Confirm the correct production property is selected.
2. Confirm `https://www.smartcomms.co.nz/sitemap.xml` is submitted.
3. Report the sitemap status and number of discovered URLs.
4. Check Pages / Indexing and report:
   - indexed pages
   - discovered but currently not indexed
   - crawled but currently not indexed
   - duplicate/canonical issues
   - blocked by robots/noindex issues
5. Check Manual Actions and Security Issues. They should both be clear.
6. Check Core Web Vitals / HTTPS reports for obvious failures.
7. For each priority URL above, use URL Inspection and report whether Google says:
   - URL is on Google
   - URL is not on Google
   - canonical selected by Google
   - crawl allowed
   - indexing allowed

### If you cannot click "Request indexing"

Do not guess. Return a list headed `MANUAL ACTION REQUIRED BY SITE OWNER` containing each priority URL that is not indexed and needs a manual request.

The owner will open Search Console -> URL Inspection -> paste the URL -> Test Live URL if useful -> Request Indexing.

Do not request repeated indexing for URLs already indexed.

## 3. Bing Webmaster Tools / IndexNow

Check whether the site is connected to Bing Webmaster Tools.

If connected:

- verify the sitemap is submitted;
- verify the IndexNow key file is live at `/e5f35406b43b495b4dacb3ea8957792b.txt`;
- run `npm run indexnow -- / /schools /pricing /pricing-tool /funding /tools/funding-check` after production deployment;
- report the IndexNow response.

If Bing Webmaster Tools access is unavailable, return the exact manual action required rather than skipping it.

## 4. AI search crawler access

Confirm `/robots.txt` contains explicit access for `OAI-SearchBot` and a general `User-agent: *` allow rule.

Also check Vercel firewall, bot protection or any CDN/security layer for rules that could block search crawlers. Report any rule that needs owner/admin access to change.

## 5. Structured/site checks

Confirm:

- Organization schema renders on the site.
- article/breadcrumb schema on `/schools` is valid JSON-LD.
- no schema contains preview/staging URLs.
- sitemap includes `/schools`.
- desktop/mobile navigation links to `/schools`.
- homepage, pricing, funding and guides link internally to the school guide and/or tools.

## 6. Analytics baseline

If analytics is installed, report what is currently available for:

- organic landing pages
- pricing tool starts/completions
- funding tool starts/completions
- quote/inquiry CTA clicks
- ChatGPT referrals (`utm_source=chatgpt.com`)

If this cannot currently be measured, state exactly what tracking is missing. Do not add an analytics vendor without owner approval.

## 7. Final report format

Return only:

### PASS
Items confirmed working.

### FIXED
Anything you changed and deployed.

### MANUAL ACTION REQUIRED BY SITE OWNER
Only things you cannot do, with exact click-by-click instructions.

### WATCH FOR 14 DAYS
Indexing/impression metrics to monitor, without promising rankings.
