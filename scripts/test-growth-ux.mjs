/** Search-growth/navigation regression checks. No network or production mutations. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const text=(p)=>readFileSync(join(root,p),'utf8');
let checks=0;
function check(name,condition){assert.ok(condition,name);checks++;console.log('PASS '+name);}

const header=text('src/components/site-header.tsx');
for(const label of ['Systems','Compare','Tools']) check(`grouped nav: ${label}`,header.includes(`label: "${label}"`));
for(const label of ['Pricing Tool','Funding Checker','Finance Checker']) check(`tools menu: ${label}`,header.includes(`label: "${label}"`));
check('header no legacy ballpark CTA',!header.includes('Get a ballpark price'));
check('desktop uses grouped disclosures',header.includes('aria-expanded={expanded}')&&header.includes('setDesktopOpen'));
check('mobile uses expandable nav groups',header.includes('<details')&&header.includes('<summary'));

const home=text('src/app/page.tsx');
for(const label of ['Pricing Tool','Funding Checker','Finance Checker']) check(`homepage planning suite: ${label}`,home.includes(`>${label}<`));
check('homepage planning section named',home.includes('Plan your project'));
check('homepage utility strip contains three tools',home.includes('homepage_pricing_tool_clicked')&&home.includes('homepage_funding_tool_clicked')&&home.includes('homepage_finance_tool_clicked'));

const toolNav=text('src/components/tool-suite-nav.tsx');
for(const label of ['Pricing Tool','Funding Checker','Finance Checker']) check(`tool suite nav: ${label}`,toolNav.includes(`label: "${label}"`));
check('pricing intro uses tool suite nav',text('src/app/pricing-tool/page.tsx').includes('<ToolSuiteNav current="pricing"'));
check('funding intro uses tool suite nav',text('src/app/tools/funding-check/page.tsx').includes('<ToolSuiteNav current="funding"'));
check('finance intro uses tool suite nav',text('src/app/tools/finance-check/FinanceCheckTool.tsx').includes('<ToolSuiteNav current="finance"'));
check('pricing result uses indicative naming',text('src/components/pricing/ResultView.tsx').includes('Your indicative installed price'));

const targets=[
  ['src/app/systems/school-bell-announcements/page.tsx','School Bell, Paging & Announcement Systems NZ','threeKings'],
  ['src/app/systems/emergency-lockdown/page.tsx','School Lockdown & Emergency Communication Systems NZ','threeKings'],
  ['src/app/systems/ip-paging-pa/page.tsx','IP Paging & PA Systems NZ','richmondRoad'],
  ['src/app/systems/ip-intercom/page.tsx','School & IP Intercom Systems NZ','sektorVerso'],
];
for(const [file,title,evidence] of targets){
 const s=text(file);
 check(`${file}: strengthened metadata`,s.includes(title));
 check(`${file}: published evidence`,s.includes('PublishedEvidenceCards')&&s.includes(evidence));
 check(`${file}: visible FAQs`,s.includes('Common questions'));
 check(`${file}: contextual SmartComms help`,s.includes('help={{'));
}

const evidence=text('src/lib/content/nz-public-evidence.ts');
for(const domain of ['edwardsnz.co.nz','pacificav.co.nz','audioconnect.co.nz','gstechnologies.co.nz','sektor.co.nz']) check(`diverse NZ evidence: ${domain}`,evidence.includes(domain));
check('evidence sources use HTTPS',!evidence.match(/href:\s*"http:\/\//));
check('generic system comparison points to hub',text('src/app/systems/page.tsx').includes('href="/compare" className="sc-btn-secondary">Compare by site type'));

const meta=text('src/lib/content-meta.ts');
for(const route of ['/systems/school-bell-announcements','/systems/emergency-lockdown','/systems/ip-paging-pa','/systems/ip-intercom']){
 const escaped=route.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 check(`review date bumped: ${route}`,new RegExp(`"${escaped}"[^\\n]+reviewed: "2026-09-23"`).test(meta));
}

console.log(`\nGrowth/navigation structural checks: ${checks} passed.`);
