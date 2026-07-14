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
];

// Official ASU Sun Devil Central club signup — the single "join" destination
// sitewide (replaces the old in-house application form).
const JOIN_URL = "https://sundevilcentral.eoss.asu.edu/globalcareernetwork/club_signup";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      setPastHero(window.scrollY > window.innerHeight * 0.7);
    };
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
        borderColor: pastHero ? "var(--color-gray-border)" : "transparent",
        boxShadow: pastHero ? "0 2px 20px rgba(12,12,14,0.07)" : "none",
        transition:
          "background 0.3s var(--ease-fast), box-shadow 0.3s var(--ease-fast), border-color 0.3s var(--ease-fast)",
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
        {/* Logo — doubles as a "back to top" button */}
        <Link
          href="/"
          className="flex items-center leading-none"
          aria-label="Global Career Network — home, scroll to top"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Image
            src="/gcn.png"
            alt="GCN Logo"
            width={88}
            height={88}
            style={{
              height: scrolled ? "60px" : "88px",
              width: scrolled ? "60px" : "88px",
              transition: "height 0.3s var(--ease-fast), width 0.3s var(--ease-fast)",
            }}
            priority
          />
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
                  data-active={active}
                  className="gcn-link-underline uppercase transition-colors"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.14em",
                    fontWeight: active ? 800 : 600,
                    color: active ? "var(--color-black-soft)" : "var(--color-gray-text)",
                    paddingBottom: "4px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gcn-btn gcn-btn-primary px-4 py-2 rounded-lg text-sm font-semibold text-white"
            >
              Join GCN
            </a>
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
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gcn-btn gcn-btn-primary inline-flex justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Join GCN
          </a>
        </div>
      )}
    </header>
  );
}
