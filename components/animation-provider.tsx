"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

type AnimationContextType = {
  isPageLoaded: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  isPageLoaded: false,
})

export const useAnimation = () => useContext(AnimationContext)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return

    // Initialize scroll animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (!entry.target || !(entry.target instanceof Element)) return

        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          // Once the animation has played, we can stop observing the element
          if (entry.target.classList.contains("observe-once")) {
            observer.unobserve(entry.target)
          }
        } else {
          // If we want the animation to play each time the element comes into view
          if (!entry.target.classList.contains("observe-once")) {
            entry.target.classList.remove("visible")
          }
        }
      })
    }

    let observer: IntersectionObserver | null = null
    let cursorGlow: HTMLElement | null = null
    let animatedElements: NodeListOf<Element> | null = null

    try {
      // Only create observer if IntersectionObserver is supported
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(handleIntersect, observerOptions)

        // Observe all elements with animation classes
        animatedElements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .reveal-item")
        animatedElements.forEach((el) => {
          if (observer) observer.observe(el)
        })
      } else {
        console.warn("IntersectionObserver not supported in this browser. Animations may not work as expected.")
        // Make all elements visible immediately as fallback
        document
          .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .reveal-item")
          .forEach((el) => el.classList.add("visible"))
      }
    } catch (error) {
      console.error("Error setting up IntersectionObserver:", error)
    }

    // Initialize cursor glow effect for desktop
    if (window.innerWidth > 1024) {
      try {
        cursorGlow = document.createElement("div")
        cursorGlow.classList.add("cursor-glow")
        document.body.appendChild(cursorGlow)

        const handleMouseMove = (e: MouseEvent) => {
          if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`
            cursorGlow.style.top = `${e.clientY}px`

            if (!cursorGlow.classList.contains("visible")) {
              cursorGlow.classList.add("visible")
            }
          }
        }

        const handleMouseLeave = () => {
          if (cursorGlow) {
            cursorGlow.classList.remove("visible")
          }
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseleave", handleMouseLeave)
      } catch (error) {
        console.error("Error setting up cursor glow:", error)
      }
    }

    // Set page as loaded
    setIsPageLoaded(true)

    // Cleanup
    return () => {
      if (observer) {
        if (animatedElements) {
          animatedElements.forEach((el) => {
            try {
              observer.unobserve(el)
            } catch (e) {
              // Ignore errors during cleanup
            }
          })
        }
        observer.disconnect()
      }

      if (cursorGlow && document.body.contains(cursorGlow)) {
        try {
          document.removeEventListener("mousemove", () => {})
          document.removeEventListener("mouseleave", () => {})
          document.body.removeChild(cursorGlow)
        } catch (error) {
          console.error("Error cleaning up cursor glow:", error)
        }
      }
    }
  }, [pathname])

  return (
    <AnimationContext.Provider value={{ isPageLoaded }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </AnimationContext.Provider>
  )
}
