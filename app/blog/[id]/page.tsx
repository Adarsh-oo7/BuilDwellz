"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ChevronRight } from "lucide-react"

const blogPosts = [
    {
        id: 1,
        title: "Modern Home Design Trends for 2025",
        excerpt: "Explore the latest trends in modern home design...",
        content: "Full content of the blog post here...",
        date: "May 10, 2025",
        author: "John Doe",
        category: "Design Trends",
        image: "/sample1.jpg",
    },
    {
        id: 2,
        title: "The Importance of Vaasthu in Home Design",
        excerpt: "Learn how traditional Vaasthu principles...",
        content: "Full content of the blog post here...",
        date: "April 28, 2025",
        author: "Jane Smith",
        category: "Vaasthu",
        image: "/blog-2.jpg",
    },
    // ... other posts
]

export default function BlogDetailPage() {
    const { id } = useParams()
    const currentPost = blogPosts.find((p) => p.id === Number(id))

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

    const otherPosts = blogPosts.filter((p) => p.id !== Number(id))

    return (
        <div className="pt-32 pb-20 bg-muted min-h-screen">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <ScrollReveal>
                        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{currentPost.category}</span>
                            <span>{currentPost.date}</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{currentPost.title}</h1>
                        <p className="text-muted-foreground mb-6">By {currentPost.author}</p>
                        <Image
                            src={currentPost.image}
                            alt={currentPost.title}
                            width={800}
                            height={500}
                            className="rounded-lg mb-8 object-cover w-full h-[400px]"
                        />
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {currentPost.content}
                        </p>
                        <div className="mt-10">
                            <Link href="/blog">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Blog
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Sidebar */}
                {/* Sidebar */}
                {/* Sidebar with full cards */}
                <aside className="lg:col-span-1">
                    <ScrollReveal>
                        <h2 className="text-xl font-bold mb-6">All Blog Posts</h2>
                        <div className="flex flex-col gap-6">
                            {blogPosts.map((post) => {
                                const isActive = Number(id) === post.id

                                return (
                                    <Card
                                        key={post.id}
                                        className={`overflow-hidden group transition-shadow duration-300 w-full max-w-[340px] mx-auto ${isActive ? "ring-2 ring-primary" : "hover:shadow-lg"
                                            }`}
                                    >
                                        <div className="relative h-40 image-zoom-container">
                                            <Image
                                                src={post.image || "/placeholder.svg"}
                                                alt={post.title}
                                                fill
                                                className="object-cover image-zoom"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary/20 text-secondary-foreground rounded-full">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs text-muted-foreground">{post.date}</span>
                                            </div>
                                            <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">By {post.author}</span>
                                                <Link
                                                    href={`/blog/${post.id}`}
                                                    className="text-primary flex items-center group text-sm"
                                                >
                                                    Read more
                                                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}

                        </div>
                    </ScrollReveal>
                </aside>


            </div>
        </div>
    )
}
