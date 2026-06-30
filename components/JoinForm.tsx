"use client";

import { useState } from "react";

type FieldErrors = Partial<Record<string, string[]>>;

const YEAR_OPTIONS = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "Other"] as const;

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p className="mt-1 text-xs" style={{ color: "var(--color-brand-red)" }} role="alert">
      {errors[0]}
    </p>
  );
}

export default function JoinForm() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    major: "",
    year: "" as string,
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});
    setServerMessage("");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = (await res.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
        errors?: FieldErrors;
      };

      if (res.ok && data.success) {
        setStatus("success");
        setServerMessage(data.message ?? "Thanks! We'll be in touch.");
        setFields({ name: "", email: "", major: "", year: "", message: "" });
      } else if (res.status === 422 && data.errors) {
        setStatus("idle");
        setFieldErrors(data.errors);
      } else if (res.status === 429) {
        setStatus("error");
        setServerMessage(data.error ?? "Too many requests. Please wait and try again.");
      } else {
        setStatus("error");
        setServerMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please check your connection and try again.");
    }
  }

  const inputBase =
    "w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:ring-2";
  const inputStyle = {
    background: "#fff",
    borderColor: "var(--color-gray-border)",
    color: "var(--color-black-soft)",
  };

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "#fff", border: "1px solid var(--color-gray-border)", boxShadow: "var(--shadow-soft)" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "var(--color-brand-red-light)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="var(--color-brand-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-black-soft)" }}>
          Application Received
        </h3>
        <p className="text-sm" style={{ color: "var(--color-gray-muted)" }}>
          {serverMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Join GCN application form"
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <div>
        <label htmlFor="join-name" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-gray-text)" }}>
          Full Name <span aria-hidden="true" style={{ color: "var(--color-brand-red)" }}>*</span>
        </label>
        <input
          id="join-name"
          type="text"
          autoComplete="name"
          required
          value={fields.name}
          onChange={set("name")}
          className={inputBase}
          style={inputStyle}
          aria-describedby={fieldErrors.name ? "join-name-error" : undefined}
          aria-invalid={!!fieldErrors.name}
          placeholder="Your full name"
        />
        <FieldError errors={fieldErrors.name} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="join-email" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-gray-text)" }}>
          ASU Email <span aria-hidden="true" style={{ color: "var(--color-brand-red)" }}>*</span>
        </label>
        <input
          id="join-email"
          type="email"
          autoComplete="email"
          required
          value={fields.email}
          onChange={set("email")}
          className={inputBase}
          style={inputStyle}
          aria-invalid={!!fieldErrors.email}
          placeholder="you@asu.edu"
        />
        <FieldError errors={fieldErrors.email} />
      </div>

      {/* Major + Year row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="join-major" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-gray-text)" }}>
            Major <span aria-hidden="true" style={{ color: "var(--color-brand-red)" }}>*</span>
          </label>
          <input
            id="join-major"
            type="text"
            required
            value={fields.major}
            onChange={set("major")}
            className={inputBase}
            style={inputStyle}
            aria-invalid={!!fieldErrors.major}
            placeholder="e.g. Computer Science"
          />
          <FieldError errors={fieldErrors.major} />
        </div>
        <div>
          <label htmlFor="join-year" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-gray-text)" }}>
            Year <span aria-hidden="true" style={{ color: "var(--color-brand-red)" }}>*</span>
          </label>
          <select
            id="join-year"
            required
            value={fields.year}
            onChange={set("year")}
            className={inputBase}
            style={inputStyle}
            aria-invalid={!!fieldErrors.year}
          >
            <option value="">Select year</option>
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <FieldError errors={fieldErrors.year} />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="join-message" className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-gray-text)" }}>
          Why do you want to join GCN? <span className="font-normal" style={{ color: "var(--color-gray-muted)" }}>(optional)</span>
        </label>
        <textarea
          id="join-message"
          rows={4}
          value={fields.message}
          onChange={set("message")}
          className={inputBase}
          style={{ ...inputStyle, resize: "vertical" }}
          aria-invalid={!!fieldErrors.message}
          placeholder="Tell us a bit about yourself and what you're hoping to get out of GCN..."
          maxLength={1000}
        />
        <div className="flex justify-between mt-1">
          <FieldError errors={fieldErrors.message} />
          <span className="text-xs ml-auto" style={{ color: "var(--color-gray-muted)" }}>
            {fields.message.length}/1000
          </span>
        </div>
      </div>

      {/* Server error */}
      {status === "error" && serverMessage && (
        <p className="text-sm px-4 py-3 rounded-xl" style={{ background: "var(--color-brand-red-light)", color: "var(--color-brand-red)" }} role="alert">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-opacity"
        style={{
          background: "var(--color-brand-red)",
          opacity: status === "loading" ? 0.7 : 1,
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? "Submitting…" : "Apply to Join GCN"}
      </button>

      <p className="text-xs text-center" style={{ color: "var(--color-gray-muted)" }}>
        We respect your privacy. Your information is never sold or shared with third parties.
      </p>
    </form>
  );
}
