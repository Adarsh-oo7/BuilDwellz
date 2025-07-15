import type { Metadata } from "next";
import InitiativesPage from "@/components/InitiativesPage"; // ✅ your client component

export const metadata: Metadata = {
  title: "Our Initiatives | Sustainable Construction Projects in Trivandrum",
  description:
    "Discover BuilDwellz’s innovative and sustainable construction initiatives in Trivandrum. See how we’re building the future with responsibility and excellence.",
  alternates: {
    canonical: "https://www.buildwellz.in/Initiatives",
  },
};

export default function InitiativesRoutePage() {
  return <InitiativesPage />;
}
