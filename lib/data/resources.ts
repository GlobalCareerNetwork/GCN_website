import { z } from "zod";

// ── Schema ──────────────────────────────────────────────────────────────────

export const ResourceSchema = z.object({
  id: z.string(),          // kebab-case slug
  title: z.string(),
  description: z.string(),
  url: z.string(),
  icon: z.string(),        // key identifying which SVG icon to render
});

export type Resource = z.infer<typeof ResourceSchema>;

export const ResourcesDataSchema = z.array(ResourceSchema);

// ── Data ────────────────────────────────────────────────────────────────────

const rawResourcesData = [
  {
    id: "careerlink",
    icon: "briefcase",
    title: "CareerLink",
    description:
      "Search for internships, part-time jobs and full-time opportunities available to ASU students and alumni. Students can also explore employers, register for career events and manage their professional profile using their ASURITE credentials.",
    url: "https://career-asu.12twenty.com/Login",
  },
  {
    id: "goinglobal",
    icon: "globe",
    title: "GoinGlobal",
    description:
      "Explore internships and job opportunities in the United States and around the world. GoinGlobal also provides employer sponsorship information, country-specific career guides, cultural advice and guidance for applying for opportunities internationally.",
    url: "https://online.goinglobal.com/user/login",
  },
  {
    id: "h1b-data-hub",
    icon: "database",
    title: "H-1B Employer Data Hub",
    description:
      "Research employers that have submitted H-1B petitions through the official USCIS database. Users can search by employer name, location, industry and fiscal year to better understand an organization's previous H-1B petition activity.",
    url: "https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub",
  },
  {
    id: "intl-career-resources",
    icon: "compass",
    title: "International Student Career Resources",
    description:
      "Access career resources created specifically for ASU international students. The page includes information about resumes, interviews, networking, working in the United States, CPT and OPT employers, H-1B research, career appointments and professional development resources.",
    url: "https://career.eoss.asu.edu/channels/international/",
  },
  {
    id: "asu-ai-tools",
    icon: "spark",
    title: "AI Tools at ASU",
    description:
      "Discover AI tools and resources available to the ASU community. Students can explore ASU's CreateAI services, approved third-party tools, responsible-use guidelines, digital trust information, tutorials and AI support resources.",
    url: "https://ai.asu.edu/ai-tools",
  },
] as const;

// Validate at module load — type errors surface at build time, not runtime
export const RESOURCES: Resource[] = ResourcesDataSchema.parse(
  rawResourcesData.map((r) => ({ ...r }))
);
