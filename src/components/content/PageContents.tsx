/** Server-rendered in-page navigation. Destinations must name real page sections. */
export function PageContents({ items, label = "On this page" }: {
  items: readonly (readonly [string, string])[];
  label?: string;
}) {
  return <nav aria-label={label} className="not-prose mt-7 border-t border-[var(--sc-border)] pt-4">
    <p className="sc-eyebrow">On this page</p>
    <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {items.map(([href, text]) => <li key={href}><a href={href}
        className="inline-flex min-h-9 items-center rounded py-1 font-medium text-[var(--sc-blue-700)] underline decoration-[var(--sc-border)] underline-offset-4 hover:decoration-current">{text}</a></li>)}
    </ul>
  </nav>;
}
