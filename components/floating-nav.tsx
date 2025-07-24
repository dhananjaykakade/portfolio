"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"
import { Sun, Moon, X, Menu } from "lucide-react"

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" }, // Added Achievements
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <motion.div
        className={`fixed top-6 left-[46%]  -translate-x-1/2 z-50 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative px-4 py-3  rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-white/20 rounded-full blur opacity-50"></div>

          {isMobile ? (
            <div className="relative flex items-center justify-between">
              <Link href="/" className="font-bold text-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">Dhananjay</span>
                <span className="text-white">Kakade</span>
              </Link>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-300 hover:text-white hover:bg-zinc-700/50"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center gap-1">
              <Link href="/" className="font-bold text-lg mr-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">Dhananjay</span>
                <span className="text-white">Kakade</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-1 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}
              <Button size="sm" className="ml-2 bg-red-500 hover:bg-red-600 border-0">
                Resume
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-8 py-4 text-2xl font-medium text-white hover:text-red-500 transition-colors"
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}
            <Button className="mt-6 bg-red-500 hover:bg-red-600 border-0">
              <a href="/dhananjay_kakade_sde.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default FloatingNav
