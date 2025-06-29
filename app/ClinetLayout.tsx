"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/components/animation-provider";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/error-boundary";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AnimationProvider>
        <ErrorBoundary
          fallback={
            <div className="min-h-screen flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Oops! Something went wrong
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  We're sorry for the inconvenience. Please try refreshing the page.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          }
        >
          {children}
          <Toaster />
        </ErrorBoundary>
      </AnimationProvider>
    </ThemeProvider>
  );
}