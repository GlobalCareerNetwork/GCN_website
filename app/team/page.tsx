import type { Metadata } from "next";
import OrgTree from "@/components/OrgTree";

export const metadata: Metadata = { title: "Executive Board" };

export default function TeamPage() {
  return <OrgTree />;
}
