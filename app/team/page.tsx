import type { Metadata } from "next";
import OrgTree from "@/components/OrgTree";
import { pageMetadata } from "@/lib/site";

const description =
  "Meet the executive board leading Global Career Network at ASU — the officers driving career development, networking, and innovation programming for students.";

export const metadata: Metadata = {
  title: "Executive Board",
  ...pageMetadata("Executive Board | GCN at ASU", description, "/team"),
};

export default function TeamPage() {
  return <OrgTree />;
}
