import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)] mt-16">
      <div className="sc-container py-12 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <p className="font-bold text-[var(--sc-blue-900)]">{site.name}</p>
          <p className="mt-2 text-[var(--sc-slate)]">{site.description}</p>
        </div>
        <div>
          <p className="font-semibold text-[var(--sc-blue-900)]">Explore</p>
          <ul className="mt-2 space-y-1 text-[var(--sc-slate)]">
            <li><Link href="/systems">System types</Link></li>
            <li><Link href="/guides">Guides</Link></li>
            <li><Link href="/pricing">NZ Cost Index</Link></li>
            <li><Link href="/tools">Tools</Link></li>
            <li><Link href="/compare">System comparisons</Link></li>
            <li><Link href="/funding">Funding options</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-[var(--sc-blue-900)]">About this site</p>
          <ul className="mt-2 space-y-1 text-[var(--sc-slate)]">
            <li><Link href="/about">About SmartComms</Link></li>
            <li><Link href="/about/methodology">Research methodology</Link></li>
            <li><Link href="/about/disclosure">Commercial relationships</Link></li>
            <li><Link href="/about/editorial-policy">Editorial policy</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--sc-border)] py-4 text-center text-xs text-[var(--sc-slate)]">
        © {new Date().getFullYear()} {site.name}. Operated by {site.operator}. Information on this
        site is general in nature and dates shown apply to pricing and specifications.
      </div>
    </footer>
  );
}
