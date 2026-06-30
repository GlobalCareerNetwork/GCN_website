"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Root error boundary — catches unhandled runtime errors in the app.
// Shows a generic message; no stack traces or file paths exposed to users.
// Full error detail is logged server-side by Next.js automatically.
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to server-side error tracking (e.g. Sentry) if configured.
    // The `digest` is a Next.js-generated hash that maps to server logs.
    console.error("[error-boundary]", error.digest ?? "(no digest)");
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
      <p
        className="text-8xl font-bold"
        style={{ color: "var(--color-brand-red)", opacity: 0.15 }}
      >
        500
      </p>
      <h1 className="text-2xl font-bold" style={{ color: "var(--color-black-soft)" }}>
        Something went wrong
      </h1>
      <p style={{ color: "var(--color-gray-muted)" }}>
        An unexpected error occurred. Please try again or return home.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-lg text-sm font-semibold border"
          style={{
            borderColor: "var(--color-brand-red)",
            color: "var(--color-brand-red)",
            background: "transparent",
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg text-white text-sm font-semibold"
          style={{ background: "var(--color-brand-red)" }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
