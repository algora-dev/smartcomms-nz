import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "NZ School PA, Paging & Bell Requirements Guide",
  description:
    "What NZ schools should specify for PA, paging, bells, lockdown messages, coverage, networking and support, with Ministry guidance and NZ project examples.",
  path: "/guides/nz-school-pa-paging-requirements",
});

const REQUIREMENTS = [
  {
    title: "Coverage that matches the real site",
    detail:
      "List classrooms, admin, halls, gyms, libraries, workshops, corridors, covered areas, fields, courts, gates and detached buildings. Do not assume one speaker type or volume setting suits them all.",
  },
  {
    title: "Zones that match school operations",
    detail:
      "Define which areas need whole-school, block, indoor, outdoor, hall-only or individual-room announcements. Ask how zones are changed later and who is allowed to change them.",
  },
  {
    title: "Clear speech, not just loud audio",
    detail:
      "Require understandable spoken messages in every intended coverage area. Background noise, room acoustics, speaker position and outdoor throw matter more than a headline wattage figure.",
  },
  {
    title: "Bell schedules staff can actually manage",
    detail:
      "Specify normal timetables, alternate days, term dates, one-off changes, holidays, manual override and who can edit schedules without calling an installer.",
  },
  {
    title: "Emergency messages and activation",
    detail:
      "Define the warnings, messages, trigger points, authorisation, message priority, cancellation and all-clear process. The technology must support the school's emergency plan rather than becoming the plan itself.",
  },
  {
    title: "A deliberate architecture choice",
    detail:
      "Decide what is worth retaining. A school may only need a modern scheduler, a hybrid gateway into existing 100V amplifiers and speakers, or a full network-audio replacement. Ask bidders to explain the trade-off.",
  },
  {
    title: "Network and power responsibility",
    detail:
      "For IP or hybrid designs, identify the switch ports, PoE budget, VLANs, cabling, backup power, network ownership and who supports each layer after handover.",
  },
  {
    title: "Support, documentation and lifecycle",
    detail:
      "Require training, administrator access, configuration backups, as-built documentation, warranty details, software or subscription costs, fault response and a realistic replacement path.",
  },
];

const PROJECTS = [
  {
    school: "Three Kings Primary School",
    source: "Edwards Sound Systems",
    approach: "Network paging with classroom, common-area and outdoor coverage",
    lesson:
      "The published project used speakers across classrooms, common areas and four outdoor zones, two paging stations, pre-recorded emergency messages and scheduled bells. The useful specification lesson is to define coverage, trigger locations and everyday bell use together rather than treating them as separate purchases.",
    href: "https://www.edwardsnz.co.nz/school-uses-paging-system-for-tighter-lockdown-procedures",
  },
  {
    school: "Ormiston Junior College",
    source: "Pacific AV",
    approach: "FrontRow audio-over-IP paging, bells and lockdown workflows",
    lesson:
      "Pacific AV describes a networked design with zone paging, a full bell schedule, lockdown triggers and different endpoint types. It shows why a school brief should specify the operational jobs first, then let the design decide which rooms need simple decoders, local amplification or richer control.",
    href: "https://www.pacificav.co.nz/ormiston-junior-college-auckland/",
  },
  {
    school: "Thorndon Primary School",
    source: "CIE Group / Pure Tech",
    approach: "Axis network audio for daily paging, bells and lockdown support",
    lesson:
      "The published case study combines indoor ceiling speakers, outdoor horns, a programmable reception microphone, zone control, scheduling and individual volume management. It is a useful reminder to include outdoor coverage and neighbour-facing volume control in the brief, not only classrooms.",
    href: "https://cie-group.com/project/thorndon-primary/",
  },
];

export default function NzSchoolPaRequirementsPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="NZ School Communications Specification Guide"
        title="NZ School PA, Paging & Bell System Requirements"
        description="A school communication system has to do more than make sound. It needs clear coverage, practical bell schedules, understandable announcements, emergency messaging, sensible network design and support staff can rely on. This guide combines current Ministry requirements with published New Zealand supplier approaches and school projects so you can write a better brief before choosing a brand."
        tags={["School PA requirements", "Paging specification", "School bells", "Lockdown communication", "NZ Ministry guidance"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Check potential funding", href: "/tools/funding-check" }}
        help={{ label: "Ask SmartComms who to contact", mode: "system_selection", sourceTopic: "school_requirements" }}
        contents={[
          ["#short-version", "The short version: what to specify"],
          ["#ministry", "What the Ministry guidance actually says"],
          ["#coverage", "Coverage, zones and intelligibility"],
          ["#bells", "Bell schedules and daily announcements"],
          ["#emergency", "Lockdown and emergency communication"],
          ["#architecture", "Keep, hybrid or replace: three upgrade paths"],
          ["#network", "Network, cabling and power"],
          ["#projects", "What published NZ school projects show"],
          ["#quote-brief", "What to put in the supplier brief"],
          ["#compare", "How to compare proposals like for like"],
          ["#planning", "A practical planning sequence"],
          ["#sources", "Primary sources and market evidence"],
        ]}
        reviewed={reviewedLabel("/guides/nz-school-pa-paging-requirements")}
        note="Independent synthesis, not Ministry or engineering advice"
        breadcrumb={[{ name: "Guides", href: "/guides" }, { name: "NZ School PA & Paging Requirements" }]}
      />

      <AtAGlance
        items={[
          { label: "Best use", value: "Writing or reviewing a school PA, paging, bell and emergency-communication brief" },
          { label: "Official basis", value: "2026 Designing Schools in Aotearoa guidance plus Ministry emergency and ICT requirements" },
          { label: "Market evidence", value: "Published NZ supplier approaches and school project examples, compared as patterns rather than endorsements" },
          { label: "Next step", value: "Estimate cost, check funding, then send the same brief to suitable providers" },
        ]}
      />

      <article className="sc-container sc-container-prose py-8 sc-prose">
        <div className="not-prose rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Important distinction</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            This page helps schools define a communications requirement. It does not certify a fire alarm, evacuation system or life-safety design. Where the building or fire design requires a compliant warning system, that requirement must be established and signed off by the appropriate project professionals. A paging platform carrying an emergency message is not automatically a compliant fire or voice-alarm system.
          </p>
        </div>

        <h2 id="short-version">The short version: what a NZ school should specify</h2>
        <p>
          Start with the operational job, not a product name. A useful brief should tell every bidder who needs to hear what, where, from which control points, under normal conditions and during an emergency. It should also make clear what existing infrastructure may be reused and who owns the network, support and administration after handover.
        </p>

        <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
          {REQUIREMENTS.map((item) => (
            <div key={item.title} className="sc-card p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{item.detail}</p>
            </div>
          ))}
        </div>

        <p>
          If those eight items are written clearly, suppliers can propose different technical approaches while still solving the same problem. That is much easier to compare than asking several installers for a generic &quot;school PA system&quot; and receiving three completely different scopes.
        </p>

        <h2 id="ministry">What the Ministry guidance actually says</h2>
        <p>
          The Ministry of Education&apos;s current <em>Designing Schools in Aotearoa New Zealand</em> standards are mandatory for new builds and are to be applied where practicable to maintenance and refurbishment work. The Ministry&apos;s 2026 public-address and safety-warning section is unusually direct about the job a school PA system needs to support.
        </p>
        <p>
          The guidance says public-address systems should have capacity for fire, lockdown and other safety-warning signals needed by the school, school bells, voiced announcements and paging. It also says speaker quality and placement need to support clear speech intelligibility in learning areas. For hearing-impaired learners, the guidance calls for strobe-light warning systems where required and says newly installed safety systems should support future addition of strobes.
        </p>
        <p>
          That does not prescribe one brand or one architecture. It defines outcomes. This is why SmartComms recommends turning the outcomes into a site-specific brief before comparing platforms.
        </p>
        <p>
          Read the Ministry&apos;s current school design standards on{" "}
          <a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/property/designing-standards-new-zealand-schools" target="_blank" rel="noopener noreferrer">
            Designing standards for New Zealand schools
          </a>.
        </p>

        <h3>Emergency planning comes first</h3>
        <p>
          The Ministry&apos;s emergency-planning guidance separately asks schools to have emergency warning systems that can alert staff and students when evacuation or lockdown or shelter-in-place is required, and to have a communication plan covering staff, students, whānau and external services. The practical implication is important: the technology supports the school&apos;s emergency-management plan. It should not invent the procedure on behalf of the school.
        </p>
        <p>
          See the Ministry&apos;s{" "}
          <a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/health-and-safety/prepare-emergency-or-traumatic-incident" target="_blank" rel="noopener noreferrer">
            emergency and traumatic incident planning guidance
          </a>{" "}
          and SmartComms&apos; <Link href="/systems/emergency-lockdown">school emergency communication guide</Link>.
        </p>

        <h2 id="coverage">Coverage, zones and intelligibility</h2>
        <p>
          A specification should describe where speech must be understood, not simply count speakers. A typical school can contain very different acoustic environments: carpeted classrooms, hard corridors, a reverberant hall, a gym, workshops, covered courts, fields and detached blocks. The system needs to be designed around those spaces.
        </p>

        <h3>Build a coverage map before asking for brands</h3>
        <ul>
          <li>Mark every classroom, office, staff area, library, hall, gym and specialist room that needs routine announcements.</li>
          <li>Mark outdoor spaces including courts, fields, bus areas, gates, assembly areas and covered walkways.</li>
          <li>Identify high-noise areas such as technology workshops, kitchens and some sports spaces.</li>
          <li>Identify spaces where a hearing-impaired learner or staff member may need a visual warning pathway.</li>
          <li>Record areas where sound spilling into neighbours or nearby classrooms needs to be controlled.</li>
        </ul>

        <h3>Then define zones around how the school works</h3>
        <p>
          Zones should follow operational needs. A school may need a whole-site page, junior and senior blocks, indoor and outdoor groups, a hall-only zone and individual room addressing. A flexible IP system can make software zoning easy, but the specification still needs to say what staff actually need to select.
        </p>
        <p>
          Published NZ projects illustrate why this matters. Edwards describes Three Kings Primary using classroom, common-area and four outdoor zones. The Thorndon Primary case study describes zone-specific announcements and individual speaker volume management. These are different technical implementations, but both start from the same question: which areas need to be controlled independently?
        </p>

        <h2 id="bells">Bell schedules and daily announcements</h2>
        <p>
          Bell scheduling sounds simple until term dates, alternate timetables, assemblies, exams, teacher-only days, weather changes and one-off events are involved. The brief should establish who can edit the calendar, whether schedules can differ by zone, how a bell is paused or advanced, and what happens when the network or controller is unavailable.
        </p>

        <h3>There are several valid ways to modernise school bells</h3>
        <p>
          The NZ market demonstrates that a bell upgrade does not always require a complete PA replacement. SchoolBells.nz publishes a web-managed scheduler designed to work with existing class-change bell sounders. Edwards&apos; Netbell material describes network scheduling that can automate an existing bell system or interface into PA equipment. At the other end of the spectrum, FrontRow, Axis and other network-audio platforms can make the bell schedule one function inside a wider paging and emergency-communication system.
        </p>
        <p>
          That is why the specification should describe the outcome and existing equipment first. If the current sounders, amplifiers or speaker lines remain useful, the best-value answer may be a control upgrade or hybrid design. If coverage, zoning and emergency communication are all deficient, a broader replacement can make more sense.
        </p>
        <p>
          For the upgrade choices in more detail, use the <Link href="/systems/school-bell-announcements">school bell and announcements guide</Link>.
        </p>

        <h2 id="emergency">Lockdown and emergency communication</h2>
        <p>
          Emergency functionality should be specified as a workflow, not as a checkbox that says &quot;lockdown capable&quot;. Ask suppliers to demonstrate how an authorised staff member starts an alert, what is heard or seen, how normal bells and announcements are overridden, how the message is repeated, how the event is cancelled and how the all-clear is issued.
        </p>

        <h3>Write these questions into the brief</h3>
        <ul>
          <li><strong>What events are required?</strong> For example lockdown, evacuation, shelter in place, medical or another school-defined response.</li>
          <li><strong>Who can trigger them?</strong> Reception, principal, selected offices, software users, physical buttons or another approved control point.</li>
          <li><strong>How many trigger locations are needed?</strong> Avoid a design that depends on reaching one desk during an incident.</li>
          <li><strong>What takes priority?</strong> Emergency audio should not be blocked by routine bells, music or a normal page.</li>
          <li><strong>What is the cancellation and all-clear process?</strong> Staff should not need to improvise it under pressure.</li>
          <li><strong>Which areas receive which message?</strong> Whole-site and zone-specific use cases may differ.</li>
          <li><strong>What happens during a power, server or network fault?</strong> The required resilience should be agreed for the project rather than assumed from a product brochure.</li>
          <li><strong>Are visual warnings required?</strong> Include accessibility and future strobe integration where the school&apos;s needs require it.</li>
        </ul>

        <p>
          Three Kings Primary&apos;s published system used two paging stations for emergency activation and pre-recorded messages. Ormiston&apos;s published FrontRow project included lockdown triggers alongside paging and bells. Thorndon&apos;s published Axis project used the same network-audio environment for routine communication and lockdown support. The common lesson is not that one product is best. It is that emergency use has to be designed into the operating brief from the start.
        </p>

        <h2 id="architecture">Keep, hybrid or replace: three upgrade paths</h2>
        <p>
          One of the easiest ways to overspend on a school communication project is to assume every existing component must go. One of the easiest ways to under-specify it is to keep old infrastructure without testing whether it can deliver the required coverage and zones. A good supplier should be able to explain which of the following patterns fits the school and why.
        </p>

        <div className="not-prose mt-6 grid gap-5 lg:grid-cols-3">
          <div className="sc-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Option 1</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">Modernise control, keep the sounders</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
              Best when the main problem is scheduling or manual control and existing bells or sounders still perform well. NZ examples include web or network schedulers designed to automate existing bell infrastructure.
            </p>
          </div>
          <div className="sc-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Option 2</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">Use network control with retained PA</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
              Best when useful 100V amplifiers, speaker circuits or outdoor speakers can be retained but the school needs better scheduling, zone control or network integration. FrontRow, for example, publishes network interfaces intended to connect its IP system to standard 100V amplifiers and speakers.
            </p>
          </div>
          <div className="sc-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Option 3</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">Move to distributed network audio</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
              Best when room-level control, flexible zones, monitoring, expansion or broad replacement is justified. Published NZ school projects show both server-managed and browser-managed network-audio approaches.
            </p>
          </div>
        </div>

        <p>
          A proposal should make the reuse decision explicit. Ask what was tested, what remains in scope, what becomes the school&apos;s future support responsibility and whether retaining old infrastructure limits any required zone, intelligibility or emergency function. SmartComms&apos; <Link href="/systems/traditional-vs-ip">traditional vs IP guide</Link> explains this trade-off in more detail.
        </p>

        <h2 id="network">Network, cabling and power</h2>
        <p>
          IP paging is not simply &quot;plug it into the network&quot;. The school needs to know which switches will carry the endpoints, how much PoE power is available, whether VLAN or multicast configuration is required, where controllers or servers live, how devices are backed up and who supports the network configuration after handover.
        </p>

        <h3>Ministry ICT rules matter when the project touches school network infrastructure</h3>
        <p>
          The Ministry says data-cable installation, wireless integration and structured-cabling product supply in schools must use approved ICT contractors and approved products. It also publishes technical standards for school cabling, switching and wireless networks. If a paging project requires new structured cabling or changes to the school&apos;s ICT infrastructure, the communication-system installer and the approved ICT contractor may need clearly separated responsibilities.
        </p>
        <p>
          The Ministry&apos;s school-led network-upgrade process also emphasises defining project outcomes, auditing the existing network, confirming a design, testing the finished network and retaining as-built and warranty documentation. Those are sensible disciplines for a network-audio project even where the paging work itself is not a complete network upgrade.
        </p>
        <p>
          Read the Ministry&apos;s{" "}
          <a href="https://www.education.govt.nz/suppliers-and-providers/infrastructure-and-property/school-projects/information-and-communications-technology-contractor-standards-and-processes" target="_blank" rel="noopener noreferrer">
            ICT contractor standards and processes
          </a>{" "}
          and use SmartComms&apos; <Link href="/guides/ip-paging-network-readiness">IP paging network readiness checklist</Link> before the quote stage.
        </p>

        <h3>Ask for a written responsibility matrix</h3>
        <p>
          For a networked or hybrid design, the quote should identify who is responsible for data cabling, switch ports, PoE capacity, VLANs, multicast or QoS settings if used, UPS power, endpoint configuration, server or cloud administration, firmware, configuration backups and fault diagnosis. Without that matrix, a school can end up between an AV installer and an IT provider when a fault crosses both systems.
        </p>

        <h2 id="projects">What published NZ school projects show</h2>
        <p>
          Public case studies are useful because they show how real schools have combined daily and emergency communication. They are still supplier-published accounts, not independent performance tests, and older projects may use products that have since changed or reached end of life. SmartComms uses them to identify design patterns, not to rank installers.
        </p>

        <div className="not-prose mt-6 space-y-4">
          {PROJECTS.map((project) => (
            <div key={project.school} className="sc-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">{project.school}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-blue-700)]">Published by {project.source}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[var(--sc-navy)]">{project.approach}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{project.lesson}</p>
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-[var(--sc-blue-700)] underline decoration-[var(--sc-teal)] decoration-2 underline-offset-4">
                Read the published project source
              </a>
            </div>
          ))}
        </div>

        <h3>What the supplier market adds beyond those projects</h3>
        <p>
          Different NZ suppliers highlight different parts of the decision. SchoolBells.nz focuses on retaining existing class-change sounders while modernising scheduling. Edwards publishes both network bell controllers and integrated school paging examples. Pacific AV&apos;s FrontRow material shows server-managed bell, paging and lockdown workflows with interfaces for existing 100V audio. New Era emphasises using the school network for paging, bells and emergency announcements. Axis documents network speakers, software zones, scheduling and audio management. None of those perspectives is the whole specification by itself, but together they show the range of choices a school should make deliberately.
        </p>

        <h2 id="quote-brief">What to put in the supplier brief</h2>
        <p>
          The easiest way to get comparable proposals is to give every supplier the same operational brief and ask each one to state where it complies, where it differs and what is excluded. The table below is a useful starting point.
        </p>

        <div className="not-prose overflow-x-auto rounded-2xl border border-[var(--sc-border)]">
          <table className="min-w-[760px] w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-[var(--sc-blue-50)] text-[var(--sc-navy)]">
              <tr>
                <th className="border-b border-[var(--sc-border)] px-4 py-3 font-semibold">Requirement</th>
                <th className="border-b border-[var(--sc-border)] px-4 py-3 font-semibold">Put this in the brief</th>
                <th className="border-b border-[var(--sc-border)] px-4 py-3 font-semibold">Ask the bidder to return</th>
              </tr>
            </thead>
            <tbody className="text-[var(--sc-slate)]">
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Coverage</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Marked plan of every indoor and outdoor area to be covered</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Speaker or endpoint plan, assumptions and excluded areas</td></tr>
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Zones</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Required whole-site, block, outdoor, hall and room groups</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">How zones are created, selected and changed later</td></tr>
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Bells</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Normal calendar, alternate days, holidays and manual override</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Who can edit schedules and whether software/licensing is included</td></tr>
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Live paging</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Paging locations, zone selection and priority rules</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Console, handset or software workflow demonstrated</td></tr>
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Emergency messaging</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">School-defined messages, triggers, authorisation, priority, cancellation and all-clear</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Exact activation workflow, dependencies and resilience assumptions</td></tr>
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Accessibility</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Known visual-warning or hearing-support requirements</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Current provision plus future expansion path</td></tr>
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Existing equipment</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Speakers, amplifiers, cabling, sounders and network equipment that may be retained</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">What is reused, what is tested, what is replaced and why</td></tr>
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Network</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Available ports, PoE, network standards and IT contact</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Port and PoE schedule, network dependencies and responsibility matrix</td></tr>
              <tr><td className="border-b border-[var(--sc-grey)] px-4 py-3 font-semibold text-[var(--sc-navy)]">Support</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Required training, fault response and administration ownership</td><td className="border-b border-[var(--sc-grey)] px-4 py-3">Warranty, support route, software costs, backups and handover documents</td></tr>
              <tr><td className="px-4 py-3 font-semibold text-[var(--sc-navy)]">Commercial</td><td className="px-4 py-3">Requested price breakdown and installation window</td><td className="px-4 py-3">Equipment, labour, cabling/network work, licences, exclusions, GST and lead times</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          For a shorter version you can attach directly to a request for quotation, use the <Link href="/guides/school-pa-specification-checklist">school PA specification checklist</Link>.
        </p>

        <h2 id="compare">How to compare proposals like for like</h2>
        <p>
          Do not compare only the equipment total. Two bids can look similar while one includes outdoor coverage, emergency controls, switch upgrades, training and support and the other excludes them. Ask every supplier to respond to the same brief and separate the following costs where relevant.
        </p>
        <ul>
          <li>Head-end controllers, servers or cloud subscriptions</li>
          <li>Paging consoles, microphones, call stations or software clients</li>
          <li>Indoor speakers, outdoor horns and room interfaces</li>
          <li>Intercom or talkback endpoints where required</li>
          <li>Existing-equipment interfaces and amplifier work</li>
          <li>Structured cabling, patching, network switching or PoE changes</li>
          <li>UPS or other backup-power provision</li>
          <li>Programming, commissioning, coverage testing and staff training</li>
          <li>Software licences, subscriptions, remote support and ongoing maintenance</li>
          <li>As-built drawings, configuration backups and administrator credentials</li>
        </ul>
        <p>
          Then compare the actual operating result. Can reception page one block without disturbing the rest of the school? Can a timetable change be made without a technician? Can the required emergency message be triggered from the agreed locations? Can the school&apos;s IT provider identify which network components it owns? A demonstration against the brief is more useful than a feature list.
        </p>

        <h2 id="planning">A practical planning sequence</h2>
        <ol>
          <li><strong>Document the problem.</strong> Record current coverage gaps, unreliable equipment, manual bell tasks, emergency-communication limitations and known support issues.</li>
          <li><strong>Map the site.</strong> Mark every area that needs speech, bells, emergency warnings or two-way communication.</li>
          <li><strong>Decide what might be retained.</strong> List current speakers, amplifiers, bell sounders, cabling and network switching without assuming they are either reusable or obsolete.</li>
          <li><strong>Write the operational brief.</strong> Use the requirements and quote table above, then attach the short <Link href="/guides/school-pa-specification-checklist">specification checklist</Link>.</li>
          <li><strong>Get an indicative budget.</strong> Use the <Link href="/pricing-tool">SmartComms Pricing Tool</Link> before formal design so the school has a planning range.</li>
          <li><strong>Check the funding path.</strong> For a state school, use the <Link href="/tools/funding-check">Funding Checker</Link> and then confirm the actual property route with the school&apos;s property advisor and current Ministry guidance.</li>
          <li><strong>Explore finance only if relevant.</strong> If spreading the project cost is useful, use the <Link href="/tools/finance-check">Finance Checker</Link> as an indicative starting point.</li>
          <li><strong>Send the same brief to suitable providers.</strong> Compare how each design meets the required outcomes rather than asking each supplier to define the scope for you.</li>
        </ol>

        <div className="not-prose mt-8 rounded-2xl bg-[var(--sc-navy)] p-6 text-white sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Free planning tools</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Turn the specification into a planning number</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-white/85">
            Estimate the likely project cost first. NZ schools can then check a potential property-funding pathway, and any organisation can explore whether finance is worth discussing. When the brief is ready, SmartComms can review it and reply with the providers we think are best suited for you to contact first.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/pricing-tool" className="sc-btn-light">Get a price estimate</Link>
            <Link href="/tools/funding-check" className="sc-btn-outline-light">Check school funding</Link>
            <Link href="/tools/finance-check" className="sc-btn-outline-light">Check finance options</Link>
          </div>
        </div>

        <h2 id="sources">Primary sources and market evidence</h2>
        <p>
          The page is built from official Ministry requirements plus public supplier and project material. Product and project examples are included to show design approaches, not as SmartComms endorsements or independent performance tests.
        </p>
        <ul>
          <li>
            <a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/property/designing-standards-new-zealand-schools" target="_blank" rel="noopener noreferrer">Ministry of Education: Designing standards for New Zealand schools</a>
          </li>
          <li>
            <a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/health-and-safety/prepare-emergency-or-traumatic-incident" target="_blank" rel="noopener noreferrer">Ministry of Education: Prepare for an emergency or traumatic incident</a>
          </li>
          <li>
            <a href="https://www.education.govt.nz/suppliers-and-providers/infrastructure-and-property/school-projects/information-and-communications-technology-contractor-standards-and-processes" target="_blank" rel="noopener noreferrer">Ministry of Education: ICT contractor standards and processes</a>
          </li>
          <li>
            <a href="https://www.edwardsnz.co.nz/school-uses-paging-system-for-tighter-lockdown-procedures" target="_blank" rel="noopener noreferrer">Edwards Sound Systems: Three Kings Primary published project</a>
          </li>
          <li>
            <a href="https://www.pacificav.co.nz/ormiston-junior-college-auckland/" target="_blank" rel="noopener noreferrer">Pacific AV: Ormiston Junior College published project</a>
          </li>
          <li>
            <a href="https://cie-group.com/project/thorndon-primary/" target="_blank" rel="noopener noreferrer">CIE Group: Thorndon Primary School published project</a>
          </li>
          <li>
            <a href="https://www.schoolbells.nz/" target="_blank" rel="noopener noreferrer">SchoolBells.nz: existing-bell scheduling approach</a>
          </li>
          <li>
            <a href="https://www.pacificav.co.nz/product/frontrow-networked-audio-devices/" target="_blank" rel="noopener noreferrer">Pacific AV: FrontRow network and 100V integration examples</a>
          </li>
          <li>
            <a href="https://www.neweratech.com/en-nz/resources/blog/pa-bell-systems" target="_blank" rel="noopener noreferrer">New Era Technology: NZ school bell and paging overview</a>
          </li>
        </ul>

        <ContinuePlanning
          help={{
            title: "Ready to turn the brief into supplier conversations?",
            description:
              "Tell SmartComms about the school, region, existing system and the outcomes that matter. We will review the project and reply with the providers we think are best suited for you to contact first.",
            buttonLabel: "Ask SmartComms who to contact",
            mode: "system_selection",
            sourceTopic: "school_requirements",
          }}
          items={[
            { title: "School pricing tool", desc: "Get an indicative installed project range before formal quotes.", href: "/pricing-tool" },
            { title: "School funding checker", desc: "See whether the fixed-infrastructure scope may have a potential property-funding pathway.", href: "/tools/funding-check" },
            { title: "Compare school platforms", desc: "Compare current school paging, bell and intercom approaches against the same brief.", href: "/compare/schools" },
          ]}
        />

        <p className="mt-8 text-xs text-[var(--sc-slate)]">
          Last reviewed {reviewedLabel("/guides/nz-school-pa-paging-requirements")}. Independent synthesis of public Ministry, supplier and project sources. Always confirm current Ministry, building, fire, ICT and procurement requirements for the actual project.
        </p>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              articleSchema({
                headline: "NZ School PA, Paging & Bell System Requirements",
                description:
                  "A New Zealand school specification guide covering PA, paging, bells, emergency communication, coverage, network design, reuse and supplier comparison.",
                url: `${site.url}/guides/nz-school-pa-paging-requirements`,
                datePublished: publishedDate("/guides/nz-school-pa-paging-requirements"),
                dateModified: reviewedDate("/guides/nz-school-pa-paging-requirements"),
              })
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema([
                { name: "Home", url: site.url },
                { name: "Guides", url: `${site.url}/guides` },
                { name: "NZ School PA & Paging Requirements", url: `${site.url}/guides/nz-school-pa-paging-requirements` },
              ])
            ),
          }}
        />
      </article>
    </div>
  );
}
