"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ParallaxSection({ children, className = "", speed = 0.5, direction = "up" }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  let transformValue

  switch (direction) {
    case "up":
      transformValue = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
      break
    case "down":
      transformValue = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
      break
    case "left":
      transformValue = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
      break
    case "right":
      transformValue = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
      break
    default:
      transformValue = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          [direction === "up" || direction === "down" ? "y" : "x"]: transformValue,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
