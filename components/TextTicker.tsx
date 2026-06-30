// Brand-red scrolling text strip — pure CSS animation, no client JS needed.
const ITEMS = [
  "CONNECT",
  "GROW",
  "LEAD",
  "CAREER READY",
  "88 COUNTRIES",
  "2,000+ MEMBERS",
  "12+ EVENTS PER SEMESTER",
  "ASPIRE HIGHER",
  "BUILD YOUR FUTURE",
  "GCN AT ASU",
];

export default function TextTicker() {
  // Triple the strip so the seam is never visible even at wide viewports
  const strip = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      style={{ background: "var(--color-brand-red)", overflow: "hidden", padding: "11px 0" }}
      aria-hidden="true"
    >
      <div
        style={{
          animation: "gcn-marquee 22s linear infinite",
          width: "max-content",
          display: "flex",
          alignItems: "center",
        }}
      >
        {strip.map((item, i) => (
          <span
            key={i}
            style={{
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "0 18px",
              opacity: 1,
            }}
          >
            {item}
            <span style={{ marginLeft: "18px", opacity: 0.35 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
