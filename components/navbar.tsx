"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      try {
        if (window.scrollY > 10) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      } catch (error) {
        console.error("Error in scroll handler:", error)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)

      // Initial check
      handleScroll()

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  }

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-background/95 backdrop-blur-md shadow-md"
      : "bg-gradient-to-br from-slate-900/50 via-purple-600/40 to-slate-900/50 dark:from-slate-900/60 dark:via-purple-900/50 dark:to-slate-900/60"
  }`}
>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center">
              <Image src="./logo.png" alt="BuilDwellz Logo" width={180} height={60} className="h-12 w-auto" />
            </Link>
          </motion.div>

          <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-1"
          >
            {navItems.map((item) => (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  href={item.path}
                  className={`px-4 py-2 rounded-md text-base font-medium transition-colors relative group ${
                    pathname === item.path ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                      pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <ModeToggle />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="relative z-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className={`md:hidden fixed inset-0 z-40 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col h-full bg-background dark:bg-black">
          <div className="flex-1 overflow-y-auto pt-20 px-6 pb-6 space-y-6">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navItems.indexOf(item) * 0.1 }}
              >
                <Link
                  href={item.path}
                  className={`block py-3 text-xl font-medium border-b border-border ${
                    pathname === item.path ? "text-primary border-primary" : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="p-6">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
