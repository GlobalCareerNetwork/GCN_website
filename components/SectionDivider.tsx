// Editorial section divider — thin maroon rules flanking a small ✦ ornament.
// Server component; replaces the harsher full-bleed breaks between sections.
export default function SectionDivider() {
  return (
    <div
      className="mx-auto max-w-5xl px-6 py-12 flex items-center gap-5"
      aria-hidden="true"
    >
      <div style={{ flex: 1, height: "1px", background: "var(--color-brand-red)", opacity: 0.25 }} />
      <span style={{ color: "var(--color-brand-red)", fontSize: "13px", lineHeight: 1 }}>✦</span>
      <div style={{ flex: 1, height: "1px", background: "var(--color-brand-red)", opacity: 0.25 }} />
    </div>
  );
}
