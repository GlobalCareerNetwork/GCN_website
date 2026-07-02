"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/sponsor", label: "Sponsor" },
  { href: "/join", label: "Join Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler(); // set initial state
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        background: scrolled ? "rgba(253,251,247,0.97)" : "rgba(245,241,232,0.94)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--color-gray-border)",
        boxShadow: scrolled ? "0 2px 20px rgba(12,12,14,0.07)" : "none",
        transition: "background 0.3s var(--ease-fast), box-shadow 0.3s var(--ease-fast)",
      }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6"
        style={{
          paddingTop: scrolled ? "10px" : "16px",
          paddingBottom: scrolled ? "10px" : "16px",
          transition: "padding 0.3s var(--ease-fast)",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl leading-none"
          aria-label="Global Career Network Home"
        >
          <Image
            src="/gcn.png"
            alt="GCN Logo"
            width={56}
            height={56}
            style={{
              height: scrolled ? "44px" : "56px",
              width: scrolled ? "44px" : "56px",
              transition: "height 0.3s var(--ease-fast), width 0.3s var(--ease-fast)",
            }}
            priority
          />
          <span style={{ color: "var(--color-black-soft)" }}>
            GCN{" "}
            <span style={{ color: "var(--color-brand-red)" }}>AT ASU</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="uppercase transition-colors"
                  style={{
                    fontSize: "11.5px",
                    letterSpacing: "0.14em",
                    fontWeight: active ? 800 : 600,
                    color: active ? "var(--color-black-soft)" : "var(--color-gray-text)",
                    paddingBottom: "4px",
                    borderBottom: active
                      ? "2px solid var(--color-brand-red)"
                      : "2px solid transparent",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
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
            background: "var(--color-surface-white)",
            borderColor: "var(--color-gray-border)",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className="text-sm uppercase"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  fontWeight: active ? 800 : 500,
                  color: active ? "var(--color-brand-red)" : "var(--color-gray-text)",
                  borderLeft: active
                    ? "3px solid var(--color-brand-red)"
                    : "3px solid transparent",
                  paddingLeft: "10px",
                }}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
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
