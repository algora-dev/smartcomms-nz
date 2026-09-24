import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
      <div className="sc-container grid gap-8 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-bold text-[var(--sc-blue-900)]">{site.name}</p>
          <p className="mt-2 text-[var(--sc-slate)]">{site.description}</p>
        </div>
        <div>
          <p className="font-semibold text-[var(--sc-blue-900)]">Explore</p>
          <ul className="mt-2 space-y-2 text-[var(--sc-slate)] [&_a]:inline-block [&_a]:py-1">
            <li><Link href="/systems">System types</Link></li>
            <li><Link href="/compare">Compare systems</Link></li>
            <li><Link href="/schools">School communications</Link></li>
            <li><Link href="/industries/aged-care-retirement-villages">Aged care & retirement villages</Link></li>
            <li><Link href="/industries/warehouses-manufacturing-industrial">Warehouses & industrial</Link></li>
            <li><Link href="/guides">Guides</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-[var(--sc-blue-900)]">Planning tools</p>
          <ul className="mt-2 space-y-2 text-[var(--sc-slate)] [&_a]:inline-block [&_a]:py-1">
            <li><Link href="/pricing-tool">Pricing Tool</Link></li>
            <li><Link href="/tools/funding-check">Funding Checker</Link></li>
            <li><Link href="/tools/finance-check">Finance Checker</Link></li>
            <li><Link href="/pricing">Pricing guide</Link></li>
            <li><Link href="/funding">School funding guide</Link></li>
            <li><Link href="/financing">Finance & leasing guide</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-[var(--sc-blue-900)]">About this site</p>
          <ul className="mt-2 space-y-2 text-[var(--sc-slate)] [&_a]:inline-block [&_a]:py-1">
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
        © {new Date().getFullYear()} {site.name}. Operated by {site.operator}. Information is general in nature. Indicative pricing, funding or finance guidance should be confirmed for the specific project.
      </div>
    </footer>
  );
}
