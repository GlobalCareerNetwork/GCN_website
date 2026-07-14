import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
      <p
        className="text-8xl font-bold"
        style={{ color: "var(--color-brand-red)", opacity: 0.15 }}
      >
        404
      </p>
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-black-soft)" }}>
        Page not found
      </h1>
      <p style={{ color: "var(--color-gray-muted)" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg text-white text-sm font-semibold"
        style={{ background: "var(--color-brand-red)" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
