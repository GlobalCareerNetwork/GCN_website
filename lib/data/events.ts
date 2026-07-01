import { z } from "zod";

// ── Schema ──────────────────────────────────────────────────────────────────

export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),           // display string, e.g. "Oct 23, 2025"
  isoDate: z.string(),        // ISO 8601 for sorting, e.g. "2025-10-23"
  time: z.string(),           // e.g. "5:30–7:00 PM" or "" for past events
  location: z.string(),
  description: z.string(),
  outcome: z.string().nullable(),       // impact/result paragraph — past events only
  highlightStat: z.string().nullable(), // headline stat, e.g. "280 hackers · 10 internship offers"
  poster: z.string().nullable(),        // path under /images/events/, or null if none exists yet
  status: z.enum(["past", "upcoming", "tentative"]),
  category: z.string(),
  semester: z.string(),        // eyebrow label, e.g. "FALL 2025"
  academicYear: z.enum(["24-25", "25-26", "26-27"]),
  attendeeCount: z.number().nullable(),
  registrationUrl: z.string(),
  icon: z.string(),
});

export type Event = z.infer<typeof EventSchema>;

export const EventsDataSchema = z.array(EventSchema);

// ── Data ────────────────────────────────────────────────────────────────────
// Source: real 2025-26 event records provided by GCN leadership (Aug 2025 – Apr 2026).
// Poster assets copied from "GCN - Past Event Posters/" into public/images/events/.

const rawEventsData = [
  // ── Fall 2025 ────────────────────────────────────────────────────────────
  {
    id: "welcome-week-tabling-series-2025",
    name: "Welcome Week Tabling Series",
    date: "Aug 18–21, 2025",
    isoDate: "2025-08-18",
    time: "",
    location: "Multi-campus — Tempe, Downtown, Poly campuses",
    description:
      "Four days of GCN presence at Welcome Week across all three campuses. Our first impression to the freshman class and every returning student who hadn't heard of us yet.",
    outcome:
      "Fueled our largest ever officer recruitment cycle (8 → 15 officers by end of Fall). Directly seeded the Volunteer Program launched in Spring 2026.",
    highlightStat: "8 → 15 officers recruited",
    poster: "/images/events/tabling-series.png",
    status: "past",
    category: "Networking",
    semester: "FALL 2025",
    academicYear: "25-26",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-handshake",
  },
  {
    id: "globetalk-fall-panel-opener-2025",
    name: "GlobeTalk — Fall Panel Opener",
    date: "Sep 5, 2025",
    isoDate: "2025-09-05",
    time: "4:00–5:30 PM",
    location: "ASU Tempe",
    description:
      "Our Fall 2025 kickoff panel — the semester's first look at industry professionals. Framed as a \"how do you actually get in the door\" conversation for students figuring out their fall recruiting plan.",
    outcome:
      "Set the tone for a semester built on panels and workshops. Feedback from this panel shaped how we structured the AWS Workshop 6 weeks later.",
    highlightStat: null,
    poster: "/images/events/globetalk.png",
    status: "past",
    category: "Panel",
    semester: "FALL 2025",
    academicYear: "25-26",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-globe",
  },
  {
    id: "future-ready-with-aws-workshop-2025",
    name: "Future-Ready with AWS Workshop",
    date: "Oct 23, 2025",
    isoDate: "2025-10-23",
    time: "10:00 AM–4:00 PM",
    location: "Arizona Ballroom, Memorial Union",
    description:
      "Full-day flagship workshop co-hosted with AWS, ISSC, and PMC. Met AWS recruiters in the morning, hands-on with AWS tools mid-day, mentor-led real-world projects in the afternoon. GCN's first full-day event of the year.",
    outcome:
      "Delivered our highest engagement-per-hour of any Fall event. Opened the recurring AWS relationship that carried into GlobeConnect 2026.",
    highlightStat: "145 attendees",
    poster: "/images/events/ready-with-aws.png",
    status: "past",
    category: "Workshop",
    semester: "FALL 2025",
    academicYear: "25-26",
    attendeeCount: 145,
    registrationUrl: "",
    icon: "fa-cloud",
  },
  {
    id: "connect-forward-2025",
    name: "Connect Forward — Where Leadership Meets Opportunity",
    date: "Nov 6, 2025",
    isoDate: "2025-11-06",
    time: "1:00–3:00 PM",
    location: "Amphitheater, SSV, ISSC",
    description:
      "Student leadership panel — club presidents from across ASU shared how they built their organizations and turned campus leadership into career capital. Co-hosted with FutureSelf × ASU ISSC. Moderated panel followed by open networking with free food and boba.",
    outcome:
      "First cross-club panel GCN ran. Opened relationships with peer club presidents that unlocked later collabs with ACEL and ACM.",
    highlightStat: "80 attendees",
    poster: "/images/events/connect-forward.png",
    status: "past",
    category: "Panel",
    semester: "FALL 2025",
    academicYear: "25-26",
    attendeeCount: 80,
    registrationUrl: "",
    icon: "fa-handshake",
  },
  {
    id: "globestrat-25-case-competition",
    name: "GlobeStrat'25 — Case Competition",
    date: "Nov 22–23, 2025",
    isoDate: "2025-11-22",
    time: "",
    location: "Tempe campus",
    description:
      "Case competition where interdisciplinary teams tackled real business challenges from partner companies. Weekend-long format with faculty and industry mentors, presenting final decks to judging panels.",
    outcome:
      "Cemented GCN as a case-competition player on campus. Established the operational playbook used 5 months later for GlobeHack. 4 internships given out.",
    highlightStat: "4 internships · 310 RSVPs",
    poster: "/images/events/globestrat-25.png",
    status: "past",
    category: "Competition",
    semester: "FALL 2025",
    academicYear: "25-26",
    attendeeCount: 310,
    registrationUrl: "",
    icon: "fa-trophy",
  },

  // ── Spring 2026 ──────────────────────────────────────────────────────────
  {
    id: "build-your-asu-network-2026",
    name: "Build Your ASU Network",
    date: "Jan 27, 2026",
    isoDate: "2026-01-27",
    time: "3:00–5:00 PM",
    location: "SSV Amphitheater",
    description:
      "Structured networking session in partnership with ASU's Global Career Initiatives. Focused on building the on-campus network most students never intentionally develop.",
    outcome: "Second in a series of four GCI collab events, up from 1 the previous year.",
    highlightStat: null,
    poster: null,
    status: "past",
    category: "Networking",
    semester: "SPRING 2026",
    academicYear: "25-26",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-handshake",
  },
  {
    id: "careers-in-conversation-amazon-2026",
    name: "Careers in Conversation: Amazon",
    date: "Jan 29, 2026",
    isoDate: "2026-01-29",
    time: "5:00–7:00 PM",
    location: "Wilson Hall WLSN 237",
    description:
      "First installment of our Careers in Conversation Series — management-level industry panel featuring Amazon professionals. Speakers: Jugal Bhatt (SWE / AI content creator, 165k+ Instagram followers) and Billy Pierre (Business Continuity & Crisis Management Analyst).",
    outcome:
      "~50 registrants. Jugal Bhatt's social presence brought incremental Instagram followers we hadn't seen from other speakers.",
    highlightStat: null,
    poster: "/images/events/career-in-conversation.png",
    status: "past",
    category: "Panel",
    semester: "SPRING 2026",
    academicYear: "25-26",
    attendeeCount: 50,
    registrationUrl: "",
    icon: "fa-comments",
  },
  {
    id: "blind-networking-2026",
    name: "Blind Network — GCN's First Social Event",
    date: "Feb 13, 2026",
    isoDate: "2026-02-13",
    time: "5:00–7:00 PM",
    location: "Honey 2 A Bee café",
    description:
      "Our first purely social event. A Valentine's-week anonymous matching mixer. Students were anonymously paired ahead of time, revealed their partner on-site, and worked through icebreaker prompts over lattes. 25% menu discount for attendees. Tagline: \"You don't know who you're sitting with… yet.\"",
    outcome:
      "Sold out. One of our highest-attendance Spring events. Broke the \"GCN is only for career grinding\" perception and built the Honey 2 A Bee café partnership.",
    highlightStat: null,
    poster: "/images/events/blind-networking.png",
    status: "past",
    category: "Social",
    semester: "SPRING 2026",
    academicYear: "25-26",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-mug-hot",
  },
  {
    id: "globeconnect-2026",
    name: "GlobeConnect 2026 — Meet & Greet Talent",
    date: "Feb 24, 2026",
    isoDate: "2026-02-24",
    time: "5:00–7:00 PM",
    location: "MU 220 Turquoise",
    description:
      "Our flagship career fair, co-hosted with GCI. Format: employer panel first, then student-employer interaction. Company partners: Microsoft, Amazon, AWS, TSMC, DoorDash, American Express, IBM.",
    outcome:
      "160+ registrants — largest GCN career event by attendance. Direct pipeline into the 10 internship offers announced at GlobeHack two months later.",
    highlightStat: "160+ registrants",
    poster: "/images/events/globe-connect.png",
    status: "past",
    category: "Networking",
    semester: "SPRING 2026",
    academicYear: "25-26",
    attendeeCount: 160,
    registrationUrl: "",
    icon: "fa-briefcase",
  },
  {
    id: "debate-panel-startup-vs-corporate-2026",
    name: "Debate Panel: Start-Up vs. Corporate",
    date: "Mar 6, 2026",
    isoDate: "2026-03-06",
    time: "5:00–7:00 PM",
    location: "GCN × ACEL",
    description:
      "Our first debate-format panel. Panelists argued opposing positions on startup vs. corporate careers. Co-hosted with ACEL (Asian Corporate and Entrepreneur Leaders).",
    outcome:
      "Distinguished GCN from every other career-panel org on campus. Nobody else was doing debate format. Set up the ACEL partnership for future collabs.",
    highlightStat: null,
    poster: null,
    status: "past",
    category: "Panel",
    semester: "SPRING 2026",
    academicYear: "25-26",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-comments",
  },
  {
    id: "careers-in-conversation-intel-2026",
    name: "Careers in Conversation: Intel",
    date: "Apr 1, 2026",
    isoDate: "2026-04-01",
    time: "4:30–6:30 PM",
    location: "COOR L1-84",
    description:
      "Second Careers in Conversation panel. Speakers: Dan Rodriguez (VP & GM, Edge Computing Group, Intel), Praveen Mosur (Intel Fellow, Product Architecture), Jenna Lapaglia (VP & CFO Operations, Finance Front-End Group). Highest-profile speaker lineup of the year.",
    outcome: "~70 registrants — highest Careers in Conversation attendance.",
    highlightStat: "70 registrants · VP-level speakers",
    poster: "/images/events/career-in-conversation.png",
    status: "past",
    category: "Panel",
    semester: "SPRING 2026",
    academicYear: "25-26",
    attendeeCount: 70,
    registrationUrl: "",
    icon: "fa-comments",
  },
  {
    id: "globehack-26",
    name: "GlobeHack'26 — Arizona's First GTM Strategy Hackathon",
    date: "Apr 18–19, 2026",
    isoDate: "2026-04-18",
    time: "",
    location: "LSE104 (Sat), ECG101 (Sun)",
    description:
      "Our biggest event of the year — Arizona's first Go-To-Market Strategy Hackathon, co-hosted with ACM. Not a software-build hackathon. Teams built go-to-market strategies for real products from real sponsors. 8 sponsoring companies. 4 main tracks + 4 side tracks. $11K in cash prizes. $4K in sponsor support. Track Sponsors: Moatable, Ink'd, Hydrawav3. Full sponsors: Red Bull, Lofty, Vector, Syncron, TruckerPath, Moatable, InsForge, 11ElevenLabs, HYDRAWAV3, ASU ISSC, FutureSelf, OLIPOP.",
    outcome:
      "280 hackers — largest single-event attendance in GCN history. 10 on-site internship offers. 8 sponsoring companies. Established the differentiated GlobeHack brand (GTM, not code) that anchors our sponsor pitch going forward.",
    highlightStat: "280 hackers · 10 internship offers · $11K prizes",
    poster: "/images/events/globehack-26.png",
    status: "past",
    category: "Competition",
    semester: "SPRING 2026",
    academicYear: "25-26",
    attendeeCount: 280,
    registrationUrl: "",
    icon: "fa-trophy",
  },

  // ── Upcoming Events — AY 26-27 ───────────────────────────────────────────
  {
    id: "resume-clinic-2026",
    name: "Resume Clinic & ATS Prep",
    date: "Sep 10, 2026",
    isoDate: "2026-09-10",
    time: "6:00–7:30 PM",
    location: "Tempe Campus MU 220",
    description:
      "Get your resume reviewed by recruiters and learn how to optimize it for applicant tracking systems used by top employers.",
    outcome: null,
    highlightStat: null,
    poster: null,
    status: "upcoming",
    category: "Workshop",
    semester: "FALL 2026",
    academicYear: "26-27",
    attendeeCount: null,
    registrationUrl: "", // TODO: needs real link
    icon: "fa-file-alt",
  },
  {
    id: "linkedin-outreach-masterclass-2026",
    name: "LinkedIn & Outreach Masterclass",
    date: "Oct 8, 2026",
    isoDate: "2026-10-08",
    time: "5:30–7:00 PM",
    location: "Virtual Zoom",
    description:
      "Master LinkedIn's algorithm, cold outreach messaging, and how to build a recruiter-facing presence that converts.",
    outcome: null,
    highlightStat: null,
    poster: null,
    status: "upcoming",
    category: "Workshop",
    semester: "FALL 2026",
    academicYear: "26-27",
    attendeeCount: null,
    registrationUrl: "", // TODO: needs real link
    icon: "fa-linkedin",
  },
  {
    id: "mock-interview-jam-2026",
    name: "Mock Interview Jam Session",
    date: "Nov 12, 2026",
    isoDate: "2026-11-12",
    time: "6:00–8:00 PM",
    location: "Tempe Campus MU 242",
    description:
      "Paired mock interviews across behavioral, case, and technical formats with feedback from GCN mentors and industry volunteers.",
    outcome: null,
    highlightStat: null,
    poster: null,
    status: "upcoming",
    category: "Practice",
    semester: "FALL 2026",
    academicYear: "26-27",
    attendeeCount: null,
    registrationUrl: "", // TODO: needs real link
    icon: "fa-comments",
  },
  {
    id: "cpt-opt-filing-2026",
    name: "CPT/OPT Filing & Regulations",
    date: "Dec 3, 2026",
    isoDate: "2026-12-03",
    time: "5:00–6:30 PM",
    location: "Tempe Campus WPC 101",
    description:
      "DSO-led session on CPT/OPT application timelines, employer requirements, and common mistakes that delay work authorization.",
    outcome: null,
    highlightStat: null,
    poster: null,
    status: "upcoming",
    category: "Info Session",
    semester: "FALL 2026",
    academicYear: "26-27",
    attendeeCount: null,
    registrationUrl: "", // TODO: needs real link
    icon: "fa-passport",
  },
] as const;

// Validate at module load — type errors surface at build time, not runtime
export const eventsData: Event[] = EventsDataSchema.parse(
  rawEventsData.map((e) => ({ ...e }))
);

// ── Helpers ──────────────────────────────────────────────────────────────────

export type AcademicYear = "24-25" | "25-26" | "26-27";

export function getPastEvents(): Event[] {
  return eventsData.filter((e) => e.status === "past");
}

export function getUpcomingEvents(): Event[] {
  return eventsData.filter((e) => e.status === "upcoming" || e.status === "tentative");
}

export function getEventsSortedByDate(events: Event[]): Event[] {
  return [...events].sort(
    (a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime()
  );
}
