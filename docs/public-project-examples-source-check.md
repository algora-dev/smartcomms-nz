# Public project examples — source check

**Last verified:** 17 September 2026 (live fetch, all three sources)
**Scope:** three attributed NZ installation examples on `/compare` (Edwards / Three Kings Primary, Pacific AV / Ormiston Junior College) and `/industries/aged-care-retirement-villages` (G&S Technologies / Summerset St Johns).

## Source status

| Ref | Source | Status |
|---|---|---|
| P1 | Edwards — Three Kings Primary, https://www.edwardsnz.co.nz/school-uses-paging-system-for-tighter-lockdown-procedures | Verified live 17 September 2026; expected project page loads (HTTP 200, Three Kings lockdown/2N paging story present). |
| P2 | Pacific AV — Ormiston Junior College, https://www.pacificav.co.nz/ormiston-junior-college-auckland/ | Verified live 17 September 2026; expected project page loads (HTTP 200, Australasian Audio Engineering named as dealer, FrontRow equipment list present). |
| P3 | G&S Technologies — Summerset St Johns, https://gstechnologies.co.nz/case-studies/summerset-st-johns/ | Verified live 17 September 2026; expected project page loads (HTTP 200, Austco nurse call system and Auckland location present). |

Maintenance: these sources should be rechecked when the associated SmartComms comparison page is substantively reviewed or when an external-link check reports a failure. If a URL stops loading, record the actual result and hold or remove the card — do not substitute unrelated evidence.

## Attribution limits

- Publication dates are attributed to the publisher (P1: 1 March 2024; P2: 23 August 2017). They are not necessarily installation dates.
- P2 names Australasian Audio Engineering as the dealer; Pacific AV is the publisher. The distinction is preserved in the card copy.
- P3 is a contractor-published account with no stated date. It is not evidence of an installation of any PA platform ranked in the guide, not an overhead PA bill of materials, and not a cost or response-time claim.
- "SmartComms takeaway" paragraphs are SmartComms editorial interpretation, not quotations from or conclusions attributed to the installers.
- Summerset St Johns (P3) and Summerset's Levin memory-care example are different projects; their facts are not merged.
- None of the three businesses are SmartComms partners, approved installers or endorsers. Citations establish no commercial relationship.
- No fund-eligibility, installation-price or preferred-provider claims are made anywhere in the new cards.

## Regression coverage

`npm run test:public-project-examples` (scripts/test-public-project-examples.mjs) checks anchor uniqueness, evidence registry reuse (no duplicate Edwards entry), source-ID resolution, dealer-naming preservation and absence of out-of-scope claims. Run with plain Node.
