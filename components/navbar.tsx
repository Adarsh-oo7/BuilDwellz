"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useMobile } from "@/hooks/use-mobile";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      try {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } catch (error) {
        console.error("Error in scroll handler for Navbar:", error.message, error.stack);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800"
          : "bg-gradient-to-br from-white/60 to-white/60 dark:from-gray-900/60 dark:to-gray-900/60"
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
              <Image
                src="./logo.png"
                alt="Logo"
                width={150}
                height={150}
              />
            </Link>
          </motion.div>

          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  href={item.path}
                  className={`px-4 py-2 rounded-md text-base font-medium transition-colors relative group ${
                    pathname === item.path
                      ? "text-red-600 dark:text-red-400"
                      : isScrolled
                      ? "text-black dark:text-white hover:text-red-600 dark:hover:text-red-400"
                      : "text-black dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                  }`}
                  aria-current={pathname === item.path ? "page" : undefined}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                      pathname === item.path
                        ? "bg-red-600 dark:bg-red-400 scale-x-100"
                        : isScrolled
                        ? "bg-red-600 dark:bg-red-400 scale-x-0 group-hover:scale-x-100"
                        : "bg-red-600 dark:bg-red-400 scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <ModeToggle />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                asChild
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border border-yellow-400 shadow-lg"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </motion.div>
          </motion.nav>

          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className={`relative z-50 ${
                isScrolled
                  ? "text-black dark:text-white hover:text-red-600 dark:hover:text-red-400"
                  : "text-black dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.nav
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className="md:hidden fixed top-0 left-0 right-0 bottom-0 z-40"
        style={{ display: isOpen ? "block" : "none" }}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full bg-white dark:bg-black">
          <div className="flex-1 overflow-y-auto pt-20 px-6 pb-6 space-y-4">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navItems.indexOf(item) * 0.1 }}
              >
                <Link
                  href={item.path}
                  className={`block py-3 text-xl font-medium border-b transition-colors ${
                    pathname === item.path
                      ? "text-red-600 dark:text-red-400 border-red-600 dark:border-red-400"
                      : "text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 border-gray-200 dark:border-gray-800 hover:border-red-600 dark:hover:border-red-400"
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === item.path ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-4">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border border-yellow-400 shadow-lg"
            >
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}