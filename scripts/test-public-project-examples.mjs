// Regression checks for the public project examples release.
// Plain Node — reads source files only, no dependencies.
// Run: node scripts/test-public-project-examples.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (p) => readFileSync(join(root, p), "utf8");
const compare = read("src/app/compare/schools/page.tsx");
const agedCarePage = read("src/app/industries/aged-care-retirement-villages/page.tsx");
const agedCareGuide = read("src/lib/content/aged-care-guide.ts");

let failures = 0;
const check = (name, cond) => {
  if (cond) console.log(`PASS  ${name}`);
  else { failures++; console.error(`FAIL  ${name}`); }
};
const count = (haystack, needle) => haystack.split(needle).length - 1;

// --- /compare: anchors unique, exactly one each ---
check("exactly one #nz-school-examples section", count(compare, 'id="nz-school-examples"') === 1);
check("exactly one #example-three-kings article", count(compare, 'id="example-three-kings"') === 1);
check("exactly one #example-ormiston article", count(compare, 'id="example-ormiston"') === 1);
check("exactly one #care-example-summerset-st-johns article", count(agedCarePage, 'id="care-example-summerset-st-johns"') === 1);

// --- Evidence registry ---
check("Pacific AV evidence entry exists in compare registry", compare.includes('"frontrow-ormiston-project"') && compare.includes("https://www.pacificav.co.nz/ormiston-junior-college-auckland/"));
check("G&S evidence entry exists in careSources", agedCareGuide.includes('"gs-summerset-st-johns"') && agedCareGuide.includes("https://gstechnologies.co.nz/case-studies/summerset-st-johns/"));
check("Edwards URL reused, not duplicated as new evidence entry", count(compare, "https://www.edwardsnz.co.nz/school-uses-paging-system-for-tighter-lockdown-procedures") === 1);

// --- Source IDs used by new markup resolve in their registries ---
check("new compare section cites 2n-school evidence", compare.includes('evidence["2n-school"].href'));
check("new compare section cites frontrow-ormiston-project evidence", compare.includes('evidence["frontrow-ormiston-project"].href'));
check("G&S card cites careSources entry", agedCarePage.includes('careSources["gs-summerset-st-johns"].href'));

// --- Dealer vs publisher distinction preserved ---
check("Ormiston card names Australasian Audio Engineering as dealer", compare.includes("Australasian Audio Engineering as the dealer"));
check("dealer not replaced by publisher in Ormiston copy", !compare.includes("Pacific AV as the dealer"));

// --- Out-of-scope claims absent from the new cards ---
const schoolSection = compare.slice(compare.indexOf('id="nz-school-examples"'), compare.indexOf('id="questions"'));
const careCard = agedCarePage.slice(agedCarePage.indexOf('id="care-example-summerset-st-johns"'), agedCarePage.indexOf("A useful NZ example"));
check("no 5YA/fund-eligibility claim in school cards", !/5YA|10YPP|funding eligib/i.test(schoolSection));
check("no installation-price claim in school cards", !/price of|cost \$|quoted price/i.test(schoolSection));
check("no preferred-provider/partner claim in school cards", !/preferred installer|approved installer|partner of SmartComms/i.test(schoolSection));
check("no price/brand-verification claim in G&S card", !/verified PA brand|complete project price of/i.test(careCard) || careCard.includes("does not verify a PA brand or a complete project price"));

// --- Levin example preserved separately (not merged) ---
check("Levin example retained as separate historical account", agedCarePage.includes("A useful NZ example: quieter staff notification") && agedCareGuide.includes("summerset.co.nz"));

process.exit(failures ? 1 : 0);
