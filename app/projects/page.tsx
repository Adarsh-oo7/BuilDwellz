"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { ErrorBoundary } from "react-error-boundary"
import { projects, Project } from "@/lib/projects"

// Dynamically import RoomVisualizer with no SSR
const RoomVisualizer = dynamic(
  () => import("@/components/3d/room-visualizer"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading 3D Visualizer...</p>
        </div>
      </div>
    )
  }
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all")
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Apply filter based on active tab
  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter((project) => project.category === activeTab)

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of stunning residential and commercial projects that showcase our expertise in design and construction.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3D Room Visualizer - Only render on client */}
      {isClient && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Interactive 3D Room Visualizer</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Explore our designs in 3D. Rotate, zoom, and interact with the model to get a better understanding of
                  our work and visualize your future space.
                </p>
              </div>
              <ErrorBoundary
                fallback={
                  <div className="text-center p-12 bg-muted rounded-lg">
                    <p className="text-lg font-medium">Failed to load 3D visualizer. Please refresh the page.</p>
                  </div>
                }
              >
                <RoomVisualizer />
              </ErrorBoundary>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Projects Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-background/80 backdrop-blur-sm">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="residential">Residential</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact us today to schedule a consultation and bring your dream space to life.
            </p>
            <MagneticButton>
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

// Project card component with proper type definition
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-lg h-80 card-3d">
      <div className="image-zoom-container h-full">
        <Image 
          src={project.image || "/placeholder.svg"} 
          alt={project.title} 
          fill 
          className="object-cover image-zoom"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 card-3d-content">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground rounded-full mb-2 mr-2">
            {project.category}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 text-white rounded-full">
            {project.year}
          </span>
        </div>
        <h3 className="text-white text-xl font-bold">{project.title}</h3>
        <p className="text-white/80 mb-4">{project.location}</p> 
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>
        <Button
          asChild
          variant="outline"
          className="w-full bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
        >
          <Link href={`/projects/${project.id}`}>View Project</Link>
        </Button>
      </div>
    </div>
  )
}