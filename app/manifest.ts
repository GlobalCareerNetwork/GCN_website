import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "GCN at ASU",
    description:
      "Global Career Network at ASU — career events, mentorship, and a global professional network for students.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F1E8",
    theme_color: "#9e221a",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
