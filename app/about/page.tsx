import type { Metadata } from "next";
import AboutPage from "@/components/Aboutpage";

// ✅ No ssr: false here, since you're not marking this file as a client component

export const metadata: Metadata = {
  title: "Best Construction Company in Trivandrum | BuilDwellz Constructions",
  description: "Looking for trusted construction services in Trivandrum? BuilDwellz offers residential & commercial building, architectural design, and turnkey projects with expert craftsmanship.",
  alternates: {
    canonical: "https://www.buildwellz.in/about",
  },
};

export default function AboutRoutePage() {
  return <AboutPage />;
}