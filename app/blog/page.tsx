"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ParallaxSection } from "@/components/parallax-section"
import { ChevronRight, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Modern Home Design Trends for 2025",
      excerpt:
        "Explore the latest trends in modern home design that are shaping the future of residential architecture.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
      date: "May 10, 2025",
      author: "John Doe",
      category: "Design Trends",
      image: "../assets/Gallery/proj1/p1.jpg",
    },
    {
      id: 2,
      title: "The Importance of Vaasthu in Home Design",
      excerpt:
        "Learn how traditional Vaasthu principles can be incorporated into modern home design for better energy flow.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
      date: "April 28, 2025",
      author: "Jane Smith",
      category: "Vaasthu",
      image: "../assets/Gallery/blogs/Vastu Chart-Photoroom.png",
    },
    {
      id: 3,
      title: "Sustainable Building Materials for Eco-Friendly Homes",
      excerpt:
        "Discover sustainable building materials that reduce environmental impact without compromising on quality or aesthetics.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
      date: "April 15, 2025",
      author: "Michael Johnson",
      category: "Sustainability",
      image: "../assets/Gallery/blogs/sustainable-home-tech.jpg",
    },
    {
      id: 4,
      title: "How to Choose the Right Architect for Your Project",
      excerpt: "Tips for selecting the perfect architect who understands your vision and can bring it to life.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
      date: "April 5, 2025",
      author: "Sarah Williams",
      category: "Planning",
      image: "../assets/Gallery/blogs/architect.jpeg",
    },
    {
      id: 5,
      title: "Interior Design Tips for Small Spaces",
      excerpt: "Creative solutions to maximize functionality and style in compact living areas.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
      date: "March 22, 2025",
      author: "David Brown",
      category: "Interior Design",
       image: "../assets/Gallery/proj1/4.jpg",
      // image: "../",
    },
    {
      id: 6,
      title: "The Building Process: What to Expect",
      excerpt: "A comprehensive guide to the construction process from planning to completion.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
      date: "March 10, 2025",
      author: "Emily Davis",
      category: "Construction",
      image: "../assets/Gallery/proj8/18.jpg",
    },
  ]

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
    visible: { opacity: 1, y: 0 },
  }

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add your subscription logic here (e.g., API call or state update)
    console.log("Subscribe button clicked");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32  bg-muted">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Blog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and insights in design and construction.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground rounded-full mr-2">
                  {blogPosts[0].category}
                </span>
                <span className="text-muted-foreground">{blogPosts[0].date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-lg text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
              {/* <p className="text-muted-foreground mb-8">By {blogPosts[0].author}</p> */}
              <Button asChild className="bg-primary hover:bg-primary/90 group">
                <Link href={`/blog/${blogPosts[0].id}`} className="flex items-center">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-tl-lg z-0 animate-pulse"></div>
                <div className="card-3d">
                  <Image
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl relative z-10 w-full h-[400px] object-cover card-3d-content"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-br-lg z-0 animate-pulse"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <div className="pt-20 pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
          </ScrollReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.slice(1).map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 image-zoom-container">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover image-zoom"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary/20 text-secondary-foreground rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Link href={`/blog/${post.id}`} className="text-primary flex items-center group">
                        Read more{" "}
                        <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>


      {/* Newsletter */}
      <section className="pt-10 pb-20 bg-black text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-secondary/10 blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
              Get the latest articles, tips, and insights delivered directly to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                <Button
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}