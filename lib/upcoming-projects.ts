export interface UpcomingProject {
  id: string
  title: string
  category: string
  location: string
  year: string
  description: string
  image: string
}

export const upcomingProjects = [
  {
    id: "upcoming-1",
    title: "Luxury Villa in Varkala",
    category: "residential",
    location: "Varkala, Kerala",
    year: "2025",
    description: "A modern luxury villa with sea-facing views and smart home features.",
    image: "../assets/Gallery/upcoming/APPARTMENT_Photo - 1.jpg",
    gallery: [
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 1.jpg",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 2.jpg",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 3.jpg",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 4.jpg",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 5.jpg",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 6.jpg",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 7.jpg",
      "../assets/Gallery/upcoming/APPARTMENT_Photo - 8.jpg",

    ]
  },
  {
    id: "upcoming-2",
    title: "Commercial space and Luxury home",
    category: "commercial",
    location: "Varkala, Kerala",
    year: "2025",
    description: "A futuristic Commercial space and Luxury home with green terraces and sky lounges.",
    image: "../assets/Gallery/upcoming/kallambalam2.jpg",
    gallery: [
      "../assets/Gallery/upcoming/kallambalam2.jpg",
      "../assets/Gallery/upcoming/kallambalam1.jpg",
    ]
  }
];

