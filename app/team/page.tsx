import type { Metadata } from "next";
import OrgTree from "@/components/OrgTree";
import { pageMetadata } from "@/lib/site";

const description = "Meet the students leading Global Career Network at ASU.";

export const metadata: Metadata = {
  title: "Meet the Team",
  ...pageMetadata("Meet the Team | GCN at ASU", description, "/team"),
};

export default function TeamPage() {
  return <OrgTree />;
}
