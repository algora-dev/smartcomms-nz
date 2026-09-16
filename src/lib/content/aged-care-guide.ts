/**
 * Evidence-led editorial data for the aged-care guide.
 * Source check: 2026-09-16. Publication/review dates belong in content-meta.ts.
 * Ordered shortlists describe the stated brief, not tested performance scores.
 */
export const AGED_CARE_PATH = "/industries/aged-care-retirement-villages";
export const AGED_CARE_TITLE = "Aged Care & Retirement Village PA & Intercom Systems NZ";
export const AGED_CARE_HEADLINE = "PA, paging and intercom systems for aged care and retirement villages";
export const AGED_CARE_DESCRIPTION =
  "Compare PA, IP paging and intercom systems for NZ rest homes and retirement villages. Explore costs, finance, entrance calling and quiet staff communication.";

export const careSources = {
  "axis-edge": { label: "AXIS Audio Manager Edge — manufacturer manual", href: "https://help.axis.com/en-us/axis-audio-manager-edge", kind: "Technical documentation" },
  "axis-console": { label: "AXIS C6110 — paging console and two-way communication", href: "https://www.axis.com/products/axis-c6110", kind: "Manufacturer" },
  "axis-bridge": { label: "AXIS C8110 — analogue audio bridge", href: "https://www.axis.com/products/axis-c8110", kind: "Manufacturer" },
  "axis-entry": { label: "AXIS I8116-E — network video intercom", href: "https://www.axis.com/products/axis-i8116-e", kind: "Manufacturer" },
  "axis-nz": { label: "JD Security NZ — Axis network-audio management", href: "https://www.jdsecurity.co.nz/axis/axis-ip-audio/axis-audio-manager-edge/", kind: "NZ integrator information" },
  "2n-entry": { label: "2N IP Verso 2.0 — modular entrance intercom", href: "https://www.2n.com/en-GB/products/intercoms/2n-ip-verso-2/", kind: "Manufacturer" },
  "2n-case": { label: "2N — Villa Melitta retirement/rehabilitation complex, Italy", href: "https://www.2n.com/en-GB/success-stories/2n-technology-protects-a-new-healthcare-complex-in-bolzano-italy/", kind: "Overseas manufacturer-published case study" },
  "2n-nz": { label: "Sektor NZ — IP Verso 2.0 product listing", href: "https://www.sektor.co.nz/Product/SEAX02907001", kind: "NZ product listing" },
  "2n-legacy": { label: "2N — Net Audio Systems in discontinued-product support", href: "https://www.2n.com/en-GB/support/discontinued/2n-net-audio-systems/", kind: "Manufacturer lifecycle information" },
  "algo-adapter": { label: "Algo 8301 — paging adapter and scheduler", href: "https://www.algosolutions.com/product/8301-ip-paging-adapter-scheduler/", kind: "Manufacturer" },
  "algo-speaker": { label: "Algo 8188 — IP ceiling speaker", href: "https://www.algosolutions.com/product/8188-ip-ceiling-speaker/", kind: "Manufacturer" },
  "algo-nz": { label: "Everlea NZ — Algo 8301", href: "https://www.everlea.co.nz/ip-paging-solutions/voip-paging/algo-8301-paging-adapter-and-scheduler/", kind: "NZ supply information" },
  "toa-intercom": { label: "TOA N-8000 — dedicated IP intercom family", href: "https://www.toa.co.uk/products/intercom-systems/n-8000-series/", kind: "Manufacturer" },
  "toa-gateway": { label: "TOA IP-A1PG — paging gateway and web scheduler", href: "https://www.toa.co.uk/products/ip-a1pg/", kind: "Manufacturer" },
  "toa-interface": { label: "TOA IP-A1AF — audio interface", href: "https://www.toa.co.uk/products/ip-a1af/", kind: "Manufacturer" },
  "toa-nz": { label: "Australis Music NZ — TOA", href: "https://www.australismusic.co.nz/brands/toa", kind: "NZ brand/channel information" },
  "spon-control": { label: "SPON XC-9000 — audio management software", href: "https://sponcomm.com/products/audio-management-software", kind: "Manufacturer" },
  "spon-health": { label: "SPON — healthcare communications solution", href: "https://sponcomm.com/solution-detail/hospital", kind: "Manufacturer solution description; not clinical certification" },
  "spon-nz": { label: "Sound Choice Pro Audio NZ — SPON products", href: "https://www.scpaudio.co.nz/brand/spon/", kind: "NZ supply information" },
  "itc-system": { label: "itc — 78-series system at a Cape Verde resort", href: "https://www.itctech.com.cn/case/index/art/1914.html", kind: "Overseas manufacturer architecture example; not a care installation" },
  "itc-nz": { label: "Sound Choice Pro Audio NZ — T-7800A / Luna server", href: "https://www.scpaudio.co.nz/shop/commercial/t-7800a-ip-intercom-pa-system-server/", kind: "NZ product listing; current revision needs confirmation" },
  "frontrow-system": { label: "FrontRow Conductor — campus communications", href: "https://www.gofrontrow.com/products/conductor/", kind: "Manufacturer" },
  "frontrow-nz": { label: "Pacific AV — FrontRow and NZ school projects", href: "https://www.pacificav.co.nz/brands/frontrow/", kind: "NZ education evidence; not a care-sector installation claim" },
  "prospero-system": { label: "Keenfinity Australia & NZ — Bosch PROSPERO IP PA", href: "https://www.keenfinity-group.com/au/en/solutions/public-address-solutions/public-address-and-voice-alarm-systems/prospero/", kind: "Manufacturer" },
  "prospero-nz": { label: "Pacific AV NZ — Bosch PROSPERO", href: "https://www.pacificav.co.nz/product/bosch-prospero-ip-based-paging-and-bell-system/", kind: "NZ integrator/product information" },
  "atlas-system": { label: "AtlasIED GLOBALCOM — announcement platform", href: "https://www.atlasied.com/ip108-sp", kind: "Manufacturer" },
  "atlas-nz": { label: "NAS — AtlasIED distribution in Australia and NZ", href: "https://nz.nas.solutions/atlas-ied-now-distributed-by-nas", kind: "NZ distribution information" },
  "praesensa": { label: "Keenfinity — PRAESENSA supervised loudspeaker-line retrofit", href: "https://www.keenfinity-group.com/xc/en/news/product-news/pra-eob-end-of-branch-device/", kind: "Manufacturer" },
  "summerset": { label: "Summerset — Levin memory-care design, 7 September 2017", href: "https://www.summerset.co.nz/about-us/news/summerset-wins-national-award-for-innovative-memory-care/", kind: "Historical NZ operator account" },
  "rictech": { label: "Rictech NZ — dedicated nurse-call systems", href: "https://www.rictech.nz/nurse-call-systems", kind: "NZ specialist manufacturer" },
  "rauland": { label: "Rauland NZ — Pinpoint aged-care communications", href: "https://rauland.co.nz/pinpoint/aged-care/", kind: "NZ specialist supplier" },
  "finance-market": { label: "eLeasing NZ — equipment-finance sectors and structures", href: "https://www.eleasing.co.nz/", kind: "Finance-provider market example; no SmartComms partnership implied" },
  "care-scope": { label: "Health New Zealand — residential care and retirement-village distinction", href: "https://www.healthnz.govt.nz/hospitals-services/services-support/older-people/residential-care", kind: "Public health-service information" },
} as const;
export type CareSourceId = keyof typeof careSources;
export type CarePlatformId = "axis" | "2n" | "algo" | "toa" | "spon" | "prospero" | "itc" | "frontrow";

type CarePlatform = {
  id: CarePlatformId; name: string; family: string; fit: string;
  summary: string; caution: string; quote: string; nz: string;
  sources: readonly CareSourceId[]; nzSources: readonly CareSourceId[];
};
export const carePlatforms: readonly CarePlatform[] = [
  {
    id: "axis", name: "Axis", family: "Audio Manager Edge, C6110 and compatible network audio / intercom",
    fit: "First look for reception-led network audio with security integration",
    summary: "Edge puts zoning, schedules and health monitoring in compatible audio devices. Add a C6110 console for reception paging and supported two-way calls; assess an I8116-E separately where visitor video is required. This is our preferred starting point when straightforward administration and an existing Axis environment matter together.",
    caution: "Edge’s documented limit is 200 devices and 20 zones. A building, a speaker and a management zone are different things. Larger estates need the appropriate management design; calling requires compatible, correctly configured endpoints.",
    quote: "Edge-compatible indoor/outdoor speakers; C6110 where needed; C8110 plus a suitable amplifier for retained analogue circuits. Price entrance hardware and door-control work separately.",
    nz: "JD Security’s NZ site documents the audio-management platform. This is evidence of a local integration route, not a measured share of the aged-care market.",
    sources: ["axis-edge", "axis-console", "axis-bridge", "axis-entry"], nzSources: ["axis-nz"],
  },
  {
    id: "2n", name: "2N", family: "IP Verso 2.0 and the chosen receiving / access-control system",
    fit: "First look for entrance, gate and visitor intercom",
    summary: "IP Verso 2.0 is a strong entrance-first option: a modular video intercom with configurable access functions. It makes sense where the main job is seeing a visitor, speaking to them and managing entry—not broadcasting to the whole village.",
    caution: "A door intercom is not a site-wide PA system. Keep current entrance products separate from legacy Net Audio, which 2N places in discontinued-product support. Specify the receiving devices and calling service, not just the door panel.",
    quote: "IP Verso 2.0, required reader/button modules, reception or resident receiving arrangement, door hardware and any licences. Confirm accessibility and after-hours call routing.",
    nz: "Sektor NZ lists IP Verso 2.0. The manufacturer also publishes an Italian retirement/rehabilitation project; that is useful workflow evidence, not proof of the same installation or product revision in NZ.",
    sources: ["2n-entry", "2n-legacy"], nzSources: ["2n-nz", "2n-case"],
  },
  {
    id: "algo", name: "Algo", family: "8301 adapter / scheduler and compatible SIP endpoints",
    fit: "First look for SIP paging and retaining a working PA",
    summary: "The 8301 connects IP paging and scheduling to a compatible analogue amplifier. It is an especially practical starting point when the village already has SIP telephony or useful speaker infrastructure. Selected endpoints, including the 8188 ceiling speaker, add two-way audio where required.",
    caution: "The adapter does not turn one shared speaker circuit into individually addressable rooms. General talkback also does not supply a clinical call-response workflow. Design reception controls and any room-call accessories as part of the package.",
    quote: "8301, retained amplifier interfaces and suitable indoor/outdoor endpoints. Include compatible calling accessories, management, mounting and any telephony work.",
    nz: "Everlea NZ publishes the 8301 and its paging/scheduling role. Ask the proposed provider to confirm support for the whole design rather than just the adapter.",
    sources: ["algo-adapter", "algo-speaker"], nzSources: ["algo-nz"],
  },
  {
    id: "toa", name: "TOA", family: "N-8000 intercom; IP-A1 network PA where appropriate",
    fit: "First look for a dedicated staff-intercom brief",
    summary: "N-8000 is a dedicated intercom family with calling and paging. It merits particular attention when station-to-station audio is the central requirement. For a different, SIP-first PA design, IP-A1 provides gateways and interfaces; the IP-A1PG adds web scheduling.",
    caution: "These are distinct TOA architectures, not features included with every speaker. An audio-only N-8000 door station is not a like-for-like replacement for a video-entry system. Integration between families must be designed.",
    quote: "For intercom, specify compatible N-8000 master and door/substations. For network PA, assess IP-A1PG and IP-A1AF with the required speakers/amplifiers. Do not add an exchange to a quote merely because it shares the brand.",
    nz: "Australis Music’s NZ site lists TOA. Confirm local availability and support for the exact N-8000 or IP-A1 parts in the proposal.",
    sources: ["toa-intercom", "toa-gateway", "toa-interface"], nzSources: ["toa-nz"],
  },
  {
    id: "spon", name: "SPON", family: "XC-9000-managed IP PA and compatible intercom endpoints",
    fit: "First look for integrated PA and general two-way communication",
    summary: "SPON remains a strong choice when one managed environment needs to cover zoned announcements, scheduled audio, general intercom and integration. XC-9000 is the relevant management package here; the manufacturer’s healthcare material demonstrates the intended communications scope.",
    caution: "A healthcare solution description is not evidence of a compliant nurse-call installation. Specify compatible endpoint generations, licensing and a staff demonstration. Public evidence does not establish a universal NZ cost or reliability lead.",
    quote: "XC-9000 licence and required host/controller, compatible indoor/outdoor endpoints, separately specified intercom locations and analogue interfaces. Do not assume every SPON speaker includes a microphone.",
    nz: "Sound Choice Pro Audio NZ lists SPON equipment. A local catalogue helps identify a supply route; it does not prove stock, installed care-sector share or compatibility between every model.",
    sources: ["spon-control", "spon-health"], nzSources: ["spon-nz"],
  },
  {
    id: "prospero", name: "Bosch PROSPERO", family: "PROSPERO software, PRP-CST and audio / amplifier interfaces",
    fit: "Worth quoting for managed common-area announcements",
    summary: "PROSPERO is not only a school-bell platform. Current ANZ manufacturer material also positions it for medium-sized commercial sites, with browser/server control, scheduled tasks, paging and amplifier interfaces. That gives it a credible role in shared lounges, reception and other common areas.",
    caution: "School-specific features do not determine care suitability. The call station’s zone-monitoring speaker is not proof of room talkback. Establish any two-way requirement separately, and do not infer certified evacuation suitability from an emergency button.",
    quote: "System software and host, PRP-CST paging station, required audio/control interfaces, suitable amplifiers and speakers. PROSPERO and PRAESENSA are different systems.",
    nz: "Pacific AV publishes a NZ PROSPERO product page. Check the current locally supplied package and support arrangements.",
    sources: ["prospero-system"], nzSources: ["prospero-nz"],
  },
  {
    id: "itc", name: "ITC", family: "NZ-listed T-7800A / Luna and compatible 78-series equipment",
    fit: "A conditional IP / amplifier-hybrid alternative",
    summary: "The documented 78-series approach combines a central server, IP endpoints and network amplifiers feeding passive speakers. That can be relevant to a mixed site with some existing PA and some new areas. The NZ T-7800A / Luna listing describes scheduling and intercom functions.",
    caution: "Confirm the current supported generation before specifying it. The manufacturer example reviewed is a Cape Verde resort, not a care facility. Do not transfer SIP, PoE or clinical claims from unrelated ITC families.",
    quote: "The supplier-confirmed server/software, compatible endpoints, network amplifiers and explicitly demonstrated two-way locations. Request current firmware and replacement arrangements.",
    nz: "Sound Choice Pro Audio NZ publishes the T-7800A listing. Its existence is not a lifecycle or stock guarantee.",
    sources: ["itc-system"], nzSources: ["itc-nz"],
  },
  {
    id: "frontrow", name: "FrontRow", family: "Conductor with compatible classroom / room-audio systems",
    fit: "Conditional fit where its room-audio ecosystem is already useful",
    summary: "Conductor combines campus paging, schedules and intercom with compatible room audio. It remains worth assessing where FrontRow is already installed or a training/activity-room audio requirement is important alongside announcements.",
    caution: "We would not make a classroom-led ecosystem the default starting point for a new care-only brief. That is a fit judgement, not a claim that FrontRow cannot work here. Compare the required functions rather than buying classroom features by default.",
    quote: "Conductor control and licences, supported room interfaces and any amplifier connections. Identify exactly which classroom-audio functions the care project actually needs.",
    nz: "Pacific AV documents FrontRow and named NZ schools. Those references establish local education experience, not an aged-care installation record.",
    sources: ["frontrow-system"], nzSources: ["frontrow-nz"],
  },
];

export type CareUseCase = {
  id: string; title: string; brief: string;
  choices: readonly { platform: CarePlatformId; reason: string }[];
  changes: string; sources: readonly CareSourceId[];
};
export const careUseCases: readonly CareUseCase[] = [
  {
    id: "reception-paging", title: "Reception-led PA and common-area announcements",
    brief: "Prioritise simple zoning, schedules and day-to-day administration; include an existing Axis environment where relevant.",
    choices: [
      { platform: "axis", reason: "Built-in Edge management and a dedicated paging-console option." },
      { platform: "prospero", reason: "A browser-managed PA design with scheduled tasks and amplifier interfaces." },
      { platform: "spon", reason: "Central management with room to add broader communications functions." },
    ],
    changes: "SPON moves up when general intercom is central. Algo deserves a first quote when existing SIP and PA reuse dominate the brief.",
    sources: ["axis-edge", "axis-console", "prospero-system", "spon-control"],
  },
  {
    id: "entrance-intercom", title: "Entrance, gate and visitor intercom",
    brief: "Prioritise visitor communication and a defined reception/resident answering path, rather than whole-site broadcasting.",
    choices: [
      { platform: "2n", reason: "Modular IP Verso 2.0 suits an entrance/access-led design." },
      { platform: "axis", reason: "I8116-E is a video-intercom option, especially within an Axis design." },
      { platform: "toa", reason: "N-8000 is an audio-only alternative where video is not required." },
    ],
    changes: "For mandatory visitor video, compare the first two; do not score an audio-only station as equivalent. Price doors, locks and receiving devices separately.",
    sources: ["2n-entry", "axis-entry", "toa-intercom"],
  },
  {
    id: "retain-pa", title: "Keep existing PA and connect SIP paging",
    brief: "Prioritise suitable existing amplifiers/speaker lines and a staged migration, not replacement for its own sake.",
    choices: [
      { platform: "algo", reason: "8301 combines an analogue-PA interface with scheduling." },
      { platform: "axis", reason: "C8110 bridges analogue audio into an Axis network-audio design." },
      { platform: "toa", reason: "IP-A1 interfaces and the IP-A1PG scheduler offer another design route." },
    ],
    changes: "Existing equipment, required zones and the installer’s proven interface design can reverse this order. A shared analogue circuit still serves its existing group of speakers.",
    sources: ["algo-adapter", "axis-bridge", "toa-interface", "toa-gateway"],
  },
  {
    id: "integrated-communication", title: "Integrated PA plus general room intercom",
    brief: "Prioritise centrally managed announcements, schedules and non-clinical two-way calling within one proposed system.",
    choices: [
      { platform: "spon", reason: "XC-9000 brings general paging and intercom into a managed package." },
      { platform: "toa", reason: "N-8000 combines a dedicated intercom approach with paging." },
      { platform: "axis", reason: "C6110 supports two-way communication with compatible endpoints." },
    ],
    changes: "TOA moves first when dedicated staff-to-staff stations are the dominant requirement. None is being ranked here as a clinical nurse-call system.",
    sources: ["spon-control", "spon-health", "toa-intercom", "axis-console"],
  },
];

type CareQuestion = { id: string; question: string; answer: string; sources: readonly CareSourceId[] };
export const careQuestions: readonly CareQuestion[] = [
  {
    id: "best-system", question: "Which PA or intercom system is best for a retirement village?",
    answer: "Start with the job: our first look is Axis for reception-led network audio, 2N for an entrance-first brief, Algo for SIP/PA reuse and SPON for integrated PA with general intercom. TOA moves up for dedicated audio stations. These are conditional editorial recommendations, not a claim that one brand wins every village design.",
    sources: ["axis-edge", "2n-entry", "algo-adapter", "spon-control", "toa-intercom"],
  },
  {
    id: "paging-nurse-call", question: "Is an aged-care paging system the same as nurse call?",
    answer: "No. Paging can mean announcements over loudspeakers or private messages to staff devices. Nurse call is a separately specified resident/staff response system, potentially including call points, pendants, alert routing and escalation. Rictech and Rauland publish NZ specialist examples. A PA speaker with a microphone is not automatically an equivalent replacement.",
    sources: ["rictech", "rauland"],
  },
  {
    id: "rest-home-quiet", question: "Can rest-home announcements be limited to certain wings or times?",
    answer: "Zoned paging and scheduling are available in the compared PA families, but the design must include the required grouping and priority rules. Specify which lounges, staff areas, corridors or outdoor areas should receive each routine message. Agree quiet hours and separately test how authorised urgent messages behave.",
    sources: ["axis-edge", "algo-adapter", "spon-control"],
  },
  {
    id: "keep-speakers", question: "Can we keep our existing 100V speakers and upgrade the controls?",
    answer: "Potentially. Interfaces such as Algo 8301 and Axis C8110 connect to suitable analogue audio equipment. Have the installer check the amplifier, wiring, load, condition and coverage. An interface normally feeds an amplifier; it does not directly power a 100V speaker line or create individual-room control within one shared circuit.",
    sources: ["algo-adapter", "axis-bridge"],
  },
  {
    id: "wireless", question: "Does IP paging mean wireless or Wi-Fi speakers?",
    answer: "No. IP describes network communication; many of the compared endpoints use wired Ethernet and Power over Ethernet. Wireless nurse-call equipment is a different design choice. Identify the real cable, switch and power requirements rather than assuming that an IP upgrade needs no wiring.",
    sources: ["algo-speaker", "axis-console", "rictech"],
  },
  {
    id: "room-talkback", question: "Can residents or staff speak back through a room speaker?",
    answer: "Only where the selected endpoint and control system support two-way audio. Specify the microphone, call button, answering location and privacy controls. Distinguish an optional general intercom from a resident’s care-assistance call point; the latter needs its own response-system requirements.",
    sources: ["algo-speaker", "axis-console", "rictech"],
  },
  {
    id: "cost-question", question: "How much does a retirement-village PA or intercom upgrade cost?",
    answer: "Use the SmartComms calculator for an indicative general PA/intercom range based on areas, infrastructure and optional calling. There is no single per-bed price. The worked example on this page uses the same calculator, not a brand quote. Clinical nurse call, extensive door/access work and certified evacuation systems need separate scopes and quotes.",
    sources: [],
  },
  {
    id: "leasing-question", question: "Can a rest home or retirement village finance or lease a PA system?",
    answer: "Equipment finance may be worth discussing. NZ providers advertise technology, AV and healthcare equipment-finance services, but the organisation, asset and transaction still need provider assessment. Ask whether installation is included and what ownership, return or purchase terms apply; a lease does not automatically become lease-to-own.",
    sources: ["finance-market"],
  },
  {
    id: "installer-question", question: "How do we find a suitable installer or service provider in New Zealand?",
    answer: "Ask for relevant project experience, exact product support, a coverage design and a demonstration of staff tasks. SmartComms can review your enquiry and reply with suggested providers’ public contact details. Our selected network is not the entire market, and we do not send your enquiry to the providers we recommend.",
    sources: [],
  },
];
