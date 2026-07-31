"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", index: "01" },
  { href: "/events", label: "Events", index: "02" },
  { href: "/team", label: "Team", index: "03" },
  { href: "/resources", label: "Resources", index: "04" },
  { href: "/sponsor", label: "Sponsor", index: "05" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`gcn-navbar ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="gcn-navbar-inner" aria-label="Main navigation">
        <Link
          href="/#hero"
          className="gcn-brand-lockup"
          aria-label="Back to Global Career Network hero"
          onClick={(event) => {
            if (pathname === "/") {
              event.preventDefault();
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Image src="/gcn.png" alt="" width={315} height={93} priority />
        </Link>

        <ul className="gcn-desktop-nav">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  data-active={active}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/join" className="gcn-nav-cta">
          Join GCN <span aria-hidden="true">↗</span>
        </Link>

        <button
          type="button"
          className="gcn-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </nav>

      <div className={`gcn-mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="gcn-mobile-menu-grid" aria-hidden="true" />
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label, index }) => (
            <Link
              key={href}
              href={href}
              tabIndex={open ? 0 : -1}
              aria-current={isActive(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span>{index}</span>
              {label}
            </Link>
          ))}
          <Link href="/join" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            <span>06</span>
            Join GCN
          </Link>
        </nav>
        <p>Careers without borders · Est. 2022</p>
      </div>
    </header>
  );
}
