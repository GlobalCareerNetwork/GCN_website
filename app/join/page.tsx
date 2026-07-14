import type { Metadata } from "next";
import JoinForm from "@/components/JoinForm";

export const metadata: Metadata = { title: "Join Us" };

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <div className="text-center mb-10">
        <p
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border mb-4"
          style={{
            background: "var(--color-brand-red-light)",
            borderColor: "rgba(158,34,26,0.2)",
            color: "var(--color-brand-red)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-red)" }} />
          Join Us
        </p>
        <h1
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
          style={{ color: "var(--color-black-soft)" }}
        >
          Become a GCN Member
        </h1>
        <p className="text-base" style={{ color: "var(--color-gray-muted)" }}>
          Open to all ASU students. Join nearly 2,000 members across 88 countries.
        </p>
      </div>
      <JoinForm />
    </div>
  );
}
