import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Add new routes here as they're built.
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/team", priority: 0.7 },
  { path: "/events", priority: 0.8 },
  { path: "/sponsor", priority: 0.8 },
  { path: "/resources", priority: 0.7 },
  { path: "/join", priority: 0.8 },
  { path: "/achievements", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }));
}
