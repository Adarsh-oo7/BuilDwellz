import type { Metadata } from "next";
import dynamic from "next/dynamic";
import InitiativeWrapper from "./page";

// ✅ No ssr: false here, since you're not marking this file as a client component

export const metadata: Metadata = {
  title: "Our Initiatives | Sustainable Construction Projects in Trivandrum",
  description: "Discover BuilDwellz’s innovative and sustainable construction initiatives in Trivandrum. See how we’re building the future with responsibility and excellence.",
  alternates: {
    canonical: "https://www.buildwellz.in/Initiatives",
  },
};

export default function Page() {
  return <InitiativeWrapper />;
}