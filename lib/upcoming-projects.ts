export interface UpcomingProject {
  id: string
  title: string
  category: string
  location: string
  year: string
  description: string
  image: string
  gallery?: string[] // ✅ Make gallery optional
}

export const upcomingProjects = [
  {
    id: "upcoming-1",
    title: "Luxury Villa in Varkala",
    category: "residential",
    location: "Varkala, Kerala",
    year: "2025",
    description: "A modern luxury villa with sea-facing views and smart home features.",
    image: "../assets/Gallery/upcoming/APPARTMENT_Photo - 1.webp",
    gallery: [
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 1.webp",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 2.webp",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 3.webp",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 4.webp",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 5.webp",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 6.webp",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 7.webp",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 8.webp",
    ]
  },
  {
    id: "upcoming-2",
    title: "Commercial space and Luxury home",
    category: "commercial",
    location: "Varkala, Kerala",
    year: "2025",
    description: "A futuristic Commercial space and Luxury home with green terraces and sky lounges.",
    image: "../assets/Gallery/upcoming/kallambalam2.webp",
    gallery: [
      "../assets/Gallery/upcoming/kallambalam2.webp",
      "../assets/Gallery/upcoming/kallambalam1.webp",
    ]
  },
  {
    id: "upcoming-3",
    title: "Luxury home",
    category: "residential",
    location: "Varkala, Kerala",
    year: "2026",
    description: "A refined residence blending modern architecture with natural elements.",
    image: "../assets/Gallery/upcoming/vp 3.jpg (1).jpeg",
    // ✅ No gallery needed — will fall back to main image
  }
];