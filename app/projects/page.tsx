import type { Metadata } from "next";
import Projectspage from "@/components/Projectspage";

export const metadata: Metadata = {
  title: "Our Projects | Completed Construction & Design Works in Trivandrum | BuilDwellz",
  description:
    "Explore our portfolio of completed and ongoing construction projects across Trivandrum. From residential homes to commercial spaces, BuilDwellz delivers quality, innovation, and trust in every build.",
  alternates: {
    canonical: "https://www.buildwellz.in/projects",
  },
};

export default function ProjectsRoutePage() {
  return <Projectspage />;
}
