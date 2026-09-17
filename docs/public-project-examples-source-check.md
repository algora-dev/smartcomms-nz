# Public project examples — source check

**Reviewed for release:** 17 September 2026
**Scope:** three attributed NZ installation examples added to `/compare` (Edwards / Three Kings Primary, Pacific AV / Ormiston Junior College) and `/industries/aged-care-retirement-villages` (G&S Technologies / Summerset St Johns).

## Status of sources

| Ref | Source | Check status (2026-09-17) |
|---|---|---|
| P1 | Edwards — Three Kings Primary, https://www.edwardsnz.co.nz/school-uses-paging-system-for-tighter-lockdown-procedures | Readable as indexed source text in the research browser; direct page fetch failed there. No fresh HTTP-200 verified from the code environment. Not evidence the site is down. |
| P2 | Pacific AV — Ormiston Junior College, https://www.pacificav.co.nz/ormiston-junior-college-auckland/ | Readable through the research browser. No fresh HTTP-200 verified from the code environment. |
| P3 | G&S Technologies — Summerset St Johns, https://gstechnologies.co.nz/case-studies/summerset-st-johns/ | Readable through the research browser. Publication/installation year not established from the visible account. No fresh HTTP-200 verified from the code environment. |
| L1 | 2N — Net Audio Systems discontinued support, https://www.2n.com/en-GB/support/discontinued/2n-net-audio-systems/ | Available as indexed manufacturer support content. Existing `2n-legacy` evidence entry still points at the products/discontinued URL; switch to this support URL only after the release link check confirms which resolves. |

DNS resolution from the code environment failed for these hosts, so **no live HTTP-200 verification is claimed**. Before release, open all three project links in a normal browser and confirm the actual project account loads (not a homepage, verification screen or soft-404). If one fails, resolve the authoritative destination or hold that card — do not substitute unrelated evidence. Held cards must be reported explicitly.

## Attribution limits

- Publication dates are attributed to the publisher (P1: 1 March 2024; P2: 23 August 2017). They are not necessarily installation dates.
- P2 names Australasian Audio Engineering as the dealer; Pacific AV is the publisher. The distinction is preserved in the card copy.
- P3 is a contractor-published account with no stated date. It is not evidence of an installation of any PA platform ranked in the guide, not an overhead PA bill of materials, and not a cost or response-time claim.
- "SmartComms takeaway" paragraphs are SmartComms editorial interpretation, not quotations from or conclusions attributed to the installers.
- Summerset St Johns (P3) and Summerset's Levin memory-care example are different projects; their facts are not merged.
- None of the three businesses are SmartComms partners, approved installers or endorsers. Citations establish no commercial relationship.
- No fund-eligibility, installation-price or preferred-provider claims are made anywhere in the new cards.

## Regression coverage

`scripts/test-public-project-examples.mjs` checks anchor uniqueness, evidence registry reuse (no duplicate Edwards entry), source-ID resolution, dealer-naming preservation and absence of out-of-scope claims. Run with plain Node.
