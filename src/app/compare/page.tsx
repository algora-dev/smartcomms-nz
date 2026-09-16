import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";

/**
 * SmartComms NZ /compare — server component: all comparisons, details and
 * source links render in HTML. Review date lives in lib/content-meta
 * (single source of truth).
 * Editorial fit is not a lab rating or a verified complete-system price ranking.
 */
const REVIEW_DATE = reviewedDate("/compare");
const REVIEW_LABEL = reviewedLabel("/compare");
const PAGE_TITLE = "Compare School PA & IP Paging Systems NZ (2026 Guide)";
const ARTICLE_HEADLINE = "Compare school PA, IP paging, bell & intercom systems in New Zealand (2026)";
const PAGE_DESCRIPTION =
  "Compare SPON, FrontRow, Algo, Bosch PROSPERO, ITC, Axis and TOA for NZ school PA, paging, bells and intercom: features, support and trade-offs.";
const pageUrl = `${site.url.replace(/\/$/, "")}/compare`;

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/compare",
});

const evidence = {
  "spon-school": {
    "label": "SPON school PA solution",
    "href": "https://sponcomm.com/solution-detail/smart-pa-solution-for-schools",
    "kind": "Manufacturer"
  },
  "spon-control": {
    "label": "SPON XC-9000 management software",
    "href": "https://sponcomm.com/products/audio-management-software",
    "kind": "Manufacturer"
  },
  "spon-nz": {
    "label": "Sound Choice Pro Audio NZ — SPON range",
    "href": "https://www.scpaudio.co.nz/brand/spon/",
    "kind": "NZ supply evidence"
  },
  "spon-intercom": {
    "label": "NZ-listed NAS-8523CV intercom",
    "href": "https://www.scpaudio.co.nz/shop/ip-paging/intercoms/nas-8523cv/",
    "kind": "NZ product listing"
  },
  "frontrow": {
    "label": "FrontRow Conductor",
    "href": "https://www.gofrontrow.com/products/conductor/",
    "kind": "Manufacturer"
  },
  "frontrow-classroom": {
    "label": "FrontRow ezRoom classroom system",
    "href": "https://www.gofrontrow.co.uk/products/ezroom/",
    "kind": "Manufacturer"
  },
  "frontrow-nz": {
    "label": "Pacific AV — FrontRow and named NZ schools",
    "href": "https://www.pacificav.co.nz/brands/frontrow/",
    "kind": "NZ integrator evidence"
  },
  "frontrow-devices": {
    "label": "Pacific AV — CM900 and CM800 interfaces",
    "href": "https://www.pacificav.co.nz/product/frontrow-networked-audio-devices/",
    "kind": "NZ product / integration evidence"
  },
  "frontrow-server": {
    "label": "Pacific AV — Conductor administrative station",
    "href": "https://www.pacificav.co.nz/product/conductor-administrative-station/",
    "kind": "NZ product listing"
  },
  "frontrow-visual": {
    "label": "FrontRow Conductor display integration",
    "href": "https://www.gofrontrow.com.au/news/frontrow-conductor-integrates-with-boxlight-mimio-and-clevertouch-interactive-panels-for-audio-and-video-school-wide-communication/",
    "kind": "Manufacturer"
  },
  "algo-scheduler": {
    "label": "Algo 8301 user guide",
    "href": "https://docs.algosolutions.com/docs/8301-user-guide",
    "kind": "Manufacturer documentation"
  },
  "algo-speaker": {
    "label": "Algo 8188 ceiling speaker",
    "href": "https://www.algosolutions.com/product/8188-ip-ceiling-speaker/",
    "kind": "Manufacturer"
  },
  "algo-display": {
    "label": "Algo 8410 / 8420 display speaker guide",
    "href": "https://docs.algosolutions.com/docs/8410-8420-user-guide",
    "kind": "Manufacturer documentation"
  },
  "algo-management": {
    "label": "Algo Device Management Platform guide",
    "href": "https://docs.algosolutions.com/docs/admp-guide",
    "kind": "Manufacturer documentation"
  },
  "algo-nz": {
    "label": "Everlea NZ — Algo paging and scheduling",
    "href": "https://www.everlea.co.nz/ip-paging-solutions/voip-paging/algo-8301-paging-adapter-and-scheduler/",
    "kind": "NZ supply evidence"
  },
  "algo-training": {
    "label": "Everlea — Algo configuration training",
    "href": "https://www.everlea.co.nz/everlea-training/",
    "kind": "NZ support / training evidence"
  },
  "itc-system": {
    "label": "itc manufacturer — 78-series system architecture",
    "href": "https://www.itctech.com.cn/case/index/art/1914.html",
    "kind": "Manufacturer; overseas installation"
  },
  "itc-nz": {
    "label": "Sound Choice Pro Audio NZ — ITC range",
    "href": "https://www.scpaudio.co.nz/brand/itc/",
    "kind": "NZ product listings"
  },
  "itc-server": {
    "label": "NZ-listed ITC T-7800A / Luna server",
    "href": "https://www.scpaudio.co.nz/shop/commercial/t-7800a-ip-intercom-pa-system-server/",
    "kind": "NZ product / integration evidence"
  },
  "itc-edwards": {
    "label": "Edwards NZ — ITC PA systems",
    "href": "https://www.edwardsnz.co.nz/itc",
    "kind": "NZ supply evidence"
  },
  "axis-edge": {
    "label": "AXIS Audio Manager Edge",
    "href": "https://www.axis.com/products/axis-audio-manager-edge",
    "kind": "Manufacturer"
  },
  "axis-console": {
    "label": "AXIS C6110 paging console and two-way audio",
    "href": "https://www.axis.com/products/axis-c6110",
    "kind": "Manufacturer"
  },
  "axis-bridge": {
    "label": "AXIS C8110 audio bridge",
    "href": "https://www.axis.com/products/axis-c8110",
    "kind": "Manufacturer"
  },
  "axis-nz": {
    "label": "JD Security NZ — Axis audio management",
    "href": "https://www.jdsecurity.co.nz/axis/axis-ip-audio/axis-audio-manager-edge/",
    "kind": "NZ integrator evidence"
  },
  "bosch-prospero": {
    "label": "Bosch PROSPERO configuration manual",
    "href": "https://cdn.commerce.boschsecurity.com/public/documents/PROSPERO_CM_Configuration_Manual_all_126077875339.pdf",
    "kind": "Manufacturer documentation"
  },
  "bosch-prospero-nz": {
    "label": "Pacific AV NZ — Bosch PROSPERO school paging and bells",
    "href": "https://www.pacificav.co.nz/product/bosch-prospero-ip-based-paging-and-bell-system/",
    "kind": "NZ integrator / product evidence"
  },
  "toa-ip": {
    "label": "TOA IP-A1 speakers, interfaces and intercom options",
    "href": "https://toamys.com.my/products/network-pa/IP-A1-Series",
    "kind": "Manufacturer"
  },
  "toa-scheduler": {
    "label": "TOA IP-A1PG scheduling gateway",
    "href": "https://www.toa.co.uk/products/ip-a1pg/",
    "kind": "Manufacturer"
  },
  "toa-intercom": {
    "label": "TOA N-8000 dedicated intercom family",
    "href": "https://www.toa.co.uk/products/intercom-systems/n-8000-series/",
    "kind": "Manufacturer"
  },
  "toa-nz": {
    "label": "Australis Music NZ — TOA",
    "href": "https://www.australismusic.co.nz/brands/toa",
    "kind": "NZ brand / channel evidence"
  },
  "2n-current": {
    "label": "2N IP Verso 2.0 product support",
    "href": "https://www.2n.com/en-GB/support/intercoms/2n-ip-verso-2/",
    "kind": "Manufacturer documentation"
  },
  "2n-nz": {
    "label": "Sektor NZ — IP Verso 2.0 listing",
    "href": "https://www.sektor.co.nz/Product/SEAX02907001",
    "kind": "NZ product listing"
  },
  "2n-legacy": {
    "label": "2N — discontinued Net Audio Systems",
    "href": "https://www.2n.com/en-GB/products/discontinued/2n-net-audio-systems/",
    "kind": "Manufacturer lifecycle notice"
  },
  "2n-mic": {
    "label": "2N SIP Mic — APAC discontinuation notice",
    "href": "https://www.2n.com/en-AU/newsroom/2n-sip-mic-discontinuation-notice-new-chapter-begins/",
    "kind": "Manufacturer lifecycle notice"
  },
  "2n-school": {
    "label": "Edwards — Three Kings Primary project, March 2024",
    "href": "https://www.edwardsnz.co.nz/school-uses-paging-system-for-tighter-lockdown-procedures",
    "kind": "Historical NZ school installation"
  },
  "atlas": {
    "label": "AtlasIED GLOBALCOM announcement platform",
    "href": "https://www.atlasied.com/ip108-sp",
    "kind": "Manufacturer"
  },
  "atlas-nz": {
    "label": "NAS — AtlasIED distribution in Australia and NZ",
    "href": "https://nz.nas.solutions/atlas-ied-now-distributed-by-nas",
    "kind": "NZ distribution evidence"
  },
  "bosch-praesensa": {
    "label": "Bosch PRAESENSA public address and voice alarm system",
    "href": "https://licensing.boschsecurity.com/publicaddress/praesensa/datasheets/PRAESENSA_Public_Address_and_Voice_Alarm_System.pdf",
    "kind": "Manufacturer documentation"
  },
  "algo-price-core": {
    "label": "VoIP Supply — 8301 displayed US selling price",
    "href": "https://www.voipsupply.com/algo-8301",
    "kind": "International price example"
  },
  "algo-price-speaker": {
    "label": "VoIP Supply — 8188 displayed US selling price",
    "href": "https://www.voipsupply.com/algo-8188-sip-ceiling-speaker",
    "kind": "International price example"
  },
  "toa-price": {
    "label": "Northamber — IP-A1PG displayed UK price",
    "href": "https://www.northamber.com/audio-visual/professional-audio/audio-over-ip/ip-paging-gateway-25-w",
    "kind": "International price example"
  }
} as const;

type EvidenceId = keyof typeof evidence;
type Platform = {
  id: string;
  name: string;
  family: string;
  category: string;
  fit: string;
  verdict: string;
  summary: string;
  bells: string;
  talkback: string;
  integration: string;
  coverage: string;
  visual: string;
  operations: string;
  setup: string;
  value: string;
  costWatch: string;
  strengths: readonly string[];
  tradeoffs: readonly string[];
  core: string;
  audio: string;
  call: string;
  nz: string;
  sources: readonly EvidenceId[];
  nzSources: readonly EvidenceId[];
};
type Question = {
  id: string;
  question: string;
  answer: string;
  sources: readonly EvidenceId[];
};

const platforms: readonly Platform[] = [
  {
    "id": "spon",
    "name": "SPON",
    "family": "IP PA / intercom with XC-9000 management",
    "category": "Integrated school platform",
    "fit": "A strong all-round option for an integrated school brief",
    "verdict": "A strong first quote for bells, zoned paging and optional room calling in one managed system.",
    "summary": "SPON is a strong all-round school shortlist when the aim is one managed environment for daily announcements, schedules and two-way communication. Its school solution documents zoned announcements, automated bells and priority messages; XC-9000 adds central device management, intercom and integration controls. That breadth is the reason to consider it—not an unverified claim that it is always cheapest.",
    "bells": "Central scheduling and zoned paging in the specified management package.",
    "talkback": "Supported intercom / microphone-equipped endpoints; not every speaker is two-way.",
    "integration": "XC-9000 documents SIP trunking and HTTP APIs. Confirm endpoint and software compatibility.",
    "coverage": "IP indoor/outdoor endpoints; suitable interfaces and amplifiers for retained analogue zones.",
    "visual": "Specify the visual endpoint or external alert integration; do not infer it from an audio-only quote.",
    "operations": "Central schedules, zones and user controls. Ask staff to test the actual operator interface.",
    "setup": "Confirm software licensing, supported endpoint families, network design and recovery arrangements.",
    "value": "Broad feature coverage can reduce the need for separate bell and intercom systems.",
    "costWatch": "Obtain an itemised NZ quote; public evidence does not establish a complete-system price lead.",
    "strengths": [
      "Daily bells and priority announcements sit alongside centrally managed paging rather than a separate timer-only system.",
      "Intercom and integration options make it worth quoting where the brief extends beyond one-way audio."
    ],
    "tradeoffs": [
      "SPON has several endpoint families. A shared brand name is not proof that any model works with any server or firmware.",
      "Demonstrate talkback, fault reporting and emergency overrides on the proposed configuration; verify support and software terms."
    ],
    "core": "XC-9000 management licence and the required host / controller for the quoted design.",
    "audio": "Compatible indoor speaker, plus separately sized outdoor endpoints or amplifier-fed zones.",
    "call": "A supported room intercom; NAS-8523CV is one NZ-listed example, subject to controller compatibility.",
    "nz": "Sound Choice Pro Audio NZ lists SPON speakers, interfaces and intercoms. This demonstrates a local product channel, not nationwide stock or a measured market share.",
    "sources": [
      "spon-school",
      "spon-control"
    ],
    "nzSources": [
      "spon-nz",
      "spon-intercom"
    ]
  },
  {
    "id": "frontrow",
    "name": "FrontRow",
    "family": "Conductor with compatible classroom audio / interfaces",
    "category": "School and classroom integration",
    "fit": "Strongest fit when classroom audio is part of the brief",
    "verdict": "An important NZ school comparison when campus communication must work with classroom voice and AV systems.",
    "summary": "FrontRow Conductor is a direct school-wide competitor, not just a classroom microphone product. It combines campus paging, bell schedules, intercom and alerts with compatible FrontRow classroom systems. The relevant comparison is a Conductor-based school package—not a standalone Juno or classroom amplifier priced against a whole-campus platform.",
    "bells": "Conductor server and administrative controls provide school schedules, zones and alerts.",
    "talkback": "Compatible classroom audio and intercom interfaces; specify the microphone / call control.",
    "integration": "FrontRow campus/classroom ecosystem. Confirm any telephone gateway or SIP requirement explicitly.",
    "coverage": "Classroom interfaces; CM800 can feed a suitable 100V amplifier for common/outdoor areas.",
    "visual": "Supported display integration is available; include compatible panels, software and programming.",
    "operations": "School-oriented administration and classroom controls; compare timetable changes and call handling in a demo.",
    "setup": "Server, licences, room interfaces, local audio power and any classroom AV integration need a coordinated design.",
    "value": "Particularly attractive when existing or new FrontRow classroom audio is useful to the project.",
    "costWatch": "Separate classroom voice amplification / AV control from the essential campus PA price.",
    "strengths": [
      "A coherent education workflow joins room audio, bells, announcements and intercom.",
      "Pacific AV publishes named NZ school installations, giving buyers a concrete local implementation trail."
    ],
    "tradeoffs": [
      "A classroom audio package and a simple PoE paging speaker are different purchases; compare the same required functions.",
      "Do not assume every room device is natively PoE or every display/phone system integrates without additional equipment."
    ],
    "core": "Conductor server, licences and administrative station; confirm the current supplied hardware.",
    "audio": "CM900 / compatible classroom audio; CM800 plus suitable amplifier for 100V speaker zones.",
    "call": "Compatible room microphone and call interface; quote teacher microphone functions separately where required.",
    "nz": "Pacific AV lists FrontRow installations including Ormiston Junior High and Waterview Primary. Its device page identifies CM900 as the replacement for CM3000 and documents CM800 integration with standard 100V amplifiers.",
    "sources": [
      "frontrow",
      "frontrow-classroom",
      "frontrow-visual"
    ],
    "nzSources": [
      "frontrow-nz",
      "frontrow-devices",
      "frontrow-server"
    ]
  },
  {
    "id": "algo",
    "name": "Algo",
    "family": "8301 scheduler + SIP speakers / interfaces",
    "category": "SIP-first and hybrid migration",
    "fit": "Strong starting point for VoIP and retained PA",
    "verdict": "A particularly practical quote when the school already uses SIP phones or wants to retain working amplifiers.",
    "summary": "Algo is a strong SIP-first choice, but a SIP phone system is not required just to run scheduled bells from an 8301. The adapter provides scheduling and a bridge to an existing amplifier, while selected IP speakers provide paging and talkback. Current Algo display speakers and management tools also make this a broader option than an audio-only endpoint comparison suggests.",
    "bells": "8301 built-in scheduler; SIP / multicast paging. Scheduling does not require SIP registration.",
    "talkback": "8188 has a microphone and talkback; a compatible call button is an accessory, not a complete intercom.",
    "integration": "SIP and multicast. Optional management and notification integrations have separate requirements.",
    "coverage": "Indoor speakers, outdoor horns and 8301 line-level output to a compatible existing amplifier.",
    "visual": "8410 / 8420 display speakers and visual alerters; specify content and trigger configuration.",
    "operations": "Browser scheduling and phone/console paging. Provide a simple staff workflow, not just administrator logins.",
    "setup": "Provision SIP where used, multicast, priorities and endpoint management; cloud management is optional.",
    "value": "Can retain existing PA infrastructure and avoid a large central server for basic scheduled paging.",
    "costWatch": "Include call accessories, mounting, any console and optional management / integration licences.",
    "strengths": [
      "The 8301 is both a bell scheduler and a migration interface, so new IP areas and existing PA can be considered together.",
      "Selected speakers provide talkback; display endpoints and ADMP management extend the same manufacturer’s range."
    ],
    "tradeoffs": [
      "The complete staff workflow still needs designing across scheduler, telephony, buttons and any management tools.",
      "A gateway cannot give individual-room control to speakers sharing one undivided analogue circuit."
    ],
    "core": "8301 scheduler / adapter; add console and management only where the brief requires them.",
    "audio": "8188 indoor PoE speaker, appropriate outdoor horn and any amplifier interfaces.",
    "call": "8188 talkback with a compatible 1202 / 1203 call accessory, or a dedicated intercom design.",
    "nz": "Everlea NZ publishes Algo paging products and configuration training covering provisioning, SIP, multicast and scheduling. Obtain local support, lead-time and replacement terms with the quote.",
    "sources": [
      "algo-scheduler",
      "algo-speaker",
      "algo-display",
      "algo-management"
    ],
    "nzSources": [
      "algo-nz",
      "algo-training"
    ]
  },
  {
    "id": "bosch-prospero",
    "name": "Bosch PROSPERO",
    "family": "PROSPERO IP public address system",
    "category": "School-focused network paging and bells",
    "fit": "A direct school-specific alternative worth quoting",
    "verdict": "A credible NZ school shortlist option for scheduled bells, live zoned paging and mixed IP / amplifier-fed coverage.",
    "summary": "Bosch PROSPERO belongs in the main school comparison rather than being represented only by PRAESENSA. Bosch documentation describes PROSPERO as a TCP/IP public-address system optimized for education, with scheduled broadcasts, live paging, emergency tasks, call stations, IP classroom speakers and interface modules for amplifiers. Pacific AV lists it in New Zealand specifically as an IP paging and bells system for schools. That makes it a much closer comparison to SPON, FrontRow and Algo than the life-safety-oriented PRAESENSA platform.",
    "bells": "Web-managed scheduled broadcasts plus live and pre-recorded zoned paging from the PROSPERO call station.",
    "talkback": "The reviewed package supports zone monitoring and bidirectional audio at interface-module level, but a classroom intercom / call-back workflow is not established by the core school package; specify it separately if required.",
    "integration": "Standard TCP/IP networking, PoE on call stations / interface modules and control I/O. Do not assume SIP or third-party API support unless the proposed version documents it.",
    "coverage": "IP classroom speaker endpoints plus IP audio interfaces feeding suitable amplifiers and passive speaker zones.",
    "visual": "No school-wide visual-alert endpoint is established in the reviewed PROSPERO package; specify a separate documented integration if required.",
    "operations": "Web configuration plus a touchscreen call station for live, recorded and emergency broadcasts; scheduling is built into the system workflow.",
    "setup": "Requires PROSPERO software, a suitable Windows host / server, network design, call stations and the required speaker or interface modules.",
    "value": "A school-specific Bosch architecture can avoid paying for the specialist redundancy and certification features of PRAESENSA when those are not part of the brief.",
    "costWatch": "Price the software licence, host, call stations and one endpoint / interface per required zone; do not use PRAESENSA pricing as a PROSPERO proxy.",
    "strengths": [
      "The manufacturer explicitly optimizes the platform for education, including IP classroom speakers, scheduling, paging and emergency tasks.",
      "A current NZ-facing Pacific AV listing gives the platform a concrete local route for school enquiries and system design."
    ],
    "tradeoffs": [
      "PROSPERO is not the same engineering proposition as PRAESENSA; do not transfer PRAESENSA certification, redundancy or supervision claims to it.",
      "If room-to-office intercom, SIP telephony or visual notification is required, make those functions explicit in the proposal and verify the exact supported workflow."
    ],
    "core": "PROSPERO system software licence on the required Windows host, with PRP-CST call station(s).",
    "audio": "PRP-UC15L-IP classroom speaker and/or PRP-IM1A / PRP-IM2C1A interfaces feeding suitable amplifiers and passive speakers.",
    "call": "PRP-CST provides operator paging and zone monitoring. Quote a separate documented room-calling / intercom solution if classroom call-back is required.",
    "nz": "Pacific AV NZ lists Bosch PROSPERO as a school-focused IP paging and bells system and links the current system documentation. This establishes a local enquiry route; it does not establish NZ market share or stock levels.",
    "sources": [
      "bosch-prospero"
    ],
    "nzSources": [
      "bosch-prospero-nz"
    ]
  },
  {
    "id": "itc",
    "name": "ITC",
    "family": "NZ-listed 78-series / Luna IP PA and intercom",
    "category": "Server-managed IP / hybrid PA",
    "fit": "A relevant integrated alternative to quote",
    "verdict": "Worth a like-for-like proposal for centrally managed PA and intercom, with the exact local product revision confirmed.",
    "summary": "The relevant ITC here is the itc audio manufacturer, not an unrelated IT company. NZ listings identify a T-7800A / Luna IP PA and intercom system, network speakers and amplifiers. The manufacturer also documents a 78-series architecture combining server control, paging microphones, IP speakers and amplifier-fed zones. This makes it a meaningful alternative, provided the supplied product family and support are confirmed.",
    "bells": "T-7800A / Luna listing documents central management, scheduling and IP intercom.",
    "talkback": "Specified 78-series intercom terminals; do not treat a paging-only speaker as a room intercom.",
    "integration": "Confirm SIP, APIs, security and firmware for the actual model; IP alone proves none of these.",
    "coverage": "T-7807-type IP speakers and network amplifiers feeding suitable passive indoor/outdoor speakers.",
    "visual": "Not established for the NZ-listed package reviewed; request a documented solution if required.",
    "operations": "Server-based scheduling and paging controls; request a demo of the locally supplied software.",
    "setup": "Check model generation, endpoint power, licences, network requirements and ongoing software support.",
    "value": "An IP / amplifier hybrid may suit a mixed site without requiring a powered network speaker everywhere.",
    "costWatch": "Do not assume a low system price from overseas component listings; quote the local supported package.",
    "strengths": [
      "The documented 78-series approach accommodates both network endpoints and amplifier-fed passive speaker areas.",
      "NZ ITC listings make this a more relevant local enquiry than an unfamiliar overseas-only product family."
    ],
    "tradeoffs": [
      "Published local listings are not a lifecycle guarantee. Confirm which 78-series / Luna models and software are supplied now.",
      "Do not transfer SIP, PoE or display claims from another ITC series to this package without model-specific documentation."
    ],
    "core": "T-7800A / Luna or its supplier-confirmed current replacement, with software and paging station.",
    "audio": "T-7807-type indoor endpoint; a network amplifier such as T-78120 with suitable passive speakers where appropriate.",
    "call": "A compatible T-7803-series terminal or current equivalent, explicitly included and demonstrated.",
    "nz": "Sound Choice Pro Audio NZ lists the ITC range and T-7800A server; Edwards also presents ITC PA systems. These are local supply signals, not evidence of current stock or the number of school installations.",
    "sources": [
      "itc-system"
    ],
    "nzSources": [
      "itc-nz",
      "itc-server",
      "itc-edwards"
    ]
  },
  {
    "id": "axis",
    "name": "Axis",
    "family": "Audio Manager Edge + network audio",
    "category": "Browser management and security integration",
    "fit": "Strong for administration and security convergence",
    "verdict": "Retain on the shortlist where browser-based operation and existing Axis security systems matter.",
    "summary": "Axis remains relevant to a NZ school comparison. Audio Manager Edge is built into compatible audio devices and provides browser-based zones, scheduling and health monitoring without a separate management server for that tier. The C6110 console also supports two-way communication with compatible devices; it should not be reduced to a one-way security speaker system.",
    "bells": "Edge provides schedules and paging management; plan around its 200-speaker / 20-zone limit.",
    "talkback": "C6110 with compatible microphone-equipped speakers or intercoms; configure the receiving device.",
    "integration": "SIP and Axis integration tools; validate the chosen camera, access-control and audio workflow.",
    "coverage": "Indoor/outdoor network speakers; C8110 audio bridge connects retained analogue audio equipment.",
    "visual": "Specify compatible visual devices / integrations; an audio-only speaker is not a text display.",
    "operations": "Browser-based zoning, schedules, user roles and health checks are well documented.",
    "setup": "Edge limits, network design and integration still need engineering; larger designs may need another management tier.",
    "value": "Included Edge management and reuse of an existing Axis environment may reduce additional system components.",
    "costWatch": "Price the actual speaker mix, C6110, bridges and any larger-site management—not just an entry speaker.",
    "strengths": [
      "A well-documented browser workflow and built-in management make it a useful usability benchmark.",
      "C8110 bridging and C6110 calling allow more than a simple set of standalone network speakers."
    ],
    "tradeoffs": [
      "Twenty management zones are not the same as twenty speakers. Check the required grouping before choosing Edge.",
      "Day-to-day simplicity is not a substitute for testing term-calendar changes, calling and outage behaviour."
    ],
    "core": "Included Audio Manager Edge on compatible devices; assess other management tiers only when required.",
    "audio": "Selected indoor and outdoor Axis speakers; C8110 bridge and existing amplifier for retained 100V lines.",
    "call": "C6110 console plus compatible two-way speaker / intercom, with the microphone and calling path configured.",
    "nz": "JD Security’s NZ site documents Axis Audio Manager Edge and network-audio integration. Local relevance is sufficient to retain Axis; this is not a claim that it is the most widely installed school platform.",
    "sources": [
      "axis-edge",
      "axis-console",
      "axis-bridge"
    ],
    "nzSources": [
      "axis-nz"
    ]
  },
  {
    "id": "toa",
    "name": "TOA",
    "family": "IP-A1 network PA; N-8000 for dedicated intercom",
    "category": "Network PA and established intercom families",
    "fit": "Strong for a tailored PA / intercom design",
    "verdict": "A useful comparison where network audio, existing PA equipment or dedicated intercom drive the design.",
    "summary": "TOA should not be compared only as a high-end voice-alarm system. IP-A1 includes SIP speakers, gateways and interfaces, with scheduled broadcasting through the IP-A1PG. IP-A1 also has specific two-way options. N-8000 is a separate dedicated intercom family; combining families is a design decision, not a feature automatically included with every TOA speaker.",
    "bells": "IP-A1PG gateway supplies browser scheduling and SIP-to-multicast paging.",
    "talkback": "IP-A1AF with IP-A1MP microphone panel, or a dedicated N-8000 intercom design.",
    "integration": "IP-A1 documents SIP, multicast, ONVIF and APIs. N-8000 is a distinct architecture.",
    "coverage": "IP-A1 ceiling speakers / outdoor horns; interfaces and suitable amplifiers for passive speakers.",
    "visual": "External or separately specified notification design; no blanket display claim for IP-A1.",
    "operations": "IP-A1PG browser schedules and defined paging controls; N-8000 has a different station-based workflow.",
    "setup": "Select the family first, then confirm interfaces, zone limits, firmware and regional model availability.",
    "value": "Can be a targeted network-PA or intercom purchase rather than a full voice-alarm project.",
    "costWatch": "Avoid pricing an N-8000 exchange or voice-alarm rack as mandatory for a simpler IP-A1 design.",
    "strengths": [
      "IP-A1PG adds a documented scheduler, and the family includes both direct IP speakers and analogue interfaces.",
      "Dedicated intercom requirements can be assessed against N-8000 rather than assumed from one-way PA."
    ],
    "tradeoffs": [
      "Interoperability and software limits need checking for the specific combination of families and endpoints.",
      "Certified voice-alarm products are a separate specification; their certification does not apply to all TOA PA equipment."
    ],
    "core": "IP-A1PG for the illustrated IP-A1 scheduling design; a separate N-8000 design only when needed.",
    "audio": "IP-A1PC238 indoor speaker and IP-A1SC15 outdoor horn, subject to NZ supply confirmation.",
    "call": "IP-A1AF + IP-A1MP and a suitable speaker/calling station, or specified N-8000 stations.",
    "nz": "Australis Music’s NZ site lists TOA. That establishes a NZ-facing channel; ask the integrator to confirm supply and support for the exact IP-A1 or N-8000 parts, not just the brand.",
    "sources": [
      "toa-ip",
      "toa-scheduler",
      "toa-intercom"
    ],
    "nzSources": [
      "toa-nz"
    ]
  }
];

const faqs: readonly Question[] = [
  {
    "id": "best-school-system",
    "question": "Which IP paging system is best for a New Zealand school?",
    "answer": "There is no single best system for every school. For an integrated bells + paging + optional intercom brief, SPON is one strong starting point. FrontRow becomes particularly relevant when classroom audio is part of the project; Algo is strong for SIP and staged migration; Bosch PROSPERO is a school-specific Bosch alternative; Axis, TOA and ITC suit other architectures and priorities. This is an editorial fit shortlist, not a market-share ranking.",
    "sources": [
      "spon-school",
      "frontrow",
      "algo-scheduler",
      "bosch-prospero",
      "bosch-prospero-nz"
    ]
  },
  {
    "id": "frontrow-vs-spon",
    "question": "How does FrontRow compare with SPON?",
    "answer": "Both deserve consideration for school-wide bells, paging and intercom. FrontRow Conductor is especially relevant when communications should join up with compatible classroom audio and controls. SPON is a strong comparison when the brief centres on a managed IP PA and intercom platform. Compare the same room functions: a teacher microphone and classroom AV package should not be priced against a bare paging speaker.",
    "sources": [
      "frontrow-classroom",
      "spon-control"
    ]
  },
  {
    "id": "bosch-prospero-vs-praesensa",
    "question": "What is the difference between Bosch PROSPERO and Bosch PRAESENSA for a school?",
    "answer": "PROSPERO is the closer comparison for an everyday school paging-and-bells brief: Bosch documentation describes a TCP/IP PA system optimized for education, with scheduling, live paging, call stations, classroom IP speakers and amplifier interfaces. PRAESENSA is a separate public-address and voice-alarm architecture built around supervised, certified and highly resilient operation. A normal school project should not be pushed into PRAESENSA simply because both products carry the Bosch name, and PRAESENSA capabilities must not be attributed to PROSPERO.",
    "sources": [
      "bosch-prospero",
      "bosch-prospero-nz",
      "bosch-praesensa"
    ]
  },
  {
    "id": "itc-for-schools",
    "question": "Is ITC a relevant school PA option in New Zealand?",
    "answer": "Yes. NZ suppliers publish ITC PA products, including a T-7800A / Luna IP PA and intercom system. It belongs in a local comparison, but the installer should identify the currently supplied generation, supported software, endpoint power and telephone integration. The absence of a verified feature in this guide means “check the exact package”, not “the manufacturer cannot do it”.",
    "sources": [
      "itc-server",
      "itc-edwards"
    ]
  },
  {
    "id": "2n-for-schools",
    "question": "Should 2N still be considered for a school paging project?",
    "answer": "Yes for relevant intercom requirements and existing installations, but distinguish current products from legacy Net Audio equipment. Edwards documents a 2N school project at Three Kings Primary. Separately, 2N marks its Net Audio family discontinued, and its APAC SIP Mic notice closed orders on 31 January 2025. A current IP Verso 2.0 intercom is not by itself a school-wide bell scheduler.",
    "sources": [
      "2n-school",
      "2n-legacy",
      "2n-mic",
      "2n-current"
    ]
  },
  {
    "id": "cheapest-system",
    "question": "Which school PA system is cheapest?",
    "answer": "There is no verified like-for-like NZ price winner in the public evidence reviewed here. Retaining a suitable existing 100V speaker network may save more than changing brands. Compare a new IP design and a hybrid reuse design against the same coverage, talkback, software, installation and support requirements. Overseas component prices are not installed NZ system prices.",
    "sources": []
  },
  {
    "id": "easiest-system",
    "question": "Which system is easiest for school staff to use?",
    "answer": "Axis provides a well-documented browser interface; FrontRow is designed around school and classroom operation. Algo provides browser scheduling, while SPON and the NZ-listed ITC system offer central controls. None has been given a hands-on usability score here. Ask an administrator—not just the installer—to change a timetable, make a zoned page and manage a room call before accepting the system.",
    "sources": [
      "axis-edge",
      "frontrow",
      "algo-scheduler",
      "spon-control",
      "itc-server"
    ]
  },
  {
    "id": "without-internet",
    "question": "Can scheduled bells work without an internet connection?",
    "answer": "Local scheduling is possible: the Algo 8301, for example, does not require a cloud scheduler or SIP registration for scheduled bells. However, internet loss, loss of a local server, a failed network switch and a power cut are different failures. Test the proposed system’s behaviour in each case, including emergency controls and the backup-power design.",
    "sources": [
      "algo-scheduler"
    ]
  }
];

const sourceEntries = Object.entries(evidence) as [EvidenceId, (typeof evidence)[EvidenceId]][];
const sourceNumbers = Object.fromEntries(sourceEntries.map(([id], index) => [id, index + 1])) as Record<EvidenceId, number>;

/**
 * Use-case shortlists (editorial, evidence-bound). The strongest fit is listed
 * first where the reviewed evidence supports a clear reason — this is not a
 * measured 1–3 ranking, and no brand is guaranteed a place by code.
 */
const USE_CASES: { id: string; whatMatters: string; startingPoints: string[]; why: string }[] = [
  {
    id: "uc-school-bells",
    whatMatters: "Integrated school bells + paging + optional intercom",
    startingPoints: ["spon", "frontrow", "bosch-prospero"],
    why: "Managed education platforms combining schedules, zoned announcements and room calling in one system.",
  },
  {
    id: "uc-classroom-audio",
    whatMatters: "Classroom audio + campus communication",
    startingPoints: ["frontrow", "bosch-prospero", "spon"],
    why: "Classroom voice amplification and AV join up with bells, paging and intercom workflows.",
  },
  {
    id: "uc-sip-voip",
    whatMatters: "SIP / VoIP + staged upgrade",
    startingPoints: ["algo", "toa", "axis"],
    why: "SIP-native endpoints and gateways that coexist with a phone system and grow area by area.",
  },
  {
    id: "uc-hybrid-reuse",
    whatMatters: "Reuse of suitable existing PA / hybrid migration",
    startingPoints: ["algo", "toa", "itc"],
    why: "Documented interfaces and amplifiers that feed retained 100V speaker lines alongside new IP endpoints.",
  },
  {
    id: "uc-browser-security",
    whatMatters: "Browser administration / open integration",
    startingPoints: ["axis", "algo", "toa"],
    why: "Browser-based management, SIP/open integration and documented ways to connect network-audio functions with wider systems.",
  },
  {
    id: "uc-entrance-intercom",
    whatMatters: "Entrance intercom / access communication",
    startingPoints: ["2n", "axis", "toa"],
    why: "Current intercom families with SIP calling, modules and NZ-facing listings (TOA via its dedicated N-8000 family).",
  },
];

function platformName(id: string): string {
  if (id === "2n") return "2N";
  return platforms.find((p) => p.id === id)?.name ?? id;
}

function Sources({ ids, label = "Evidence" }: { ids: readonly EvidenceId[]; label?: string }) {
  if (ids.length === 0) return null;
  return (
    <span className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs leading-relaxed text-[var(--sc-slate)]">
      <span>{label}:</span>
      {ids.map((id) => (
        <a
          key={id}
          href={evidence[id].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${evidence[id].label} (source ${sourceNumbers[id]}, opens in a new tab)`}
          title={`${evidence[id].kind}: ${evidence[id].label}`}
          className="rounded font-semibold text-[var(--sc-blue-700)] underline decoration-slate-300 underline-offset-2 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          [{sourceNumbers[id]}]
        </a>
      ))}
    </span>
  );
}

function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "teal" | "slate" }) {
  const colours = tone === "teal"
    ? "bg-[var(--sc-teal-50)] text-[var(--sc-teal-strong)]"
    : tone === "slate"
      ? "bg-slate-100 text-slate-700"
      : "bg-[var(--sc-blue-50)] text-[var(--sc-blue-900)]";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-relaxed ${colours}`}>{children}</span>;
}

function SectionHeading({ id, eyebrow, children, description }: { id: string; eyebrow: string; children: ReactNode; description?: string }) {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-3xl">{children}</h2>
      {description && <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">{description}</p>}
    </div>
  );
}

function TableRegion({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs text-[var(--sc-slate)] lg:hidden">Scroll across the table to compare all columns.</p>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="overflow-x-auto rounded-xl border border-[var(--sc-border)] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-blue-700)]"
      >
        {children}
      </div>
    </div>
  );
}

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }} />;
}

export default function ComparePage() {
  const article = {
    ...articleSchema({
      headline: ARTICLE_HEADLINE,
      description: PAGE_DESCRIPTION,
      url: pageUrl,
      datePublished: publishedDate("/compare"),
      dateModified: REVIEW_DATE,
    }),
    "@id": `${pageUrl}#article`,
    inLanguage: "en-NZ",
    citation: sourceEntries.map(([, source]) => source.href),
    about: [
      { "@type": "Thing", name: "School public address and IP paging systems" },
      { "@type": "Thing", name: "School bell scheduling and intercom" },
    ],
  };
  // Unordered editorial shortlist: positions identify visible entries, not ratings.
  const shortlistSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#shortlist`,
    name: "NZ school paging and PA comparison shortlist",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: platforms.length,
    itemListElement: platforms.map((platform, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${pageUrl}#${platform.id}`,
      name: `${platform.name}: ${platform.family}`,
      description: platform.verdict,
    })),
  };

  return (
    <article aria-labelledby="compare-title">
      <header className="sc-container max-w-5xl py-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand · School and multi-zone communications</p>
        <h1 id="compare-title" className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-5xl">
          {ARTICLE_HEADLINE}
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[var(--sc-slate)]">
          A school needs more than a speaker brand. It needs bells that follow the timetable, clear announcements in the right places, reliable emergency controls and a system staff can actually use. This 2026 guide compares <strong>SPON, FrontRow, Algo, Bosch PROSPERO, ITC, Axis and TOA</strong> for that job, with <strong>2N</strong> considered separately for current intercom needs and existing paging installations. The strongest starting point depends on the brief — use the shortlists below, not a universal winner.
        </p>
        <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">
          Compare the complete design: software, indoor and outdoor coverage, room calling, network requirements, installation and NZ support. Not every platform delivers these in the same way—and not every school needs every feature.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pricing-tool" className="sc-btn-primary">Estimate NZ project cost</Link>
          <a href="#shortlist" className="sc-btn-secondary">Compare the shortlist</a>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-[var(--sc-slate)]">
          SmartComms NZ editorial guide · Reviewed <time dateTime={REVIEW_DATE}>{REVIEW_LABEL}</time>. Evidence-led recommendations, not hands-on test scores or supplier quotes. <a href="#methodology" className="font-semibold underline underline-offset-2">How we compare</a>
        </p>
        <nav aria-label="On this comparison page" className="mt-7 border-t border-[var(--sc-border)] pt-5">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-[var(--sc-blue-700)]">
            {[
              ["#shortlist", "Which system fits?"],
              ["#capabilities", "Feature comparison"],
              ["#platforms", "Platform profiles"],
              ["#2n", "2N and legacy systems"],
              ["#costs", "Cost and value"],
              ["#school-scenario", "30-area school"],
              ["#questions", "Buyer questions"],
              ["#sources", "Sources"],
            ].map(([href, text]) => <li key={href}><a href={href} className="rounded hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{text}</a></li>)}
          </ul>
        </nav>
      </header>

      <section id="shortlist" aria-labelledby="shortlist-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
        <div className="sc-container max-w-6xl">
          <SectionHeading id="shortlist-title" eyebrow="Start with the job, not the logo">
            Which system belongs on your shortlist?
          </SectionHeading>
          <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">
            There is no single universal winner. The right shortlist changes depending on whether the project prioritises
            integrated school workflows, classroom audio, SIP/VoIP, retained analogue PA, browser/security integration,
            room intercom or life-safety architecture. SPON is a strong all-round option for an integrated school brief
            covering bells, zoned paging and optional intercom — and the shortlists below change with the job, not the logo.
            Planning for a rest home or retirement village?{" "}
            <Link href="/industries/aged-care-retirement-villages" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Use the aged-care comparison</Link>,
            where the requirements and shortlist differ.
          </p>
          <div className="mt-6">
            <TableRegion label="Use-case shortlists. Editorial starting points, not measured rankings.">
              <table className="w-full min-w-[720px] text-left text-sm leading-relaxed">
                <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Editorial shortlists drawn from the evidence on this page. The strongest fit is listed first where a clear reason exists — this is not a measured 1–3 ranking.</caption>
                <thead className="bg-[var(--sc-blue-900)] text-white"><tr>
                  <th scope="col" className="w-1/3 px-4 py-3">What matters most</th>
                  <th scope="col" className="px-4 py-3">Strong starting points</th>
                  <th scope="col" className="px-4 py-3">Why</th>
                </tr></thead>
                <tbody>{USE_CASES.map((uc, index) => (
                  <tr key={uc.id} className={`border-t border-[var(--sc-border)] align-top ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
                    <th scope="row" className="px-4 py-4 font-semibold text-[var(--sc-blue-900)]">{uc.whatMatters}</th>
                    <td className="px-4 py-4 text-[var(--sc-slate)]">{uc.startingPoints.map((id) => platformName(id)).join(" · ")}</td>
                    <td className="px-4 py-4 text-[var(--sc-slate)]">{uc.why}</td>
                  </tr>
                ))}</tbody>
              </table>
            </TableRegion>
          </div>
          <TableRegion label="System shortlist. Scroll horizontally on smaller screens.">
            <table className="w-full min-w-[720px] text-left text-sm leading-relaxed">
              <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Seven main comparison options. The order is not a measured ranking. Select a name for its evidence and trade-offs.</caption>
              <thead className="bg-[var(--sc-blue-900)] text-white"><tr>
                <th scope="col" className="w-1/5 px-4 py-3">System / family</th>
                <th scope="col" className="px-4 py-3">When it makes sense</th>
                <th scope="col" className="px-4 py-3">Where value comes from</th>
                <th scope="col" className="px-4 py-3">What can change the cost</th>
              </tr></thead>
              <tbody>{platforms.map((platform, index) => (
                <tr key={platform.id} className={`border-t border-[var(--sc-border)] align-top ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
                  <th scope="row" className="px-4 py-4 font-normal"><a href={`#${platform.id}`} className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">{platform.name}</a><span className="mt-1 block text-xs text-[var(--sc-slate)]">{platform.category}</span></th>
                  <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.verdict}</td>
                  <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.value}</td>
                  <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.costWatch}</td>
                </tr>
              ))}</tbody>
            </table>
          </TableRegion>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">
            <a href="#2n" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">2N has a different role</a>: current IP intercom plus a legacy school-paging history. <a href="#other-architectures" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Traditional 100V, AtlasIED and Bosch PRAESENSA</a> are covered below where simpler PA or specialist requirements change the brief.
          </p>
        </div>
      </section>

      <section id="capabilities" aria-labelledby="capabilities-title" className="sc-container max-w-6xl scroll-mt-24 py-12">
        <SectionHeading id="capabilities-title" eyebrow="Apples to apples" description="These entries identify how the function is delivered, not a score for the whole brand. Accessories, software and integrations must be included in the proposed system.">
          Bells, paging, intercom and integration compared
        </SectionHeading>
        <TableRegion label="School communications capability comparison. Scroll horizontally on smaller screens.">
          <table className="w-full min-w-[760px] text-left text-sm leading-relaxed">
            <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Model-aware feature comparison. “Confirm” means the reviewed evidence does not establish the feature for that particular package.</caption>
            <thead className="bg-[var(--sc-blue-900)] text-white"><tr>
              <th scope="col" className="px-4 py-3">Platform</th>
              <th scope="col" className="px-4 py-3">Bells / live zoned paging</th>
              <th scope="col" className="px-4 py-3">Room calling / talkback</th>
              <th scope="col" className="px-4 py-3">SIP and integration</th>
            </tr></thead>
            <tbody>{platforms.map((platform, index) => (
              <tr key={platform.id} className={`border-t border-[var(--sc-border)] align-top ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
                <th scope="row" className="px-4 py-4"><a href={`#${platform.id}`} className="text-[var(--sc-blue-700)] underline underline-offset-2">{platform.name}</a></th>
                <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.bells}</td>
                <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.talkback}</td>
                <td className="px-4 py-4 text-[var(--sc-slate)]">{platform.integration}<Sources ids={platform.id === "itc" ? ["itc-server", "itc-system"] : platform.sources.slice(0, 3)} /></td>
              </tr>
            ))}</tbody>
          </table>
        </TableRegion>
        <div className="mt-5 rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 text-sm leading-relaxed text-[var(--sc-slate)]">
          <strong className="text-[var(--sc-blue-900)]">A lockdown message is not a certification.</strong> Specify message priority, activation, cancellation, fault reporting and backup power for every design. A normal IP paging system must not be assumed to satisfy a required fire / evacuation voice-alarm specification. Have the project’s designer establish the applicable requirements and verify the complete system.
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">New to the architecture? Read the <Link href="/systems/ip-paging-pa" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">IP paging guide</Link> and <Link href="/guides/ip-paging-network-readiness" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">network readiness checklist</Link>.</p>
      </section>

      <section id="platforms" aria-labelledby="platforms-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
        <div className="sc-container max-w-5xl">
          <SectionHeading id="platforms-title" eyebrow="The system behind the brand" description="The profiles pair documented capability with local evidence. A NZ listing shows an available route for enquiry; it does not prove stock, school-market share or guaranteed support.">
            Detailed platform comparison and NZ market fit
          </SectionHeading>
          <div className="mt-7 space-y-5">
            {platforms.map((platform) => (
              <article id={platform.id} key={platform.id} aria-labelledby={`${platform.id}-title`} className="sc-card scroll-mt-24 bg-white p-5 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 id={`${platform.id}-title`} className="text-2xl font-bold text-[var(--sc-blue-900)]">{platform.name}</h3>
                    <p className="mt-1 text-sm font-medium text-[var(--sc-blue-700)]">{platform.family}</p>
                  </div>
                  <Badge tone="slate">{platform.category}</Badge>
                </div>
                <p className="mt-4 font-semibold text-[var(--sc-blue-900)]">{platform.fit}</p>
                <p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{platform.summary}</p>
                <Sources ids={platform.sources} label="Technical evidence" />
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div><h4 className="font-semibold text-[var(--sc-blue-900)]">Where it earns its place</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">{platform.strengths.map((text) => <li key={text}>{text}</li>)}</ul></div>
                  <div><h4 className="font-semibold text-[var(--sc-blue-900)]">Trade-offs to check</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">{platform.tradeoffs.map((text) => <li key={text}>{text}</li>)}</ul></div>
                </div>
                <div className="mt-5 rounded-lg border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-4">
                  <h4 className="text-sm font-semibold text-[var(--sc-blue-900)]">NZ market fit / local ecosystem</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{platform.nz}</p>
                  <Sources ids={platform.nzSources} label="Local evidence" />
                </div>
                <details className="mt-5 border-t border-[var(--sc-border)] pt-4">
                  <summary className="cursor-pointer rounded font-semibold text-[var(--sc-blue-700)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Design detail: endpoints, controls and quote scope</summary>
                  <dl className="mt-4 grid gap-x-6 gap-y-4 text-sm leading-relaxed md:grid-cols-2">
                    {[
                      ["Core / control", platform.core],
                      ["Representative audio", platform.audio],
                      ["Room-call provision", platform.call],
                      ["Indoor, outdoor and legacy coverage", platform.coverage],
                      ["Visual notification", platform.visual],
                      ["Day-to-day operation", platform.operations],
                      ["Technical setup", platform.setup],
                      ["Cost validation", platform.costWatch],
                    ].map(([title, text]) => <div key={title}><dt className="font-semibold text-[var(--sc-blue-900)]">{title}</dt><dd className="mt-1 text-[var(--sc-slate)]">{text}</dd></div>)}
                  </dl>
                  <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">These are a quoting framework and component examples, not a complete bill of materials or an assurance of cross-family compatibility.</p>
                  <Sources ids={[...platform.sources, ...platform.nzSources]} />
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="2n" aria-labelledby="2n-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
        <SectionHeading id="2n-title" eyebrow="A specialist role, not an irrelevant brand">
          2N: current IP intercom and legacy school paging
        </SectionHeading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">
          <strong>2N has genuine NZ school-paging history.</strong> Edwards describes a Three Kings Primary installation using 2N network speakers, outdoor zones, paging microphones, scheduled bells and lockdown messages in a project article dated 1 March 2024. That is useful local evidence—but it does not establish that the same equipment remains a current new-build platform.
        </p>
        <Sources ids={["2n-school"]} label="Historical NZ project" />
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="sc-card p-5">
            <Badge>Current intercom shortlist</Badge>
            <h3 className="mt-3 text-lg font-semibold text-[var(--sc-blue-900)]">IP Verso 2.0 and the specified calling system</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">2N maintains IP Verso 2.0 documentation, and Sektor NZ lists the product. It is relevant to SIP-based entrance communication and access workflows. Quote the intercom, modules, receiving station / calling service and any required licences. A door intercom alone does not provide a campus bell schedule.</p>
            <Sources ids={["2n-current", "2n-nz"]} />
          </div>
          <div className="sc-card p-5">
            <Badge tone="slate">Lifecycle check required</Badge>
            <h3 className="mt-3 text-lg font-semibold text-[var(--sc-blue-900)]">Net Audio and SIP Mic are not a current-system assumption</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">2N’s discontinued Net Audio page includes IP Audio Manager and Net Audio decoders. Its APAC / AMER SIP Mic notice set final orders at <strong>31 January 2025</strong> and identifies AXIS C6110 as the successor. That does not mean all 2N products are discontinued or that an existing installation must be removed.</p>
            <Sources ids={["2n-legacy", "2n-mic"]} />
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]"><strong className="text-[var(--sc-blue-900)]">Buying decision:</strong> keep 2N on the intercom shortlist or review the lifecycle of an installed system. For a new whole-school design, require a current supported scheduler, paging architecture and endpoint list rather than specifying “2N audio” generically.</p>
      </section>

      <section id="other-architectures" aria-labelledby="alternatives-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-slate-50 py-10">
        <div className="sc-container max-w-5xl">
          <SectionHeading id="alternatives-title" eyebrow="When the brief changes">
            Traditional 100V, AtlasIED and Bosch PRAESENSA
          </SectionHeading>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-[var(--sc-blue-900)]">Traditional 100V / hybrid</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Keep a simple amplifier-and-speaker design in the comparison when the job is basic one-way PA. Reuse may be attractive, but shared speaker circuits limit individual-room control. Intercom and visual alerts need additional provision.</p>
              <Link href="/systems/traditional-vs-ip" className="mt-3 inline-block text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Compare analogue, IP and hybrid</Link>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--sc-blue-900)]">AtlasIED</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Consider a specified GLOBALCOM / IP endpoint solution for a wider campus-notification brief. AtlasIED has an ANZ distribution route through NAS; its shorter treatment here reflects scope, not an absence from NZ or a finding of inferior school suitability.</p>
              <Sources ids={["atlas", "atlas-nz"]} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--sc-blue-900)]">Bosch PRAESENSA</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Investigate separately when a supervised public-address / voice-alarm design is required. <strong>PRAESENSA is not the Bosch system used in the main school shortlist above:</strong> PROSPERO is the closer everyday bells-and-paging comparison. PRAESENSA belongs here when certification, supervision, redundancy and life-safety engineering change the brief.</p>
              <Sources ids={["bosch-praesensa"]} />
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[var(--sc-slate)]">This is a focused selection guide, not an exhaustive list of every brand sold in New Zealand. Specialist projects may require a broader shortlist.</p>
        </div>
      </section>

      <section id="costs" aria-labelledby="costs-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
        <SectionHeading id="costs-title" eyebrow="Price, ease and value" description="There is no verified, like-for-like public NZ price set covering all these systems. A numerical league table would suggest a level of certainty the evidence does not support.">
          Compare complete project cost—not isolated speakers
        </SectionHeading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">SPON’s integrated feature coverage makes it a strong value candidate. FrontRow may offer better value when its classroom functions are needed; Algo or another hybrid design may win by retaining good existing equipment; Bosch PROSPERO should be priced as its own school-focused architecture rather than through PRAESENSA component costs. The deciding evidence is an itemised quote against the same operational brief—not a brand-wide “cheap” or “premium” label.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["Equipment and software", "Include controllers, licences, indoor/outdoor audio, intercom microphones or buttons, consoles, mounts and visual endpoints."],
            ["Installation and readiness", "Include cabling, PoE switch capacity, backup power, amplifier interfaces, network configuration and coverage testing."],
            ["Operation and lifecycle", "Include staff training, support, subscriptions, replacement availability, configuration backups and ownership of administrative access."],
          ].map(([title, text]) => <div key={title} className="sc-card p-5"><h3 className="font-semibold text-[var(--sc-blue-900)]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p></div>)}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Operator ease and commissioning complexity are different.</strong> A receptionist may use one simple page button while an integrator manages servers, SIP, multicast and permissions behind it. Compare staff tasks in a demonstration; this guide does not convert manufacturer screenshots into tested usability scores.</p>
        <details className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5">
          <summary className="cursor-pointer rounded font-semibold text-[var(--sc-blue-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Public component-price evidence and its limits</summary>
          <div className="pt-4 text-sm leading-relaxed text-[var(--sc-slate)]">
            <p>The following displayed prices were reviewed on {REVIEW_LABEL}. They are <strong>international component examples, not NZ quotes, a complete system or a basis for ranking every platform</strong>. Currency, tax treatment, options, freight and installation differ. Recheck the supplier page before relying on a figure.</p>
            <TableRegion label="International component-price examples. Scroll horizontally on smaller screens.">
              <table className="w-full min-w-[580px] text-left text-sm">
                <caption className="sr-only">Isolated international seller prices, checked 15 September 2026</caption>
                <thead className="bg-slate-100 text-[var(--sc-blue-900)]"><tr><th scope="col" className="px-4 py-3">Item / role</th><th scope="col" className="px-4 py-3">Displayed price</th><th scope="col" className="px-4 py-3">Important boundary</th></tr></thead>
                <tbody>
                  <tr className="border-t border-[var(--sc-border)] align-top"><th scope="row" className="px-4 py-3 font-medium">Algo 8301 scheduler / adapter</th><td className="px-4 py-3">US$485</td><td className="px-4 py-3">VoIP Supply selling price, not its separate MSRP field. Speakers and amplification are not included.<Sources ids={["algo-price-core"]} /></td></tr>
                  <tr className="border-t border-[var(--sc-border)] align-top"><th scope="row" className="px-4 py-3 font-medium">Algo 8188 indoor speaker</th><td className="px-4 py-3">US$485</td><td className="px-4 py-3">Standard speaker listing; call accessories, mounting options and notification licences can add cost.<Sources ids={["algo-price-speaker"]} /></td></tr>
                  <tr className="border-t border-[var(--sc-border)] align-top"><th scope="row" className="px-4 py-3 font-medium">TOA IP-A1PG scheduling gateway</th><td className="px-4 py-3">£523.82 ex VAT</td><td className="px-4 py-3">Northamber UK listing for a gateway, not an intercom exchange or installed school package.<Sources ids={["toa-price"]} /></td></tr>
                </tbody>
              </table>
            </TableRegion>
            <p className="mt-4">For <strong>SPON, FrontRow and ITC</strong>, obtain the local core/control, representative audio and room-call prices outlined in each profile. For <strong>Axis</strong>, included Edge management does not make speakers, bridges or a console free. For <strong>2N</strong>, quote the entrance/calling function separately rather than inventing an equivalent bell-system controller.</p>
            <p className="mt-3">No intercom price is shown unless the required audio and calling hardware are clear: a call button alone is not a complete two-way endpoint. Overseas prices have not been converted to NZD or multiplied into hypothetical school totals.</p>
          </div>
        </details>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pricing-tool" className="sc-btn-primary">Get an indicative NZ installed range</Link>
          <Link href="/guides/school-pa-specification-checklist" className="sc-btn-secondary">Compare quotes like for like</Link>
        </div>
      </section>

      <section id="school-scenario" aria-labelledby="scenario-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
        <div className="sc-container max-w-5xl">
          <SectionHeading id="scenario-title" eyebrow="Make the comparison practical">
            A 30-area school: one brief, comparable proposals
          </SectionHeading>
          <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">Consider an illustrative school with <strong>24 classrooms, two administration areas, a hall and three outdoor coverage areas</strong>. It needs timetable bells, live zoned paging, priority messages and optional classroom calls. These are 30 coverage areas—not necessarily 30 speakers, 30 cable circuits or 30 software zones. Speaker quantities and placement require a coverage design.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">Quote A: network endpoints where needed</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Price the required room control, talkback and outdoor coverage. Include power, data cabling and software. SPON and FrontRow provide useful integrated-system comparisons; Algo, Bosch PROSPERO, Axis, TOA and a supported ITC package should be scoped against the same requirements.</p>
            </div>
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">Quote B: retain suitable existing speaker lines</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Ask what can be kept in the hall and outdoor areas while improving classroom control. An audio interface normally feeds an amplifier; it does not directly drive an existing 100V line. Reuse is worthwhile only if coverage, condition and the required zones remain suitable.</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Axis example:</strong> a 30-area site is not automatically too large for Edge’s 20-zone limit. Several areas may share one zone. If the brief needs more than 20 independently configured management zones, assess the appropriate management tier before quoting.<Sources ids={["axis-edge"]} /></p>
          <details className="mt-5 rounded-xl border border-[var(--sc-border)] bg-white p-5">
            <summary className="cursor-pointer rounded font-semibold text-[var(--sc-blue-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">The acceptance demonstration every proposal should pass</summary>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">
              <li>Have a school administrator change a normal-day timetable, add an exception and disable holiday bells without altering other schedules.</li>
              <li>Page one room, a teaching block and the whole site; check speech clarity in the hall and outdoor areas with realistic background noise.</li>
              <li>Make a classroom call, handle two simultaneous requests and show how priority messages override normal audio and are cancelled.</li>
              <li>Test internet loss, local server loss, switch loss and power loss separately. Record what still works, what fails and how staff are alerted.</li>
              <li>Restore a configuration backup and replace an endpoint. Confirm administrative access, update responsibility, spare-part lead times and support arrangements.</li>
            </ol>
          </details>
          <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">Use the <Link href="/guides/ip-paging-network-readiness" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">network readiness checklist</Link> alongside this brief. A PoE label, SIP logo or “emergency” button alone does not verify the complete design.</p>
        </div>
      </section>

      <section id="questions" aria-labelledby="questions-title" className="sc-container max-w-4xl scroll-mt-24 py-12">
        <SectionHeading id="questions-title" eyebrow="Buyer questions">
          Choosing a school paging, bell or intercom system
        </SectionHeading>
        <div className="mt-6 divide-y divide-[var(--sc-border)]">
          {faqs.map((faq) => (
            <section id={faq.id} key={faq.id} aria-labelledby={`${faq.id}-heading`} className="scroll-mt-24 py-5">
              <h3 id={`${faq.id}-heading`} className="text-lg font-semibold text-[var(--sc-blue-900)]">{faq.question}</h3>
              <p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{faq.answer}</p>
              <Sources ids={faq.sources} />
            </section>
          ))}
          <section className="py-5" aria-labelledby="funding-question">
            <h3 id="funding-question" className="text-lg font-semibold text-[var(--sc-blue-900)]">Where should a NZ school check funding options?</h3>
            <p className="mt-2 leading-relaxed text-[var(--sc-slate)]">Use the <Link href="/funding" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">school communications funding guide</Link> or the <Link href="/tools/funding-check" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">funding checker</Link> alongside a defined project scope. A recommendation in this comparison is not an eligibility decision, funding approval or promise that an entire project will be covered.</p>
          </section>
        </div>
      </section>

      <section aria-labelledby="next-step-title" className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-900)] py-12 text-white">
        <div className="sc-container max-w-4xl text-center">
          <h2 id="next-step-title" className="text-3xl font-bold">Define the requirement. Then choose the platform.</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-blue-100">Start with the areas to cover, the equipment worth retaining and what staff need to do every day. Use the same brief for each proposal so a lower price does not hide missing coverage, intercom, licences or support.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing-tool" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[var(--sc-blue-900)]">Estimate project cost</Link>
            <ProjectHelpLauncher
              mode="system_selection"
              sourceTopic="compare"
              buttonLabel="Not sure which shortlist fits your site?"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 cursor-pointer"
            />
            <Link href="/tools/funding-check" className="inline-flex items-center justify-center rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Check funding pathways</Link>
          </div>
        </div>
      </section>

      <section id="methodology" aria-labelledby="methodology-title" className="sc-container max-w-5xl scroll-mt-24 py-10">
        <h2 id="methodology-title" className="text-xl font-bold text-[var(--sc-blue-900)]">How this comparison was prepared</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">We prioritise manufacturer documentation for capability and lifecycle, then NZ distributors and integrators for the products and projects they publish. Local catalogue and case-study statements are attributed, not treated as independently measured market share. Unverified features are labelled for confirmation rather than marked absent.</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">The recommendations are editorial judgements for a typical school brief. This is not a hands-on group test, a review-score aggregate or a complete-system pricing study. SmartComms NZ is a T3 Labs research and enquiry site that can introduce projects to installation / technology partners; inclusion is not a manufacturer endorsement.</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">The main shortlist is deliberately compact. FrontRow, ITC and Bosch PROSPERO receive full comparisons; 2N’s lifecycle distinction is explicit; AtlasIED and Bosch PRAESENSA remain specialist considerations. Stock, warranties, software terms and exact product compatibility must be confirmed in a current written proposal.</p>
        <details id="sources" className="mt-6 scroll-mt-24 rounded-xl border border-[var(--sc-border)] bg-white p-5 md:p-6">
          <summary className="cursor-pointer rounded text-lg font-bold text-[var(--sc-blue-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Sources and evidence register ({sourceEntries.length})</summary>
          <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">Reviewed {REVIEW_LABEL}. Numbered references throughout the guide open the original source. Manufacturer specifications establish capability; local listings establish a route for enquiry; historical installations do not establish current product availability.</p>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {sourceEntries.map(([id, source]) => (
              <li key={id} className="rounded-lg border border-[var(--sc-border)] p-3">
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">[{sourceNumbers[id]}] {source.label}<span className="sr-only"> (opens in a new tab)</span></a>
                <span className="mt-1 block text-xs text-[var(--sc-slate)]">{source.kind}</span>
              </li>
            ))}
          </ol>
        </details>
      </section>
      <JsonLd data={article} />
      <JsonLd data={breadcrumbSchema([
        { name: "SmartComms NZ", url: site.url },
        { name: "Compare systems", url: pageUrl },
      ])} />
      <JsonLd data={shortlistSchema} />
    </article>
  );
}
