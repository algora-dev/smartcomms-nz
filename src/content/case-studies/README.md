# Case studies (content pending)

Architecture-only directory for the 5-7 expected NZAV projects plus the
Lincoln High School flagship case.

- Content model + registry: `src/lib/case-studies.ts`
- No public routes exist yet (`/case-studies`, `/case-studies/[slug]` are
  planned). Do NOT create placeholder pages or nav items until at least
  two strong, verified entries exist.

## Publishing checklist per project

1. Fill every field from verified project data (installer/NZAV supplied).
2. Funding amounts: quote only the exact verified figure AND describe
   what it represents (funding, capital commitment, receipt, total
   contract, etc). Never mix accounting measures.
3. Lincoln High: the ~$98k verbal figure vs the $108,492 public
   "MOE 5YA Bell/PA Upgrade" capital commitment MUST be reconciled with
   NZAV before any number is published.
4. Add sources/disclosure rows whenever public financial records are cited.
5. Add the entry to `CASE_STUDIES` in `src/lib/case-studies.ts` with its
   derived tags (new-build/retrofit, full-ip/hybrid, funded/self-funded,
   finance-lease).
6. Then build `/case-studies` hub + `[slug]` template (project hero,
   quick facts, problem, existing infrastructure, solution, features,
   installation approach, price where publishable, funding pathway,
   results, images, installer/IT-partner credit, relevant SmartComms
   tools, sources/disclosure).
