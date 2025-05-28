import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationProvider } from "@/components/animation-provider"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "BuilDwellz - Premium Designers and Builders",
  description: "Premium design and construction services in Narikkal, Varkala",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AnimationProvider>
            <ErrorBoundary
              fallback={<div className="p-8 text-center">Something went wrong. Please refresh the page.</div>}
            >
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </ErrorBoundary>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
