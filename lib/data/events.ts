import { z } from "zod";

// ── Schema ──────────────────────────────────────────────────────────────────

export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),           // display string, e.g. "Oct 23, 2025"
  isoDate: z.string(),        // ISO 8601 for sorting, e.g. "2025-10-23"
  time: z.string(),           // e.g. "5:30–7:00 PM" or "" for past events
  location: z.string(),       // e.g. "Tempe Campus MU 220" or "Virtual Zoom"
  description: z.string(),
  status: z.enum(["past", "upcoming", "tentative"]),
  category: z.string(),
  academicYear: z.enum(["24-25", "25-26", "26-27"]),
  attendeeCount: z.number().nullable(),   // null for upcoming/tentative
  registrationUrl: z.string(),            // "" with TODO where unknown
  icon: z.string(),           // Font Awesome class kept for reference; replaced by SVG in components
});

export type Event = z.infer<typeof EventSchema>;

export const EventsDataSchema = z.array(EventSchema);

// ── Data ────────────────────────────────────────────────────────────────────
// Source: static/events.html hardcoded slide HTML
// Fields added: isoDate, status, category, academicYear, registrationUrl
// registrationUrl left as "" with TODO for all upcoming events

const rawEventsData = [
  // ── Past Events — AY 24-25 ───────────────────────────────────────────────
  {
    id: "international-student-career-success-2024",
    name: "International Student Career Success",
    date: "Jan 25, 2024",
    isoDate: "2024-01-25",
    time: "",
    location: "ASU Tempe Campus",
    description:
      "Workshop focused on navigating the U.S. job market as an international student, covering work authorization, networking strategies, and cultural nuances in interviews.",
    status: "past",
    category: "Workshop",
    academicYear: "24-25",
    attendeeCount: 56,
    registrationUrl: "",
    icon: "fa-graduation-cap",
  },
  {
    id: "personal-branding-workshop-2024",
    name: "Personal Branding Workshop",
    date: "Feb 8, 2024",
    isoDate: "2024-02-08",
    time: "",
    location: "ASU Tempe Campus",
    description:
      "Hands-on session on crafting a compelling personal brand across resume, LinkedIn, and in-person interactions.",
    status: "past",
    category: "Workshop",
    academicYear: "24-25",
    attendeeCount: 32,
    registrationUrl: "",
    icon: "fa-id-card",
  },
  {
    id: "tech-industry-panel-2024",
    name: "Tech Industry Panel Discussion",
    date: "Feb 15, 2024",
    isoDate: "2024-02-15",
    time: "",
    location: "ASU Tempe Campus",
    description:
      "Panel of tech professionals from leading companies sharing insights on breaking into the industry as an international student.",
    status: "past",
    category: "Panel",
    academicYear: "24-25",
    attendeeCount: 78,
    registrationUrl: "",
    icon: "fa-laptop-code",
  },
  {
    id: "linkedin-optimization-2024",
    name: "LinkedIn Profile Optimization",
    date: "Feb 28, 2024",
    isoDate: "2024-02-28",
    time: "",
    location: "ASU Tempe Campus",
    description:
      "Interactive workshop where attendees overhauled their LinkedIn profiles with guidance from industry recruiters.",
    status: "past",
    category: "Workshop",
    academicYear: "24-25",
    attendeeCount: 45,
    registrationUrl: "",
    icon: "fa-linkedin",
  },

  // ── Past Events — AY 25-26 ───────────────────────────────────────────────
  {
    id: "globetalk-2025",
    name: "GlobeTalk",
    date: "Sep 5, 2025",
    isoDate: "2025-09-05",
    time: "",
    location: "ASU Tempe Campus",
    description:
      "GCN's flagship networking event connecting international students with industry professionals for structured conversations and mentorship.",
    status: "past",
    category: "Networking",
    academicYear: "25-26",
    attendeeCount: 75,
    registrationUrl: "",
    icon: "fa-globe",
  },
  {
    id: "aws-career-pathways-2025",
    name: "AWS Career Pathways Workshop",
    date: "Oct 23, 2025",
    isoDate: "2025-10-23",
    time: "",
    location: "ASU Tempe Campus",
    description:
      "AWS engineers led a deep-dive on cloud career paths, certification roadmaps, and recruiting timelines for international students targeting Big Tech.",
    status: "past",
    category: "Workshop",
    academicYear: "25-26",
    attendeeCount: 145,
    registrationUrl: "",
    icon: "fa-cloud",
  },
  {
    id: "connect-forward-2025",
    name: "Connect Forward",
    date: "Nov 6, 2025",
    isoDate: "2025-11-06",
    time: "",
    location: "ASU Tempe Campus",
    description:
      "Speed-networking event pairing students with alumni and corporate partners for focused 5-minute career conversations.",
    status: "past",
    category: "Networking",
    academicYear: "25-26",
    attendeeCount: 80,
    registrationUrl: "",
    icon: "fa-handshake",
  },
  {
    id: "globestrat-2025",
    name: "GlobeStrat",
    date: "Nov 21–23, 2025",
    isoDate: "2025-11-21",
    time: "",
    location: "ASU Tempe Campus",
    description:
      "GCN's flagship case competition spanning three days, where teams tackled real-world strategy challenges sponsored by partner companies.",
    status: "past",
    category: "Competition",
    academicYear: "25-26",
    attendeeCount: 150,
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
    status: "upcoming",
    category: "Workshop",
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
    status: "upcoming",
    category: "Workshop",
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
    status: "upcoming",
    category: "Practice",
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
    status: "upcoming",
    category: "Info Session",
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

export const ACADEMIC_YEARS: AcademicYear[] = ["24-25", "25-26", "26-27"];

export function getEventsByYear(year: AcademicYear): Event[] {
  return eventsData.filter((e) => e.academicYear === year);
}

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
