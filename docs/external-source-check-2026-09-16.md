# External source check — high-value routes (16 September 2026)

Checker: `scripts/check-external-links.mjs` (GET, follow redirects, 15s timeout). Routes scanned: `/funding`, `/compare`, `/industries/aged-care-retirement-villages`, `/financing`, `/about/methodology`.

| Route | Label | URL | Status | Date checked |
|---|---|---|---|---|
| /funding | Ministry: 5YA funding | https://www.education.govt.nz/education-professionals/schools-year-0-13/property/5-year-agreement-funding | 200 OK | 2026-09-16 |
| /funding | Tāmaki Primary financial reports | https://www.tamakiprimary.school.nz/our-school/financial-report/ | 200 OK | 2026-09-16 |
| /funding | Lincoln High 2024 audited accounts (Board/financial-reports parent) | https://www.lincoln.school.nz/school/board-trustees | 200 OK | 2026-09-16 |
| /funding | Greenhithe strategic and annual plans | https://www.greenhithe.school.nz/strategic-and-annual-plans/ | 200 OK | 2026-09-16 |
| /funding | Ministry: NZSPA | https://www.education.govt.nz/our-work/strategies-policies-and-programmes/property-and-infrastructure/school-property-group/new-zealand-school-property-agency | 200 OK | 2026-09-16 |
| /funding | Ministry: 10YPP overview | https://www.education.govt.nz/education-professionals/schools-year-0-13/property/overview-10-year-property-plan | 200 OK | 2026-09-16 |
| /funding | Ministry: furniture/equipment classification | https://www.education.govt.nz/education-professionals/schools-year-0-13/property/furniture-and-equipment-funding-state-schools/what-items-we-classify-furniture-and-equipment | 200 OK | 2026-09-16 |
| /financing | eLeasing | https://www.eleasing.co.nz/customers/ | 200 OK | 2026-09-16 |
| /financing | Westpac NZ equipment finance | https://www.westpac.co.nz/business/loans-and-finance/equipment-finance/ | 200 OK | 2026-09-16 |
| /financing | MTL Finance | https://mtlfinance.co.nz/ | 200 OK | 2026-09-16 |
| /financing | Ministry: school financial management | https://www.education.govt.nz/education-professionals/schools-year-0-13/funding-and-financials/day-day-financial-management | 200 OK | 2026-09-16 |

## Notes
- `/compare` and `/about/methodology` had no plain-string external `https://` hrefs in their page sources (links are internal or rendered from data files; spot-check data-driven links at next review).
- `/industries/aged-care-retirement-villages` page source had no direct external hrefs either (external references live in content/data files; spot-check at next review).
- Known dead (NOT shipped anywhere): Lincoln deep PDF `lincoln.school.nz/assets/PDF-Financials/Lincoln-High-School-YE-31-December-2024-Audited-Accounts.pdf` → 404 (nginx), reconfirmed 2026-09-16.
- Rule going forward: prefer stable authoritative index/parent pages over fragile deep PDFs; never knowingly ship a 404.
