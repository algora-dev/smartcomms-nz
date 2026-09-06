"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/systems", label: "Systems" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Tools" },
  { href: "/compare", label: "Compare" },
  { href: "/funding", label: "Funding" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--sc-border)] bg-white sticky top-0 z-40">
      <div className="sc-container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2" aria-label="SmartComms NZ home">
          <Image
            src="/brand/scnz-logo-colour.png"
            alt="SmartComms New Zealand"
            width={180}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/tools/system-planner"
            className="sc-btn-primary text-sm hidden sm:inline-flex"
          >
            Estimate your system
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sc-nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--sc-border)] text-[var(--sc-blue-900)] hover:bg-[var(--sc-blue-50)] transition-colors"
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
        <nav
          id="sc-nav-menu"
          aria-label="Main navigation"
          className="border-t border-[var(--sc-border)] bg-white"
        >
          <div className="sc-container py-4 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-[var(--sc-slate)] hover:text-[var(--sc-blue-700)] border-b border-[var(--sc-grey)] last:border-0 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/tools/system-planner"
              onClick={() => setOpen(false)}
              className="sc-btn-primary mt-4 justify-center sm:hidden"
            >
              Estimate your system
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
