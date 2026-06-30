import { z } from "zod";

// ── Schema ──────────────────────────────────────────────────────────────────

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  department: z.enum([
    "Executive",
    "Operations",
    "Outreach",
    "Technical",
    "Finance",
    "Marketing",
  ]),
  photo: z.string(),
  bio: z.string(),
  hobby: z.string(),
  linkedinUrl: z.string(),
  major: z.string(),
  year: z.enum(["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "Alumni", ""]),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const TeamDataSchema = z.array(TeamMemberSchema);

// ── Data ────────────────────────────────────────────────────────────────────
// Source: static/js/team.js TEAM_DATA object (hero-globe-logo-updates branch)
// Fields added: major, year
// linkedinUrl left as "" with TODO where not available

const rawTeamData = [
  // ── Executive Leadership ──────────────────────────────────────────────────
  {
    id: "keshava-olagappaa-subramanian",
    name: "Keshava Olagappaa Subramanian",
    role: "President",
    department: "Executive",
    photo: "/images/team/keshava.png",
    bio: "Passionate about organizing impactful events that help students develop essential career skills.",
    hobby: "I love hosting events and drinking Matcha!",
    linkedinUrl: "https://www.linkedin.com/in/keshava-olagappaa/",
    major: "Computer Science",
    year: "Senior",
  },
  {
    id: "bao-nguyen",
    name: "Bao Nguyen",
    role: "Vice President",
    department: "Executive",
    photo: "/images/team/bao.jpg",
    bio: "Focused on building partnerships and scaling GCN's impact across campus and industry.",
    hobby: "Playing basketball and discovering new ramen spots around Phoenix.",
    linkedinUrl: "https://www.linkedin.com/in/quocnguyen-2203asu/",
    major: "Business Administration",
    year: "Senior",
  },

  // ── Operations ────────────────────────────────────────────────────────────
  {
    id: "henry-tran",
    name: "Henry Tran",
    role: "Officer",
    department: "Operations",
    photo: "/images/team/henry.jpg",
    bio: "Keeps club operations running smoothly and ensures events are executed flawlessly.",
    hobby: "Cooking and exploring hiking trails.",
    linkedinUrl: "https://www.linkedin.com/in/nhattran0812/",
    major: "Supply Chain Management",
    year: "Junior",
  },
  {
    id: "angel-rosas",
    name: "Angel Rosas",
    role: "Team Lead",
    department: "Operations",
    photo: "/images/team/angel.jpg",
    bio: "Leads logistics and coordination to keep GCN events seamless and impactful.",
    hobby: "Photography and trying new coffee shops.",
    linkedinUrl: "https://www.linkedin.com/in/angel-e-rosas/",
    major: "Management",
    year: "Junior",
  },
  {
    id: "mahi-brahmbhatt",
    name: "Mahi Brahmbhatt",
    role: "Intern",
    department: "Operations",
    photo: "/images/team/mahi.png",
    bio: "Supports operational tasks and is developing project management skills.",
    hobby: "Dancing and binge-watching documentaries.",
    linkedinUrl: "https://www.linkedin.com/in/mahi-brahmbhatt/",
    major: "Business",
    year: "Sophomore",
  },

  // ── Outreach ──────────────────────────────────────────────────────────────
  {
    id: "tanu-magesh",
    name: "Tanushri MageshSowmya",
    role: "Team Lead",
    department: "Outreach",
    photo: "/images/team/tanu.jpeg",
    bio: "Drives community outreach and builds GCN's presence across ASU.",
    hobby: "Painting and attending cultural festivals.",
    linkedinUrl: "https://www.linkedin.com/in/tanushri-magesh-sowmya-592bb42b6/",
    major: "Marketing",
    year: "Junior",
  },
  {
    id: "vishnu-uppalapati",
    name: "Vishnu Uppalapati",
    role: "Intern",
    department: "Outreach",
    photo: "/images/team/vishnu.jpeg",
    bio: "Assists with outreach campaigns and student engagement initiatives.",
    hobby: "Gaming and playing chess.",
    linkedinUrl: "https://www.linkedin.com/in/vishnu-uppalapati/",
    major: "Information Technology",
    year: "Sophomore",
  },
  {
    id: "harshith-vijayan",
    name: "Harshith Vijayan",
    role: "Intern",
    department: "Outreach",
    photo: "/images/team/harshith.jpg",
    bio: "Supports outreach efforts and helps grow GCN's student network.",
    hobby: "Cricket and watching Formula 1.",
    linkedinUrl: "https://www.linkedin.com/in/harshith-vijayan-b36229326/",
    major: "Computer Science",
    year: "Freshman",
  },

  // ── Technical ─────────────────────────────────────────────────────────────
  {
    id: "pushkar-prasad",
    name: "Pushkar Prasad",
    role: "Team Lead",
    department: "Technical",
    photo: "/images/team/pushkar.jpeg",
    bio: "Leads technical development and maintains GCN's digital infrastructure.",
    hobby: "Building side projects and playing badminton.",
    linkedinUrl: "https://www.linkedin.com/in/pushkar1008/",
    major: "Software Engineering",
    year: "Junior",
  },
  {
    id: "anhiti-vooturi",
    name: "Anhiti Vooturi",
    role: "Intern",
    department: "Technical",
    photo: "/images/team/anhiti.jpeg",
    bio: "Contributes to web development and digital tools for club operations.",
    hobby: "Reading sci-fi novels and sketching.",
    linkedinUrl: "https://www.linkedin.com/in/anhiti-vooturi-9892a7256/",
    major: "Computer Science",
    year: "Sophomore",
  },

  // ── Finance ───────────────────────────────────────────────────────────────
  {
    id: "kendra-pham-do",
    name: "Kendra (Pham) Do",
    role: "Team Lead",
    department: "Finance",
    photo: "/images/team/kendra.jpg",
    bio: "Manages GCN's budget and ensures responsible financial planning for all events.",
    hobby: "Baking and visiting art museums.",
    linkedinUrl: "", // TODO: needs real link
    major: "Finance",
    year: "Junior",
  },
  {
    id: "harry-yuan",
    name: "Harry Yuan",
    role: "Intern",
    department: "Finance",
    photo: "/images/team/harry.png",
    bio: "Supports financial tracking and learns club budgeting processes.",
    hobby: "Playing piano and watching anime.",
    linkedinUrl: "https://www.linkedin.com/in/cheng-hsi/",
    major: "Accountancy",
    year: "Sophomore",
  },

  // ── Marketing ─────────────────────────────────────────────────────────────
  {
    id: "daksh-raghav",
    name: "Daksh Raghav",
    role: "Team Lead",
    department: "Marketing",
    photo: "/images/team/daksh.jpg",
    bio: "Leads brand strategy, social media, and promotional campaigns for GCN.",
    hobby: "Graphic design and travelling.",
    linkedinUrl: "https://www.linkedin.com/in/dakshraghav/",
    major: "Marketing",
    year: "Junior",
  },
  {
    id: "jennifer-phan",
    name: "Jennifer Phan",
    role: "Intern",
    department: "Marketing",
    photo: "/images/team/jennifer.jpg",
    bio: "Assists with content creation and digital marketing for GCN events.",
    hobby: "Photography and DIY crafts.",
    linkedinUrl: "", // TODO: needs real link
    major: "Journalism and Mass Communication",
    year: "Sophomore",
  },
] as const;

// Validate at module load — type errors surface at build time, not runtime
export const teamData: TeamMember[] = TeamDataSchema.parse(
  rawTeamData.map((m) => ({ ...m }))
);

// ── Helpers ──────────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  "Executive",
  "Operations",
  "Outreach",
  "Technical",
  "Finance",
  "Marketing",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export function getMembersByDepartment(dept: Department): TeamMember[] {
  return teamData.filter((m) => m.department === dept);
}

export function getExecutiveBoard(): TeamMember[] {
  return getMembersByDepartment("Executive");
}

export function getDepartmentLeads(): TeamMember[] {
  return teamData.filter((m) => m.role === "Team Lead" || m.role === "Officer");
}
