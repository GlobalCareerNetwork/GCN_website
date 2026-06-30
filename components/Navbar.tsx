"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/join", label: "Join Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        background: "rgba(249,250,252,0.92)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--color-gray-border)",
      }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg leading-none"
          aria-label="Global Career Network Home"
        >
          <Image
            src="/gcn.png"
            alt="GCN Logo"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span style={{ color: "var(--color-black-soft)" }}>
            GCN{" "}
            <span style={{ color: "var(--color-brand-red)" }}>AT ASU</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{ color: "var(--color-gray-text)", opacity: 0.8 }}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/join"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--color-brand-red)" }}
            >
              Join GCN
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="block w-6 h-0.5 transition-all"
            style={{
              background: "var(--color-black-soft)",
              transform: open ? "translateY(8px) rotate(45deg)" : undefined,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{
              background: "var(--color-black-soft)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{
              background: "var(--color-black-soft)",
              transform: open ? "translateY(-8px) rotate(-45deg)" : undefined,
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{
            background: "#fff",
            borderColor: "var(--color-gray-border)",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium"
              style={{ color: "var(--color-gray-text)" }}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/join"
            className="inline-flex justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "var(--color-brand-red)" }}
            onClick={() => setOpen(false)}
          >
            Join GCN
          </Link>
        </div>
      )}
    </header>
  );
}
