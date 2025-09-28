"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Search, FileText } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1F2937] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#FF7F3E]/10 to-[#3AB0FF]/5 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-[#3AB0FF]/5 to-[#FFB67B]/8 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#FF7F3E 1px, transparent 1px),
                             linear-gradient(90deg, #FF7F3E 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FF7F3E]/30 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Code */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-[#FF7F3E] to-[#3AB0FF] bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <div className="relative inline-block">
              <div className="w-48 h-48 bg-gradient-to-br from-[#FF7F3E]/10 to-[#3AB0FF]/10 rounded-full flex items-center justify-center border-2 border-[#FF7F3E]/20">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Search className="h-16 w-16 text-[#FF7F3E]" />
                </motion.div>
              </div>
              
              {/* Floating elements around the circle */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 bg-white border border-[#FF7F3E]/20 rounded-lg flex items-center justify-center shadow-sm"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <FileText className="h-4 w-4 text-[#FF7F3E]" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] hover:from-[#FF9F5A] hover:to-[#FF7F3E] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Link href="/blog">
              <Button 
                variant="outline"
                size="lg"
                className="border-[#FF7F3E]/30 text-[#FF7F3E] hover:bg-[#FF7F3E]/10 hover:border-[#FF7F3E]/50 font-semibold"
              >
                <FileText className="h-4 w-4 mr-2" />
                Visit Blog
              </Button>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#FF7F3E]/10 p-6 max-w-md mx-auto shadow-sm"
          >
            <h3 className="font-semibold text-[#1F2937] mb-3">Popular Pages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <Link href="/" className="text-[#4B5563] hover:text-[#FF7F3E] transition-colors flex items-center gap-2">
                <ArrowLeft className="h-3 w-3" />
                Home
              </Link>
              <Link href="/blog" className="text-[#4B5563] hover:text-[#FF7F3E] transition-colors flex items-center gap-2">
                <FileText className="h-3 w-3" />
                Blog
              </Link>
              <Link href="/#projects" className="text-[#4B5563] hover:text-[#FF7F3E] transition-colors flex items-center gap-2">
                <FileText className="h-3 w-3" />
                Projects
              </Link>
              <Link href="/#contact" className="text-[#4B5563] hover:text-[#FF7F3E] transition-colors flex items-center gap-2">
                <FileText className="h-3 w-3" />
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8"
          >
            <p className="text-[#4B5563] text-sm">
              While you're here, why not check out my latest blog posts? 
              <Link href="/blog" className="text-[#FF7F3E] hover:underline font-medium ml-1">
                They're pretty cool!
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}