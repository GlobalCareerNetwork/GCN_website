import Reveal from "@/components/Reveal";
import styles from "./HomeStory.module.css";

export default function WhoWeAre() {
  return (
    <section className={`${styles.story} ${styles.light}`} aria-labelledby="who-we-are-heading">
      <div className={`${styles.content} px-6 py-20 md:py-28 lg:py-32`}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-start">
          <Reveal>
            <h2 id="who-we-are-heading">
              One of ASU&apos;s <span className={styles.accent}>leading</span> student-led
              career organizations
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className={styles.body}>
              <p>
                GCN was built on a simple belief: career growth happens faster when you have
                people willing to help you along the way. Everything we do, from weekly tabling
                sessions to flagship conferences, is organized by students who remember what it
                felt like to be new on campus, uncertain about recruiting, or unsure where to
                begin.
              </p>
              <p>
                That&apos;s why our community has always focused on conversations before numbers.
                We celebrate attendance, partnerships, and milestones, but we&apos;re most proud
                of the students who return, not because they have to, but because they found
                mentors, teammates, and friends here. As our community has grown across dozens
                of majors and 88 countries, that sense of belonging has remained at the center
                of everything we do.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
