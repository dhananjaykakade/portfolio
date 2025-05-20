"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import {
  ChevronDown,
  Download,
  Send,
  GitlabIcon as GitHub,
  Linkedin,
  Mail,
  Phone,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AnimatedCounter } from "@/components/animated-counter"
import { ParticleBackground } from "@/components/particle-background"
import { sendContactEmail } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
  // Refs for scroll functionality
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Navbar scroll state
  const [scrolled, setScrolled] = useState(false)

  // Active section tracking
  const [activeSection, setActiveSection] = useState("hero")

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle scroll events for navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      // Determine active section
      const sections = [
        { id: "hero", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "projects", ref: projectsRef },
        { id: "skills", ref: skillsRef },
        { id: "achievements", ref: achievementsRef },
        { id: "contact", ref: contactRef },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setMobileMenuOpen(false)
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setFormStatus({
          type: "success",
          message: result.message,
        })
        // Reset form
        setFormData({ name: "", email: "", message: "" })
      } else {
        setFormStatus({
          type: "error",
          message: result.message,
        })
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const buttonHover = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(255, 60, 87, 0.5)",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: { scale: 0.95 },
  }

  const cardHover = {
    rest: {
      backgroundColor: "rgba(30, 30, 30, 0.6)",
      backdropFilter: "blur(10px)",
      y: 0,
    },
    hover: {
      backgroundColor: "rgba(40, 40, 40, 0.8)",
      backdropFilter: "blur(15px)",
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/70 backdrop-blur-md border-b border-zinc-800 py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl"
          >
            <span className="text-white">DK</span>
            <span className="text-[#ff3c57]">.</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "About", ref: aboutRef, id: "about" },
              { name: "Projects", ref: projectsRef, id: "projects" },
              { name: "Skills", ref: skillsRef, id: "skills" },
              { name: "Achievements", ref: achievementsRef, id: "achievements" },
              { name: "Contact", ref: contactRef, id: "contact" },
            ].map((item) => (
              <motion.button
                key={item.name}
                className={`relative px-1 py-1 transition-colors ${
                  activeSection === item.id ? "text-[#ff3c57]" : "text-white/80 hover:text-white"
                }`}
                onClick={() => scrollToSection(item.ref)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#ff3c57] w-full"
                    layoutId="activeSection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-zinc-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {[
                  { name: "About", ref: aboutRef },
                  { name: "Projects", ref: projectsRef },
                  { name: "Skills", ref: skillsRef },
                  { name: "Achievements", ref: achievementsRef },
                  { name: "Contact", ref: contactRef },
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    className="text-white/80 hover:text-white py-2 text-left"
                    onClick={() => scrollToSection(item.ref)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 px-4 container mx-auto flex flex-col items-center justify-center text-center"
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dhananjay Kakade
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl text-zinc-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Backend-Focused Full-Stack Developer
          </motion.h2>

          <motion.div
            className="h-16 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TypeAnimation
              sequence={[
                "Crafting Scalable Web Systems.",
                2000,
                "Building Secure Applications.",
                2000,
                "Developing Smart Solutions.",
                2000,
              ]}
              wrapper="div"
              cursor={true}
              repeat={Number.POSITIVE_INFINITY}
              className="text-lg md:text-xl font-medium text-white/90"
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div variants={buttonHover} initial="rest" whileHover="hover" whileTap="tap">
<a
  href="/dhananjaykakade.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="bg-[#ff3c57] hover:bg-[#ff3c57]/90 relative overflow-hidden group">
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff3c57]/0 via-white/20 to-[#ff3c57]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
    <Download className="mr-2 h-4 w-4" /> Download Resume
  </Button>
</a>
            </motion.div>

            <motion.div variants={buttonHover} initial="rest" whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                className="border-[#ff3c57] text-[#ff3c57] hover:bg-[#ff3c57]/10 relative overflow-hidden group"
                onClick={() => scrollToSection(contactRef)}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff3c57]/0 via-[#ff3c57]/10 to-[#ff3c57]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <Send className="mr-2 h-4 w-4" /> Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ChevronDown className="h-8 w-8 text-zinc-500" />
        </motion.div>
      </section>

      {/* About Me Section */}
      <section ref={aboutRef} className="py-16 md:py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-xl overflow-hidden"
            >
              <CardHeader className="border-b border-zinc-800/50">
                <CardTitle className="text-white">Who I Am</CardTitle>
                <CardDescription className="text-zinc-400">Backend-Focused Full-Stack Developer</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-zinc-300 leading-relaxed">
                  Results-driven Backend-Focused Full-Stack Developer experienced in building scalable and
                  high-performance web applications. Proficient in Node.js, React.js, and modern cloud infrastructure. I
                  specialize in creating robust backend systems that power seamless user experiences.
                </p>
                <p className="text-zinc-300 leading-relaxed mt-4">
                  With a passion for clean code and efficient solutions, I approach each project with a focus on
                  performance, security, and maintainability. I enjoy tackling complex problems and continuously
                  learning new technologies to stay at the forefront of web development.
                </p>
              </CardContent>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Project 1 */}
            <motion.div variants={fadeInUp}>
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="h-full rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-xl overflow-hidden"
              >
                <CardHeader className="border-b border-zinc-800/50">
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-white">Evolve AI</span>
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-[#ff3c57] hover:text-[#ff3c57]/80 hover:bg-zinc-800/50"
                      >
                        <a href="https://github.com/dhananjaykakade/evolve-ai-updated" target="_blank" rel="noopener noreferrer">
                          <GitHub className="h-5 w-5" />
                        </a>
                      </Button>
                    </motion.div>
                  </CardTitle>
                  <CardDescription className="text-zinc-400">AI-Powered Grading System</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Node.js", "TensorFlow", "MongoDB", "React"].map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-zinc-800/50 text-zinc-300 border-zinc-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li>Automated essay grading using NLP and machine learning</li>
                    <li>Real-time feedback system for students</li>
                    <li>Analytics dashboard for educators</li>
                    <li>Improved grading efficiency by 70%</li>
                  </ul>
                </CardContent>
              </motion.div>
            </motion.div>

            {/* Project 2 */}
            <motion.div variants={fadeInUp}>
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="h-full rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-xl overflow-hidden"
              >
                <CardHeader className="border-b border-zinc-800/50">
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-white">Rozgaar-Link</span>
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-[#ff3c57] hover:text-[#ff3c57]/80 hover:bg-zinc-800/50"
                      >
                        <a href="https://github.com/dhananjaykakade/Rozgaar-Link" target="_blank" rel="noopener noreferrer">
                          <GitHub className="h-5 w-5" />
                        </a>
                      </Button>
                    </motion.div>
                  </CardTitle>
                  <CardDescription className="text-zinc-400">Job Matching Platform</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["TypeScript", "Next.js", "PostgreSQL", "Prisma"].map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-zinc-800/50 text-zinc-300 border-zinc-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li>AI-powered job matching algorithm</li>
                    <li>Real-time chat between employers and candidates</li>
                    <li>Advanced filtering and search capabilities</li>
                    <li>Mobile-responsive design with PWA support</li>
                  </ul>
                </CardContent>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-16 md:py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Tech Stack</h2>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: "JavaScript", icon: "⚡", value: 90 },
                  { name: "TypeScript", icon: "🔷", value: 85 },
                  { name: "React", icon: "⚛️", value: 88 },
                  { name: "Node.js", icon: "🟢", value: 92 },
                  { name: "PostgreSQL", icon: "🐘", value: 80 },
                  { name: "MongoDB", icon: "🍃", value: 85 },
                  { name: "Prisma", icon: "◼️", value: 78 },
                  { name: "AWS", icon: "☁️", value: 75 },
                  { name: "Docker", icon: "🐳", value: 82 },
                  { name: "Redis", icon: "🔴", value: 70 },
                  { name: "GraphQL", icon: "⬢", value: 75 },
                  { name: "Next.js", icon: "▲", value: 88 },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.05 },
                      },
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 60, 87, 0.2)" }}
                  >
                    <motion.div
                      className="flex flex-col items-center p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md"
                      initial={{ background: "rgba(30, 30, 30, 0.6)" }}
                      whileHover={{
                        background: "rgba(40, 40, 40, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <span className="text-2xl mb-2">{skill.icon}</span>
                      <span className="text-zinc-200 mb-2">{skill.name}</span>
                      <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-1">
                        <motion.div
                          className="bg-[#ff3c57] h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Achievements</h2>

            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="max-w-3xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-xl overflow-hidden"
            >
              <CardHeader className="border-b border-zinc-800/50">
                <CardTitle className="text-[#ff3c57]">InnoVyuh Hackathon 2025 – 2nd Place</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center px-4">
                    <div className="text-4xl font-bold text-[#ff3c57] mb-1">
                      <div className="text-4xl font-bold text-[#ff3c57] mb-1">48</div>
                    </div>
                    <div className="text-zinc-400 text-sm">Hours</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-4xl font-bold text-[#ff3c57] mb-1">
                      <div className="text-4xl font-bold text-[#ff3c57] mb-1">4</div>
                    </div>
                    <div className="text-zinc-400 text-sm">Team Members</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-4xl font-bold text-[#ff3c57] mb-1">2nd</div>
                    <div className="text-zinc-400 text-sm">Place</div>
                  </div>
                </div>

                <ul className="list-disc list-inside text-zinc-300 space-y-2">
                  <li>Led a team of 4 developers to build an AI-powered solution in 48 hours</li>
                  <li>Developed a machine learning model for real-time data analysis</li>
                  <li>Implemented a scalable backend architecture using microservices</li>
                  <li>Presented the solution to a panel of industry experts</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-zinc-500">May 2025</CardFooter>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 md:py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Me</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Contact Form */}
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-xl overflow-hidden"
              >
                <CardHeader className="border-b border-zinc-800/50">
                  <CardTitle className="text-white">Send a Message</CardTitle>
                  <CardDescription className="text-zinc-400">I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {formStatus.type && (
                    <Alert
                      className={`mb-4 ${
                        formStatus.type === "success"
                          ? "bg-green-900/20 text-green-400 border-green-800"
                          : "bg-red-900/20 text-red-400 border-red-800"
                      }`}
                    >
                      {formStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>{formStatus.type === "success" ? "Success!" : "Error!"}</AlertTitle>
                      <AlertDescription>{formStatus.message}</AlertDescription>
                    </Alert>
                  )}

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-zinc-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#ff3c57] focus:ring-[#ff3c57]/10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#ff3c57] focus:ring-[#ff3c57]/10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-zinc-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message"
                        rows={5}
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#ff3c57] focus:ring-[#ff3c57]/10"
                        required
                      />
                    </div>
                    <motion.div variants={buttonHover} initial="rest" whileHover="hover" whileTap="tap">
                      <Button
                        type="submit"
                        className="w-full bg-[#ff3c57] hover:bg-[#ff3c57]/90 relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff3c57]/0 via-white/20 to-[#ff3c57]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </motion.div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center space-y-6">
                <motion.div
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-xl overflow-hidden"
                >
                  <CardHeader className="border-b border-zinc-800/50">
                    <CardTitle className="text-white">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <motion.div
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Mail className="h-5 w-5 mr-3 text-[#ff3c57]" />
                      <span className="text-zinc-300">kakadedhananjay59@gmail.com</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Phone className="h-5 w-5 mr-3 text-[#ff3c57]" />
                      <span className="text-zinc-300">+91 95529 35559</span>
                    </motion.div>
                  </CardContent>
                </motion.div>

                <motion.div
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md shadow-xl overflow-hidden"
                >
                  <CardHeader className="border-b border-zinc-800/50">
                    <CardTitle className="text-white">Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex space-x-4">
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="border-zinc-700 text-[#ff3c57] hover:text-white hover:bg-[#ff3c57] hover:border-[#ff3c57] transition-colors"
                        >
                          <a href="https://github.com/dhananjaykakade" target="_blank" rel="noopener noreferrer">
                            <GitHub className="h-5 w-5" />
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="border-zinc-700 text-[#ff3c57] hover:text-white hover:bg-[#ff3c57] hover:border-[#ff3c57] transition-colors"
                        >
                          <a href="https://www.linkedin.com/in/dhananjay-kakade-657087294/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5" />
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <p>© {new Date().getFullYear()} Dhananjay Kakade. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
