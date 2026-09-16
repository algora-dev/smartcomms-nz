import assert from "node:assert/strict";
import { assessFinanceFit } from "../src/lib/finance-check/engine.ts";

const commercial = {
  organisationType: "commercial",
  paymentFrequency: "monthly",
};

let r = assessFinanceFit({
  ...commercial,
  projectValueBand: "20_40",
  paymentBudget: "1000_2000",
  upfrontBand: "none",
});
assert.equal(r.level, "strong");
assert.match(r.headline, /worth having|explore/i);

r = assessFinanceFit({
  ...commercial,
  projectValueBand: "250_plus",
  paymentBudget: "under_1000",
  upfrontBand: "none",
});
assert.equal(r.level, "tailored");
assert.doesNotMatch(r.headline, /reject|ineligible|declin/i);

r = assessFinanceFit({
  organisationType: "state_school",
  paymentFrequency: "weekly",
  projectValueBand: "unsure",
  siteSizeBand: "21_40",
  paymentBudget: "unsure",
  upfrontBand: "unsure",
  source: "funding",
});
assert.equal(r.level, "early");
assert.ok(r.reasons.some((x) => /school/i.test(x)));
assert.ok(r.reasons.some((x) => /funding/i.test(x)));

console.log("finance tests: all assertions passed");
