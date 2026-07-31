import Link from "next/link";
import { SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN } from "@/lib/site";

const NAV_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
  { href: "/sponsor", label: "Sponsor" },
  { href: "/join", label: "Join GCN" },
];

export default function Footer() {
  return (
    <footer className="gcn-footer">
      <div className="gcn-footer-grid" aria-hidden="true" />
      <div className="gcn-footer-inner">
        <div className="gcn-footer-lead">
          <p className="gcn-kicker">The next connection changes everything</p>
          <h2>
            Your global career
            <br />
            starts with <em>hello.</em>
          </h2>
          <Link href="/join" className="gcn-footer-action">
            Join the network <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="gcn-footer-directory">
          <div>
            <p>Explore</p>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p>Connect</p>
            <a href={SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
          </div>
          <div>
            <p>Find us</p>
            <span>Arizona State University</span>
            <span>Tempe, Arizona</span>
            <span>United States</span>
          </div>
        </div>

        <div className="gcn-footer-wordmark" aria-hidden="true">
          GCN
        </div>

        <div className="gcn-footer-base">
          <span>© {new Date().getFullYear()} Global Career Network</span>
          <span>Student-built at ASU · Est. 2022</span>
          <Link href="/">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
