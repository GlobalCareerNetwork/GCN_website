import type { Metadata } from "next";
import Image from "next/image";
import PresidentsNote from "@/components/PresidentsNote";
import { pageMetadata, SOCIAL_INSTAGRAM } from "@/lib/site";
import SponsorIntro from "./SponsorIntro";
import styles from "./details.module.css";

const sponsorDescription =
  "Partner with Global Career Network at ASU. Sponsorship opportunities connecting your organization with 2,000+ students and professionals.";

export const metadata: Metadata = {
  title: "Sponsor GCN",
  ...pageMetadata("Sponsor GCN | GCN at ASU", sponsorDescription, "/sponsor"),
};

const SPONSOR_EMAIL = "globalcareernetwork.club@gmail.com";
const INQUIRY_HREF = `mailto:${SPONSOR_EMAIL}?subject=${encodeURIComponent("Sponsorship Inquiry (GCN at ASU)")}`;

const TIERS = [
  {
    id: "sponsor-tier-gold-sponsor",
    name: "Gold Sponsor",
    price: "$1,500+",
    accent: "#B8872D",
    benefits: [
      "Premium logo placement on all major marketing materials",
      "Featured sponsor recognition throughout the year",
      "Dedicated company spotlight post",
      "Speaking opportunities at flagship events",
      "Priority recruiting access to GCN talent",
      "Event booth opportunities",
      "Exclusive networking opportunities",
      "Priority partnership consideration for future initiatives",
    ],
  },
  {
    id: "sponsor-tier-silver-sponsor",
    name: "Silver Sponsor",
    price: "$1,000",
    accent: "#8D929A",
    benefits: [
      "Logo placement across event promotions",
      "Featured sponsor recognition",
      "Dedicated social media spotlight",
      "Workshop or presentation opportunity",
      "Resume book access",
      "Recruiting support",
      "Participation in networking events",
    ],
  },
  {
    id: "sponsor-tier-bronze-sponsor",
    name: "Bronze Sponsor",
    price: "$500",
    accent: "#9A5A32",
    popular: true,
    benefits: [
      "Logo placement on select event materials",
      "Social media recognition",
      "Access to participant resume book",
      "Opportunity to engage with students during events",
      "Sponsor acknowledgment during programming",
    ],
  },
  {
    id: "sponsor-tier-community-partner",
    name: "Community Partner",
    price: "In-Kind / Collaborative",
    accent: "var(--color-brand-red)",
    benefits: [
      "Website recognition",
      "Community partner listing",
      "Event collaboration opportunities",
      "Mentorship and speaker participation",
      "Social media acknowledgment",
    ],
  },
] as const;

const PROGRAMS = [
  {
    label: "Career Development",
    items: ["Resume Reviews", "Workshops", "Professional Training"],
  },
  {
    label: "Networking Events",
    items: ["Industry Panels", "Career Fairs", "Alumni Connections"],
  },
  {
    label: "Innovation Programs",
    items: ["Hackathons", "Startup Challenges", "Innovation Competitions"],
  },
  {
    label: "Community Building",
    items: ["Mentorship", "Leadership Development", "Professional Communities"],
  },
];

const IMPACT = [
  {
    title: "Expanding network",
    description:
      "A handful of international students founded GCN in 2022. Today it is one of ASU's most active student-led professional communities, adding members and campus partners each semester.",
  },
  {
    title: "Industry partnerships",
    description: "We develop new initiatives with leading startups, corporations, and community organizations.",
  },
  {
    title: "Expert network",
    description: "Industry leaders and speakers from major firms give members direct access to their insights.",
  },
  {
    title: "Inclusive community",
    description: "We bring people from diverse backgrounds together to pursue practical career outcomes.",
  },
];

const PARTNER_LOGOS = [
  { src: "/images/sponsors/amazon.png", alt: "Amazon" },
  { src: "/images/sponsors/nvidia.png", alt: "NVIDIA" },
  { src: "/images/sponsors/intel.png", alt: "Intel" },
  { src: "/images/sponsors/jpmc.svg", alt: "JPMorgan Chase" },
  { src: "/images/sponsors/pwc.png", alt: "PwC" },
  { src: "/images/sponsors/bain.svg", alt: "Bain & Company" },
  { src: "/images/sponsors/tsmc.png", alt: "TSMC" },
  { src: "/images/sponsors/perplexity.png", alt: "Perplexity AI" },
];

export default function SponsorPage() {
  return (
    <div className="gcn-sponsor-page">
      <SponsorIntro />

      <section id="sponsor-tiers" className="gcn-sponsor-band" aria-labelledby="tiers-heading">
        <div className="gcn-sponsor-shell">
          <h2 id="tiers-heading">2026 sponsorship tiers</h2>
          <p className="gcn-sponsor-description">
            Each tier sponsors <strong>one featured event</strong>, such as GlobeTalk or GlobeHack. For a custom
            year-round partnership, <a className="gcn-sponsor-link" href={`mailto:${SPONSOR_EMAIL}`}>email us</a>.
          </p>
          <div className="gcn-sponsor-tier-grid">
            {TIERS.map((tier) => (
              <details key={tier.id} id={tier.id} className="gcn-sponsor-disclosure gcn-sponsor-tier" style={{ borderTopColor: tier.accent }}>
                <summary className="gcn-sponsor-summary">
                  <span className="gcn-sponsor-tier-label">
                    <span className="gcn-sponsor-tier-name">{tier.name}{"popular" in tier && <small>Most popular</small>}</span>
                    <strong className="gcn-sponsor-tier-price">{tier.price}</strong>
                  </span>
                </summary>
                <div className="gcn-sponsor-detail-body">
                  <ul className="gcn-sponsor-list">
                    {tier.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                  <a className="gcn-sponsor-link" href={INQUIRY_HREF}>Inquire about {tier.name}</a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsor-proof" className="gcn-sponsor-band" aria-labelledby="partner-proof-heading">
        <div className="gcn-sponsor-shell">
          <h2 id="partner-proof-heading">Employers and partners</h2>
          <p className="gcn-sponsor-description">GCN programs connect students with employers, sponsors, and industry communities.</p>
          <ul className="gcn-sponsor-logo-strip" aria-label="Selected employers and partners">
            {PARTNER_LOGOS.map((logo) => (
              <li key={logo.alt}>
                <Image src={logo.src} alt={logo.alt} width={140} height={48} className="object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="gcn-sponsor-band">
        <div className={`gcn-sponsor-shell gcn-sponsor-more ${styles.more}`}>
          <details id="sponsor-programs" className="gcn-sponsor-disclosure">
            <summary className="gcn-sponsor-summary" id="programs-heading">GCN programs and initiatives</summary>
            <div className="gcn-sponsor-detail-body gcn-sponsor-detail-grid">
              {PROGRAMS.map(({ label, items }) => (
                <div key={label}>
                  <h3>{label}</h3>
                  <ul className="gcn-sponsor-list">
                    {items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </details>
          <details id="sponsor-impact" className="gcn-sponsor-disclosure">
            <summary className="gcn-sponsor-summary" id="impact-heading">Our impact</summary>
            <div className="gcn-sponsor-detail-body">
              <p><strong>3+ years building the community</strong> since 2022.</p>
              <div className="gcn-sponsor-detail-grid">
                {IMPACT.map(({ title, description }) => (
                  <div key={title}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>

      <PresidentsNote />

      <section id="sponsor-contact" className="gcn-sponsor-band" aria-labelledby="cta-heading">
        <div className="gcn-sponsor-shell gcn-sponsor-contact">
          <div>
            <h2 id="cta-heading">Contact GCN</h2>
            <p className="gcn-sponsor-description">Discuss how your organization can support students and connect with ASU talent.</p>
          </div>
          <div className="gcn-sponsor-contact-links">
            <a className="gcn-sponsor-link" href={INQUIRY_HREF}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <span>{SPONSOR_EMAIL}</span>
            </a>
            <a className="gcn-sponsor-link" href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span>@gcn.asu</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
