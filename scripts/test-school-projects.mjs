// Regression checks for the NZ school paging project synthesis page.
// Plain Node — reads source files only, no project dependencies.
// Run: node scripts/test-school-projects.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (p) => readFileSync(join(root, p), "utf8");

const data = read("src/lib/content/school-paging-projects.ts");
const page = read("src/app/guides/nz-school-paging-projects/page.tsx");
const meta = read("src/lib/content-meta.ts");
const sitemap = read("src/app/sitemap.ts");
const guides = read("src/app/guides/page.tsx");
const bells = read("src/app/systems/school-bell-announcements/page.tsx");
const emergency = read("src/app/systems/emergency-lockdown/page.tsx");
const compare = read("src/app/compare/schools/page.tsx");
const schools = read("src/app/schools/page.tsx");

let failures = 0;
const check = (name, condition) => {
  if (condition) console.log(`PASS  ${name}`);
  else { failures += 1; console.error(`FAIL  ${name}`); }
};
const count = (haystack, needle) => haystack.split(needle).length - 1;

const path = "/guides/nz-school-paging-projects";
const expectedProjects = [
  "Three Kings Primary School",
  "Ormiston Junior College",
  "Lincoln High School",
  "Cotswold Mātāhae School",
  "Thorndon Primary School",
];
const expectedSystems = ["2N network paging", "FrontRow paging and bells", "SPON IP paging", "ZYCOO IP paging, bells and intercom", "Axis network audio"];
const sourceDomains = ["edwardsnz.co.nz", "pacificav.co.nz", "nzav.nz", "avintegration.co.nz", "cie-group.com"];

check("canonical project path declared", data.includes(`SCHOOL_PAGING_PROJECTS_PATH = \"${path}\"`));
check("exactly five school project records", expectedProjects.every((name) => data.includes(`school: \"${name}\"`)) && count(data, '    school: "') === 5);
check("five school names unique", expectedProjects.every((name) => count(data, `school: \"${name}\"`) === 1));
check("five distinct system families represented", expectedSystems.every((system) => data.includes(`system: \"${system}\"`)));
check("project publisher/source diversity present", sourceDomains.every((domain) => data.includes(domain)));
check("all declared source URLs are HTTPS", !/href:\s*\"http:\/\//.test(data));
check("Three Kings lifecycle sources include Net Audio and SIP Mic EOL", data.includes('sources: ["three-kings", "2n-net-audio-eol", "2n-sip-mic-eol"]'));
check("Ormiston lifecycle includes current FrontRow and CM900 evidence", data.includes('sources: ["ormiston", "frontrow-current", "frontrow-cm900"]'));
check("Cotswold two-way communication is described", data.includes('id: "cotswold-matahae"') && data.slice(data.indexOf('id: "cotswold-matahae"'), data.indexOf('id: "thorndon-primary"')).includes('twoWay: "described"'));
check("Lincoln bells remain not stated", data.slice(data.indexOf('id: "lincoln-high-school"'), data.indexOf('id: "cotswold-matahae"')).includes('bells: "not-stated"'));
check("Ormiston architecture is amplifier-fed, not mislabeled as infrastructure reuse", data.slice(data.indexOf('id: "ormiston-junior-college"'), data.indexOf('id: "lincoln-high-school"')).includes("21 decoders feeding 21 conventional amplifier channels") && !data.includes('reuse: "hybrid"'));
check("Lincoln relocation is distinct from retained-infrastructure reuse", data.slice(data.indexOf('id: "lincoln-high-school"'), data.indexOf('id: "cotswold-matahae"')).includes("planned for later removal and re-installation") && !data.includes("reuse: ProjectCapability"));
check("Thorndon current lifecycle references Axis current + C3003 EOL", data.includes('sources: ["thorndon", "axis-current", "axis-c3003-eol"]'));
check("project and publication dates are stored separately", data.includes('publicationTiming: "Published 1 March 2024"') && data.includes('publicationTiming: "Published 23 August 2017"') && data.includes('projectTiming: "Implemented in 2024"') && data.includes('projectTiming: "Completed November 2025"') && !data.includes("  published: string;"));
check("publisher and delivery roles are not conflated", data.includes('publisherRole: "Distributor / project publisher"') && data.includes('integratorLabel: "Named dealer"') && data.includes('integrator: "Australasian Audio Engineering"'));
check("Ormiston FAQ separates amplifier-fed architecture from reuse", data.includes("should not be treated as evidence of infrastructure reuse") && !data.includes("Hybrid designs can also retain suitable 100V speakers or cabling"));
check("Ministry emergency guide is registered directly", data.includes('"moe-emergency-guide"') && data.includes("Planning and preparing for emergencies (April 2026)"));

check("page H1 uses synthesis framing", page.includes("How NZ schools are using paging systems for bells, lockdowns & emergency communication"));
check("page includes cross-project matrix", page.includes("What each project actually describes"));
check("page explains Not stated semantics", page.includes("“Not stated” does not mean the installed system could not do it"));
check("page separates published facts from SmartComms analysis", page.includes("What the published account establishes") && page.includes("SmartComms analysis"));
check("page contains official emergency-planning boundary", page.includes("Lockdown communication is one part of the emergency plan") && page.includes('ids={["moe-emergency", "moe-emergency-guide"]}'));
check("page contains problem-to-example relevance map", page.includes("Which published example is most relevant to your school?") && page.includes("Match the problem, not the brand"));
check("page contains buyer checklist", page.includes("Questions to ask before copying any of these projects"));
check("page contains contextual enquiry", page.includes('sourceTopic="nz_school_paging_projects"'));
check("page contains Article schema", page.includes("articleSchema({"));
check("page contains ItemList schema", page.includes('"@type": "ItemList"'));
check("page contains visible-FAQ structured data", page.includes('"@type": "FAQPage"') && page.includes("mainEntity: schoolProjectFaqs.map"));
check("page does not claim Review/AggregateRating schema", !page.includes('"@type": "Review"') && !page.includes('"@type": "AggregateRating"'));
check("page states projects are not independent audits", page.includes("not independent installation audits") || page.includes("not SmartComms installation audits"));
check("page states photos/prose were not reproduced", page.includes("not independently inspected the installations or reproduced the publishers' photographs or case-study prose"));
check("page explains publication vs project date method", page.includes("Publication dates and project/completion dates are kept separate"));
check("page exposes evidence recheck date", page.includes("Evidence rechecked {researchDateLabel}"));
check("page cites both Ministry emergency sources", page.includes('ids={["moe-emergency", "moe-emergency-guide"]}'));

check("content-meta route registered", meta.includes(`\"${path}\": { published: \"2026-09-24\", reviewed: \"2026-09-24\" }`));
check("sitemap route registered", sitemap.includes(`{ path: \"${path}\", priority:`));
check("guides hub links project synthesis", guides.includes(`href: \"${path}\"`) && guides.includes("Real NZ School Paging Projects"));
check("school bells links project synthesis", bells.includes(`href=\"${path}\"`));
check("emergency guide links project synthesis", emergency.includes(`href=\"${path}\"`));
check("school comparison links project synthesis", compare.includes(`href=\"${path}\"`));
check("schools hub links project synthesis", schools.includes(`href: \"${path}\"`));

process.exit(failures ? 1 : 0);
