import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
      <div className="sc-container grid gap-8 py-12 text-sm md:grid-cols-3">
        <div>
          <p className="font-bold text-[var(--sc-blue-900)]">{site.name}</p>
          <p className="mt-2 text-[var(--sc-slate)]">{site.description}</p>
        </div>
        <div>
          <p className="font-semibold text-[var(--sc-blue-900)]">Explore</p>
          <ul className="mt-2 space-y-1 text-[var(--sc-slate)]">
            <li><Link href="/schools">School communications</Link></li>
            <li><Link href="/systems">System types</Link></li>
            <li><Link href="/compare">Compare systems</Link></li>
            <li><Link href="/pricing">NZ pricing guide</Link></li>
            <li><Link href="/pricing-tool">Ballpark cost calculator</Link></li>
            <li><Link href="/funding">School funding guide</Link></li>
            <li><Link href="/tools/funding-check">School funding check</Link></li>
            <li><Link href="/guides">Guides</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-[var(--sc-blue-900)]">About this site</p>
          <ul className="mt-2 space-y-1 text-[var(--sc-slate)]">
            <li><Link href="/about">About SmartComms</Link></li>
            <li><Link href="/about/methodology">Research methodology</Link></li>
            <li><Link href="/about/disclosure">Commercial relationships</Link></li>
            <li><Link href="/about/editorial-policy">Editorial policy</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--sc-border)] py-4 text-center text-xs text-[var(--sc-slate)]">
        © {new Date().getFullYear()} {site.name}. Operated by {site.operator}. Information is general in nature and indicative pricing or funding guidance should be confirmed for the specific project.
      </div>
    </footer>
  );
}
