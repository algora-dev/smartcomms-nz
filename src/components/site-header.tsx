"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";

const NAV = [
  { href: "/schools", label: "Schools" },
  { href: "/systems", label: "Systems" },
  { href: "/compare", label: "Compare" },
  { href: "/pricing", label: "Pricing" },
  { href: "/funding", label: "Funding" },
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("dialog[open]")) { setOpen(false); toggleRef.current?.focus({ preventScroll: true }); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
    || (href === "/compare" && pathname.startsWith("/industries/"))
    || (href === "/pricing" && pathname === "/pricing-tool");

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--sc-border)] bg-white/95 backdrop-blur">
      <div className="sc-container flex h-20 items-center justify-between gap-3 sm:gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="SmartComms NZ home" onClick={() => setOpen(false)}>
          <Image src="/brand/scnz-logo-colour-trans.png" alt="SmartComms New Zealand" width={43} height={60}
            className="h-[3.75rem] w-auto" priority />
          <span className="hidden text-xl font-bold tracking-tight text-[var(--sc-blue-900)] xl:inline-block">SCNZ</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-4 xl:flex">
          {NAV.map((item) => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}
            className="sc-nav-link">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/pricing-tool" className="sc-btn-primary hidden sm:inline-flex" onClick={() => setOpen(false)}>Get a ballpark price</Link>
          <ProjectHelpLauncher buttonLabel="Ask SmartComms" sourceTopic="site_header" className="sc-btn-secondary" />
          <button ref={toggleRef} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}
            aria-controls="sc-nav-menu" aria-label={open ? "Close menu" : "Open menu"}
            className="sc-icon-button border border-[var(--sc-border)] xl:hidden">
            {open
              ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 3 12 12M15 3 3 15" /></svg>
              : <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M1 2h18M1 8h18M1 14h18" /></svg>}
          </button>
        </div>
      </div>
      {open && <nav id="sc-nav-menu" aria-label="Mobile navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-[var(--sc-border)] bg-white xl:hidden">
        <div className="sc-container flex flex-col py-4">
          {NAV.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
            aria-current={active(item.href) ? "page" : undefined}
            className="sc-nav-link border-b border-[var(--sc-grey)] py-3 text-base last:border-0">{item.label}</Link>)}
          <Link href="/contact" className="sc-nav-link py-3" onClick={() => setOpen(false)}>Contact / corrections</Link>
          <Link href="/pricing-tool" onClick={() => setOpen(false)} className="sc-btn-primary mt-4 sm:hidden">Get a ballpark price</Link>
        </div>
      </nav>}
    </header>
  );
}
