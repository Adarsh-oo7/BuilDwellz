"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Home, Ruler, Compass, FileText, ChevronRight, ArrowRight, Star, Sparkles, Info, PenSquare, Briefcase, Phone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  
  const targetRef = useRef(null)
  const cursorRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 100, damping: 30 }
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig)
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig)
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -100]), springConfig)

  // Custom cursor effect
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY })
  //     if (cursorRef.current) {
  //       cursorRef.current.style.left = e.clientX + 'px'
  //       cursorRef.current.style.top = e.clientY + 'px'
  //     }
  //   }

  //   window.addEventListener('mousemove', handleMouseMove)
  //   return () => window.removeEventListener('mousemove', handleMouseMove)
  // }, [])

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      icon: <Ruler className="h-7 w-7" />,
      title: "Building Plan",
      description: "Detailed architectural plans tailored to your needs and preferences.",
      gradient: "from-blue-400 to-purple-400",
      delay: 0.1,
    },
    {
      icon: <Compass className="h-7 w-7" />,
      title: "3D Design",
      description: "Visualize your project with realistic 3D renderings before construction begins.",
      gradient: "from-purple-400 to-pink-400",
      delay: 0.2,
    },
    {
      icon: <Home className="h-7 w-7" />,
      title: "Vaasthu Consulting",
      description: "Traditional architectural principles for harmony and positive energy.",
      gradient: "from-pink-400 to-red-400",
      delay: 0.3,
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Estimation",
      description: "Accurate cost estimates and budgeting for your construction project.",
      gradient: "from-green-400 to-blue-400",
      delay: 0.4,
    },
  ]

  const testimonials = [
    {
      name: "Priya Nair",
      location: "Varkala",
      rating: 5,
      text: "BuilDwellz transformed our dream home into reality. Their attention to detail and professionalism exceeded our expectations.",
      image: "/testimonial1.jpg"
    },
    {
      name: "Rajesh Kumar",
      location: "Narikkal",
      rating: 5,
      text: "Exceptional service from start to finish. The 3D visualization helped us perfect every detail before construction began.",
      image: "/testimonial2.jpg"
    },
    {
      name: "Meera Lakshmi",
      location: "Kovalam",
      rating: 5,
      text: "Their Vaasthu consulting service brought positive energy to our home. Highly recommend their expertise!",
      image: "/testimonial3.jpg"
    }
  ]

  const projects = [
    {
      title: "Modern Villa",
      location: "Varkala Beach Road",
      image: "/project1.jpg",
      type: "Residential"
    },
    {
      title: "Contemporary Home",
      location: "Narikkal",
      image: "/project2.jpg",
      type: "Residential"
    },
    {
      title: "Luxury Resort",
      location: "Kovalam",
      image: "/project3.jpg",
      type: "Commercial"
    }
  ]

  const navigationLinks = [
    {
      icon: <Info className="h-6 w-6" />,
      title: "About Us",
      description: "Learn more about our mission and team.",
      href: "/about",
      gradient: "from-purple-400 to-pink-400",
      delay: 0.1,
    },
    {
      icon: <PenSquare className="h-6 w-6" />,
      title: "Blog",
      description: "Read our latest articles and insights.",
      href: "/blog",
      gradient: "from-blue-400 to-purple-400",
      delay: 0.2,
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Projects",
      description: "Explore our portfolio of completed works.",
      href: "/projects",
      gradient: "from-pink-400 to-red-400",
      delay: 0.3,
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Contact",
      description: "Get in touch with our team.",
      href: "/contact",
      gradient: "from-green-400 to-blue-400",
      delay: 0.4,
    },
  ]

  const ScrollReveal = ({ children, direction = "up", delay = 0 }) => {
    return (
      <motion.div
        initial={{ 
          opacity: 0, 
          y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
          x: direction === "left" ? -50 : direction === "right" ? 50 : 0
        }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    )
  }

  const MagneticButton = ({ children }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full bg-primary rounded-full opacity-60 animate-pulse" />
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.h2
                className="text-2xl font-bold text-white"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                BuilDwellz
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/70 to-slate-900/80"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <motion.div 
          className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/50 via-purple-600/40 to-slate-900/50 dark:from-slate-900/60 dark:via-purple-900/50 dark:to-slate-900/60"
          style={{ opacity, scale, y }}
        />

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="relative mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative w-80 h-24 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-2xl">
                <h1 className="text-4xl font-bold text-white">BuilDwellz</h1>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight"
          >
            Designing Dreams,
            <br />
            Building Reality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300"
          >
            Premium design and construction services in Narikkal, Varkala
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <MagneticButton>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center transition-all duration-300">
                Get a Quote
                <Sparkles className="ml-2 h-4 w-4" />
              </button>
            </MagneticButton>
            
            <MagneticButton>
              <button className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-md shadow-2xl px-8 py-4 rounded-lg transition-all duration-300">
                View Our Projects
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="py-16 bg-background/80 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                Explore <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">More</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover more about our services, insights, and how to get in touch.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {navigationLinks.map((link, index) => (
              <ScrollReveal key={index} delay={link.delay}>
                <Link href={link.href}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-6 rounded-2xl bg-card backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border border-border"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className={`bg-gradient-to-br ${link.gradient} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {link.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-card-foreground">
                        {link.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {link.description}
                      </p>
                      
                      <div className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300 cursor-pointer">
                        Explore Now
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background/80 backdrop-blur-sm overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">
                  About{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    BuilDwellz
                  </span>
                </h2>
                
                <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                  BuilDwellz is a premier design and construction company based in Narikkal, Varkala. We specialize in
                  creating beautiful, functional spaces that elevate the way you live.
                </p>
                
                <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                  With our team of experienced architects, designers, and builders, we take comfort and home living to
                  profound new heights. From concept to completion, we handle every aspect of your project with precision
                  and care.
                </p>
                
                <MagneticButton>
                  <Link href="/about">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center group">
                      Learn More About Us
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <div 
                  className="w-full h-96 bg-cover bg-center rounded-2xl shadow-2xl"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80")'
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Premium</span> Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We offer a comprehensive range of design and construction services to bring your vision to life.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={service.delay}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-6 rounded-2xl bg-card backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border border-border"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`bg-gradient-to-br ${service.gradient} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-card-foreground">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300 cursor-pointer">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-purple-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover some of our most stunning architectural achievements
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="rounded-2xl overflow-hidden shadow-2xl bg-card group cursor-pointer"
                >
                  <div 
                    className="h-64 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-${index === 0 ? '1600607687939-ce8a6c25118c' : index === 1 ? '1600585154340-be6161a56a0c' : '1571771894149-7d4adfdb645d'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")`
                    }}
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-card-foreground">
                        {project.title}
                      </h3>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-sm">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {project.location}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                What Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Clients</span> Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Read testimonials from our satisfied customers
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-card shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Ready to Build Your Dream?
            </motion.h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and bring your vision to life with our expert team.
            </p>
            <MagneticButton>
              <Link href="/contact">
                <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold shadow-xl transition-all duration-300 flex items-center mx-auto">
                  Contact Us Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}