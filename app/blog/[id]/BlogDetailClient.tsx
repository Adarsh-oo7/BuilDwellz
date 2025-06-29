"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    image: string;
}

interface BlogDetailClientProps {
    currentPost: BlogPost;
    blogPosts: BlogPost[];
}

// Helper function to fix image paths for Next.js static export
const getImagePath = (path: string) => {
  // Remove the ../ prefix and ensure it starts with /
  let cleanPath = path.replace(/^\.\.\//, '/');
  
  // For GitHub Pages, detect if we're on a repository page (not a custom domain)
  // This checks if the current URL contains github.io and adds the repo name as base path
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    const currentUrl = window.location.href;
    if (currentUrl.includes('.github.io/')) {
      // Extract repository name from URL
      const urlParts = currentUrl.split('.github.io/');
      if (urlParts.length > 1) {
        const repoName = urlParts[1].split('/')[0];
        return `/${repoName}${cleanPath}`;
      }
    }
  }
  
  return cleanPath;
};

export default function BlogDetailClient({ currentPost, blogPosts }: BlogDetailClientProps) {
    const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
    
    const otherPosts = blogPosts.filter((p) => p.id !== currentPost.id)
    const sidebarPosts = otherPosts.slice(0, 3)
    const belowContentPosts = otherPosts.slice(3)

    // Handle image load errors
    const handleImageError = (imagePath: string) => {
        setImageErrors(prev => ({ ...prev, [imagePath]: true }));
    };

    return (
        <div className="pt-32 pb-20 bg-muted min-h-screen">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <ScrollReveal>
                        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                                {currentPost.category}
                            </span>
                            <span>{currentPost.date}</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{currentPost.title}</h1>
                        
                        {/* Main Post Image */}
                        {!imageErrors[currentPost.image] ? (
                            <Image
                                src={getImagePath(currentPost.image)}
                                alt={currentPost.title}
                                width={800}
                                height={500}
                                className="rounded-lg mb-8 object-cover w-full h-full"
                                onError={() => handleImageError(currentPost.image)}
                            />
                        ) : (
                            <div className="w-full h-[500px] bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <div className="text-4xl mb-2">📝</div>
                                    <p>Blog image not available</p>
                                    <p className="text-sm mt-1">{currentPost.title}</p>
                                </div>
                            </div>
                        )}
                        
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
                <aside className="lg:col-span-1">
                    <ScrollReveal>
                        <h2 className="text-xl font-bold mb-6">Other Posts</h2>
                        <div className="flex flex-col gap-4">
                            {sidebarPosts.map((post) => (
                                <Card
                                    key={post.id}
                                    className={`overflow-hidden group transition-shadow duration-300 w-full p-2 hover:shadow-md`}
                                >
                                    <div className="relative h-48 w-full rounded-md overflow-hidden">
                                        {!imageErrors[post.image] ? (
                                            <Image
                                                src={getImagePath(post.image) || getImagePath("/placeholder.svg")}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                                onError={() => handleImageError(post.image)}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <div className="text-center text-gray-500">
                                                    <div className="text-2xl mb-1">📝</div>
                                                    <p className="text-xs">Blog Image</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-2">
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="text-sm font-medium text-primary hover:underline block text-center mt-2"
                                        >
                                            {post.title}
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollReveal>
                </aside>
            </div>

            {/* Overflow Cards - Below Content */}
            {belowContentPosts.length > 0 && (
                <div className="container mx-auto px-4 mt-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {belowContentPosts.map((post) => (
                            <Card
                                key={post.id}
                                className="overflow-hidden group transition-shadow duration-300 p-2 hover:shadow-md"
                            >
                                <div className="relative h-48 w-full rounded-md overflow-hidden">
                                    {!imageErrors[post.image] ? (
                                        <Image
                                            src={getImagePath(post.image) || getImagePath("/placeholder.svg")}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                            onError={() => handleImageError(post.image)}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <div className="text-center text-gray-500">
                                                <div className="text-2xl mb-1">📝</div>
                                                <p className="text-xs">Blog Image</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-2">
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="text-sm font-medium text-primary hover:underline block text-center mt-2"
                                    >
                                        {post.title}
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}