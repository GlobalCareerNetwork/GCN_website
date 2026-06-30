// Tiled stats block — 4 cells, 3 colors, no gaps, no outer border-radius.
// Secondary tone --color-stats-ink (#3D3926, deep warm olive) used here only.

const STATS = [
  { value: "2,000+", label: "Members",          bg: "var(--color-stats-ink)", fg: "#F5F1E8", labelFg: "rgba(245,241,232,0.6)" },
  { value: "88",     label: "Countries",         bg: "var(--color-surface-white)", fg: "var(--color-black-soft)", labelFg: "var(--color-gray-muted)" },
  { value: "300+",   label: "Avg Attendees",     bg: "var(--color-brand-red)", fg: "#fff", labelFg: "rgba(255,255,255,0.7)" },
  { value: "12+",    label: "Events / Semester", bg: "var(--color-stats-ink)", fg: "#F5F1E8", labelFg: "rgba(245,241,232,0.6)" },
];

export default function StatsBlock() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 w-full overflow-hidden"
      aria-label="GCN impact statistics"
      role="list"
    >
      {STATS.map(({ value, label, bg, fg, labelFg }) => (
        <div
          key={label}
          role="listitem"
          className="flex flex-col items-start justify-end px-8 py-10 md:px-10 md:py-14"
          style={{ background: bg }}
        >
          <p
            className="font-extrabold leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              color: fg,
            }}
          >
            {value}
          </p>
          <p
            className="mt-3 text-sm font-medium uppercase tracking-widest"
            style={{ color: labelFg }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
