// /lib/data/projects.ts

export interface Project {
  id: number
  title: string
  category: "residential" | "commercial"
  location: string
  year: string
  description: string
  image: string
  gallery?: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Luxury Villa",
    category: "residential",
    location: "Kollam, Paravur",
    year: "2024",
    description: "A sleek and stylish modern home located in the serene surroundings of Kollam Paravur. This residential masterpiece blends minimalist design with functional elegance, offering spacious, open-plan living areas that seamlessly connect with nature. Clean lines, expansive windows, and an abundance of natural light create a refreshing atmosphere throughout the home. Featuring state-of-the-art materials and sustainable features, this modern house provides the perfect balance of comfort and sophistication. It’s a contemporary sanctuary where every detail is crafted for luxury living and relaxation.",
    image: "../assets/Gallery/proj1/p1.jpg",
    gallery: ["../assets/Gallery/proj1/1.jpg", "../assets/Gallery/proj1/2.jpg", "../assets/Gallery/proj1/3.jpg", "../assets/Gallery/proj1/4.jpg", "../assets/Gallery/proj1/5.jpg", "../assets/Gallery/proj1/6.jpg", "../assets/Gallery/proj1/7.jpg", "../assets/Gallery/proj1/8.jpg", "../assets/Gallery/proj1/9.jpg", "../assets/Gallery/proj1/10.jpg", "../assets/Gallery/proj1/11.jpg", "../assets/Gallery/proj1/12.jpg", "../assets/Gallery/proj1/13.jpg"],
  },
  {
    id: 2,
    title: "Modern Villa",
    category: "residential",
    location: "Njekkad, Varkala",
    year: "2024",
    description: "Nestled in the picturesque locale of Njekkad, Varkala, this modern home offers an exquisite blend of contemporary design and tranquil surroundings. The house boasts expansive, airy interiors with large windows that invite abundant natural light and provide stunning views of the lush landscape. Designed with a minimalist approach, the clean lines and open spaces create a sense of calm and serenity. A perfect harmony of luxury and nature, this home is crafted for those who seek a peaceful retreat with easy access to Varkala's vibrant coastal beauty.",
    image: "../assets/Gallery/proj2/front.jpg",
    gallery: ["../assets/Gallery/proj2/1.jpg", "../assets/Gallery/proj2/2.jpg", "../assets/Gallery/proj2/3.jpg", "../assets/Gallery/proj2/4.jpg", "../assets/Gallery/proj2/5.jpg", "../assets/Gallery/proj2/6.jpg", "../assets/Gallery/proj2/7.jpg", "../assets/Gallery/proj2/8.jpg", "../assets/Gallery/proj2/9.jpg", "../assets/Gallery/proj2/10.jpg", "../assets/Gallery/proj2/11.jpg"]
  },
  {
    id: 3,
    title: "Modern Villa",
    category: "residential",
    location: "Varkala, Trivandrum",
    year: "2024",
    description: "Located in the serene town of Varkala, Trivandrum, this modern residential home exemplifies sleek design and comfortable living. The house features clean lines, open-concept spaces, and high-end finishes, creating an inviting atmosphere perfect for contemporary lifestyles. Expansive windows invite ample natural light, enhancing the airy and spacious feel of the interiors. With a focus on functionality, the home is designed to blend seamlessly with its tranquil surroundings while providing a high standard of living. Ideal for families looking for modern elegance in a peaceful, suburban environment.",
    image: "../assets/Gallery/proj3/p2.jpg",
    gallery: ["../assets/Gallery/proj3/1.jpg", "../assets/Gallery/proj3/2.jpg", "../assets/Gallery/proj3/3.jpg", "../assets/Gallery/proj3/4.jpg", "../assets/Gallery/proj3/5.jpg", "../assets/Gallery/proj3/6.jpg"]
  },
  {
    id: 4,
    title: "Traditional",
    category: "residential",
    location: "Panayara, Trivandrum",
    year: "2023",
    description: "Nestled in the quiet neighborhood of Panayara, Trivandrum, this 2023 residential project reflects a harmonious blend of contemporary design and everyday functionality. The home features spacious interiors, minimalist aesthetics, and thoughtfully placed windows that flood the rooms with natural light. Built with quality materials and modern finishes, it offers a serene yet sophisticated living environment. Ideal for families seeking comfort, style, and convenience in a peaceful urban setting.",
    image: "../assets/Gallery/proj4/p1.jpg",
    gallery: ["../assets/Gallery/proj4/1.jpg", "../assets/Gallery/proj4/2.jpg", "../assets/Gallery/proj4/3.jpg", "../assets/Gallery/proj4/4.jpg", "../assets/Gallery/proj4/5.jpg", "../assets/Gallery/proj4/7.jpg", "../assets/Gallery/proj4/8.jpg", "../assets/Gallery/proj4/9.jpg", "../assets/Gallery/proj4/10.jpg", "../assets/Gallery/proj4/11.jpg"]
  },
  {
    id: 5,
    title: "Contemporary",
    category: "residential",
    location: "Varkala, Trivandrum",
    year: "2024",
    description: "Nestled in the quiet neighborhood of Panayara, Trivandrum, this 2023 residential project reflects a harmonious blend of contemporary design and everyday functionality. The home features spacious interiors, minimalist aesthetics, and thoughtfully placed windows that flood the rooms with natural light. Built with quality materials and modern finishes, it offers a serene yet sophisticated living environment. Ideal for families seeking comfort, style, and convenience in a peaceful urban setting.",
    image: "../assets/Gallery/proj5/front.jpg",
    gallery: ["../assets/Gallery/proj5/1.jpg", "../assets/Gallery/proj5/2.jpg", "../assets/Gallery/proj5/3.jpg", "../assets/Gallery/proj5/4.jpg", "../assets/Gallery/proj5/5.jpg","../assets/Gallery/proj5/6.jpg", "../assets/Gallery/proj5/7.jpg", "../assets/Gallery/proj5/8.jpg", "../assets/Gallery/proj5/9.jpg", "../assets/Gallery/proj5/10.jpg", "../assets/Gallery/proj5/11.jpg", "../assets/Gallery/proj5/13.jpg", "../assets/Gallery/proj5/14.jpg", "../assets/Gallery/proj5/15.jpg"]
  },
  {
    id: 6,
      title: "Modern Villa",
      category: "residential",
      location: "Varkala",
      year: "2025",
      description: "A contemporary villa with open spaces and natural light.",
      image: "../assets/Gallery/proj6/front.jpg",
    gallery: ["../assets/Gallery/proj6/1.jpg", "../assets/Gallery/proj6/2.jpg", "../assets/Gallery/proj6/3.jpg", "../assets/Gallery/proj6/4.jpg", "../assets/Gallery/proj6/5.jpg","../assets/Gallery/proj6/6.jpg", "../assets/Gallery/proj6/7.jpg", "../assets/Gallery/proj6/8.jpg", "../assets/Gallery/proj6/9.jpg", "../assets/Gallery/proj6/10.jpg", "../assets/Gallery/proj6/11.jpg", "../assets/Gallery/proj6/13.jpg", "../assets/Gallery/proj6/14.jpg", "../assets/Gallery/proj6/15.jpg", "../assets/Gallery/proj6/16.jpg", "../assets/Gallery/proj6/17.jpg"]
  },
  {
    id: 7,
      title: "Retail store",
      category: "commercial",      
      location: "Pravachambalam,Trivandrum",
      year: "2022",
      description: "Modern retail space designed to enhance customer experience.",
      image: "../assets/Gallery/proj7/front.jpg",
    gallery: ["../assets/Gallery/proj7/1.jpg", "../assets/Gallery/proj7/2.jpg", "../assets/Gallery/proj7/3.jpg", "../assets/Gallery/proj7/4.jpg", "../assets/Gallery/proj7/5.jpg"]
  },
  {
    id: 8,
    title: "Modern Home",
    category: "residential",
    location: "Ulloor, Trivandrum",
    year: "2022",
    description: "Nestled in the quiet neighborhood of Panayara, Trivandrum, this 2023 residential project reflects a harmonious blend of contemporary design and everyday functionality. The home features spacious interiors, minimalist aesthetics, and thoughtfully placed windows that flood the rooms with natural light. Built with quality materials and modern finishes, it offers a serene yet sophisticated living environment. Ideal for families seeking comfort, style, and convenience in a peaceful urban setting.",
    image: "../assets/Gallery/proj8/front.jpg",
    gallery: [ "../assets/Gallery/proj8/3.jpg", "../assets/Gallery/proj8/4.jpg", "../assets/Gallery/proj8/5.jpg","../assets/Gallery/proj8/6.jpg", "../assets/Gallery/proj8/9.jpg",   "../assets/Gallery/proj8/13.jpg", "../assets/Gallery/proj8/14.jpg", "../assets/Gallery/proj8/15.jpg", "../assets/Gallery/proj8/16.jpg", "../assets/Gallery/proj8/17.jpg", "../assets/Gallery/proj8/2.jpg" ,"../assets/Gallery/proj8/7.jpg", "../assets/Gallery/proj8/8.jpg","../assets/Gallery/proj8/11.jpg","../assets/Gallery/proj8/10.jpg","../assets/Gallery/proj8/18.jpg", "../assets/Gallery/proj8/20.jpg","../assets/Gallery/proj8/1.jpg", "../assets/Gallery/proj8/19.jpg"]
  },
   {
    id: 9,
      title: "Eco-Friendly Home",
      category: "residential",
      location: "Varkala",
      year: "2024",
      description: "Sustainable home with energy-efficient features and natural materials.",
      image: "../assets/Gallery/proj9/front.jpg",
    gallery: [ "../assets/Gallery/proj9/2.jpg", "../assets/Gallery/proj9/3.jpg","../assets/Gallery/proj9/4.jpg", "../assets/Gallery/proj9/5.jpg",   "../assets/Gallery/proj9/6.jpg", "../assets/Gallery/proj9/10.jpg", "../assets/Gallery/proj9/11.jpg", "../assets/Gallery/proj9/7.jpg", "../assets/Gallery/proj9/12.jpg", "../assets/Gallery/proj9/13.jpg" ,"../assets/Gallery/proj9/7.jpg", "../assets/Gallery/proj9/8.jpg","../assets/Gallery/proj9/9.jpg","../assets/Gallery/proj9/1.jpg", ]
  },
]
