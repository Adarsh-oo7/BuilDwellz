"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Home, Ruler, Compass, FileText, ChevronRight, ArrowRight, Star, Award, CheckCircle, Moon, Sun, Sparkles, Facebook, Instagram, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className={`relative overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-gray-900'} text-white`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
      <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-purple-400/10 blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-pink-400/10 blur-3xl"></div>

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-block mb-6">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                BuilDwellz
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Creating beautiful, functional spaces in Narikkal, Varkala and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/share/1C12XqmznD/"
                target="blank"
                className="text-gray-300 hover:text-pink-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/buildwellz_designersnbuilders"
                target="blank"
                className="text-gray-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              Quick Links <ArrowUpRight className="ml-2 h-4 w-4 text-purple-400" />
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Projects", path: "/projects" },
                { name: "Initiatives", path: "/Initiatives" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },


              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-gray-300 hover:text-pink-400 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              Services <ArrowUpRight className="ml-2 h-4 w-4 text-purple-400" />
            </h3>
            <ul className="space-y-3">
              {[
                "Building Plan",
                "3D Design",
                "Vaasthu Consulting",
                "Estimation",
                "Structural Designing",
                "Building Construction",
              ].map((service) => (
                <li key={service} className="text-gray-300 group flex items-center">
                  <span className={`w-1 h-1 ${isDarkMode ? 'bg-pink-400' : 'bg-purple-400'} rounded-full mr-2 group-hover:w-2 transition-all duration-300`}></span>
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              Contact Us <ArrowUpRight className="ml-2 h-4 w-4 text-purple-400" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-3 text-pink-400 mt-1 group-hover:text-purple-400 transition-colors" />
                <span className="text-gray-300">Narikkal, Varkala</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 text-pink-400 group-hover:text-purple-400 transition-colors" />
                <a href="tel:8137834741" className="text-gray-300 hover:text-white transition-colors">
                  8137834741
                </a>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 text-pink-400 group-hover:text-purple-400 transition-colors" />
                <a href="tel:8590128023" className="text-gray-300 hover:text-white transition-colors">
                  8590128023
                </a>
              </li>
              
              <li className="flex items-center group">
                <Mail  className="h-5 w-5 mr-3 text-pink-400 group-hover:text-purple-400 transition-colors" />
                <a
                  href="mailto:BUILDWELLZVARKALA@GMAIL.COM"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  BUILDWELLZVARKALA@GMAIL.COM
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} BuilDwellz. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`rounded-full p-3 border ${isDarkMode ? 'border-gray-700 hover:border-purple-400' : 'border-gray-600 hover:border-pink-400'} hover:bg-gradient-to-r hover:from-purple-400/10 hover:to-pink-400/10 transition-all`}
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </footer>
  )
}