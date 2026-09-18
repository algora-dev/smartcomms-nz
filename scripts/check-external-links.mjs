import fs from "node:fs";

const routes = [
  "src/app/funding/page.tsx",
  "src/app/compare/schools/page.tsx",
  "src/app/industries/aged-care-retirement-villages/page.tsx",
  "src/app/financing/page.tsx",
  "src/app/about/methodology/page.tsx",
];

const found = [];
for (const r of routes) {
  try {
    const t = fs.readFileSync(r, "utf8");
    for (const m of t.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      found.push([r, m[1]]);
    }
  } catch {
    console.log("MISSING ROUTE FILE", r);
  }
}
const uniq = [...new Map(found.map(([r, u]) => [u, r]))];

for (const [u, r] of uniq) {
  try {
    const res = await fetch(u, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000) });
    console.log(res.status, u, "<-", r.split("/").slice(-2).join("/"));
  } catch (e) {
    console.log("ERR", e.message, u, "<-", r.split("/").slice(-2).join("/"));
  }
}
