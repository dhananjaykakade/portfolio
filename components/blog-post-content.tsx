"use client"

import { Eye, Clock, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"
import { BlogImage } from "@/app/blog/image-component"
import { ShareButton } from "@/app/blog/share-button"
import { CodeBlock } from "@/app/blog/code-block"
import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog-data"
import { JSX } from "react/jsx-runtime"
import { getBlogReviews, getAverageRating } from "@/lib/review-actions"
import { ReviewForm } from "@/components/review-form"
import { ReviewsList } from "@/components/reviews-list"
import {InlineBlogLoading,BlogCardsSkeleton} from "@/app/blog/BlogLoader"

interface BlogPostContentProps {
  post: BlogPost
}

// Custom renderer for blog content
function renderBlogContent(content: string,loading:boolean=false): JSX.Element[] {
  const elements: JSX.Element[] = []
  const lines = content.split('\n')
  
  let currentCodeBlock: string[] = []
  let inCodeBlock = false
  let currentLanguage = ''

  const parseLine = (line: string, index: number) => {
  const parts = line.split(/(\*\*.*?\*\*)/g); // split by **...**
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong 
          key={`strong-${index}-${i}`} 
          className="font-bold text-[#1F2937]">
          {part.slice(2, -2)} {/* remove ** */}
        </strong>
      );
    }
    return <span key={`text-${index}-${i}`}>{part}</span>;
  });
};

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <CodeBlock 
            key={`code-${index}`}
            language={currentLanguage}
            value={currentCodeBlock.join('\n')}
          />
        )
        currentCodeBlock = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
        currentLanguage = line.replace('```', '').trim() || 'javascript'
      }
      return
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line)
      return
    }

    const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/)
    if (imageMatch) {
      const [, alt, src] = imageMatch
      elements.push(
        <BlogImage key={`img-${index}`} src={src} alt={alt || ''} />
      )
      return
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${index}`} className="text-4xl font-bold text-[#1F2937] mt-12 mb-6 leading-tight">
          {line.replace('# ', '')}
        </h1>
      )
      return
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${index}`} className="text-3xl font-bold text-[#1F2937] mt-10 mb-4 leading-tight border-b border-[#FF7F3E]/20 pb-2">
          {line.replace('## ', '')}
        </h2>
      )
      return
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${index}`} className="text-2xl font-bold text-[#1F2937] mt-8 mb-3 leading-tight">
          {line.replace('### ', '')}
        </h3>
      )
      return
    }

    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${index}`} className="text-xl font-bold text-[#1F2937] mt-6 mb-2 leading-tight">
          {line.replace('#### ', '')}
        </h4>
      )
      return
    }

elements.push(...parseLine(line, index));

    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={`blockquote-${index}`} className="border-l-4 border-[#FF7F3E] pl-6 py-2 my-6 bg-[#FFF5F0] rounded-r-lg italic text-[#1F2937]">
          {line.replace('> ', '')}
        </blockquote>
      )
      return
    }

    if (line.trim()) {
      elements.push(
        <p key={`p-${index}`} className="text-lg text-[#4B5563] leading-relaxed mb-6">
          {line}
        </p>
      )
    }
  })

  return elements
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    const [reviews, setReviews] = React.useState<any[]>([])
    const [averageRating, setAverageRating] = React.useState<number>(0)
    React.useEffect(() => {
        async function fetchReviews() {
            const reviewsData = await getBlogReviews(post.slug)
            setReviews(reviewsData)
            const avgRating = await getAverageRating(post.slug)
            setAverageRating(avgRating)
        }
        fetchReviews()
    }, [post.slug])
  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1F2937] pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF7F3E]/5 to-[#3AB0FF]/3 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-[#3AB0FF]/3 to-[#FFB67B]/5 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <article className="py-20 relative">
        <div className="container relative z-10 max-w-4xl">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <Link href="/blog">
              <Button variant="ghost" className="text-[#4B5563] hover:text-[#FF7F3E] hover:bg-[#FF7F3E]/5">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <ShareButton 
              title={post.title}
              description={post.description}
            />
          </motion.div>

          {/* Blog Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF7F3E]/20 mb-6 shadow-sm">
              <div className="w-2 h-2 bg-[#FF7F3E] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#4B5563]">{post.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-[#1F2937] to-[#4B5563] bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            <p className="text-xl text-[#4B5563] mb-8 max-w-2xl mx-auto leading-relaxed">
              {post.description}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-[#4B5563] mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.views} views</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-white text-[#4B5563] rounded-full border border-[#FF7F3E]/20 hover:border-[#FF7F3E]/40 hover:text-[#FF7F3E] transition-colors shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Featured Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 rounded-2xl overflow-hidden border border-[#FF7F3E]/20 bg-white shadow-lg"
            >
              <BlogImage 
                src={post.image.url} 
                alt={post.image.alt}
                caption={post.image.caption}
              />
            </motion.div>
          )}

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl border border-[#FF7F3E]/10 p-8 md:p-12 shadow-sm"
          >
            <div className="space-y-8">
              {renderBlogContent(post.content)}
            </div>
          </motion.div>

          {/* Blog Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-[#FF7F3E]/20"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-[#4B5563]">
                Enjoyed this article? Share it with your network!
              </div>
              <ShareButton 
                title={post.title}
                description={post.description}
                variant="default"
              />
            </div>

            {/* Related Posts or Navigation */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-[#FF7F3E]/10">
              <Link href="/blog" className="text-white">
                <Button variant="outline" className="border-[#FF7F3E]/20 text-[#FF7F3E] hover:bg-[#FF7F3E]/5 hover:text-[#FF7F3E]">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Articles
                </Button>
              </Link>
              <div className="text-sm text-[#4B5563] text-center">
                Found this helpful? Let me know on{" "}
                <a 
                  href="https://twitter.com/dhananjaykakade" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF7F3E] hover:underline font-medium"
                >
                  Twitter
                </a>
              </div>
            </div>


            <motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.5 }}
  className="mt-16"
>
  <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
    {/* Reviews List - 2/3 width */}
    <div className="lg:col-span-2">
      <ReviewsList 
        reviews={reviews} 
        averageRating={averageRating}
        totalReviews={reviews.length}
      />
    </div>
    
    {/* Review Form - 1/3 width */}
    <div className="lg:col-span-2">
      <ReviewForm blogSlug={post.slug} />
    </div>
  </div>
</motion.section>
          </motion.footer>
        </div>
      </article>
    </div>
  )
}