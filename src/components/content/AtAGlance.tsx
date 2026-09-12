export default function AtAGlance({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <section className="sc-container max-w-[1150px] pb-2" aria-label="At a glance">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-border)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="bg-white p-5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
