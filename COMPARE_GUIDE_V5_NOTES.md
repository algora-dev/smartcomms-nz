# Comparison Guide V5 - implementation notes

Updated 12 September 2026.

## What changed

- Replaced the old `/compare` placeholder with a long-form buyer's guide.
- Added SPON, Algo, Axis, TOA, AtlasIED, Bosch PRAESENSA and traditional 100V PA.
- Added a value-for-money table with separate columns for:
  - relative product cost
  - school feature fit
  - day-to-day ease
  - technical setup complexity
  - value for a typical school
- Added a broader feature matrix.
- Added an explicit usability methodology so operator ease is not confused with integrator/commissioning complexity.
- Added public product-price examples to support the relative price bands without pretending the systems are directly equivalent.
- Added a 30-area school scenario explaining where each platform becomes attractive.
- Added first-party source links and current public pricing-source links.
- Added Compare to desktop/mobile navigation, footer and Guides.
- Added a Compare CTA to `/systems`.
- Raised `/compare` sitemap priority to 0.9 and set the modification date to 2026-09-12.

## Important editorial principle

This page is intentionally not a disguised SPON advert. SPON is positioned as the strongest all-round value for a typical feature-rich school project, while other platforms win categories where their published capabilities genuinely justify it. Axis currently receives the strongest ease-of-use rating. Bosch receives the strongest mission-critical/life-safety positioning. AtlasIED receives strong enterprise/visual-notification positioning. Algo receives the SIP-first/value position. TOA receives the mature intercom/voice-alarm position.

This is more persuasive than claiming SPON wins every category.

## Pricing methodology

The page deliberately avoids publishing a fictitious complete product-only bill of materials for every manufacturer because the architectures are not equivalent. The relative cost gauge uses public endpoint/platform pricing where available plus SmartComms trusted-partner data for SPON. A matched hardware-cost comparison should only be added when the same reference specification has been priced by distributors/integrators for each platform.

## Agent merge notes

The uploaded V3.1 package did not contain the previous V4 comparison-page work, so this implementation recreates and expands it directly against V3.1.

Preserve any newer agent changes around hidden email addresses, enquiry routing and pricing-source disclaimers when merging.

Run before deployment:

```bash
npm ci
npm run lint
npm run build
```

After deployment, request indexing for `/compare` in Google Search Console if it is not indexed, and submit the updated URL through the existing IndexNow workflow.
