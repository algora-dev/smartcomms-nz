// Release 2.1 §9: deterministic guard — every public sitemap route must have
// a CONTENT_META record. Adding a route without metadata fails this test.
// Run: npm run test:content-meta
import assert from "node:assert/strict";
import { CONTENT_META, reviewedDateStrict, publishedDateStrict } from "../src/lib/content-meta.ts";
import { SITEMAP_ROUTES } from "../src/app/sitemap.ts";

let failures = 0;
for (const route of SITEMAP_ROUTES) {
  const has = Object.prototype.hasOwnProperty.call(CONTENT_META, route.path);
  if (!has) {
    console.error(`FAIL  sitemap route missing CONTENT_META entry: ${route.path}`);
    failures++;
    continue;
  }
  // Strict lookups must resolve for every emitted route.
  try {
    reviewedDateStrict(route.path);
    publishedDateStrict(route.path);
    console.log(`PASS  ${route.path}`);
  } catch (e) {
    console.error(`FAIL  strict lookup threw for ${route.path}: ${e.message}`);
    failures++;
  }
}

// Legacy /tools/system-planner is a redirect, not a sitemap route — no entry needed.
assert.ok(!SITEMAP_ROUTES.some((r) => r.path === "/tools/system-planner"));

if (failures > 0) {
  console.error(`\ncontent-meta tests: ${failures} FAILURE(S)`);
  process.exit(1);
}
console.log(`\ncontent-meta tests: all ${SITEMAP_ROUTES.length} sitemap routes registered`);
