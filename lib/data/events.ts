import { z } from "zod";

// ── Schema ──────────────────────────────────────────────────────────────────

export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),           // display string, e.g. "Oct 23, 2025"
  isoDate: z.string(),        // ISO 8601 for sorting, or "" when the date is unknown
  time: z.string(),           // e.g. "5:30-7:00 PM" or "" for past events
  location: z.string(),
  description: z.string(),
  descriptionHighlights: z.array(z.string().min(1)).optional(),
  outcome: z.string().nullable(),       // impact/result paragraph — past events only
  outcomePhotos: z.array(z.object({ src: z.string(), alt: z.string() })).optional(),
  highlightStat: z.string().nullable(), // headline stat, e.g. "280 hackers · 10 internship offers"
  poster: z.string().nullable(),        // path under /images/events/, or null if none exists yet
  status: z.enum(["past", "upcoming", "tentative"]),
  category: z.string(),
  semester: z.string(),        // eyebrow label, e.g. "FALL 2025"
  academicYear: z.enum(["24-25", "25-26", "26-27"]),
  attendeeCount: z.number().nullable(),
  registrationUrl: z.string(),
  icon: z.string(),
  attendanceMode: z.enum(["in-person", "virtual", "hybrid"]),
});

export type Event = z.infer<typeof EventSchema>;

export const EventsDataSchema = z.array(EventSchema);

// ── Data ────────────────────────────────────────────────────────────────────
// Source: real 2025-26 event records provided by GCN leadership (Aug 2025 – Apr 2026).
// Poster assets copied from "GCN - Past Event Posters/" into public/images/events/.

const rawEventsData = [
  // Past events are listed in Chronicle display order.
  {
    id: "globe-connect-fall-2026",
    name: "GlobeConnect 2026",
    date: "Oct 19, 2026",
    isoDate: "2026-10-19",
    time: "4:30-7:30 PM",
    location: "MU 220, Turquoise Hall",
    attendanceMode: "in-person",
    description:
      "At GlobeConnect 2026, students from a wide range of majors met 25 industry specialists through round-robin networking. Each table brought together seven to eight students and two to three specialists, with a prompt to get the conversation started. Every eight minutes, the specialists moved to a new table, giving students a chance to hear perspectives from several fields.",
    descriptionHighlights: ["25 industry specialists", "round-robin networking", "eight minutes"],
    outcome:
      "The round-robin gave students across majors a chance to compare career paths and ask specialists how to get started in different fields.",
    outcomePhotos: [
      { src: "/images/events/globeconnect-2026/photo-1.webp", alt: "Attendees fill the hall at round tables during GlobeConnect." },
      { src: "/images/events/globeconnect-2026/photo-2.webp", alt: "Attendees talk and pass an item across table 6." },
      { src: "/images/events/globeconnect-2026/photo-3.webp", alt: "A group poses together in the GlobeConnect event hall." },
      { src: "/images/events/globeconnect-2026/photo-4.webp", alt: "Round tables and projection screens seen from the side of the hall." },
      { src: "/images/events/globeconnect-2026/photo-5.webp", alt: "A view from a networking table toward the GlobeConnect presentation." },
      { src: "/images/events/globeconnect-2026/photo-6.webp", alt: "Attendees gather for a conversation around table 1." },
      { src: "/images/events/globeconnect-2026/photo-7.webp", alt: "A wide view across the hall during the round-robin discussions." },
      { src: "/images/events/globeconnect-2026/photo-8.webp", alt: "Attendees sit and stand around tables along the side of the hall." },
    ],
    highlightStat: "300 RSVPs",
    poster: "/images/events/globeconnect-october-2026.jpg",
    status: "past",
    category: "Networking",
    semester: "FALL 2026",
    academicYear: "26-27",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-globe",
  },
  {
    id: "career-fair-preparation-2026",
    name: "Career Fair Preparation",
    date: "Sep 10, 2026",
    isoDate: "2026-09-10",
    time: "4:30-6:30 PM",
    location: "",
    attendanceMode: "in-person",
    description:
      "Ahead of the major career fairs, GCN partnered with the Ira A. Fulton Schools of Engineering to help students prepare for conversations with recruiters. Students practiced their elevator pitches, got professional headshots, and received feedback on their LinkedIn profiles and résumés. The evening wrapped up with dinner and networking.",
    descriptionHighlights: ["Ira A. Fulton Schools of Engineering", "elevator pitches", "professional headshots", "LinkedIn profiles", "résumés", "dinner and networking"],
    outcome:
      "Students headed into career fair season with a practiced introduction, professional headshots, and feedback they could use to strengthen their résumés and LinkedIn profiles.",
    outcomePhotos: [
      { src: "/images/events/career-fair-preparation-2026/photo-1.webp", alt: "A group poses together at Career Fair Preparation." },
      { src: "/images/events/career-fair-preparation-2026/photo-2.webp", alt: "An attendee talks with someone working at the GCN table." },
      { src: "/images/events/career-fair-preparation-2026/photo-3.webp", alt: "Attendees gather near the GCN table and banner by the windows." },
      { src: "/images/events/career-fair-preparation-2026/photo-4.webp", alt: "Students and organizers mingle in a busy hall during the fair." },
      { src: "/images/events/career-fair-preparation-2026/photo-5.webp", alt: "Students visit the GlobeConnect display at the GCN table." },
      { src: "/images/events/career-fair-preparation-2026/photo-6.webp", alt: "Attendees talk across a table during Career Fair Preparation." },
    ],
    highlightStat: "100 participants",
    poster: "/images/events/career-fair-preparation-2026.jpg",
    status: "past",
    category: "Workshop",
    semester: "FALL 2026",
    academicYear: "26-27",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-briefcase",
  },
  {
    id: "careers-in-conversation-fall-2026",
    name: "Careers in Conversation",
    date: "Sep 3, 2026",
    isoDate: "2026-09-03",
    time: "",
    location: "",
    attendanceMode: "in-person",
    description:
      "At Careers in Conversation, professionals from Amazon, Wells Fargo, and Waymo took part in a moderated panel. The host asked how they simplify complex work, navigate change, and grow their careers. The evening ended with open networking, giving students a chance to continue the conversation one-on-one.",
    descriptionHighlights: ["Amazon, Wells Fargo, and Waymo", "moderated panel", "open networking"],
    outcome:
      "The panel gave students practical perspectives on navigating change at work. Open networking gave them a chance to ask their own questions and follow up with the speakers.",
    outcomePhotos: [
      { src: "/images/events/careers-in-conversation-2026/photo-1.webp", alt: "A group photo at Careers in Conversation." },
      { src: "/images/events/careers-in-conversation-2026/photo-2.webp", alt: "Four attendees chat together after the panel." },
      { src: "/images/events/careers-in-conversation-2026/photo-3.webp", alt: "Panelists sit beneath a slide titled Closing Thoughts." },
      { src: "/images/events/careers-in-conversation-2026/photo-4.webp", alt: "A panelist gestures while speaking to the audience." },
      { src: "/images/events/careers-in-conversation-2026/photo-5.webp", alt: "Attendees mingle in front of the closing Thank You slide." },
      { src: "/images/events/careers-in-conversation-2026/photo-6.webp", alt: "An organizer poses beside the Global Career Network table." },
      { src: "/images/events/careers-in-conversation-2026/photo-7.webp", alt: "Two attendees smile as they hold microphones." },
      { src: "/images/events/careers-in-conversation-2026/photo-8.webp", alt: "A student speaks with a panelist during open networking." },
      { src: "/images/events/careers-in-conversation-2026/photo-9.webp", alt: "Attendees form small groups to talk after the panel." },
      { src: "/images/events/careers-in-conversation-2026/photo-10.webp", alt: "Four attendees continue the conversation near the front row." },
      { src: "/images/events/careers-in-conversation-2026/photo-11.webp", alt: "An attendee speaks with a panelist beside the closing slide." },
      { src: "/images/events/careers-in-conversation-2026/photo-12.webp", alt: "Three seated panelists during the discussion." },
      { src: "/images/events/careers-in-conversation-2026/photo-13.webp", alt: "The audience looks toward three speakers seated at the front." },
      { src: "/images/events/careers-in-conversation-2026/photo-14.webp", alt: "The panel gathers beneath the Complexity Made Simple title slide." },
    ],
    highlightStat: "3 employers represented",
    poster: "/images/events/careers-in-conversation-fall-2026.png",
    status: "past",
    category: "Panel",
    semester: "FALL 2026",
    academicYear: "26-27",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-comments",
  },
  // ── Fall 2025 ────────────────────────────────────────────────────────────
  {
    id: "welcome-week-tabling-series-2025",
    name: "Welcome Week Tabling Series",
    date: "Aug 18-21, 2025",
    isoDate: "2025-08-18",
    time: "",
    location: "Multi-campus: Tempe, Downtown, Poly campuses",
    attendanceMode: "in-person",
    description:
      "Every Thursday and throughout Welcome Week, our table became more than a place to promote upcoming events. It was often the first conversation a student had with GCN. Instead of asking people to simply scan a QR code and move on, we took the time to learn what they were studying, what they hoped to do after graduation, and what they were looking for on campus. Those conversations helped us recommend events that actually matched their interests, whether they were searching for internships, leadership opportunities, or simply a community to belong to.",
    outcome:
      "Our partners made it possible to leave every interaction with something tangible: drinks from sponsors like OLIPOP & Synergy, stickers, and other giveaways. But those were never the main takeaway. They were a small reminder of a conversation that started at our table. Many of the students who later became volunteers, officers, and familiar faces at our events first stopped by for a free drink and stayed because they found people who genuinely cared about helping them navigate college.",
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
    name: "GlobeTalk: Fall Panel Opener",
    date: "Sep 5, 2025",
    isoDate: "2025-09-05",
    time: "4:00-5:30 PM",
    location: "ASU Tempe",
    attendanceMode: "in-person",
    description:
      "GlobeTalk wasn't designed to be another speaker event where students sat quietly and left with a notebook full of quotes. We wanted students to hear honest stories about internships, career decisions, and the uncertainty that comes with starting out. The conversations felt approachable because they reflected the questions many students were already asking themselves at the beginning of the semester.",
    outcome:
      "The panel was only part of the experience. The conversations that continued afterward often mattered just as much. Students stayed behind to introduce themselves, ask questions they weren't comfortable asking publicly, and meet peers who were navigating similar career journeys. Those moments reinforced what GCN aims to create: an environment where learning continues long after the presentation ends.",
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
    time: "10:00 AM-4:00 PM",
    location: "Arizona Ballroom, Memorial Union",
    attendanceMode: "in-person",
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
    name: "Connect Forward: Where Leadership Meets Opportunity",
    date: "Nov 6, 2025",
    isoDate: "2025-11-06",
    time: "1:00-3:00 PM",
    location: "Amphitheater, SSV, ISSC",
    attendanceMode: "in-person",
    description:
      "Leadership can feel intimidating until you hear someone else's story. Connect Forward brought together student leaders from across ASU who spoke honestly about the challenges, failures, and lessons that came with building organizations and leading teams. By hearing from students only a few years ahead of them, attendees could picture themselves taking on those same opportunities.",
    outcome:
      "The networking session afterward reflected the culture we try to build at every GCN event. Conversations happened naturally over food and boba, with students introducing one another instead of standing in isolated groups. Whether someone left with a new mentor, a future collaborator, or simply a new friend, they walked away with connections that extended beyond a single afternoon.",
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
    name: "GlobeStrat'25: Case Competition",
    date: "Nov 22-23, 2025",
    isoDate: "2025-11-22",
    time: "",
    location: "Tempe campus",
    attendanceMode: "in-person",
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
    time: "3:00-5:00 PM",
    location: "SSV Amphitheater",
    attendanceMode: "in-person",
    description:
      "Structured networking session in partnership with ASU's Global Career Initiatives. Focused on building the on-campus network most students never intentionally develop.",
    outcome: "Second in a series of four GCI collab events, up from 1 the previous year.",
    highlightStat: null,
    poster: "/images/events/build-your-asu-network-2026.jpeg",
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
    time: "5:00-7:00 PM",
    location: "Wilson Hall WLSN 237",
    attendanceMode: "in-person",
    description:
      "First installment of our Careers in Conversation Series: a management-level industry panel featuring Amazon professionals. Speakers: Jugal Bhatt (SWE / AI content creator, 165k+ Instagram followers) and Billy Pierre (Business Continuity & Crisis Management Analyst).",
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
    name: "Blind Network: GCN's First Social Event",
    date: "Feb 13, 2026",
    isoDate: "2026-02-13",
    time: "5:00-7:00 PM",
    location: "Honey 2 A Bee café",
    attendanceMode: "in-person",
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
    name: "GlobeConnect 2026: Meet & Greet Talent",
    date: "Feb 24, 2026",
    isoDate: "2026-02-24",
    time: "5:00-7:00 PM",
    location: "MU 220 Turquoise",
    attendanceMode: "in-person",
    description:
      "Our flagship career fair, co-hosted with GCI. Format: employer panel first, then student-employer interaction. Company partners: Microsoft, Amazon, AWS, TSMC, DoorDash, American Express, IBM.",
    outcome:
      "160+ registrants made this our largest career event by attendance. Direct pipeline into the 10 internship offers announced at GlobeHack two months later.",
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
    time: "5:00-7:00 PM",
    location: "GCN × ACEL",
    attendanceMode: "in-person",
    description:
      "Our first debate-format panel. Panelists argued opposing positions on startup vs. corporate careers. Co-hosted with ACEL (Asian Corporate and Entrepreneur Leaders).",
    outcome:
      "Distinguished GCN from every other career-panel org on campus. Nobody else was doing debate format. Set up the ACEL partnership for future collabs.",
    highlightStat: null,
    poster: "/images/events/debate-panel-2026.jpeg",
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
    time: "4:30-6:30 PM",
    location: "COOR L1-84",
    attendanceMode: "in-person",
    description:
      "Second Careers in Conversation panel. Speakers: Dan Rodriguez (VP & GM, Edge Computing Group, Intel), Praveen Mosur (Intel Fellow, Product Architecture), Jenna Lapaglia (VP & CFO Operations, Finance Front-End Group). Highest-profile speaker lineup of the year.",
    outcome: "~70 registrants, the highest Careers in Conversation attendance to date.",
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
    name: "GlobeHack'26: Arizona's First GTM Strategy Hackathon",
    date: "Apr 18-19, 2026",
    isoDate: "2026-04-18",
    time: "",
    location: "LSE104 (Sat), ECG101 (Sun)",
    attendanceMode: "in-person",
    description:
      "Our biggest event of the year: Arizona's first Go-To-Market Strategy Hackathon, co-hosted with ACM. Not a software-build hackathon. Teams built go-to-market strategies for real products from real sponsors. 8 sponsoring companies. 4 main tracks + 4 side tracks. $11K in cash prizes. $4K in sponsor support. Track Sponsors: Moatable, Ink'd, Hydrawav3. Full sponsors: Red Bull, Lofty, Vector, Syncron, TruckerPath, Moatable, InsForge, 11ElevenLabs, HYDRAWAV3, ASU ISSC, FutureSelf, OLIPOP.",
    outcome:
      "280 hackers, the largest single-event attendance in GCN history. 10 on-site internship offers. 8 sponsoring companies. Established the differentiated GlobeHack brand (GTM, not code) that anchors our sponsor pitch going forward.",
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
    id: "globehack-upcoming",
    name: "GlobeHack",
    date: "Date TBD",
    isoDate: "",
    time: "",
    location: "",
    attendanceMode: "in-person",
    description: "",
    outcome: null,
    highlightStat: null,
    poster: null,
    status: "upcoming",
    category: "Hackathon",
    semester: "",
    academicYear: "26-27",
    attendeeCount: null,
    registrationUrl: "",
    icon: "fa-trophy",
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
    (a, b) => Number(!a.isoDate) - Number(!b.isoDate) || a.isoDate.localeCompare(b.isoDate)
  );
}
