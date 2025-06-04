"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/components/animation-provider";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/error-boundary";

export default function ClientLayout({ children }: { children: React.ReactNode }) {



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
       
            {children}
            <Toaster />
          </ErrorBoundary>
        </AnimationProvider>
      </ThemeProvider>
    </>
  );
}