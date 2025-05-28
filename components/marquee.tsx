"use client"

import { type ReactNode, useRef, useEffect, useState } from "react"
import { useAnimationFrame } from "framer-motion"

interface MarqueeProps {
  children: ReactNode
  direction?: "left" | "right"
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  children,
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Calculate the animation duration based on content width and speed
  useEffect(() => {
    try {
      if (marqueeRef.current) {
        const marqueeContent = marqueeRef.current.querySelector(".marquee-content") as HTMLElement
        if (marqueeContent) {
          setContentWidth(marqueeContent.offsetWidth)
          setContainerWidth(marqueeRef.current.offsetWidth)

          // Calculate duration based on content width and speed
          // The larger the content, the longer the duration
          const calculatedDuration = (marqueeContent.offsetWidth / speed) * 5
          setDuration(calculatedDuration)
        }
      }

      const handleResize = () => {
        try {
          if (marqueeRef.current) {
            const marqueeContent = marqueeRef.current.querySelector(".marquee-content") as HTMLElement
            if (marqueeContent) {
              setContentWidth(marqueeContent.offsetWidth)
              setContainerWidth(marqueeRef.current.offsetWidth)

              const calculatedDuration = (marqueeContent.offsetWidth / speed) * 5
              setDuration(calculatedDuration)
            }
          }
        } catch (error) {
          console.error("Error in marquee resize handler:", error)
        }
      }

      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      }
    } catch (error) {
      console.error("Error in marquee setup:", error)
    }
  }, [speed, children])

  // Animation controls
  const x = useRef(0)
  const directionFactor = direction === "left" ? -1 : 1

  useAnimationFrame((_, delta) => {
    if (isPaused || !marqueeRef.current || !contentWidth || !containerWidth) return

    // Calculate how much to move based on delta time and speed
    const moveAmount = (delta / 1000) * speed * directionFactor

    // Update position
    x.current = (x.current + moveAmount) % contentWidth

    // Apply the transform
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current.querySelector(".marquee-content") as HTMLElement
      if (marqueeContent) {
        marqueeContent.style.transform = `translateX(${x.current}px)`
      }
    }
  })

  return (
    <div
      ref={marqueeRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="marquee-content inline-block"
        style={{
          willChange: "transform",
        }}
      >
        {children}
        {/* Duplicate content for seamless looping */}
        {children}
      </div>
    </div>
  )
}
