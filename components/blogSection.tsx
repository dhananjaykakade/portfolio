"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BlogCard } from './blog-card'
import { getAllBlogPosts } from '@/lib/blog-actions'
import { BlogPost } from '@/lib/blog-data'

const BlogSection = () => {
    const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([])
    // Fetch blog posts from database
    const fetchBlogPosts = async () => {
      const posts = await getAllBlogPosts()
      setBlogPosts(posts)
    }
    React.useEffect(() => {
      fetchBlogPosts()
    }, [])
    
  return (
   <>
   <section id="blog" className="py-32 relative overflow-hidden bg-[#F9F9F9]">
  {/* Enhanced Background Elements */}
  <div className="absolute inset-0 z-0">
    {/* Subtle Gradient Orbs */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#FF7F3E]/5 to-[#3AB0FF]/3 rounded-full mix-blend-multiply filter blur-3xl"
      animate={{
        x: [0, 30, 0],
        y: [0, -25, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-[#3AB0FF]/3 to-[#FFB67B]/5 rounded-full mix-blend-multiply filter blur-3xl"
      animate={{
        x: [0, -20, 0],
        y: [0, 15, 0],
        scale: [1, 1.05, 1],
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
        backgroundSize: '60px 60px',
      }}
    />
  </div>

  {/* Subtle Floating Particles */}
  <div className="absolute inset-0 z-0">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-[#FF7F3E]/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>

  <div className="container relative z-10">
    {/* Animated Section Heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
                Latest Blogs
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Insights, tutorials, and stories from my tech journey
            </p>
          </motion.div>

    {/* Blog Posts Grid */}
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {blogPosts.slice(0, 3).map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>

    {/* View All Button */}
    <motion.div
      className="text-center mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href="/blog">
        <Button className="bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] hover:from-[#FF9F5A] hover:to-[#FF7F3E] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          View All Blogs
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>

    {/* Stats Section */}
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      viewport={{ once: true }}
    >
      {[
        { number: "10+", label: "Articles Published" },
        { number: "5K+", label: "Total Reads" },
        { number: "15+", label: "Tech Topics" },
        { number: "95%", label: "Reader Satisfaction" }
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-6 rounded-2xl bg-white border border-[#FF7F3E]/10 hover:border-[#FF7F3E]/30 transition-all duration-300 group shadow-sm hover:shadow-md"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-2xl md:text-3xl font-bold text-[#FF7F3E] mb-2">
            {stat.number}
          </div>
          <div className="text-[#4B5563] font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>

  {/* Section Bottom Border */}
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF7F3E]/20 to-transparent"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ duration: 1, delay: 0.9 }}
    viewport={{ once: true }}
  />
</section>
</>
  )
}

export default BlogSection