import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import BlogDetailClient from './BlogDetailClient'

import { blogPosts } from "@/lib/posts"

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  // Generate static params for all blog post IDs
  return blogPosts.map((post) => ({
    id: post.id.toString(), // Ensure id is a string
  }));
}

interface BlogDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    // Await the params in Next.js 15+
    const resolvedParams = await params
    // Convert string id to number for comparison since blogPosts likely has numeric ids
    const currentPost = blogPosts.find((p) => p.id.toString() === resolvedParams.id)

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