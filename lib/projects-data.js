// Create a new file: lib/projects-data.js (or wherever you keep shared data)

export const projects = [
  {
    id: 1,
    title: "Modern Villa",
    category: "residential",
    location: "Kollam, Paravur",
    year: "2024",
    description: "A contemporary villa with open spaces and natural light.",
    image: "/assets/Gallery/proj1/p1.jpg",
  },
  {
    id: 2,
    title: "Modern Villa",
    category: "residential",
    location: "Narikkal",
    year: "2024",
    description: "High-end apartment with premium finishes and smart home features.",
    image: "/assets/Gallery/proj2/front.jpg",
  },
  {
    id: 3,
    title: "Modern Home",
    category: "residential",
    location: "Varkala, Trivandrum",
    year: "2024",
    description: "A contemporary villa with open spaces and natural light.",
    image: "/assets/Gallery/proj3/p2.jpg",
  },
  {
    id: 4,
    title: "Traditional",
    category: "residential",
    location: "Panayara, Trivandrum",
    year: "2023",
    description: "A contemporary villa with open spaces and natural light.",
    image: "/assets/Gallery/proj4/p1.jpg",
  },
  {
    id: 5,
    title: "Modern Villa",
    category: "residential",
    location: "Varkala. Trivandrum",
    year: "2024",
    description: "A contemporary villa with open spaces and natural light.",
    image: "/assets/Gallery/proj5/front.jpg",
  },
  {
    id: 6,
    title: "Modern Villa",
    category: "residential",
    location: "Varkala",
    year: "2025",
    description: "A contemporary villa with open spaces and natural light.",
    image: "/assets/Gallery/proj6/front.jpg",
  },
  {
    id: 7,
    title: "Retail store",
    category: "commercial",      
    location: "Pravachambalam,Trivandrum",
    year: "2022",
    description: "Modern retail space designed to enhance customer experience.",
    image: "/assets/Gallery/proj7/front.jpg",
  },
  {
    id: 8,
    title: "Modern Home",
    category: "residential",
    location: "Uloor,Trivandrum",
    year: "2022",
    description: "Modern retail space designed to enhance customer experience.",
    image: "/assets/Gallery/proj8/front.jpg",
  },
  {
    id: 9,
    title: "Eco-Friendly Home",
    category: "residential",
    location: "Varkala",
    year: "2024",
    description: "Sustainable home with energy-efficient features and natural materials.",
    image: "/assets/Gallery/proj9/front.jpg",
  },
];

// Then in your app/projects/[id]/page.js:
import { projects } from '@/lib/projects-data';

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}