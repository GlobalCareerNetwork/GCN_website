import Reveal from "@/components/Reveal";
import styles from "./HomeStory.module.css";

const SUPPORT_ROW = [
  { label: "Employer Connections", copy: "Direct access to recruiters, founders, and hiring teams." },
  { label: "Career Development", copy: "Resume, interview, and offer-negotiation preparation." },
  { label: "Student Community", copy: "A network of peers across dozens of majors and 88 countries." },
  { label: "Mentorship and Guidance", copy: "Upperclassmen and alumni who've walked the path first." },
];

export default function WhatWeDo() {
  return (
    <section className={`${styles.story} ${styles.muted}`} aria-labelledby="what-we-do-heading">
      <div className={`${styles.content} px-6 py-20 md:py-28 lg:py-32`}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 md:gap-16 items-start">
          <Reveal className="md:order-2 md:text-right">
            <h2 id="what-we-do-heading">
              A <span className={styles.accent}>bridge</span> between ASU talent and
              global industry
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:order-1">
            <div className={styles.body}>
              <p>
                We create opportunities for students to meet professionals, recruiters,
                founders, alumni, and fellow students through panels, workshops, competitions,
                and networking events. But we also recognize that every student&apos;s journey
                looks different. Someone preparing for their first internship doesn&apos;t need
                the same guidance as someone recruiting for full-time roles, so we design
                programming that meets students where they are.
              </p>
              <p>
                That same mindset carries into our everyday interactions. Whether it&apos;s a
                quick conversation at a Thursday tabling session or a discussion after a panel,
                we take the time to understand what students are looking for before pointing
                them toward opportunities. We believe meaningful communities are built one
                conversation at a time, and that philosophy continues to shape how GCN welcomes
                every new member.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <ul className={styles.support}>
            {SUPPORT_ROW.map(({ label, copy }) => (
              <li key={label}>
                <h3>{label}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
