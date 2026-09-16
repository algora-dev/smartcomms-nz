# Funding page example sources — revalidation check (updated 16 September 2026)

Second sweep (later on 16 September 2026): stable/current public sources were located and verified live for all three examples. Deep PDF links remain fragile; the page now links stable index/parent pages and identifies each report by year.

| Example | Published claim on /funding | Source used on /funding | Status 2026-09-16 |
|---|---|---|---|
| Tāmaki Primary School | "MOE 5YA - PA/Bell", $38,392 in Ministry receipts reported for 2022 | https://www.tamakiprimary.school.nz/our-school/financial-report/ (stable financial-reports index; lists "Tāmaki Primary Annual Report to 31.12.22.pdf") | **200 OK** |
| Lincoln High School | "MOE 5YA Bell/PA Upgrade", $108,492 capital commitment reported at 31 Dec 2024 | https://www.lincoln.school.nz/school/board-trustees (stable Board/financial-reports parent page) | **200 OK** |
| Greenhithe School | "MOE SIP Bell/Paging", $7,143 in Ministry receipts during 2022 (SIP, not 5YA) | https://www.greenhithe.school.nz/strategic-and-annual-plans/ (stable index; lists "Greenhithe School Annual Financial Report 2022") | **200 OK** |

## Notes
- The previously suggested direct Lincoln PDF (`/assets/PDF-Financials/Lincoln-High-School-YE-31-December-2024-Audited-Accounts.pdf`) was re-tested from the production/browser environment and returned **404 (nginx)**. Per the "do not knowingly ship a 404" rule, the stable parent page is used instead, with the report identified by title/year.
- Figures and project wording on `/funding` were not changed — they were previously verified against the underlying documents. Lincoln's $108,492 remains labelled as a **capital commitment**, not a payment or final project cost.
- Official Ministry sources verified live (200 OK):
  - 5YA funding: https://www.education.govt.nz/education-professionals/schools-year-0-13/property/5-year-agreement-funding
  - NZSPA: https://www.education.govt.nz/our-work/strategies-policies-and-programmes/property-and-infrastructure/school-property-group/new-zealand-school-property-agency

## Page changes made 2026-09-16
- Evidence table: added a **Source** column with one concise source link per row.
- Replaced the "temporarily removed" paragraph with the durable recheck wording (sources rechecked 16 September 2026).
- Added the **1 July 2026 5YA update box** ($30→$45/m² base rate, $45k→$90k minimum, Catch-Up/Top-Up removed, applies to new cycles only).
- Added the **1 October 2026 NZSPA FAQ** and official link (no immediate changes for schools; existing plans/projects unaffected).
