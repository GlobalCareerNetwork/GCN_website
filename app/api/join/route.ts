import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Input schema — server-side validation ─────────────────────────────────
const JoinSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .regex(/^[\p{L}\p{M}'\- ]+$/u, "Name contains invalid characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Must be a valid email address")
    .max(254, "Email too long"),
  major: z
    .string()
    .trim()
    .min(2, "Major must be at least 2 characters")
    .max(100, "Major must be under 100 characters"),
  year: z.enum(["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "Other"], {
    error: () => ({ message: "Select a valid year" }),
  }),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be under 1,000 characters")
    .optional()
    .default(""),
});

// ── In-memory rate limiter ────────────────────────────────────────────────
// Maps IP → { count, windowStart }. Resets after WINDOW_MS.
// In production replace with Redis (Upstash) for multi-instance safety.
const RATE_LIMIT = 5;         // max submissions
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

const rateStore = new Map<string, { count: number; windowStart: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateStore.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count += 1;
  return true;
}

// ── Handler ───────────────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    return await handlePost(req);
  } catch (err) {
    // Log full detail server-side; return generic message to client
    console.error("[join] unhandled error", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

async function handlePost(req: NextRequest): Promise<NextResponse> {
  // Origin check — reject cross-site form submissions
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Content-Type guard — only accept JSON (prevents HTML form CSRF)
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported Media Type" }, { status: 415 });
  }

  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait 15 minutes before trying again." },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate + sanitize via Zod
  const result = JoinSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return NextResponse.json({ errors: fieldErrors }, { status: 422 });
  }

  const { name, email, major, year, message } = result.data;

  // Server-side log — email is redacted to avoid PII in plaintext logs
  console.log("[join] submission received", {
    name,
    email: "[redacted]",
    major,
    year,
    hasMessage: message.length > 0,
  });

  // TODO Stage 8: forward to Cal.com or email service once credentials available.
  // For now, accept and confirm.
  void name; void email; void major; void year; void message;

  return NextResponse.json(
    { success: true, message: "Thanks! We'll be in touch soon." },
    { status: 200 }
  );
}

// Block all other methods
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
