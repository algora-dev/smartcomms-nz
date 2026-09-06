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
  return (
    <header className="border-b border-[var(--sc-border)] bg-white sticky top-0 z-40">
      <div className="sc-container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/scnz-logo-colour.png"
            alt="SmartComms New Zealand"
            width={180}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--sc-slate)] hover:text-[var(--sc-blue-700)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/tools/system-planner" className="sc-btn-primary text-sm">
            Estimate your system
          </Link>
        </nav>
      </div>
    </header>
  );
}
