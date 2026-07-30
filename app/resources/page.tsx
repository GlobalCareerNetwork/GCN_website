import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { RESOURCES, type Resource } from "@/lib/data/resources";
import SectionEyebrow from "@/components/SectionEyebrow";

const resourcesDescription =
  "Curated career and immigration resources for GCN at ASU members — job search platforms, H-1B research tools, international student career guidance and AI tools at ASU.";

export const metadata: Metadata = {
  title: "Resources",
  ...pageMetadata("Resources | GCN at ASU", resourcesDescription, "/resources"),
};

// ── Icon mapping ──────────────────────────────────────────────────────────────
function ResourceIcon({ icon }: { icon: Resource["icon"] }) {
  switch (icon) {
    case "briefcase":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <rect x="2" y="7" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7.5 7V5a2 2 0 012-2h3a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 12h18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "globe":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2.5 11h17M11 2.5c2.5 2.3 3.9 5.4 3.9 8.5s-1.4 6.2-3.9 8.5c-2.5-2.3-3.9-5.4-3.9-8.5S8.5 4.8 11 2.5z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "database":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <ellipse cx="11" cy="5.5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 5.5v11c0 1.66 3.58 3 8 3s8-1.34 8-3v-11" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 11c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "compass":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14.5 7.5l-2 5-5 2 2-5 5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "spark":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M11 2.5c.5 3.2 2 5.3 5.5 6-3.5.7-5 2.8-5.5 6-.5-3.2-2-5.3-5.5-6 3.5-.7 5-2.8 5.5-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M17.5 15.5c.25 1.3.9 2.15 2.5 2.5-1.6.35-2.25 1.2-2.5 2.5-.25-1.3-.9-2.15-2.5-2.5 1.6-.35 2.25-1.2 2.5-2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ResourcesPage() {
  return (
    <div style={{ background: "var(--color-surface)" }}>

      {/* ── MASTHEAD HEADER ── */}
      <div
        style={{
          borderBottom: "2px solid var(--color-black-soft)",
          background: "var(--color-surface-white)",
        }}
      >
        <div
          className="mx-auto max-w-7xl px-6 py-2.5 flex items-center gap-4"
          style={{ borderBottom: "1px solid var(--color-gray-border)" }}
        >
          <span className="font-black uppercase shrink-0" style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}>
            GCN
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Career &amp; Immigration Resources
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0 hidden sm:block" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Arizona State University
          </span>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="font-bold uppercase mb-2" style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}>
            Member Resource Directory
          </p>
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(2.1rem, 4vw, 3.3rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-black-soft)",
              lineHeight: 1.08,
            }}
          >
            Resources
          </h1>
          <p className="text-base font-medium max-w-2xl" style={{ color: "var(--color-brand-red)" }}>
            Tools for your job search, visa research, and career planning.
          </p>
        </div>
      </div>
      <div style={{ height: "1px", background: "rgba(12,12,14,0.22)", marginTop: "3px" }} />

      {/* ── RESOURCE LINKS ── */}
      <section
        className="py-0"
        aria-labelledby="resources-heading"
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-6">
            <SectionEyebrow num="01">Curated Career &amp; Immigration Tools</SectionEyebrow>
          </div>

          <div
            className="overflow-hidden mb-10"
            style={{ border: "1px solid var(--color-gray-border)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -mt-px -ml-px">
              {RESOURCES.map((resource) => (
                <div
                  key={resource.id}
                  className="flex flex-col gap-4 p-6"
                  style={{
                    borderTop: "1px solid var(--color-gray-border)",
                    borderLeft: "1px solid var(--color-gray-border)",
                  }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                    style={{ color: "var(--color-brand-red)" }}
                  >
                    <ResourceIcon icon={resource.icon} />
                  </div>
                  <p
                    className="font-bold uppercase tracking-wide"
                    style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--color-black-soft)" }}
                  >
                    {resource.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "var(--color-gray-text)" }}
                  >
                    {resource.description}
                  </p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gcn-btn gcn-btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white uppercase tracking-wide self-start"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    Visit Resource →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
