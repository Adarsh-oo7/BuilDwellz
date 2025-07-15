// app/contact/page.tsx
import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact BuilDwellz | Top Construction Company in Trivandrum",
  description: "Get in touch with BuilDwellz, the leading construction company in Trivandrum. Call us or fill out our contact form to discuss your dream project today.",
  alternates: {
    canonical: "https://www.buildwellz.in/contact",
  },
};

export default function ContactPageRoute() {
  return <ContactPage />;
}
