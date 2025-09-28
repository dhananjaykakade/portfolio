"use client"
import { BlogCard } from "@/components/blog-card"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllBlogPosts } from "@/lib/blog-actions"
import { BlogPost } from "@/lib/blog-data"
import { BlogLoading } from "./BlogLoader"

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  // Fetch blog posts from database
  // add loading state
  // add error handling
  const fetchBlogPosts = async () => {
    setLoading(true)
  try {
    const posts = await getAllBlogPosts()
    setBlogPosts(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
  } finally {
    setLoading(false)
  }
  }
  useEffect(() => {
    fetchBlogPosts()
  }, [])


if (loading) {
  return <BlogLoading />
}

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1F2937] ">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Gradient Orbs */}
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
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `linear-gradient(#FF7F3E 1px, transparent 1px),
                             linear-gradient(90deg, #FF7F3E 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <section className="py-20 relative">
        <div className="container relative z-10">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Button variant="ghost" className="mb-8 text-[#4B5563] hover:text-[#FF7F3E] hover:bg-[#FF7F3E]/5">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
              My Tech Blogs
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Sharing insights, tutorials, and stories from my journey in software development.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-12 mb-8"
          >
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
              <Input
                placeholder="Search articles..."
                className="pl-10 bg-white border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 text-[#1F2937] placeholder-[#4B5563]"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#FF7F3E]/20 text-[#4B5563] hover:bg-[#FF7F3E]/5 hover:text-[#FF7F3E]">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {blogPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FF7F3E]/10 flex items-center justify-center">
                  <Search className="h-10 w-10 text-[#FF7F3E]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1F2937] mb-2">
                  No blog posts yet
                </h3>
                <p className="text-[#4B5563] mb-6">
                  I'm working on some exciting content. Check back soon for new articles!
                </p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] hover:from-[#FF9F5A] hover:to-[#FF7F3E] text-white">
                    Return Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Load More Button (if needed) */}
          {blogPosts.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12"
            >
              <Button 
                variant="outline" 
                className="border-[#FF7F3E]/30 text-[#FF7F3E] hover:bg-[#FF7F3E]/10 hover:border-[#FF7F3E]/50"
              >
                Load More Articles
              </Button>
            </motion.div>
          )}

          {/* Blog Stats */}
          {blogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-[#FF7F3E]/10"
            >
              {[
                { number: `${blogPosts.length}+`, label: "Articles Published" },
                { number: `${blogPosts.reduce((sum, post) => sum + (post.views || 0), 0)}+`, label: "Total Reads" },
                { number: `${new Set(blogPosts.map(post => post.category)).size}+`, label: "Categories" },
                { number: "95%", label: "Reader Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-white border border-[#FF7F3E]/10 hover:border-[#FF7F3E]/30 transition-all duration-300 group shadow-sm hover:shadow-md"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-[#FF7F3E] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#4B5563] font-medium text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}