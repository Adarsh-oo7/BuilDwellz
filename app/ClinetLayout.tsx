"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/components/animation-provider";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/error-boundary";
import Loading from "@/components/Loading";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading on page change
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AnimationProvider>
          <ErrorBoundary
            fallback={
              <div className="p-8 text-center">
                <p className="text-lg text-red-600 mb-4">Something went wrong. Please try again.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg shadow-lg"
                >
                  Refresh Page
                </button>
              </div>
            }
          >
            <Loading isLoading={isLoading} />
            {children}
            <Toaster />
          </ErrorBoundary>
        </AnimationProvider>
      </ThemeProvider>
    </>
  );
}