import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";

// ✅ No ssr: false here, since you're not marking this file as a client component

export const metadata: Metadata = {
  title: "BuilDwellz Blog | Insights on Construction, Design & Innovation in Trivandrum",
  description: "Explore expert insights, tips, and stories from BuilDwellz — Trivandrum's trusted construction company. Stay updated on architectural design, building trends, and sustainable innovation.",
  alternates: {
    canonical: "https://www.buildwellz.in/blog",
  },
};

export default function BlogRoutePage() {
  return <BlogPage />;
}