export interface UpcomingProject {
  id: string
  title: string
  category: string
  location: string
  year: string
  description: string
  image: string
}

export const upcomingProjects: UpcomingProject[] = [
  {
    id: "upcoming-1",
    title: "Luxury Villa in Goa",
    category: "residential",
    location: "Goa, India",
    year: "2025",
    description: "A modern luxury villa with sea-facing views and smart home features.",
    image: "/blog-1.jpg",
  },
  {
    id: "upcoming-2",
    title: "Tech Office Tower",
    category: "commercial",
    location: "Bangalore, India",
    year: "2025",
    description: "A state-of-the-art office complex for tech startups in the heart of Bangalore.",
    image: "/blog-1.jpg",
  },
   {
    id: "upcoming-3",
    title: "Tech Office Tower",
    category: "commercial",
    location: "Bangalore, India",
    year: "2025",
    description: "A state-of-the-art office complex for tech startups in the heart of Bangalore.",
    image: "/blog-1.jpg",
  },

]
