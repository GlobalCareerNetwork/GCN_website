import { z } from "zod";

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
  photo: z.string().nullable(),
  photoPosition: z.string().optional(),
  bio: z.string(),
  linkedinUrl: z.string(),
  email: z.string(),
  major: z.string(),
  year: z.string(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const TeamDataSchema = z.array(TeamMemberSchema);

const rawTeamData = [
  {
    id: "keshava-olagappaa-subramanian",
    name: "Keshava Olagappaa Subramanian",
    role: "President",
    department: "Executive",
    photo: "/images/team/keshava-portrait.webp",
    photoPosition: "center 92%",
    bio: "Does everything someone says no to.",
    linkedinUrl: "https://www.linkedin.com/in/keshava-olagappaa/",
    email: "ksubra36@asu.edu",
    major: "Computer Science",
    year: "Spring 2028",
  },
  {
    id: "pushkar-prasad",
    name: "Pushkar Prasad",
    role: "Vice President",
    department: "Executive",
    photo: "/images/team/pushkar-portrait.webp",
    photoPosition: "center 85%",
    bio: "i am always sleep deprived",
    linkedinUrl: "https://www.linkedin.com/in/pushkar1008/",
    email: "pprasa15@asu.edu",
    major: "Computer Science",
    year: "Fall 2028",
  },
  {
    id: "kendra-pham-do",
    name: "Pham (Kendra) Do",
    role: "Vice President",
    department: "Executive",
    photo: "/images/team/kendra-portrait.webp",
    photoPosition: "center 94%",
    bio: "Making noise in the quietest way",
    linkedinUrl: "https://www.linkedin.com/in/pham-do-409356360/",
    email: "",
    major: "Computer Information System and Supply Chain Management",
    year: "Spring 2028",
  },
  {
    id: "mahi-brahmbhatt",
    name: "Mahi P. Brahmbhatt",
    role: "Events, Outreach, & Marketing Intern",
    department: "Operations",
    photo: "/images/team/mahi-portrait.webp",
    photoPosition: "center 85%",
    bio: "I like to make food of different cuisines.",
    linkedinUrl: "https://www.linkedin.com/in/mahi-brahmbhatt/",
    email: "mbrambha@asu.edu",
    major: "Mechanical Engineering",
    year: "Spring 2027",
  },
  {
    id: "tanu-magesh",
    name: "Tanushri Magesh Sowmya",
    role: "Director of Outreach",
    department: "Outreach",
    photo: "/images/team/tanushri-portrait.webp",
    photoPosition: "center 88%",
    bio: "Making it up as I go!",
    linkedinUrl: "https://www.linkedin.com/in/tanushri-magesh-sowmya-592bb42b6/",
    email: "tmageshs@asu.edu",
    major: "Industrial Engineering",
    year: "Spring 2027",
  },
  {
    id: "vishnu-uppalapati",
    name: "Vishnu Uppalapati",
    role: "Outreach Intern",
    department: "Outreach",
    photo: "/images/team/vishnu-portrait.webp",
    photoPosition: "center 94%",
    bio: "Running on four hours and hope.",
    linkedinUrl: "https://www.linkedin.com/in/vishnu-uppalapati/",
    email: "vuppala6@asu.edu",
    major: "Computer Science",
    year: "Spring 2029",
  },
  {
    id: "harshith-vijayan",
    name: "Harshith Vijayan",
    role: "Outreach Intern",
    department: "Outreach",
    photo: "/images/team/harshith-portrait.webp",
    photoPosition: "center 86%",
    bio: "Plays every sport. Masters none. Shows up anyway.",
    linkedinUrl: "https://www.linkedin.com/in/harshithvijayan/",
    email: "hvijayan@asu.edu",
    major: "Computer Science",
    year: "Spring 2028",
  },
  {
    id: "anhiti-vooturi",
    name: "Anhiti Vooturi",
    role: "Technical Intern",
    department: "Technical",
    photo: "/images/team/anhiti-portrait.webp",
    photoPosition: "center 88%",
    bio: "Following Newton's laws by staying in motion :)",
    linkedinUrl: "https://www.linkedin.com/in/anhiti-vooturi-9892a7256/",
    email: "avooturi@asu.edu",
    major: "Computer Science",
    year: "Spring 2028",
  },
  {
    id: "harry-yuan",
    name: "Harry Yuan",
    role: "Finance Intern",
    department: "Finance",
    photo: "/images/team/harry-portrait.webp",
    photoPosition: "center 94%",
    bio: "Always looking for my next trip",
    linkedinUrl: "https://www.linkedin.com/in/cheng-hsi/",
    email: "cyuan127@asu.edu",
    major: "Economics & Finance",
    year: "Spring 2029",
  },
  {
    id: "daksh-raghav",
    name: "Daksh Raghav Preetha",
    role: "Marketing Director",
    department: "Marketing",
    photo: "/images/team/daksh-portrait.webp",
    photoPosition: "center 86%",
    bio: "Probably watching F1 when I should be studying.",
    linkedinUrl: "https://www.linkedin.com/in/dakshraghav/",
    email: "dpreetha@asu.edu",
    major: "Robotics Engineering",
    year: "Spring 2028",
  },
  {
    id: "jennifer-phan",
    name: "Jennifer Phan",
    role: "Marketing Intern",
    department: "Marketing",
    photo: "/images/team/jennifer.jpg",
    photoPosition: "center 25%",
    bio: "Shenaned once, might shenanigan",
    linkedinUrl: "https://www.linkedin.com/in/jenniferphan171/",
    email: "nphan8@asu.edu",
    major: "Marketing & BDA",
    year: "Spring 2027",
  },
  {
    id: "bonnie-cheng",
    name: "Bonnie Cheng",
    role: "Marketing Intern",
    department: "Marketing",
    photo: "/images/team/bonnie-portrait.webp",
    photoPosition: "center 80%",
    bio: "Professional daydreamer, part-time responsible adult.",
    linkedinUrl: "https://www.linkedin.com/in/bonnie-cheng-asu/",
    email: "cchen464@asu.edu",
    major: "Accountancy",
    year: "Spring 2028",
  },
] as const;

export const teamData: TeamMember[] = TeamDataSchema.parse(rawTeamData);

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
  return teamData.filter((member) => member.department === dept);
}

export function getExecutiveBoard(): TeamMember[] {
  return getMembersByDepartment("Executive");
}

export function getDepartmentLeads(): TeamMember[] {
  return teamData.filter((member) => member.role.startsWith("Director of ") || /\b(Lead|Officer|Director)$/.test(member.role));
}
