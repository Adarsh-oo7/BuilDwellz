import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
// import ClientLayout from "./ClinetLayout"; 
import Script from "next/script";
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
      <head>
        <link rel="preload" as="image" href="/hero-images/frame_0001.webp" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${jost.variable} ${space.variable} font-sans`}>

        {/* <ClientLayout> */}
        <Navbar />
        <main id="main-content">{children}</main>
        <WhatsAppButton />
        <Footer />
        {/* </ClientLayout> */}
      </body>
    </html>
  );
}