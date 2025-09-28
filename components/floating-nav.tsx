"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { X, Menu, Download } from "lucide-react"

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
      setIsVisible(scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = () => {
    setIsOpen(false)
  }

  if (!mounted) return null

  return (
    <>
      {/* Main Floating Nav - FIXED POSITIONING */}
<div className="fixed top-0 left-0 right-0 z-50 flex justify-center ">
        <motion.nav
        className={`fixed top-6  z-50 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 25 
        }}
      >
        <div className={`relative px-8 py-4 rounded-2xl transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl shadow-gray-200/20" 
            : "bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl"
        }`}>
          {/* Subtle Border Glow */}
          <motion.div
            className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#FF7F3E]/10 to-[#3AB0FF]/10 opacity-50"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative flex items-center gap-12">
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/" 
                className="flex items-center gap-3"
              >
                <div className="w-2 h-8 bg-gradient-to-b from-[#FF7F3E] to-[#FFB67B] rounded-full" />
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-gray-900 tracking-tight">
                    Dhananjay
                  </span>
                  <span className="text-xs text-gray-500 font-medium tracking-wide">
                    PORTFOLIO
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative group"
                    onClick={handleNavClick}
                  >
                    <span className="text-sm font-medium text-gray-700 hover:text-[#FF7F3E] transition-colors duration-300">
                      {item.name}
                    </span>
                    
                    {/* Underline Effect */}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF7F3E] to-[#3AB0FF]"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Resume Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] hover:from-[#FF7F3E] hover:to-[#FF9F5A] text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <a href="/dhananjay_kakade_sde.pdf" target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div
                className="md:hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-600 hover:text-[#FF7F3E] hover:bg-gray-100"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

</div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-full max-w-sm px-8">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Menu Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-gradient-to-b from-[#FF7F3E] to-[#FFB67B] rounded-full" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Navigation</h3>
                        <p className="text-sm text-gray-500">Select a section</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="p-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-[#FF7F3E] hover:bg-gray-50 rounded-lg transition-all duration-300 group"
                          onClick={handleNavClick}
                        >
                          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-4 group-hover:bg-[#FF7F3E] transition-colors" />
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Mobile Resume Button */}
                  <div className="p-4 border-t border-gray-100">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                    >
                      <Button 
                        size="lg"
                        className="w-full rounded-xl bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] hover:from-[#FF7F3E] hover:to-[#FF9F5A] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        <a href="/dhananjay_kakade_sde.pdf" target="_blank" rel="noopener noreferrer">
                          Download Resume
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF7F3E] to-[#3AB0FF] z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? (typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0) : 0 }}
        transition={{ duration: 0.1 }}
      />
    </>
  )
}

export default FloatingNav