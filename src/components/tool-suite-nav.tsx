import Link from "next/link";

export type ToolSuiteKey = "pricing" | "funding" | "finance";

const TOOLS: readonly { key: ToolSuiteKey; href: string; label: string; short: string }[] = [
  { key: "pricing", href: "/pricing-tool", label: "Pricing Tool", short: "Estimate cost" },
  { key: "funding", href: "/tools/funding-check", label: "Funding Checker", short: "NZ schools" },
  { key: "finance", href: "/tools/finance-check", label: "Finance Checker", short: "Finance & leasing" },
];

export function ToolSuiteNav({ current, className = "mt-6" }: { current: ToolSuiteKey; className?: string }) {
  return (
    <nav aria-label="SmartComms planning tools" className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-slate)]">Planning tools</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TOOLS.map((tool) => {
          const active = tool.key === current;
          return (
            <Link
              key={tool.key}
              href={tool.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold no-underline transition-colors ${
                active
                  ? "border-[var(--sc-navy)] bg-[var(--sc-navy)] text-white"
                  : "border-[var(--sc-border)] bg-white text-[var(--sc-blue-700)] hover:border-[var(--sc-blue-500)] hover:bg-[var(--sc-blue-50)] hover:text-[var(--sc-navy)]"
              }`}
            >
              <span>{tool.label}</span>
              <span className={`hidden text-xs font-medium sm:inline ${active ? "text-white/75" : "text-[var(--sc-slate)]"}`}>{tool.short}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
