import { notFound } from "next/navigation"
import { getBlogPost, incrementBlogView } from "@/lib/blog-actions"
import BlogPostContent from "@/components/blog-post-content"
import { BlogLoading } from "../BlogLoader"
import { Suspense } from "react"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Loading component for the blog post content
function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20">
      <div className="container max-w-4xl mx-auto">
        {/* Skeleton for navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Skeleton for header */}
        <div className="text-center mb-12">
          <div className="w-24 h-6 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse"></div>
          <div className="w-3/4 h-12 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse"></div>
          <div className="w-1/2 h-6 bg-gray-200 rounded-lg mx-auto mb-8 animate-pulse"></div>
          <div className="flex justify-center gap-6 mb-6">
            {[1, 2, 3].map(item => (
              <div key={item} className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4].map(item => (
              <div key={item} className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Skeleton for featured image */}
        <div className="w-full h-64 bg-gray-200 rounded-2xl mb-12 animate-pulse"></div>

        {/* Skeleton for content */}
        <div className="bg-white rounded-2xl border border-[#FF7F3E]/10 p-8 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
            <div key={item} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

// Separate component for the main content that can handle errors
async function BlogPostContentWrapper({ slug }: { slug: string }) {
  try {
    // Fetch blog post from database
    const post = await getBlogPost(slug)
    
    if (!post) {
      notFound()
    }

    incrementBlogView(slug).catch(console.error)

    return <BlogPostContent post={post} />
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostContentWrapper slug={slug} />
    </Suspense>
  )
}

// Optional: Generate static params for better performance
export async function generateStaticParams() {
  return [
    { slug: 'building-modern-web-applications' },
    { slug: 'microservices-architecture' },
    { slug: 'react-performance-optimization' },
    { slug: 'docker-containerization' },
  ]
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  try {
    const post = await getBlogPost(slug)
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }

    return {
      title: `${post.title} | Dhananjay Kakade`,
      description: post.description || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.description || post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: ['Dhananjay Kakade'],
        tags: post.tags,
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post',
      description: 'Read this blog post by Dhananjay Kakade',
    }
  }
}