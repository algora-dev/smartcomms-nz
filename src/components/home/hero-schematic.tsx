/**
 * Static SVG schematic of a modern site communication system.
 * Pure CSS animation (line pulse) — no JS required, and the diagram
 * is fully readable with animations disabled.
 */
export function HeroSchematic() {
  return (
    <svg
      viewBox="0 0 420 320"
      role="img"
      aria-label="Diagram: a paging console connects to the site network and PoE switches, which feed classroom speakers, outdoor horns, clocks, intercom and door access endpoints."
      className="w-full h-auto"
    >
      <defs>
        <marker id="sc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--sc-blue-500)" />
        </marker>
      </defs>

      {/* console */}
      <g>
        <rect x="16" y="40" width="120" height="56" rx="10" fill="#fff" stroke="var(--sc-blue-600)" strokeWidth="1.5" />
        <text x="76" y="64" textAnchor="middle" fontSize="12" fill="var(--sc-blue-900)" fontWeight="600">Paging console</text>
        <text x="76" y="80" textAnchor="middle" fontSize="10" fill="var(--sc-slate-text)">software / scheduler</text>
      </g>

      {/* network */}
      <g>
        <rect x="16" y="140" width="120" height="56" rx="10" fill="#fff" stroke="var(--sc-blue-600)" strokeWidth="1.5" />
        <text x="76" y="164" textAnchor="middle" fontSize="12" fill="var(--sc-blue-900)" fontWeight="600">Site network</text>
        <text x="76" y="180" textAnchor="middle" fontSize="10" fill="var(--sc-slate-text)">PoE switches</text>
      </g>

      {/* endpoints */}
      {[
        { y: 24, label: "Classroom speakers" },
        { y: 82, label: "Outdoor horns" },
        { y: 140, label: "Clocks & displays" },
        { y: 198, label: "Intercom stations" },
        { y: 256, label: "Door access" },
      ].map((e) => (
        <g key={e.label}>
          <rect x="268" y={e.y} width="136" height="44" rx="10" fill="#fff" stroke="var(--sc-teal)" strokeWidth="1.5" />
          <text x="336" y={e.y + 26} textAnchor="middle" fontSize="11" fill="var(--sc-charcoal)">{e.label}</text>
        </g>
      ))}

      {/* connectors */}
      <g stroke="var(--sc-blue-500)" strokeWidth="1.5" markerEnd="url(#sc-arrow)" fill="none">
        <line x1="76" y1="96" x2="76" y2="136" className="sc-flow" />
        <line x1="136" y1="168" x2="216" y2="168" />
        <line x1="216" y1="168" x2="216" y2="46" />
        <line x1="216" y1="46" x2="262" y2="46" className="sc-flow" />
        <line x1="216" y1="168" x2="216" y2="104" />
        <line x1="216" y1="104" x2="262" y2="104" className="sc-flow" />
        <line x1="216" y1="168" x2="262" y2="162" className="sc-flow" />
        <line x1="216" y1="168" x2="216" y2="220" />
        <line x1="216" y1="220" x2="262" y2="220" className="sc-flow" />
        <line x1="216" y1="220" x2="216" y2="278" />
        <line x1="216" y1="278" x2="262" y2="278" className="sc-flow" />
      </g>

      {/* zones caption */}
      <text x="336" y="312" textAnchor="middle" fontSize="10" fill="var(--sc-slate-text)">Zones · bells · announcements · emergency alerts</text>
    </svg>
  );
}
