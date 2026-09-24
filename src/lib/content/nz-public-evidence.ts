export type NzPublicEvidenceItem = {
  id: string;
  title: string;
  source: string;
  href: string;
  summary: string;
  note?: string;
};

export const NZ_PUBLIC_EVIDENCE = {
  threeKings: {
    id: "three-kings-primary",
    title: "Three Kings Primary — paging, bells and emergency messages",
    source: "Edwards Sound Systems",
    href: "https://www.edwardsnz.co.nz/school-uses-paging-system-for-tighter-lockdown-procedures",
    summary:
      "Edwards describes a network paging installation covering classrooms, common areas and four outdoor zones, with scheduled bells/music plus prerecorded emergency messages triggered from paging stations.",
    note: "Published NZ installer account · March 2024; historical project equipment should not be assumed current.",
  },
  ormiston: {
    id: "ormiston-junior-college",
    title: "Ormiston Junior College — network bells, paging and lockdown controls",
    source: "Pacific AV",
    href: "https://www.pacificav.co.nz/ormiston-junior-college-auckland/",
    summary:
      "Pacific AV describes a FrontRow network paging and bell design using server-managed zones, network decoders feeding amplifier channels, scheduled audio and lockdown controls. Australasian Audio Engineering is named as the dealer.",
    note: "Published NZ distributor account · August 2017; useful architecture example, not a current product-availability claim.",
  },
  richmondRoad: {
    id: "richmond-road-primary",
    title: "Richmond Road Primary — IP paging over the school network",
    source: "Edwards Sound Systems",
    href: "https://www.edwardsnz.co.nz/improving-student-engagement-at-richmond-road-primary",
    summary:
      "Edwards describes a school-wide IP paging project using the existing LAN/Wi-Fi environment, software zoning and VoIP integration so announcements can be made without a separate school-wide audio-cabling architecture.",
    note: "Published NZ installer account · April 2024; the cited 2N audio family is historical for new-build comparison purposes.",
  },
  sanitarium: {
    id: "sanitarium-auckland",
    title: "Sanitarium Auckland — two-zone warehouse paging",
    source: "Audio Connect",
    href: "https://audioconnect.co.nz/blogs/news/sanitarium-warehouse-pa-system",
    summary:
      "Audio Connect describes a warehouse PA project combining background music and paging across the main warehouse and a truck-driver area. It is a useful reminder that the right paging architecture depends on the site rather than IP being mandatory everywhere.",
    note: "Published NZ installer account · September 2026.",
  },
  summersetStJohns: {
    id: "summerset-st-johns",
    title: "Summerset St Johns — entrance intercom within a wider security design",
    source: "G&S Technologies",
    href: "https://gstechnologies.co.nz/case-studies/summerset-st-johns/",
    summary:
      "G&S describes Aiphone intercoms alongside Gallagher access control, CCTV and wider ICT systems at the Auckland retirement village, illustrating that visitor intercom often needs to be specified as part of the complete entry/security workflow.",
    note: "Published NZ integrator account; separate from general PA and clinical nurse-call functions.",
  },
  sektorVerso: {
    id: "sektor-2n-verso",
    title: "2N IP Verso 2.0 — current NZ video-intercom listing",
    source: "Sektor NZ",
    href: "https://www.sektor.co.nz/Product/SEAX02907001",
    summary:
      "Sektor NZ lists the current 2N IP Verso 2.0 camera-equipped main unit, providing a local product-channel example for modular IP entrance/video intercom rather than a claim about whole-site paging capability.",
    note: "Current NZ product listing; verify final modules, licences and integration in the supplied design.",
  },
} satisfies Record<string, NzPublicEvidenceItem>;
