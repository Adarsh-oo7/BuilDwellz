import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Space_Grotesk, Jost } from 'next/font/google';

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-space"
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-jost"
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL('https://buildwellz.in'),

  title: {
    default: "BuilDwellz (Buildwell, Buildwells) - Premium Designers and Builders in Varkala",
    template: "%s | BuilDwellz", // page title will be: "About | BuilDwellz"
  },
  description: "Premium home design and construction services in Narikkal, Varkala, Kerala. Experts in modern architecture, interior design, and building construction.",
  keywords: [
    "builders in Varkala",
    "home construction Varkala",
    "architects in Kerala",
    "interior design Varkala",
    "construction company Narikkal",
    "house design Kerala",
    "builders near me Varkala",
    "BuilDwellz",
    "Buildwellz",
    "buildwell",
    "buildwells",
    "build wellz",
    "buildwelz",

    // Location-based
    "builders in Varkala",
    "home construction Varkala",
    "architects in Kerala",
    "interior design Varkala",
    "construction company Narikkal",
    "house design Kerala",
    "builders near me Varkala",
    "best builders Varkala",
    "builders in Kollam",
    "builders in Thiruvananthapuram",
  ],

  alternates: {
    canonical: "https://buildwellz.in",
  },

  openGraph: {
    title: "BuilDwellz - Premium Designers and Builders",
    description: "Premium design and construction services in Narikkal, Varkala",
    url: "https://buildwellz.in",
    siteName: "BuilDwellz",
    images: [
      {
        url: "https://buildwellz.in/offc.jpg",
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
    images: ["https://buildwellz.in/offc.jpg"],
  },
  icons: {
    icon: [
      { url: '../logo.png' },
      { url: '../web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '../web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '../apple-icon.png',
    shortcut: '../favicon.ico',
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BuilDwellz",
  "alternateName": ["Buildwellz", "Buildwell", "Buildwells"],
  "url": "https://buildwellz.in",
  "telephone": "+91-8590128023",
  "email": "buildwellzvarkala@gmail.com",
  "image": "https://buildwellz.in/offc.jpg",
  "logo": "https://buildwellz.in/logo.png",
  "description": "Premium home design and construction services in Narikkal, Varkala, Kerala.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Narikkal",
    "addressLocality": "Varkala",
    "addressRegion": "Kerala",
    "postalCode": "695143",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Sa 09:00-18:00",
  "sameAs": [
    "https://www.instagram.com/buildwellz_designersnbuilders",
    "https://www.facebook.com/buildwellz.varala"  // cleaned up URL
  ]
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" role="document">
      <head>
        <link rel="preload" as="image" href="/hero-images/frame_0001.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${jost.variable} ${space.variable} font-sans`}>

        <Navbar />
        <main id="main-content">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}