import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ClientLayout from "./ClinetLayout"; // New client-side wrapper

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "BuilDwellz - Premium Designers and Builders",
  description: "Premium design and construction services in Narikkal, Varkala",
  openGraph: {
    title: "BuilDwellz - Premium Designers and Builders",
    description: "Premium design and construction services in Narikkal, Varkala",
    url: "https://buildwellz.com",
    siteName: "BuilDwellz",
    images: [
      {
        url: "https://buildwellz.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BuilDwellz - Designing Dreams, Building Reality",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuilDwellz - Premium Designers and Builders",
    description: "Premium design and construction services in Narikkal, Varkala",
    images: ["https://buildwellz.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" role="document">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ClientLayout>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}