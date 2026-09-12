"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--sc-border)] bg-white/95 backdrop-blur">
      <div className="sc-container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="SmartComms NZ home">
          <Image
            src="/brand/scnz-logo-colour.png"
            alt="SmartComms New Zealand"
            width={180}
            height={44}
            className="h-[3.75rem] w-auto cursor-pointer transition-all duration-200 ease-out hover:scale-[1.05] hover:drop-shadow-[0_6px_22px_rgba(44,177,165,0.55)]"
            priority
          />
          <span className="hidden cursor-pointer text-xl font-bold tracking-tight text-[var(--sc-blue-900)] transition-all duration-200 ease-out hover:scale-[1.08] hover:drop-shadow-[0_6px_22px_rgba(44,177,165,0.55)] xl:inline-block">SCNZ</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--sc-slate)] transition-colors hover:text-[var(--sc-blue-900)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/pricing-tool" className="sc-btn-primary hidden text-sm sm:inline-flex">
            Get a ballpark price
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sc-nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--sc-border)] text-[var(--sc-blue-900)] transition-colors hover:bg-[var(--sc-blue-50)] lg:hidden"
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ display: open ? "none" : "block" }}
            >
              <path d="M1 1h18M1 7h18M1 13h18" />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ display: open ? "block" : "none" }}
            >
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="sc-nav-menu" aria-label="Mobile navigation" className="border-t border-[var(--sc-border)] bg-white lg:hidden">
          <div className="sc-container flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--sc-grey)] py-3 text-base font-medium text-[var(--sc-slate)] transition-colors last:border-0 hover:text-[var(--sc-blue-700)]"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/pricing-tool" onClick={() => setOpen(false)} className="sc-btn-primary mt-4 justify-center sm:hidden">
              Get a ballpark price
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
