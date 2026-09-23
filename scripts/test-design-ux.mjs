/** Design-system regression checks. No network, email or production mutations. */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const text=(p)=>readFileSync(join(root,p),'utf8');
let checks=0;
function check(name,condition){assert.ok(condition,name);checks++;console.log('PASS '+name);}
const css=text('src/app/globals.css');
const palette={'--sc-navy':'#0b2d5b','--sc-teal':'#2cb1a5','--sc-accent':'#3b6ea5','--sc-teal-strong':'#1f7f77','--sc-slate':'#46536a','--sc-blue-50':'#eff4f9'};
for(const [token,value] of Object.entries(palette))check(`retained brand token ${token}`,css.includes(`${token}: ${value};`));
check('base and component cascade layers exist',css.includes('@layer base')&&css.includes('@layer components'));
check('prose excludes embedded components',css.includes(':not(:where(.not-prose, .not-prose *))'));
check('three intentional container widths',css.includes('--sc-width-wide: 72rem')&&css.includes('--sc-width-reading: 64rem')&&css.includes('--sc-width-prose: 48rem'));
check('existing Inter integration retained',text('src/app/layout.tsx').includes('Inter')&&text('src/app/layout.tsx').includes('--font-inter'));
check('skip link targets main landmark',text('src/app/layout.tsx').includes('href="#main-content"')&&text('src/app/layout.tsx').includes('<main id="main-content"'));
check('reduced motion supported',css.includes('prefers-reduced-motion: reduce'));
check('minimum primary control target',css.includes('min-height: 2.75rem'));
check('viewport-aware dialog size',css.includes('100dvh'));
const header=text('src/components/site-header.tsx');
check('site-wide same portal access',header.includes('ProjectHelpLauncher')&&header.includes('buttonLabel="Ask SmartComms"'));
check('navigation announces current location',header.includes('aria-current'));
for(const file of ['src/app/compare/schools/page.tsx','src/app/industries/aged-care-retirement-villages/page.tsx','src/app/industries/warehouses-manufacturing-industrial/page.tsx']){
 const s=text(file);
 check(`${file}: shared comparison presentation`,s.includes('from "@/components/ui/comparison"'));
 check(`${file}: no duplicate comparison helpers`,!/^function (SectionHeading|Badge|TableRegion)\(/m.test(s));
 check(`${file}: source register still exists`,s.includes('EvidenceReferences')&&s.includes('Sources'));
 check(`${file}: contents navigation`,s.includes('PageContents'));
}
const table=text('src/components/ui/TableRegion.tsx');
check('table keyboard access reflects actual overflow',table.includes('scrollWidth > element.clientWidth')&&table.includes('tabIndex={overflows ? 0 : undefined}'));
check('overflow hint is conditional',table.includes('hidden={!overflows}'));
const modal=text('src/components/enquiry/ProjectEnquiryModal.tsx');
check('enquiry dialog portalled to body',modal.includes('createPortal(')&&modal.includes('document.body'));
check('native focus containment',modal.includes('dialog.showModal()'));
check('dialog uses unique accessible name',modal.includes('useId()')&&modal.includes('aria-labelledby={done ? successId : titleId}'));
check('dialog scroll and focus reset',modal.includes('panelRef.current.scrollTop = 0')&&modal.includes('focus({ preventScroll: true })'));
check('dialog personal data masked',modal.includes('data-clarity-mask="true"'));
check('same enquiry API',modal.includes('fetch("/api/inquiry"'));
check('recommendation-only privacy preserved',modal.replace(/\s+/g, ' ').includes('We do not send your contact details, project information or attachments to the providers we recommend.'));
check('no obsolete handoff copy',!modal.includes('direct introduction')&&!modal.includes('T3 Labs'));
check('form errors announced',modal.includes('role="alert"'));
const confirm=text('src/components/ui/ConfirmationDialog.tsx');
check('restart confirmation uses native dialog',confirm.includes('dialog.showModal()')&&confirm.includes('cancelRef.current?.focus'));
for(const [file,context] of [
 ['src/app/systems/school-bell-announcements/page.tsx','school_bell_announcements'],
 ['src/app/systems/ip-paging-pa/page.tsx','ip_paging_pa'],
 ['src/app/systems/ip-intercom/page.tsx','ip_intercom'],
 ['src/app/systems/traditional-vs-ip/page.tsx','traditional_vs_ip'],
 ['src/app/guides/ip-paging-network-readiness/page.tsx','network_readiness'],
 ['src/app/guides/school-pa-specification-checklist/page.tsx','school_specification'],
 ['src/app/guides/nz-school-pa-paging-requirements/page.tsx','school_requirements'],
 ['src/app/funding/page.tsx','funding_guide'],
 ['src/app/financing/page.tsx','financing_guide'],
 ['src/app/pricing/page.tsx','pricing_guide'],
])check(`${file}: contextual help`,text(file).includes(context));
for(const file of ['src/app/privacy/page.tsx','src/app/about/disclosure/page.tsx','src/app/about/editorial-policy/page.tsx','src/app/about/methodology/page.tsx'])check(`${file}: no forced body sales panel`,!text(file).includes('ProjectHelpPanel'));
check('pricing intro hidden on result only',text('src/components/pricing/PricingTool.tsx').includes('{step !== 3 && introduction}'));
check('pricing result has one main result title',text('src/components/pricing/ResultView.tsx').includes('<h1 tabIndex={-1} className="sc-tool-title outline-none">Your ballpark installed price</h1>'));
check('finance result uses tool title',text('src/app/tools/finance-check/FinanceCheckTool.tsx').includes('<h1 tabIndex={-1} className="sc-tool-title mt-4 outline-none">{result.headline}</h1>'));
check('funding intro is supplied to interactive shell',text('src/app/tools/funding-check/page.tsx').includes('<FundingCheckTool introduction={'));
check('design authority documented',existsSync(join(root,'docs/design/SMARTCOMMS_DESIGN_UX_STANDARD.md')));
check('homepage styles do not collide with shared actions',!/(^|[\s},])\.sc-actions\s*\{/.test(text('src/app/smartcomms-hero.css')));
console.log(`\nDesign/UX structural checks: ${checks} passed. Browser and full Next.js checks are separate release gates.`);
