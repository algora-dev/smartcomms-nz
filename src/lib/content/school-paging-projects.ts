export const SCHOOL_PAGING_PROJECTS_PATH = "/guides/nz-school-paging-projects" as const;
export const SCHOOL_PAGING_PROJECTS_RESEARCH_DATE = "2026-09-24" as const;

export const schoolProjectSources = {
  "moe-emergency": {
    label: "Ministry of Education — prepare for an emergency or traumatic incident",
    href: "https://www.education.govt.nz/education-professionals/schools-year-0-13/health-safety-and-wellbeing/prepare-emergency-or-traumatic-incident",
    kind: "NZ government guidance",
  },
  "moe-emergency-guide": {
    label: "Ministry of Education — Planning and preparing for emergencies (April 2026)",
    href: "https://web-assets.education.govt.nz/s3fs-public/2026-08/Planning%20and%20preparing%20for%20emergencies%20310826.pdf",
    kind: "NZ government emergency-planning guide",
  },
  "three-kings": {
    label: "Edwards Sound Systems — Three Kings Primary project",
    href: "https://www.edwardsnz.co.nz/school-uses-paging-system-for-tighter-lockdown-procedures",
    kind: "Published NZ project account",
  },
  "2n-net-audio-eol": {
    label: "2N — discontinued Net Audio Systems",
    href: "https://www.2n.com/en-GB/products/discontinued/2n-net-audio-systems/",
    kind: "Manufacturer lifecycle notice",
  },
  "2n-sip-mic-eol": {
    label: "2N — SIP Mic discontinuation notice",
    href: "https://www.2n.com/en-US/newsroom/2n_sip_mic_discontinuation_notice_new_chapter_begins/",
    kind: "Manufacturer lifecycle notice",
  },
  ormiston: {
    label: "Pacific AV — Ormiston Junior College project",
    href: "https://www.pacificav.co.nz/ormiston-junior-college-auckland/",
    kind: "Published NZ distributor account",
  },
  "frontrow-current": {
    label: "FrontRow — current Conductor platform",
    href: "https://www.gofrontrow.co.nz/products/conductor/",
    kind: "Manufacturer",
  },
  "frontrow-cm900": {
    label: "Pacific AV — FrontRow networked audio devices",
    href: "https://www.pacificav.co.nz/product/frontrow-networked-audio-devices/",
    kind: "NZ product / lifecycle evidence",
  },
  lincoln: {
    label: "NZAV — Lincoln High School project",
    href: "https://www.nzav.nz/audio-visual-projects/",
    kind: "Published NZ integrator account",
  },
  "spon-current": {
    label: "SPON — current smart PA solution for schools",
    href: "https://sponcomm.com/solution-detail/smart-pa-solution-for-schools",
    kind: "Manufacturer",
  },
  cotswold: {
    label: "AV Integration — Cotswold Mātāhae School project",
    href: "https://www.avintegration.co.nz/project/modernising-bell-and-paging/",
    kind: "Published NZ integrator account",
  },
  "zycoo-current": {
    label: "ZYCOO — current IAS-L100 / IP Audio Center documentation",
    href: "https://www.zycoo.com/downloads/p/ias-l100/",
    kind: "Manufacturer documentation",
  },
  thorndon: {
    label: "CIE Group — Thorndon Primary School project (integrator: Pure Tech)",
    href: "https://cie-group.com/projects/thorndon-primary",
    kind: "Published project account",
  },
  "axis-current": {
    label: "Axis — current Audio Manager Edge",
    href: "https://www.axis.com/products/axis-audio-manager-edge",
    kind: "Manufacturer",
  },
  "axis-c3003-eol": {
    label: "Axis — C3003-E discontinuation statement",
    href: "https://www.axis.com/dam/public/7a/09/8b/discontinuation-statement-for-axis-c3003-e-en-US-116158.pdf",
    kind: "Manufacturer lifecycle notice",
  },
} as const;

export type SchoolProjectSourceId = keyof typeof schoolProjectSources;

export type ProjectCapability = "described" | "not-stated";

export type SchoolPagingProject = {
  id: string;
  school: string;
  publisher: string;
  publisherRole: string;
  integrator?: string;
  integratorLabel?: "Integrator" | "Named dealer";
  system: string;
  projectTiming?: string;
  publicationTiming?: string;
  timingNote: string;
  designAngle: string;
  evidenceLabel: string;
  summary: string;
  publishedFacts: readonly string[];
  smartcommsLesson: string;
  buyerQuestions: readonly string[];
  lifecycleNote: string;
  capabilities: {
    bells: ProjectCapability;
    zonedPaging: ProjectCapability;
    outdoor: ProjectCapability;
    emergency: ProjectCapability;
    twoWay: ProjectCapability;
  };
  sources: readonly SchoolProjectSourceId[];
};

export const schoolPagingProjects: readonly SchoolPagingProject[] = [
  {
    id: "three-kings-primary",
    school: "Three Kings Primary School",
    publisher: "Edwards Sound Systems",
    publisherRole: "Project/design account",
    system: "2N network paging",
    publicationTiming: "Published 1 March 2024",
    timingNote: "The public account gives a publication date, not a separate installation date.",
    designAngle: "Network speakers across classrooms/common areas plus four outdoor zones, with two paging stations",
    evidenceLabel: "Published NZ project account",
    summary:
      "A school-wide network paging project built around everyday bells and announcements as well as fast, selectable emergency messaging across classrooms, common areas and outdoor zones.",
    publishedFacts: [
      "The project account describes a speaker in each classroom and common room plus four outdoor zones.",
      "Two paging stations could select zones and trigger prerecorded messages for events including fire, earthquake and lockdown-type incidents.",
      "The school also used scheduled music in place of a traditional bell.",
    ],
    smartcommsLesson:
      "The important design question is not simply whether a school can play a lockdown message. The same operator workflow has to make routine bells, selected-zone pages and priority emergency messages distinct, quick and understandable.",
    buyerQuestions: [
      "Which indoor and outdoor areas need independent paging?",
      "Who can trigger priority messages, from which locations, and how are they cancelled?",
      "What current supported products replace the historical 2N audio components used in this project?",
    ],
    lifecycleNote:
      "Treat this as a historical architecture example. 2N now lists its Net Audio Systems as discontinued, and its SIP Mic stopped accepting APAC orders from 31 January 2025.",
    capabilities: {
      bells: "described",
      zonedPaging: "described",
      outdoor: "described",
      emergency: "described",
      twoWay: "not-stated",
    },
    sources: ["three-kings", "2n-net-audio-eol", "2n-sip-mic-eol"],
  },
  {
    id: "ormiston-junior-college",
    school: "Ormiston Junior College",
    publisher: "Pacific AV",
    publisherRole: "Distributor / project publisher",
    integrator: "Australasian Audio Engineering",
    integratorLabel: "Named dealer",
    system: "FrontRow paging and bells",
    publicationTiming: "Published 23 August 2017",
    timingNote: "The public account gives a publication date, not a separate installation date.",
    designAngle: "Network control with 21 decoders feeding 21 conventional amplifier channels",
    evidenceLabel: "Published NZ distributor account",
    summary:
      "A network-controlled school-wide design that used FrontRow decoders and server control while still driving amplifier-fed speaker zones — a useful example of IP control without requiring a powered IP speaker in every space.",
    publishedFacts: [
      "Pacific AV describes a paging microphone, audio encoder and 21 network decoders feeding 21 amplifier channels.",
      "The server handled zone paging and bell schedules, while the published GUI could select zones and activate lockdown tones, strobes and external triggers.",
      "The project account lists 91 ceiling speakers and classroom endpoint options with local audio/control functions.",
    ],
    smartcommsLesson:
      "IP paging is an architecture, not a requirement to replace every passive speaker. A school can centralise schedules, zones and emergency controls while distributing audio through network interfaces and conventional amplification where that is the better design.",
    buyerQuestions: [
      "Does each room need a powered network speaker, or would network interfaces feeding amplifiers be more appropriate?",
      "Which classroom-local audio functions need to keep working during a school-wide page?",
      "Which historical FrontRow endpoints in the original project have current replacements?",
    ],
    lifecycleNote:
      "The 2017 equipment list is historical. FrontRow Conductor remains a current platform, while Pacific AV identifies CM900 as the replacement for the older CM3000 endpoint used in the published architecture.",
    capabilities: {
      bells: "described",
      zonedPaging: "described",
      outdoor: "not-stated",
      emergency: "described",
      twoWay: "not-stated",
    },
    sources: ["ormiston", "frontrow-current", "frontrow-cm900"],
  },
  {
    id: "lincoln-high-school",
    school: "Lincoln High School",
    publisher: "NZAV",
    publisherRole: "NZ project publisher",
    system: "SPON IP paging",
    projectTiming: "Implemented in 2024",
    timingNote: "NZAV states the project was implemented in 2024; the project index does not show a separate publication date.",
    designAngle: "120-zone modular IP retrofit planned for later removal and re-installation in replacement buildings",
    evidenceLabel: "Published NZ project account",
    summary:
      "A large retrofit where installation disruption and future relocation mattered: NZAV describes a 120-zone SPON IP paging design installed outside school hours and intended to be re-installed in the school's future replacement buildings.",
    publishedFacts: [
      "NZAV describes the project as a 120-zone IP paging retrofit across the existing school.",
      "Installation had to be completed outside school hours.",
      "The chosen architecture was intended to be reusable in the new school planned for the same site.",
    ],
    smartcommsLesson:
      "Lifecycle planning can be part of the architecture brief. A school facing staged redevelopment may value relocatable network endpoints and modular control more than a design optimised only for the current buildings.",
    buyerQuestions: [
      "Is the school likely to rebuild, relocate blocks or stage property work during the system's life?",
      "Which parts of the proposed system can be moved and recommissioned later?",
      "What does the quote include for out-of-hours installation and future reconfiguration?",
    ],
    lifecycleNote:
      "NZAV's public project summary identifies SPON and the 120-zone retrofit but does not publish a complete bill of materials. SPON continues to publish a current school PA platform; a new project should still identify the exact current endpoints, software and support arrangement.",
    capabilities: {
      bells: "not-stated",
      zonedPaging: "described",
      outdoor: "not-stated",
      emergency: "not-stated",
      twoWay: "not-stated",
    },
    sources: ["lincoln", "spon-current"],
  },
  {
    id: "cotswold-matahae",
    school: "Cotswold Mātāhae School",
    publisher: "AV Integration",
    publisherRole: "Integrator / project publisher",
    integrator: "AV Integration",
    integratorLabel: "Integrator",
    system: "ZYCOO IP paging, bells and intercom",
    projectTiming: "Completed November 2025",
    timingNote: "The project page states the completion month; it does not show a separate publication date.",
    designAngle: "Central IP audio server and paging phone with classroom call-back, smaller-room intercoms and outdoor horns",
    evidenceLabel: "Published NZ integrator account",
    summary:
      "A recent whole-site bell and paging upgrade combining room/block paging, automated schedules, outdoor coverage, two-way classroom calling and a one-touch emergency alert workflow.",
    publishedFacts: [
      "AV Integration describes six teaching blocks, a library, hall and outdoor areas connected to a ZYCOO IAS-L100 server and X210 paging phone.",
      "The project account says classrooms support two-way calls back to the office, with separate intercoms in smaller spaces and horns for the hall and grounds.",
      "The same system provides automated bells, selected paging, one-touch emergency alerting and a mobile paging/alarm option.",
    ],
    smartcommsLesson:
      "This project shows the benefit of specifying the operator workflow, not just endpoint counts. Daily schedules, room calls, outdoor announcements and emergency activation can share one platform while still requiring different controls and priorities.",
    buyerQuestions: [
      "Which classrooms need genuine call-back rather than one-way announcements?",
      "Should authorised staff be able to page or trigger alerts away from the reception desk?",
      "How are emergency activation, priority and all-clear actions separated from ordinary bell controls?",
    ],
    lifecycleNote:
      "AV Integration names the IAS-L100 platform, and ZYCOO continues to publish current IAS-L100/IP Audio Center documentation. Confirm the exact endpoint models and local support proposed for a new NZ project.",
    capabilities: {
      bells: "described",
      zonedPaging: "described",
      outdoor: "described",
      emergency: "described",
      twoWay: "described",
    },
    sources: ["cotswold", "zycoo-current"],
  },
  {
    id: "thorndon-primary",
    school: "Thorndon Primary School",
    publisher: "CIE Group",
    publisherRole: "Project publisher",
    integrator: "Pure Tech",
    integratorLabel: "Integrator",
    system: "Axis network audio",
    timingNote: "The public account does not state a project completion date or publication date.",
    designAngle: "PoE network ceiling speakers and outdoor horns with reception microphone and browser-managed zoning/schedules",
    evidenceLabel: "Published NZ project account",
    summary:
      "A Wellington school refurbishment that replaced a manually activated fire-bell workaround with scheduled network audio, zoned announcements, indoor/outdoor coverage and a separate emergency-lockdown communication workflow.",
    publishedFacts: [
      "The project account says the previous fire bell was being used manually for class-change timing and there was no general announcement system.",
      "Pure Tech installed ceiling speakers, outdoor horns, a programmable microphone and browser-managed Axis audio controls.",
      "The published design supports scheduled sounds, zone announcements, per-speaker volume control and rapid activation of lockdown signals/messages.",
    ],
    smartcommsLesson:
      "A bell replacement can solve more than timetable automation. When a school is already changing the control layer, zoning, intelligible speech, outdoor coverage and emergency-message activation are worth evaluating together rather than adding them later as separate projects.",
    buyerQuestions: [
      "Are existing fire-alarm sounds being used for jobs they were not designed to perform?",
      "Can all occupied indoor and outdoor areas hear distinct school communication signals?",
      "Which current Axis endpoints and management tier replace the historical products used in the published project?",
    ],
    lifecycleNote:
      "The project used an older Axis generation, including C3003-E horns. Axis discontinued C3003-E and named C1310-E as its replacement; current designs should be specified against today's Axis Audio Manager and endpoint families rather than the historical bill of materials.",
    capabilities: {
      bells: "described",
      zonedPaging: "described",
      outdoor: "described",
      emergency: "described",
      twoWay: "not-stated",
    },
    sources: ["thorndon", "axis-current", "axis-c3003-eol"],
  },
] as const;

export const schoolProjectUseCases = [
  {
    title: "Replacing a basic bell with scheduled paging and emergency messages",
    description:
      "Three Kings and Thorndon both show the shift from a simple bell/announcement problem toward scheduled audio, zoned paging and clearer emergency communication. The endpoint architecture differs, which makes the pair useful for comparing workflows rather than brands.",
    projectIds: ["three-kings-primary", "thorndon-primary"],
  },
  {
    title: "Moving control onto the network without putting an IP speaker in every room",
    description:
      "Ormiston is the clearest published example here of network control and decoders feeding conventional amplifier channels. It is useful when a school wants central schedules/zoning but the loudspeaker architecture may remain amplifier-fed.",
    projectIds: ["ormiston-junior-college"],
  },
  {
    title: "Upgrading now while a rebuild or staged property programme is coming",
    description:
      "Lincoln is the project to examine for relocation planning: NZAV describes a 120-zone retrofit intended to be removed and re-installed in future replacement buildings. That is a different decision from reusing existing speakers or cabling.",
    projectIds: ["lincoln-high-school"],
  },
  {
    title: "Adding room-level paging, outdoor coverage and two-way classroom calling",
    description:
      "Cotswold Mātāhae is the only project in this set whose public account explicitly describes two-way classroom calling, alongside selected-room paging, outdoor horns, automated bells, emergency alerts and mobile operation.",
    projectIds: ["cotswold-matahae"],
  },
] as const;

export const schoolProjectFaqs = [
  {
    question: "What paging systems are New Zealand schools actually using?",
    answer:
      "Published NZ projects show several architectures in use, including historical 2N network audio, FrontRow, SPON, ZYCOO and Axis. These examples are not a market-share survey: they are projects with enough public information to compare. Current product lifecycle and NZ support still need to be checked when specifying a new system.",
  },
  {
    question: "Can the same school system handle bells, announcements and lockdown messages?",
    answer:
      "Often yes. Several published projects use one platform for scheduled bells, live zoned paging and priority emergency messages. The school still needs an emergency management plan, distinct alert signals and clear activation/cancellation procedures; a paging system is one communication layer within that plan.",
  },
  {
    question: "Do school paging systems need an IP speaker in every classroom?",
    answer:
      "No. The Ormiston project is a useful example of network control and decoders feeding amplifier-driven speaker zones. Whether an existing 100V speaker or cable plant can be retained is a separate site-assessment question; the Ormiston account should not be treated as evidence of infrastructure reuse. The correct architecture depends on zoning, condition, two-way requirements and what the school wants to control individually.",
  },
  {
    question: "Can existing speakers or PA cabling be reused?",
    answer:
      "Sometimes. Reuse is project-specific. Existing passive speakers, amplifiers or cabling may remain useful where condition, coverage and zoning are suitable, while the control layer moves to IP. A site assessment should identify which assets are worth retaining before a quote assumes full replacement.",
  },
  {
    question: "Are older 2N school paging systems still current for new projects?",
    answer:
      "Existing installations can continue to be relevant project examples, but 2N lists its Net Audio Systems as discontinued and ended APAC orders for SIP Mic in January 2025. A new project should therefore be designed around currently supported equipment rather than copying an older 2N bill of materials.",
  },
  {
    question: "How much does a school paging and bell system cost in New Zealand?",
    answer:
      "Cost depends on the number and type of areas, indoor/outdoor endpoints, existing cabling, intercom requirements, network readiness and what infrastructure can be reused. SmartComms provides an indicative pricing tool so schools can build a planning range before requesting a formal quote.",
  },
  {
    question: "Can a school paging project be funded through 5YA?",
    answer:
      "Potentially, where the work forms part of an eligible fixed-property capital project and fits the school's 10YPP/5YA priorities and available allocation. SmartComms' funding checker is preliminary guidance only; actual eligibility and approval remain with the school's property process and relevant Ministry requirements.",
  },
] as const;
