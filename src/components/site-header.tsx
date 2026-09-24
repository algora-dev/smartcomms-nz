"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";

type NavItem = { href: string; label: string; desc?: string };
type NavGroup = { label: string; items: readonly NavItem[] };

const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "Systems",
    items: [
      { href: "/systems", label: "Systems overview", desc: "Traditional, IP and hybrid architectures" },
      { href: "/schools", label: "School communications", desc: "Paging, bells, emergency communication and intercom" },
      { href: "/systems/ip-paging-pa", label: "IP Paging & PA", desc: "Network paging, zoning and announcements" },
      { href: "/systems/school-bell-announcements", label: "School Bells & Announcements", desc: "Schedules, paging and daily school communication" },
      { href: "/systems/emergency-lockdown", label: "Emergency & Lockdown", desc: "Urgent messaging, coverage and resilience" },
      { href: "/systems/ip-intercom", label: "IP Intercom", desc: "Two-way calling, gates and video entry" },
      { href: "/systems/traditional-vs-ip", label: "Traditional vs IP", desc: "What to retain and when hybrid makes sense" },
    ],
  },
  {
    label: "Compare",
    items: [
      { href: "/compare", label: "All comparisons", desc: "Choose the guide that matches your site" },
      { href: "/compare/schools", label: "Schools", desc: "Bells, paging, intercom and emergency communication" },
      { href: "/industries/aged-care-retirement-villages", label: "Aged care & retirement villages", desc: "Paging, entrance intercom and staff communication" },
      { href: "/industries/warehouses-manufacturing-industrial", label: "Warehouses & industrial", desc: "Shift bells, horns, paging and yard coverage" },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/tools", label: "All tools", desc: "Pricing, funding and finance in one place" },
      { href: "/pricing-tool", label: "Pricing Tool", desc: "Estimate an indicative installed project range" },
      { href: "/tools/funding-check", label: "Funding Checker", desc: "NZ school property-funding pathway check" },
      { href: "/tools/finance-check", label: "Finance Checker", desc: "Explore finance and leasing options" },
    ],
  },
];

const TOP_LINKS: readonly NavItem[] = [
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
    || (href === "/compare" && pathname.startsWith("/industries/"))
    || (href === "/pricing-tool" && pathname === "/pricing");

  const groupActive = (group: NavGroup) => group.items.some((item) => active(item.href));

  // Close menus on route change without setState-in-effect (React render-adjust pattern).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setDesktopOpen(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (desktopOpen && navRef.current && !navRef.current.contains(event.target as Node)) setDesktopOpen(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (document.querySelector("dialog[open]")) return;
      if (desktopOpen) setDesktopOpen(null);
      if (mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [desktopOpen, mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--sc-border)] bg-white/95 backdrop-blur">
      <div className="sc-container flex h-20 items-center justify-between gap-3 sm:gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="SmartComms NZ home">
          <Image src="/brand/scnz-logo-colour-trans.png" alt="SmartComms New Zealand" width={43} height={60}
            className="h-[3.75rem] w-auto" priority />
          <span className="hidden text-xl font-bold tracking-tight text-[var(--sc-blue-900)] xl:inline-block">SCNZ</span>
        </Link>

        <div ref={navRef} className="hidden items-center gap-1 lg:flex">
          <nav aria-label="Main navigation" className="flex items-center gap-1">
            {NAV_GROUPS.map((group) => {
              const expanded = desktopOpen === group.label;
              return (
                <div key={group.label} className="relative">
                  <button
                    type="button"
                    onClick={() => setDesktopOpen(expanded ? null : group.label)}
                    aria-expanded={expanded}
                    className="sc-nav-link gap-1.5 px-2"
                    data-active={groupActive(group) ? "true" : undefined}
                  >
                    {group.label}
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
                      <path d="m2.5 4.5 3.5 3 3.5-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {expanded ? (
                    <div className="absolute left-0 top-full z-50 mt-2 w-[21rem] rounded-2xl border border-[var(--sc-border)] bg-white p-2 shadow-[0_16px_40px_rgb(11_45_91_/_14%)]">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={active(item.href) ? "page" : undefined}
                          className="block rounded-xl px-3 py-2.5 no-underline hover:bg-[var(--sc-blue-50)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--sc-blue-700)]"
                        >
                          <span className="block text-sm font-semibold text-[var(--sc-navy)]">{item.label}</span>
                          {item.desc ? <span className="mt-0.5 block text-xs leading-relaxed text-[var(--sc-slate)]">{item.desc}</span> : null}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            {TOP_LINKS.map((item) => (
              <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} className="sc-nav-link px-2">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ProjectHelpLauncher buttonLabel="Ask SmartComms" sourceTopic="site_header" className="sc-btn-secondary hidden sm:inline-flex" />
          <ProjectHelpLauncher buttonLabel="Ask us" sourceTopic="site_header_mobile" className="sc-btn-secondary sm:hidden" />
          <button ref={toggleRef} type="button" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen}
            aria-controls="sc-nav-menu" aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="sc-icon-button border border-[var(--sc-border)] lg:hidden">
            {mobileOpen
              ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 3 12 12M15 3 3 15" /></svg>
              : <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M1 2h18M1 8h18M1 14h18" /></svg>}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav id="sc-nav-menu" aria-label="Mobile navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-[var(--sc-border)] bg-white lg:hidden">
          <div className="sc-container py-3">
            {NAV_GROUPS.map((group) => (
              <details key={group.label} className="border-b border-[var(--sc-grey)] py-1" open={groupActive(group)}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-2 text-base font-semibold text-[var(--sc-navy)] marker:content-none">
                  {group.label}
                  <span aria-hidden="true" className="text-[var(--sc-blue-700)]">+</span>
                </summary>
                <div className="pb-2 pl-2">
                  {group.items.map((item) => (
                    <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} className="block rounded-lg px-2 py-2.5 no-underline hover:bg-[var(--sc-blue-50)]">
                      <span className="block text-sm font-semibold text-[var(--sc-blue-700)]">{item.label}</span>
                      {item.desc ? <span className="mt-0.5 block text-xs leading-relaxed text-[var(--sc-slate)]">{item.desc}</span> : null}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            {TOP_LINKS.map((item) => (
              <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}
                className="sc-nav-link block border-b border-[var(--sc-grey)] py-3 text-base last:border-0">{item.label}</Link>
            ))}
            <Link href="/contact" className="sc-nav-link block py-3 text-base">Contact / corrections</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
