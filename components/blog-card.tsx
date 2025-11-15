"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {BlogPost} from "@/lib/blog-data"
import { Calendar, Clock, ArrowRight } from "lucide-react"



interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl bg-white border border-[#FF7F3E]/10 hover:border-[#FF7F3E]/30 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      {/* Gradient Overlay */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7F3E]/3 to-[#3AB0FF]/2 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
      
      <div className="relative bg-white rounded-2xl">
        {/* Image */}
        {post.image && (
          <div className="aspect-video overflow-hidden rounded-t-2xl">
            <img
              src={post.image.url}
              alt={post.image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FF7F3E]/10 border border-[#FF7F3E]/20 text-[#FF7F3E] text-sm font-medium mb-4">
            {post.category}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-[#1F2937] mb-3 line-clamp-2 group-hover:text-[#FF7F3E] transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#4B5563] mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-[#4B5563] mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime} min
            </div>
          </div>

          {/* Read More Link */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-[#FF7F3E] font-semibold hover:text-[#FF9F5A] transition-colors group/link"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}