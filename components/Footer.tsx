import Link from "next/link";
import { JOIN_SUNDEVIL_CENTRAL_URL, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN } from "@/lib/site";

const NAV_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
  { href: "/sponsor", label: "Sponsor" },
];

export default function Footer() {
  return (
    <footer className="gcn-footer">
      <div className="gcn-footer-grid" aria-hidden="true" />
      <div className="gcn-footer-inner">
        <div className="gcn-footer-lead">
          <h2>
            Your global career
            <br />
            starts with <em>hello.</em>
          </h2>
          <a href={JOIN_SUNDEVIL_CENTRAL_URL} className="gcn-footer-action" aria-label="Join the network">
            <svg className="gcn-footer-action-text" viewBox="0 0 150 150" aria-hidden="true">
              <defs>
                <path id="footer-join-the" d="M 29 70 Q 75 43 121 70" />
                <path id="footer-network" d="M 26 91 Q 75 65 124 91" />
              </defs>
              <text>
                <textPath href="#footer-join-the" startOffset="50%" textAnchor="middle">Join the</textPath>
              </text>
              <text>
                <textPath href="#footer-network" startOffset="50%" textAnchor="middle">Network</textPath>
              </text>
            </svg>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="gcn-footer-directory">
          <div>
            <h3>Explore</h3>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <a href={JOIN_SUNDEVIL_CENTRAL_URL}>Join GCN</a>
          </div>
          <div>
            <h3>Connect</h3>
            <a href={SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
          </div>
          <div>
            <h3>Find us</h3>
            <span>Arizona State University</span>
            <span>Tempe, Arizona</span>
            <span>United States</span>
          </div>
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
