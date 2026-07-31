import type { Metadata } from "next";
import { pageMetadata, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN, JOIN_SUNDEVIL_CENTRAL_URL } from "@/lib/site";
import SectionEyebrow from "@/components/SectionEyebrow";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const joinDescription =
  "Join GCN at ASU — follow us on LinkedIn and Instagram, or become an official member through Sun Devil Central.";

export const metadata: Metadata = {
  title: "Join GCN",
  ...pageMetadata("Join GCN | GCN at ASU", joinDescription, "/join"),
};

const JOIN_OPTIONS = [
  {
    id: "linkedin",
    title: "LinkedIn",
    description:
      "Follow GCN on LinkedIn for professional updates, alumni spotlights, and career opportunities shared with our network.",
    url: SOCIAL_LINKEDIN,
    cta: "Follow us on LinkedIn",
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    title: "Instagram",
    description:
      "Follow @gcn.asu for event photos, behind-the-scenes moments, and community updates throughout the semester.",
    url: SOCIAL_INSTAGRAM,
    cta: "Follow @gcn.asu",
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    id: "sun-devil-central",
    title: "Sun Devil Central",
    description:
      "Become an official member through ASU's Sun Devil Central — the university's official club registration system.",
    url: JOIN_SUNDEVIL_CENTRAL_URL,
    cta: "Become an official member",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 6.5l1.4 3.1 3.4.4-2.5 2.3.7 3.4L11 14l-2.9 1.6.7-3.4-2.5-2.3 3.4-.4L11 6.5z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function ExternalLinkGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6.5 3H3.5a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 2.5h4v4M13 2.5L7 8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function JoinPage() {
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
            Get Involved
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0 hidden sm:block" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Arizona State University
          </span>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="font-bold uppercase mb-2" style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}>
            Join The Network
          </p>
          <h1
            id="join-heading"
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
            Join GCN
          </h1>
          <p className="text-base font-medium max-w-2xl" style={{ color: "var(--color-brand-red)" }}>
            Three ways to connect — follow along, or become an official member.
          </p>
        </div>
      </div>
      <div style={{ height: "1px", background: "rgba(12,12,14,0.22)", marginTop: "3px" }} />

      {/* ── JOIN OPTIONS ── */}
      <section
        className="py-0"
        aria-labelledby="join-heading"
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-6">
            <SectionEyebrow num="01">Ways To Connect</SectionEyebrow>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {JOIN_OPTIONS.map((option) => (
              <Card key={option.id} className="gcn-card-hover h-full">
                <CardHeader>
                  <div
                    className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                    style={{ color: "var(--color-brand-red)" }}
                  >
                    {option.icon}
                  </div>
                  <CardTitle
                    className="font-bold uppercase tracking-wide"
                    style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--color-black-soft)" }}
                  >
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription
                    className="leading-relaxed"
                    style={{ color: "var(--color-gray-text)" }}
                  >
                    {option.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <a
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gcn-btn gcn-btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white uppercase tracking-wide"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {option.cta}
                    <ExternalLinkGlyph />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
