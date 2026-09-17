/**
 * Evidence-led editorial data for the aged-care guide.
 * Source check: 2026-09-16. Publication/review dates belong in content-meta.ts.
 * Ordered shortlists describe the stated brief, not tested performance scores.
 */
export const AGED_CARE_PATH = "/industries/aged-care-retirement-villages";
export const AGED_CARE_TITLE = "Aged Care & Retirement Village PA, Paging & Intercom Systems NZ";
export const AGED_CARE_HEADLINE = "PA, paging and intercom systems for aged care and retirement villages";
export const AGED_CARE_DESCRIPTION =
  "Compare PA, IP paging, announcement and intercom systems for NZ rest homes and retirement villages, including visitor video, existing-PA reuse, indicative pricing and finance options.";

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
  "spon-audio-intercom": { label: "SPON NAS-8523C/D — IP PoE audio intercom panel", href: "https://sponcomm.com/products/ip-poe-intercom-panel", kind: "Manufacturer" },
  "spon-nz-audio-intercom": { label: "Sound Choice Pro Audio NZ — NAS-8523D intercom listing", href: "https://www.scpaudio.co.nz/shop/ip-paging/intercoms/nas-8523d/", kind: "NZ product listing" },
  "spon-video-intercom": { label: "SPON NAS-8523CV/DV — indoor IP video intercom panel", href: "https://sponcomm.com/products/ip-video-intercom-panel", kind: "Manufacturer" },
  "spon-nz-video": { label: "Sound Choice Pro Audio NZ — NAS-8523CV video intercom listing", href: "https://www.scpaudio.co.nz/shop/ip-paging/intercoms/nas-8523cv/", kind: "NZ product listing" },
  "spon-outdoor-video": { label: "SPON XC-9137AV — network outdoor video intercom family", href: "https://sponcomm.com/products/network-outdoor-video-intercom", kind: "Manufacturer" },
  "spon-nz-outdoor-video": { label: "Sound Choice Pro Audio NZ — XC-9137AV outdoor video intercom listing", href: "https://www.scpaudio.co.nz/shop/ip-paging/intercoms/xc-9137av/", kind: "NZ product listing" },
  "spon-video-master": { label: "SPON XC-9037NV — network video intercom master station", href: "https://sponcomm.com/products/network-video-intercom-station", kind: "Manufacturer" },
  "spon-nz-master": { label: "Sound Choice Pro Audio NZ — XC-9037N audio master station listing", href: "https://www.scpaudio.co.nz/shop/ip-paging/intercoms/xc-9037n/", kind: "NZ product listing (audio master; video master confirmed via manufacturer source)" },
  "spon-help-point": { label: "SPON XC-9242V — network emergency call box / help point", href: "https://sponcomm.com/products/network-emergency-call-box", kind: "Manufacturer" },
  "spon-two-way-speaker": { label: "SPON GEN-6212A01 — microphone-equipped network speaker, NZ listing", href: "https://www.scpaudio.co.nz/shop/ip-paging/speakers-ip-speaker/gen-6212a01/", kind: "NZ product listing" },
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
  "gs-summerset-st-johns": {
    label: "G&S Technologies — Summerset St Johns project account",
    href: "https://gstechnologies.co.nz/case-studies/summerset-st-johns/",
    kind: "NZ contractor-published project account; publication date not stated",
  },
} as const;
export type CareSourceId = keyof typeof careSources;
export type CarePlatformId = "axis" | "2n" | "algo" | "toa" | "spon" | "prospero" | "itc" | "frontrow";

/**
 * One source of truth for the shortlist table, capability table and profile
 * cards. Capability cells describe how the relevant current family delivers
 * the function; they are not whole-brand scores.
 */
type CarePlatform = {
  id: CarePlatformId;
  name: string;
  family: string;
  category: string;
  fit: string;
  verdict: string;
  summary: string;
  paging: string;
  intercom: string;
  visitor: string;
  integration: string;
  value: string;
  costWatch: string;
  strengths: readonly string[];
  tradeoffs: readonly string[];
  core: string;
  audio: string;
  call: string;
  entrance: string;
  nz: string;
  sources: readonly CareSourceId[];
  nzSources: readonly CareSourceId[];
};

export const carePlatforms: readonly CarePlatform[] = [
  {
    id: "axis",
    name: "Axis",
    family: "Audio Manager Edge, C6110 and compatible network audio / intercom",
    category: "Browser-managed network audio",
    fit: "Strong first look for browser-managed audio, two-way console operation and security convergence",
    verdict: "A leading starting point when straightforward browser administration, paging consoles and an existing Axis security/access environment matter together.",
    summary: "Edge puts zoning, schedules and health monitoring inside compatible audio devices, with browser-based administration. The C6110 console adds reception paging and supported two-way communication; the I8116-E extends the family to visitor video at entrances, and the C8110 bridges retained analogue audio into the design.",
    paging: "Built-in Edge zones, schedules and health monitoring; browser-managed without a separate server for the Edge tier.",
    intercom: "C6110 console with compatible microphone-equipped endpoints; two-way paths must be designed.",
    visitor: "I8116-E network video intercom within the same ecosystem.",
    integration: "SIP/multicast plus the Axis camera/access ecosystem; C8110 bridges analogue audio.",
    value: "Included Edge management and reuse of an existing Axis environment can reduce extra system components.",
    costWatch: "Price the actual speaker mix, console, entrance hardware and any larger-site management tier separately.",
    strengths: [
      "Well-documented browser workflow for zones, schedules and health checks is a useful administration benchmark.",
      "Network audio, paging console, video intercom and security/access integration can be designed as one environment.",
      "C8110 bridging allows suitable retained analogue speaker circuits to be reused in a staged design.",
    ],
    tradeoffs: [
      "Edge's documented 200-device / 20-zone limit is about management zones, not speakers; larger estates need the appropriate management design first.",
      "Day-to-day simplicity is not a substitute for demonstrating term changes, calling and outage behaviour on the proposed configuration.",
      "Entrance video and door-control work are separate purchases that need their own quoting discipline.",
    ],
    core: "Edge on compatible devices; C6110 console where reception paging/calling is required.",
    audio: "Selected indoor/outdoor Axis speakers; C8110 plus a suitable amplifier for retained 100V lines.",
    call: "C6110 with compatible two-way endpoints, configured and demonstrated.",
    entrance: "I8116-E network video intercom with door-release and receiving arrangement designed explicitly.",
    nz: "JD Security's NZ site documents the audio-management platform. This is evidence of a local integration route, not a measured share of the aged-care market.",
    sources: ["axis-edge", "axis-console", "axis-bridge", "axis-entry"],
    nzSources: ["axis-nz"],
  },
  {
    id: "2n",
    name: "2N",
    family: "IP Verso 2.0 and the chosen receiving / access-control system",
    category: "Entrance and access intercom",
    fit: "Strongest fit for an entrance, gate and visitor-access-led brief",
    verdict: "The specialist starting point when modular entrance hardware, visitor video and access-control workflows dominate the project.",
    summary: "IP Verso 2.0 is a modular video intercom with configurable access functions. It makes sense where the main job is seeing a visitor, speaking to them and managing entry, not broadcasting to the whole village. Specify the receiving arrangement and after-hours routing as part of the design.",
    paging: "Not a current whole-site PA/scheduler assumption; legacy Net Audio is in discontinued-product support.",
    intercom: "Entrance-led full-duplex audio/video communication with configured receiving devices.",
    visitor: "Core strength: modular entrance panels with camera, buttons and access modules.",
    integration: "SIP-based integration with chosen telephony/access-control ecosystems.",
    value: "Deep entrance/access specialisation rather than broad paging coverage.",
    costWatch: "Price modules, door hardware, receiving stations, licences and any access-control integration, not just the door panel.",
    strengths: [
      "Specialist modular entrance/access proposition with current NZ-facing product listings.",
      "Manufacturer-published healthcare-complex case study provides workflow evidence (overseas; not an NZ installation claim).",
      "Clear separation between current products and discontinued Net Audio simplifies lifecycle discussions.",
    ],
    tradeoffs: [
      "A door intercom is not a site-wide PA system; paging must come from a different design.",
      "Keep current entrance products separate from legacy Net Audio, which 2N places in discontinued-product support.",
      "The Italian retirement/rehabilitation case study is workflow evidence, not proof of the same revision or installation in NZ.",
    ],
    core: "IP Verso 2.0 with the required reader/button/camera modules.",
    audio: "Not a paging platform; use alongside a PA design where announcements are needed.",
    call: "Configured receiving arrangement: reception station, resident handset/app workflow or answering service.",
    entrance: "Core of the design; include door hardware, accessibility and after-hours routing.",
    nz: "Sektor NZ lists IP Verso 2.0. The manufacturer also publishes an Italian retirement/rehabilitation project; that is useful workflow evidence, not proof of the same installation or product revision in NZ.",
    sources: ["2n-entry", "2n-legacy"],
    nzSources: ["2n-nz", "2n-case"],
  },
  {
    id: "algo",
    name: "Algo",
    family: "8301 adapter / scheduler and compatible SIP endpoints",
    category: "SIP-first and hybrid migration",
    fit: "Strongest fit for SIP-first migration and retaining a working PA",
    verdict: "The cleanest first starting point when existing SIP telephony or useful analogue PA infrastructure should be retained.",
    summary: "The 8301 connects IP paging and scheduling to a compatible analogue amplifier and provides local scheduling without a cloud dependency. Selected endpoints, including the 8188 ceiling speaker with its accessory call button options, add two-way audio where required.",
    paging: "8301 built-in scheduler plus SIP/multicast paging; does not require SIP registration for schedules.",
    intercom: "Selected two-way endpoints (e.g. 8188 with compatible call accessories); not a dedicated intercom architecture.",
    visitor: "Not primarily an access/video-intercom ecosystem.",
    integration: "SIP and multicast; strong analogue-amplifier reuse story.",
    value: "Can retain existing PA infrastructure and avoid a large central server for basic scheduled paging.",
    costWatch: "Include call accessories, mounting, any console and optional management licences.",
    strengths: [
      "The 8301 is both a bell/announcement scheduler and a migration interface for existing amplifiers.",
      "Staged migration: new IP areas and retained analogue circuits can be considered together.",
      "Straightforward provisioning story with NZ-facing supply and configuration training evidence.",
    ],
    tradeoffs: [
      "A gateway cannot give individual-room control to speakers sharing one undivided analogue circuit.",
      "General talkback endpoints do not supply a clinical call-response workflow.",
      "The complete staff workflow across scheduler, telephony and accessories still needs designing.",
    ],
    core: "8301 scheduler/adapter; add console and management only where the brief requires them.",
    audio: "8188 indoor PoE speaker, suitable outdoor horn and the retained amplifier interface.",
    call: "8188 talkback with compatible call accessories, or a separate dedicated intercom design.",
    entrance: "Confirm exact package; not an entrance-specialist ecosystem.",
    nz: "Everlea NZ publishes the 8301 and its paging/scheduling role. Ask the proposed provider to confirm support for the whole design rather than just the adapter.",
    sources: ["algo-adapter", "algo-speaker"],
    nzSources: ["algo-nz"],
  },
  {
    id: "toa",
    name: "TOA",
    family: "N-8000 intercom; IP-A1 network PA where appropriate",
    category: "Dedicated audio intercom and network PA",
    fit: "Strong fit where dedicated audio intercom architecture is central",
    verdict: "Particularly relevant when station-to-station audio intercom is the core requirement, with credible network-PA families alongside.",
    summary: "N-8000 is a dedicated intercom family with calling and paging. It merits attention when staff/room audio stations are the central requirement. For a SIP-first PA design, IP-A1 provides gateways and interfaces; the IP-A1PG adds web scheduling. The families are distinct architectures that must be designed deliberately.",
    paging: "IP-A1PG web scheduling and SIP/multicast paging; interface options for passive speakers.",
    intercom: "Core strength: dedicated N-8000 master/sub-station audio intercom architecture.",
    visitor: "Audio-only door stations; visitor video is less central in the cited family.",
    integration: "Good interface/gateway options for mixed and hybrid designs.",
    value: "Mature dedicated-audio-intercom depth without needing a video-led ecosystem.",
    costWatch: "Do not price an N-8000 exchange or voice-alarm rack as mandatory for a simpler IP-A1 design, or vice versa.",
    strengths: [
      "Dedicated intercom requirements can be assessed against a purpose-built station architecture.",
      "IP-A1PG adds a documented scheduler with browser scheduling.",
      "Interfaces and amplifiers support genuinely hybrid site designs.",
    ],
    tradeoffs: [
      "An audio-only N-8000 door station is not a like-for-like replacement for a video-entry system.",
      "Interoperability and limits need checking for the specific combination of families and endpoints.",
      "Confirm NZ supply and support for the exact parts in the proposal.",
    ],
    core: "IP-A1PG for IP-A1 scheduling designs, or an N-8000 exchange for dedicated intercom designs.",
    audio: "IP-A1 speakers/horns and interface-fed amplifiers for passive zones.",
    call: "N-8000 master and sub-stations designed for staff/room communication.",
    entrance: "Audio-only door stations where video is not required.",
    nz: "Australis Music's NZ site lists TOA. Confirm local availability and support for the exact N-8000 or IP-A1 parts in the proposal.",
    sources: ["toa-intercom", "toa-gateway", "toa-interface"],
    nzSources: ["toa-nz"],
  },
  {
    id: "spon",
    name: "SPON",
    family: "XC-9000 / current SPON IP PA, audio intercom and video intercom ecosystem",
    category: "Integrated PA + intercom platform",
    fit: "Strongest fit where one managed ecosystem needs to cover paging plus several forms of general intercom",
    verdict: "One of the strongest integrated-platform options for a mixed aged-care / retirement-village brief: site-wide PA, scheduled and zoned paging, two-way audio intercom, indoor/outdoor video intercom, reception master stations and public help-point communication within a wider managed ecosystem.",
    summary: "SPON deserves a stronger aged-care position than a paging-only comparison suggests. Its current family includes centrally managed PA and scheduling (XC-9000), microphone-equipped IP speakers, full-duplex audio intercom panels (NAS-8523C/D), indoor and outdoor video intercoms (NAS-8523CV/DV, XC-9137AV), reception/master stations (XC-9037NV/N) and public help/emergency stations (XC-9242V), with SIP available across relevant products. That makes it a strong option for mixed sites that want common-area paging, general room/staff calling and visitor communication without treating those functions as separate brands.",
    paging: "XC-9000 central scheduling, zoned paging and priority announcements across compatible endpoints.",
    intercom: "Full-duplex audio intercom panels, intercom phones, microphone-equipped speakers (GEN-6212A01) and master stations.",
    visitor: "Current indoor and outdoor video intercom panels plus a touchscreen video master station for reception answering.",
    integration: "SIP across relevant devices; analogue/network interfaces and amplifier options for mixed architecture.",
    value: "Unusually broad one-ecosystem combination of PA, scheduling, audio/video intercom, help-point and control-station options.",
    costWatch: "A broad family can create more design choices; require a clear proposed endpoint list rather than accepting 'SPON system' generically.",
    strengths: [
      "Broad PA + audio/video intercom family within one wider ecosystem.",
      "Indoor and outdoor video intercom products support full-duplex communication and visitor verification.",
      "Reception/master-station options support an answering-point workflow.",
      "Microphone-equipped network speakers and dedicated panels allow general two-way communication beyond entrances.",
      "SIP support across relevant devices improves integration options.",
      "NZ channel evidence includes current SPON intercom and video-intercom listings.",
    ],
    tradeoffs: [
      "Do not represent general intercom or help points as a clinical nurse-call replacement.",
      "Access-control depth should be compared directly with specialist Axis/2N designs where doors, credentials and security workflows dominate.",
      "Confirm exact endpoint/controller/software compatibility and which current models are locally supplied; a shared brand name is not proof of cross-model compatibility.",
      "Require a clear proposed endpoint list rather than accepting 'SPON system' generically.",
    ],
    core: "XC-9000 licence and required host/controller for the quoted design.",
    audio: "Compatible indoor/outdoor endpoints; GEN-6212A01 microphone-equipped IP speakers where general two-way audio is needed.",
    call: "NAS-8523C/D audio intercom panels with master stations for staff/room communication (general facility intercom, not nurse call).",
    entrance: "NAS-8523CV/DV indoor and XC-9137AV outdoor video intercoms, answered from an XC-9037NV video master station at reception.",
    nz: "Sound Choice Pro Audio NZ lists SPON equipment including current intercom and video-intercom products (NAS-8523D/CV, XC-9137AV, XC-9037N). A local catalogue helps identify a supply route; it does not prove stock for every model, installed care-sector share or compatibility between every generation.",
    sources: ["spon-control", "spon-health", "spon-audio-intercom", "spon-video-intercom", "spon-outdoor-video", "spon-video-master", "spon-help-point", "spon-two-way-speaker"],
    nzSources: ["spon-nz", "spon-nz-audio-intercom", "spon-nz-video", "spon-nz-outdoor-video", "spon-nz-master"],
  },
  {
    id: "prospero",
    name: "Bosch PROSPERO",
    family: "PROSPERO software, PRP-CST and audio / amplifier interfaces",
    category: "Browser-managed IP PA",
    fit: "Worth quoting for managed common-area announcements",
    verdict: "A credible browser-managed IP PA option for shared lounges, reception and common areas with scheduled tasks and amplifier interfaces.",
    summary: "PROSPERO is not only a school-bell platform. Current ANZ manufacturer material positions it for medium-sized commercial sites, with browser/server control, scheduled tasks, paging and amplifier interfaces. That gives it a credible role in shared lounges, reception and other common areas.",
    paging: "Strong: browser-managed scheduled broadcasts, live/pre-recorded zoned paging and amplifier interfaces.",
    intercom: "Zone monitoring and bidirectional audio at interface-module level; room intercom workflow is not established by the core package.",
    visitor: "No equivalent current visitor-video entrance family established; do not infer one from PROSPERO.",
    integration: "Standard TCP/IP and PoE call stations/interface modules; amplifier-based passive zones.",
    value: "Managed PA/scheduling depth without paying for specialist voice-alarm architecture.",
    costWatch: "Price software licence, host, call stations and one endpoint/interface per required zone; PROSPERO and PRAESENSA are different systems.",
    strengths: [
      "Web-managed scheduling and zoned paging fit common-area announcement workflows.",
      "Amplifier interfaces support passive-speaker zones in larger shared spaces.",
      "Current NZ-facing product page gives a local enquiry route.",
    ],
    tradeoffs: [
      "The call station's zone-monitoring speaker is not proof of room talkback.",
      "Establish any two-way requirement separately from the core package.",
      "Do not infer certified evacuation suitability from an emergency function.",
    ],
    core: "PROSPERO software licence on the required host, with PRP-CST call station(s).",
    audio: "IP endpoints and/or interface modules feeding suitable amplifiers and passive speakers.",
    call: "Specify separately; quote a documented room-calling solution if required.",
    entrance: "Confirm exact package; no visitor-video family established for this brief.",
    nz: "Pacific AV publishes a NZ PROSPERO product page. Check the current locally supplied package and support arrangements.",
    sources: ["prospero-system"],
    nzSources: ["prospero-nz"],
  },
  {
    id: "itc",
    name: "ITC",
    family: "NZ-listed T-7800A / Luna and compatible 78-series equipment",
    category: "Server-managed IP / hybrid PA",
    fit: "A conditional IP / amplifier-hybrid alternative",
    verdict: "Worth a like-for-like proposal for centrally managed PA and intercom, with the exact local product revision confirmed.",
    summary: "The documented 78-series approach combines a central server, IP endpoints and network amplifiers feeding passive speakers. That can be relevant to a mixed site with some existing PA and some new areas. The NZ T-7800A / Luna listing describes scheduling and intercom functions.",
    paging: "Server-managed scheduling and paging controls.",
    intercom: "Specified 78-series intercom terminals; request a demonstration of the locally supplied revision.",
    visitor: "Video/access capability must be confirmed for the exact local package.",
    integration: "IP amplifiers and hybrid passive zones; confirm SIP/APIs for the actual models.",
    value: "An IP/amplifier hybrid may suit a mixed site without a powered network speaker everywhere.",
    costWatch: "Do not assume a low system price from overseas component listings; quote the local supported package.",
    strengths: [
      "Hybrid architecture accommodates network endpoints and amplifier-fed passive areas.",
      "NZ listings make it a relevant local enquiry.",
    ],
    tradeoffs: [
      "Confirm the current supported generation before specifying it; local listings are not a lifecycle guarantee.",
      "The manufacturer example reviewed is a Cape Verde resort, not a care facility.",
      "Do not transfer SIP, PoE or clinical claims from unrelated ITC families.",
    ],
    core: "T-7800A / Luna or its supplier-confirmed current replacement, with software and paging station.",
    audio: "T-7807-type endpoints and network amplifiers feeding suitable passive speakers.",
    call: "A compatible intercom terminal explicitly included and demonstrated.",
    entrance: "Confirm exact package for any visitor/video requirement.",
    nz: "Sound Choice Pro Audio NZ publishes the T-7800A listing. Its existence is not a lifecycle or stock guarantee.",
    sources: ["itc-system"],
    nzSources: ["itc-nz"],
  },
  {
    id: "frontrow",
    name: "FrontRow",
    family: "Conductor with compatible classroom / room-audio systems",
    category: "Room-audio-led campus communications",
    fit: "Conditional fit where its room-audio ecosystem is already useful",
    verdict: "Conditional when an existing FrontRow room-audio environment or a specialised activity/training-room audio requirement makes it relevant; not a default aged-care greenfield shortlist entry.",
    summary: "Conductor combines campus paging, schedules and intercom with compatible room audio. It remains worth assessing where FrontRow is already installed or a training/activity-room audio requirement is important alongside announcements.",
    paging: "Conductor server provides campus schedules, zones and alerts.",
    intercom: "Compatible classroom-audio and intercom interfaces; specify microphone/call control.",
    visitor: "Not an entrance/video-intercom proposition.",
    integration: "FrontRow campus/room ecosystem; confirm any telephony requirement explicitly.",
    value: "Attractive where existing or new FrontRow room audio is genuinely useful.",
    costWatch: "Separate room voice amplification/AV control from the essential campus PA price.",
    strengths: [
      "A coherent workflow joins room audio, announcements and intercom where that ecosystem is already valuable.",
      "NZ education integrator evidence provides a local route.",
    ],
    tradeoffs: [
      "A classroom-led ecosystem is not the default starting point for a new care-only brief; that is a fit judgement, not a capability claim.",
      "Compare the required functions rather than buying classroom features by default.",
    ],
    core: "Conductor server, licences and administrative station.",
    audio: "Compatible room interfaces; amplifier connections for common areas.",
    call: "Compatible room microphone/call interface quoted separately.",
    entrance: "Confirm exact package; not a specialist entrance ecosystem.",
    nz: "Pacific AV documents FrontRow and named NZ schools. Those references establish local education experience, not an aged-care installation record.",
    sources: ["frontrow-system"],
    nzSources: ["frontrow-nz"],
  },
];

/**
 * Use-case shortlists (editorial, evidence-bound). The strongest fit is listed
 * first where the reviewed evidence supports a clear reason. This is not a
 * measured 1-3 ranking, and no brand is guaranteed a place by code.
 */
export type CareUseCase = {
  id: string;
  whatMatters: string;
  startingPoints: readonly CarePlatformId[];
  why: string;
  sources: readonly CareSourceId[];
};
export const careUseCases: readonly CareUseCase[] = [
  {
    id: "reception-paging",
    whatMatters: "Whole-site announcements and straightforward administration",
    startingPoints: ["axis", "spon", "prospero"],
    why: "Axis leads on browser-managed network-audio workflow and paging console; SPON's managed paging/scheduling now carries broader intercom capability if requirements grow; Bosch PROSPERO offers browser-managed IP PA with scheduling and amplifier architecture.",
    sources: ["axis-edge", "axis-console", "spon-control", "prospero-system"],
  },
  {
    id: "entrance-intercom",
    whatMatters: "Entrance, gate and visitor video/intercom",
    startingPoints: ["2n", "axis", "spon"],
    why: "2N is the specialist modular entrance/access proposition; Axis offers video intercom within a mature security/access ecosystem; SPON's current indoor/outdoor full-duplex video intercoms, SIP, relay I/O and reception/master-station options now earn it third place for this brief.",
    sources: ["2n-entry", "axis-entry", "spon-video-intercom", "spon-outdoor-video", "spon-video-master", "spon-nz-video"],
  },
  {
    id: "integrated-communication",
    whatMatters: "Integrated PA + general intercom / visitor communication",
    startingPoints: ["spon", "axis", "toa"],
    why: "SPON offers an unusually broad one-ecosystem combination of PA, scheduling, audio/video intercom, help-point and control-station options; Axis pairs network audio with two-way console/intercom and security integration; TOA brings mature dedicated IP intercom plus IP PA families.",
    sources: ["spon-control", "spon-audio-intercom", "spon-video-intercom", "spon-help-point", "axis-console", "toa-intercom"],
  },
  {
    id: "retain-pa",
    whatMatters: "Existing PA reuse / staged SIP migration",
    startingPoints: ["algo", "axis", "toa"],
    why: "Algo's 8301 is the cleanest first starting point for this narrow brief; Axis C8110 bridges analogue audio into a network-audio design; TOA's interfaces and IP-A1PG scheduler offer another route. SPON also has analogue/network interfaces and could be quoted.",
    sources: ["algo-adapter", "axis-bridge", "toa-interface", "toa-gateway"],
  },
  {
    id: "security-convergence",
    whatMatters: "Security/access + communications convergence",
    startingPoints: ["axis", "2n", "spon"],
    why: "Axis spans cameras, access control, network audio and intercom in one ecosystem; 2N specialises in entrance/access communication; SPON's SIP/ONVIF video intercom, relay I/O, PA and central management earn third place without claiming Axis/2N-level access-control breadth.",
    sources: ["axis-edge", "axis-entry", "2n-entry", "spon-video-intercom", "spon-help-point"],
  },
  {
    id: "staff-two-way",
    whatMatters: "General staff/room two-way communication",
    startingPoints: ["spon", "toa", "axis"],
    why: "SPON offers audio intercom panels, microphone-equipped endpoints and master stations; TOA's N-8000 is a dedicated station/intercom architecture; Axis provides the C6110 console and compatible two-way endpoints. This is general facility intercom/talkback, not clinical nurse call.",
    sources: ["spon-audio-intercom", "spon-two-way-speaker", "toa-intercom", "axis-console"],
  },
];

type CareQuestion = { id: string; question: string; answer: string; sources: readonly CareSourceId[] };
export const careQuestions: readonly CareQuestion[] = [
  {
    id: "best-system",
    question: "Which PA or intercom system is best for a retirement village?",
    answer: "There is no single best system for every village. Axis is a strong first look for browser-managed network audio and security convergence; 2N for an entrance/access-led brief; Algo for retaining an existing PA or SIP-first migration; and SPON for a broader managed design combining paging with general audio/video intercom. TOA remains particularly relevant for dedicated audio-intercom requirements. These are conditional editorial recommendations, not a claim that one brand wins every village design.",
    sources: ["axis-edge", "2n-entry", "algo-adapter", "spon-control", "spon-audio-intercom", "toa-intercom"],
  },
  {
    id: "paging-nurse-call",
    question: "Is an aged-care paging system the same as nurse call?",
    answer: "No. Paging can mean announcements over loudspeakers or private messages to staff devices. Nurse call is a separately specified resident/staff response system, potentially including call points, pendants, alert routing and escalation. Rictech and Rauland publish NZ specialist examples. A PA speaker with a microphone is not automatically an equivalent replacement.",
    sources: ["rictech", "rauland"],
  },
  {
    id: "rest-home-quiet",
    question: "Can rest-home announcements be limited to certain wings or times?",
    answer: "Zoned paging and scheduling are available in the compared PA families, but the design must include the required grouping and priority rules. Specify which lounges, staff areas, corridors or outdoor areas should receive each routine message. Agree quiet hours and separately test how authorised urgent messages behave.",
    sources: ["axis-edge", "algo-adapter", "spon-control"],
  },
  {
    id: "keep-speakers",
    question: "Can we keep our existing 100V speakers and upgrade the controls?",
    answer: "Potentially. Interfaces such as Algo 8301 and Axis C8110 connect to suitable analogue audio equipment. Have the installer check the amplifier, wiring, load, condition and coverage. An interface normally feeds an amplifier; it does not directly power a 100V speaker line or create individual-room control within one shared circuit.",
    sources: ["algo-adapter", "axis-bridge"],
  },
  {
    id: "wireless",
    question: "Does IP paging mean wireless or Wi-Fi speakers?",
    answer: "No. IP describes network communication; many of the compared endpoints use wired Ethernet and Power over Ethernet. Wireless nurse-call equipment is a different design choice. Identify the real cable, switch and power requirements rather than assuming that an IP upgrade needs no wiring.",
    sources: ["algo-speaker", "axis-console", "rictech"],
  },
  {
    id: "room-talkback",
    question: "Can residents or staff speak back through a room speaker?",
    answer: "Only where the selected endpoint and control system support two-way audio. Examples include Algo's 8188 with compatible call accessories and SPON's GEN-6212A01 microphone-equipped network speaker and NAS-8523C/D intercom panels. Specify the microphone, call button, answering location and privacy controls. This is general facility intercom, not an equivalent of clinical nurse call.",
    sources: ["algo-speaker", "spon-two-way-speaker", "spon-audio-intercom", "axis-console", "rictech"],
  },
  {
    id: "video-entry",
    question: "Can a retirement village use video intercom at gates or building entrances?",
    answer: "Yes. 2N's modular IP Verso, Axis's I8116-E and SPON's current indoor/outdoor video intercom range (with reception master stations) are all viable starting points. Quote visitor video, door release/access, reception answering and after-hours routing as one complete workflow rather than buying door panels in isolation.",
    sources: ["2n-entry", "axis-entry", "spon-video-intercom", "spon-outdoor-video", "spon-video-master"],
  },
  {
    id: "cost-question",
    question: "How much does a retirement-village PA or intercom upgrade cost?",
    answer: "Use the SmartComms calculator for an indicative general PA/intercom range based on areas, infrastructure and optional calling. There is no single per-bed price. The worked example on this page uses the same calculator, not a brand quote. Clinical nurse call, extensive door/access work and certified evacuation systems need separate scopes and quotes.",
    sources: [],
  },
  {
    id: "leasing-question",
    question: "Can a rest home or retirement village finance or lease a PA system?",
    answer: "Equipment finance may be worth discussing. NZ providers advertise technology, AV and healthcare equipment-finance services, but the organisation, asset and transaction still need provider assessment. Ask whether installation is included and what ownership, return or purchase terms apply; a lease does not automatically become lease-to-own.",
    sources: ["finance-market"],
  },
  {
    id: "installer-question",
    question: "How do we find a suitable installer or service provider in New Zealand?",
    answer: "Ask for relevant project experience, exact product support, a coverage design and a demonstration of staff tasks. SmartComms can review your enquiry and reply with suggested providers' public contact details. Our selected network is not the entire market, and we do not send your enquiry to the providers we recommend.",
    sources: [],
  },
];
