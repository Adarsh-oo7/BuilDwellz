"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform,useAnimation, useSpring, AnimatePresence } from "framer-motion";
import { Home, Ruler, Compass, FileText, ChevronRight, ArrowRight, Star, Sparkles, Info, PenSquare, Briefcase, Phone, Wrench, Paintbrush, Hammer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function HomePage() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const targetRef = useRef(null);
  const cursorRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig);
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -100]), springConfig);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

useEffect(() => {
  if (!isHovered) {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 10, // Adjust speed here
        ease: "linear",
      },
    });
  } else {
    controls.stop(); // Pause on hover
  }
}, [isHovered]);

  // Custom cursor movement

  const services = [
    {
      icon: <Ruler className="h-7 w-7" />,
      title: "Building Plan",
      description: "Detailed architectural plans tailored to your needs and preferences.",
      gradient: "from-red-500 to-red-600",
      delay: 0.1,
    },
    {
      icon: <Compass className="h-7 w-7" />,
      title: "3D Design",
      description: "Visualize your project with realistic 3D renderings before construction begins.",
      gradient: "from-yellow-500 to-red-500",
      delay: 0.2,
    },
    {
      icon: <Home className="h-7 w-7" />,
      title: "Vaasthu Consulting",
      description: "Traditional architectural principles for harmony and positive energy.",
      gradient: "from-red-600 to-black",
      delay: 0.3,
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Estimation",
      description: "Accurate cost estimates and budgeting for your construction project.",
      gradient: "from-yellow-400 to-yellow-600",
      delay: 0.4,
    },
    {
      icon: <Wrench className="h-7 w-7" />,
      title: "Structural Designing",
      description: "Robust structural designs ensuring safety and durability.",
      gradient: "from-red-500 to-red-600",
      delay: 0.5,
    },
    {
      icon: <Hammer className="h-7 w-7" />,
      title: "Building Construction",
      description: "End-to-end construction services with top-quality materials.",
      gradient: "from-yellow-500 to-red-500",
      delay: 0.6,
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Building Permit",
      description: "Hassle-free permit acquisition for your construction projects.",
      gradient: "from-red-600 to-black",
      delay: 0.7,
    },
    {
      icon: <Paintbrush className="h-7 w-7" />,
      title: "Interior Designing",
      description: "Stunning interior designs to elevate your living spaces.",
      gradient: "from-yellow-400 to-yellow-600",
      delay: 0.8,
    },
  ];

  const testimonials = [
    {
      name: "Priya Nair",
      location: "Varkala",
      rating: 5,
      text: "BuilDwellz transformed our dream home into reality. Their attention to detail and professionalism exceeded our expectations.",
      image: "./testimonial1.jpg",
    },
     {
      name: "Shaiju",
      location: "Varkala",
      rating: 5,
      text: "Choosing BuildWellz was the best decision we made for our home project. Our home turned out better than we imagined.",
      image: "./testimonial1.jpg",
    },
     {
      name: "Sudheesh",
      location: "Varkala",
      rating: 5,
      text: "From planning to execution, BuildWellz handled everything seamlessly. Their dedication to quality and design made the process stress-free and enjoyable.",
      image: "./p2.jpg",
    },
  ];

  const projects = [
    {
      title: "Modern Villa",
      location: "Panayara, Trivandrum",
      image: "./assets/Gallery/proj4/p1.jpg",
      type: "Residential",
    },
    {
      title: "Modern Villa",
      location: "Kollam, Paravur",
      image: "./assets/Gallery/proj1/p1.jpg",
      type: "Residential",
    },
     {
      title: "Traditional Home",
      location: "Varkala, Trivandrum",
      image: "./assets/Gallery/proj3/p2.jpg",
      type: "Residential",
    },
  
   
   
  ];

  const navigationLinks = [
    {
      icon: <Info className="h-6 w-6" />,
      title: "About Us",
      description: "Learn more about our mission and team.",
      href: "/about",
      gradient: "from-red-500 to-red-600",
      delay: 0.1,
    },
    // ... (other navigation links remain unchanged)
  ];

  const ScrollReveal = ({ children, direction = "up", delay = 0 }) => {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
          x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
        }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    );
  };

  const MagneticButton = ({ children }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Head>
        <title>BuilDwellz - Designing Dreams, Building Reality</title>
        <meta
          name="description"
          content="Premium design and construction services in Narikkal, Varkala. Transform your vision into reality with BuilDwellz."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black to-red-900"
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
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Hero background"
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={80}
          />
        </div>

        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br from-black/60 via-red-600/30 to-black/60"
          style={{ opacity, scale, y }}
        />

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >

          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-yellow-200 bg-clip-text text-transparent leading-tight"
          >
            Designing Dreams,
            <br />
            Building Reality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
          >
            We take comfort and home living to profound new heights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <MagneticButton>
              <button
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center transition-all duration-300"
                aria-label="Get a quote"
              >
                Get a Quote
                <Sparkles className="ml-2 h-4 w-4" />
              </button>
            </MagneticButton>

            <MagneticButton>
              <Link href="/projects">
                <button
                  className="bg-white/10 text-white border border-yellow-400 hover:bg-white/20 backdrop-blur-md shadow-2xl px-8 py-4 rounded-lg transition-all duration-300"
                  aria-label="View our projects"
                >
                  View Our Projects
                </button>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-black">
                  About{" "}
                  <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                    BuilDwellz
                  </span>
                </h2>

                <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                  BuilDwellz is a premier design and construction company based in Narikkal, Varkala. We specialize in
                  creating beautiful, functional spaces that elevate the way you live.
                </p>

                <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                  With our team of experienced architects, designers, and builders, we take comfort and home living to
                  profound new heights. From concept to completion, we handle every aspect of your project with precision
                  and care.
                </p>

                <MagneticButton>
                  <Link href="/about">
                    <button
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center group"
                      aria-label="Learn more about us"
                    >
                      Learn More About Us
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
                  alt="About BuilDwellz"
                  width={600}
                  height={384}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl border-2 border-red-200"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                Our <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">Premium</span> Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                  className="flex flex-col justify-between p-6 rounded-2xl bg-white backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border border-gray-200 h-full min-h-[320px]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative z-10 flex flex-col flex-grow">
                    <div className={`bg-gradient-to-br ${service.gradient} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">{service.icon}</div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-black">{service.title}</h3>

                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{service.description}</p>

                    <Link href="/services" className="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-300 mt-auto">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                Featured <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover some of our most stunning architectural achievements
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="rounded-2xl overflow-hidden shadow-2xl bg-white group cursor-pointer border border-gray-200"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={256}
                    className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => (e.currentTarget.src = "./fallback-image.jpg")} // Fallback image
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-black">{project.title}</h3>
                      <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-2 py-1 rounded-full text-sm">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-gray-600">{project.location}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Sliding Animation */}
      <section className="py-20 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                What Our <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">Clients</span> Say
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Read testimonials from our satisfied customers
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">

            <motion.div
              ref={containerRef}
              className="flex gap-8"
              // animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: { repeat: Infinity, repeatType: "loop", duration: 10, ease: "linear" },
              }}
              animate={controls}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 sm:w-96 group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative p-8 h-80 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-red-900/30 shadow-2xl group overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-yellow-500/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="absolute inset-0">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-yellow-400/30"
                          style={{ left: `${20 + i * 30}%`, top: `${20 + i * 20}%` }}
                          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                          >
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex-1 mb-6">
                        <div className="text-4xl text-red-500/20 font-serif leading-none mb-2">"</div>
                        <p className="text-gray-300 text-base leading-relaxed italic -mt-4 pl-4">{testimonial.text}</p>
                      </div>

                      <motion.div
                        className="flex items-center pt-4 border-t border-gray-800"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg"
                          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
                        >
                          {testimonial.name.charAt(0)}
                        </motion.div>
                        <div>
                          <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                          <p className="text-sm text-gray-400">{testimonial.location}</p>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-red-500/0 group-hover:border-red-500/50"
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-400 text-sm">Hover to pause • Auto-scrolling testimonials</p>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Ready to Build Your Dream?
            </motion.h2>
            <p className="text-xl text-red-100 mb-4 max-w-2xl mx-auto">
              Let's discuss your project and bring your vision to life with our expert team.
            </p>
            <p className="text-lg text-white mb-2">
              📍 Narikkal, Varkala
            </p>
            <p className="text-lg text-white mb-2">
              📞 8137834741 | 8590128023 
            </p>
            <p className="text-lg text-white mb-8">
              📧 <a href="mailto:buildwellzvarkala@gmail.com" className="underline">buildwellzvarkala@gmail.com</a>
            </p>
            <MagneticButton>
              <Link href="/contact">
                <button
                  className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold shadow-xl transition-all duration-300 flex items-center mx-auto border-2 border-yellow-400"
                  aria-label="Contact us"
                >
                  Contact Us Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}