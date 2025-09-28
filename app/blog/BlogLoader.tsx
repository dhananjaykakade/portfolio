"use client"

import { motion } from "framer-motion"
import { FileText, BookOpen, PenTool } from "lucide-react"

export function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1F2937] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-[#FF7F3E]/5 to-[#3AB0FF]/3 rounded-full mix-blend-multiply filter blur-3xl"
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
          className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-[#3AB0FF]/3 to-[#FFB67B]/5 rounded-full mix-blend-multiply filter blur-3xl"
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
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `linear-gradient(#FF7F3E 1px, transparent 1px),
                             linear-gradient(90deg, #FF7F3E 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="text-center relative z-10 max-w-md mx-auto">
        {/* Animated Icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-[#FF7F3E]/10 to-[#3AB0FF]/10 rounded-2xl flex items-center justify-center border-2 border-[#FF7F3E]/20 shadow-lg"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BookOpen className="h-10 w-10 text-[#FF7F3E]" />
              </motion.div>
            </motion.div>
            
            {/* Floating icons around main icon */}
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-[#FF7F3E]/20 rounded-lg flex items-center justify-center shadow-sm"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <FileText className="h-4 w-4 text-[#FF7F3E]" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-2 w-8 h-8 bg-white border border-[#FF7F3E]/20 rounded-lg flex items-center justify-center shadow-sm"
              animate={{
                y: [0, 8, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <PenTool className="h-4 w-4 text-[#FF7F3E]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
            Loading Blog Posts
          </h2>
          <p className="text-[#4B5563]">
            Gathering the latest insights and stories...
          </p>
        </motion.div>

        {/* Animated Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="w-64 h-2 bg-white border border-[#FF7F3E]/20 rounded-full overflow-hidden shadow-inner mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Pulsing Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center gap-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-[#FF7F3E] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <motion.p
            className="text-sm text-[#4B5563] italic"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            "Good code is its own best documentation."
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

// Alternative simpler loading component for inline use
export function InlineBlogLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-[#FF7F3E]/10 to-[#3AB0FF]/10 rounded-2xl flex items-center justify-center border-2 border-[#FF7F3E]/20 mx-auto mb-4"
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <BookOpen className="h-6 w-6 text-[#FF7F3E]" />
        </motion.div>
        
        <p className="text-[#4B5563] mb-4">Loading articles...</p>
        
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-[#FF7F3E] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Skeleton loading for blog cards
export function BlogCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: item * 0.1 }}
          className="bg-white rounded-2xl border border-[#FF7F3E]/10 p-6 shadow-sm"
        >
          {/* Image Skeleton */}
          <motion.div
            className="aspect-video bg-gray-200 rounded-xl mb-4"
            animate={{
              backgroundColor: ["#f3f4f6", "#e5e7eb", "#f3f4f6"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Category Skeleton */}
          <div className="w-20 h-6 bg-gray-200 rounded-full mb-4"></div>
          
          {/* Title Skeleton */}
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
          
          {/* Excerpt Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          
          {/* Meta Skeleton */}
          <div className="flex gap-4">
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-12 h-4 bg-gray-200 rounded"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}