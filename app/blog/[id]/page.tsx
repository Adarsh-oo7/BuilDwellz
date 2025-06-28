import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ChevronRight } from "lucide-react"
import BlogDetailClient from './BlogDetailClient'

const blogPosts = [
    {
        id: 1,
        title: "Modern Home Design Trends for 2025",
        excerpt: "Explore the latest trends in modern home design...",
        content: "Step into the future of living with Modern Home Design Trends for 2025, your ultimate guide to the newest ideas transforming home design. This blog explores the perfect balance between aesthetics and functionality, showcasing emerging trends like smart automation, sustainable materials, and nature-inspired interiors. We delve into the rise of multifunctional spaces, earthy color palettes, statement lighting, and minimalist luxury—helping homeowners and designers stay ahead of the curve.Whether you're remodeling your space, building from the ground up, or just browsing for fresh inspiration, this blog delivers curated insights and practical tips. Learn how to incorporate energy-efficient solutions, timeless design principles, and tech-integrated features that reflect both innovation and comfort. Stay inspired, stay informed, and redefine what it means to live beautifully in 2025.",
        date: "May 10, 2025",
        author: "John Doe",
        category: "Design Trends",
        image: "/assets/Gallery/proj1/p1.jpg",
    },
    {
        id: 2,
        title: "The Importance of Vaasthu in Home Design",
        excerpt: "Learn how traditional Vaasthu principles...",
        content: "Discover how ancient wisdom meets modern living in The Importance of Vaasthu in Home Design. This blog explores the timeless principles of Vaasthu Shastra—India's traditional system of architecture—and how they continue to influence home design today. From the optimal placement of rooms to the flow of energy within a space, we delve into how Vaasthu creates harmony, balance, and positivity in your living environment.Whether you're building a new home, renovating, or simply curious about the spiritual and practical benefits of Vaasthu, this blog offers clear guidance and insights. Learn how aligning your home with these age-old principles can enhance well-being, prosperity, and peace of mind. Step into a world where tradition and design work hand in hand to create a truly mindful and meaningful space.",
        date: "April 28, 2025",
        author: "Jane Smith",
        category: "Vaasthu",
        image: "/assets/Gallery/blogs/Vastu Chart-Photoroom.png",
    },
    {
      id: 3,
      title: "Sustainable Building Materials for Eco-Friendly Homes",
      excerpt:
        "Discover sustainable building materials that reduce environmental impact without compromising on quality or aesthetics.",
      content:"Build smarter and greener with Sustainable Building Materials for Eco-Friendly Homes. This blog explores the essential role that eco-conscious materials play in modern home construction. From recycled wood and bamboo to rammed earth, reclaimed metal, and low-VOC paints, we highlight innovative and practical options that reduce environmental impact without compromising on style or durability.Perfect for homeowners, architects, and builders, this blog provides insights into how sustainable materials contribute to energy efficiency, indoor air quality, and long-term cost savings. Learn how to make informed choices that support both the planet and your lifestyle. Whether you're planning a new build or an eco-friendly renovation, let this guide inspire your journey toward a healthier, more sustainable home.",      
      date: "April 15, 2025",
      author: "Michael Johnson",
      category: "Sustainability",
      image: "/assets/Gallery/blogs/sustainable-home-tech.jpg",
    },
     {
      id: 4,
      title: "How to Choose the Right Architect for Your Project",
      excerpt: "Tips for selecting the perfect architect who understands your vision and can bring it to life.",
      content:"Finding the right architect can make all the difference in turning your dream home or building project into a reality. In How to Choose the Right Architect for Your Project, we guide you through the essential steps to select a professional who understands your vision, budget, and lifestyle needs. From evaluating portfolios and checking credentials to understanding communication styles and fee structures, this blog offers practical tips and expert insights to help you make a confident choice.Whether you're building a custom home, planning a renovation, or starting a commercial project, choosing the right architect sets the tone for success. Discover how to ask the right questions, align creative expectations, and build a strong working relationship from day one.",
      date: "April 5, 2025",
      author: "Sarah Williams",
      category: "Planning",
      image: "/assets/Gallery/blogs/architect.jpeg",
    },
    {
      id: 5,
      title: "Interior Design Tips for Small Spaces",
      excerpt: "Creative solutions to maximize functionality and style in compact living areas.",
      content:"Small spaces can have big style—and smart function. In Interior Design Tips for Small Spaces, we share creative strategies to help you make the most of every square foot. From clever storage solutions and space-saving furniture to light-enhancing colors and multifunctional layouts, this blog is packed with practical advice to transform compact rooms into beautiful, livable spaces.Perfect for apartment dwellers, tiny home enthusiasts, or anyone working with limited square footage, our tips will help you maximize comfort without compromising on style. Discover how to create a space that feels open, organized, and uniquely yours—no matter the size.",
      date: "March 22, 2025",
      author: "David Brown",
      category: "Interior Design",
      image: "/assets/Gallery/proj1/4.jpg",
    },
    {
      id: 6,
      title: "The Building Process: What to Expect",
      excerpt: "A comprehensive guide to the construction process from planning to completion.",
      content:"Building a home or starting a construction project is an exciting journey—but it can also feel overwhelming without the right guidance. In The Building Process: What to Expect, we break down each phase of the construction journey, from initial planning and design to permits, ground-breaking, and final handover. Whether you're a first-time homeowner or managing a custom build, this blog helps you understand the timeline, key decisions, and common challenges along the way.Get clear insights on budgeting, working with contractors, dealing with delays, and staying involved throughout the process. With expert tips and realistic expectations, you'll feel more confident, informed, and in control of your project—from concept to completion.",
      date: "March 10, 2025",
      author: "Emily Davis",
      category: "Construction",
      image: "/assets/Gallery/proj8/18.jpg",
    },
]

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  // Generate static params for all blog post IDs
  return blogPosts.map((post) => ({
    id: post.id.toString(), // Convert to string as URL params are always strings
  }));
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
    const currentPost = blogPosts.find((p) => p.id === Number(params.id))

    if (!currentPost) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Post not found</h1>
                <Link href="/blog">
                    <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Button>
                </Link>
            </div>
        )
    }

    return <BlogDetailClient currentPost={currentPost} blogPosts={blogPosts} />
}