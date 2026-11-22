import styles from "./intro.module.css";

const BENEFITS = [
  {
    label: "Brand Visibility",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 5v5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Talent Recruitment",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M15 9l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Social Media Exposure",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="15" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="15" cy="16" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 10h1m4.5-4.5L13 7m0 6-1.5-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Event Engagement",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 8h16M7 2v2M13 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Community Impact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 17s-7-4.35-7-9a7 7 0 0114 0c0 4.65-7 9-7 9z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Speaking Opportunities",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const AT_A_GLANCE = [
  {
    value: "2,000+",
    label: "Community Members",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1.5 17c0-3.03 2.46-5.5 5.5-5.5s5.5 2.47 5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14.5" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M13 11.5c2.2 0 4 1.79 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "ASU",
    label: "Arizona State University",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 18s6-5.5 6-10.5A6 6 0 004 7.5C4 12.5 10 18 10 18z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    value: "Events",
    label: "Career Dev, Networking & Innovation",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 8h16M7 2v2M13 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "Direct",
    label: "Access to Emerging Talent",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
];

const SIGNALS = ["Brand visibility", "Recruiting access", "Speaker moments", "Event presence", "Talent pipeline", "Campus credibility"];

export default function SponsorIntro() {
  return (
    <>
      <header>
        <div className={styles.masthead}>
          <div className={`${styles.container} ${styles.labelRow}`}>
            <span className={styles.accentLabel}>GCN</span>
            <span className={styles.rule} aria-hidden="true" />
            <span>Partnership Opportunities</span>
            <span className={`${styles.rule} ${styles.wideLabel}`} aria-hidden="true" />
            <span className={styles.wideLabel}>Arizona State University</span>
          </div>
        </div>
        <div className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <p className={`${styles.eyebrow} ${styles.accentLabel}`}>2026 Sponsorship Listings</p>
              <h1 id="sponsor-heading" className={styles.title}>
                <span>Invest in the</span>{" "}
                <span>Next Generation</span>{" "}
                <span>of Global Talent</span>
              </h1>
              <p className={styles.tagline}>Connect. Learn. Succeed.</p>
              <div className={styles.signal} aria-hidden="true">
                <div className={styles.signalTrack}>
                  {[0, 1].map((copy) => (
                    <div key={copy} className={styles.signalGroup}>
                      {SIGNALS.map((signal) => <span key={signal}>{signal}</span>)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <section className={styles.facts} aria-labelledby="sponsor-facts-heading">
              <h2 id="sponsor-facts-heading" className={styles.eyebrow}>At a Glance</h2>
              <div className={styles.statGrid}>
                {AT_A_GLANCE.map(({ value, label, icon }) => (
                  <div key={label} className={styles.statCard}>
                    <span className={styles.icon}>{icon}</span>
                    <p>{value}</p>
                    <small>{label}</small>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </header>

      <section id="sponsor-why" aria-labelledby="why-partner-heading" className={styles.why}>
        <div className={styles.container}>
          <div className={`${styles.labelRow} ${styles.sectionLabel}`}>
            <span className={styles.rule} aria-hidden="true" />
            <span>Why Partner With GCN</span>
            <span className={styles.rule} aria-hidden="true" />
          </div>
          <div className={styles.whyGrid}>
            <div>
              <h2 id="why-partner-heading">Why partner with GCN?</h2>
              <p className={styles.whyLead}>Connecting Talent with Opportunity</p>
              <p>
                Global Career Network (GCN) actively bridges the gap between ambitious students,
                top-tier professionals, and innovative founders. Through career-accelerating
                events, high-impact mentorship, and strategic network-building, we cultivate the
                next generation of global market leaders.{" "}
                <strong><em>
                  Partner with GCN to connect directly with motivated, high-quality student
                  talent ready to contribute to your team.
                </em></strong>
              </p>
            </div>
            <div className={styles.benefitPanel}>
              <h2>Partnership Benefits</h2>
              <ul className={styles.benefits}>
                {BENEFITS.map(({ label, icon }) => (
                  <li key={label}>
                    <span className={styles.icon}>{icon}</span>
                    <strong>{label}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
