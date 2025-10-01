"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/dhananjaykakade",
      icon: Github,
      color: "hover:text-[#1F2937]"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/dhananjay-kakade-657087294/",
      icon: Linkedin,
      color: "hover:text-[#0077B5]"
    },
    {
      name: "Email",
      href: "mailto:kakadedhananjay59@gmail.com",
      icon: Mail,
      color: "hover:text-[#FF7F3E]"
    }
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Blog", href: "/blog" }
  ]

  return (
    <footer className="border-t border-[#FF7F3E]/20 bg-[#FFF5F0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FF7F3E]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#3AB0FF]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="inline-block">
              <div className="font-bold text-2xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A]">
                  Dhananjay
                </span>
                <span className="text-[#1F2937]">Kakade</span>
              </div>
            </Link>
            <p className="text-[#4B5563] max-w-xs leading-relaxed">
              Full Stack Developer passionate about creating innovative solutions and building amazing user experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={social.href}
                    target={social.name !== "Email" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-xl bg-white/80 border border-[#FF7F3E]/10 text-[#4B5563] hover:bg-white hover:border-[#FF7F3E]/30 ${social.color} transition-all duration-300 shadow-sm hover:shadow-md`}
                    >
                      <social.icon className="h-4 w-4" />
                      <span className="sr-only">{social.name}</span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-[#1F2937] text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-[#4B5563] hover:text-[#FF7F3E] transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-[#1F2937] text-lg">Get In Touch</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#4B5563]">Email</p>
                <a
                  href="mailto:kakadedhananjay59@gmail.com"
                  className="text-[#1F2937] hover:text-[#FF7F3E] transition-colors font-medium"
                >
                  kakadedhananjay59@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm text-[#4B5563]">Phone</p>
                <a
                  href="tel:+919552935559"
                  className="text-[#1F2937] hover:text-[#FF7F3E] transition-colors font-medium"
                >
                  +91 95529 35559
                </a>
              </div>
              <div>
                <p className="text-sm text-[#4B5563]">Location</p>
                <p className="text-[#1F2937] font-medium">Pune, India</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-[#FF7F3E]/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-[#4B5563] text-sm">
            © {currentYear} Dhananjay Kakade. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#4B5563]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Available for new opportunities
          </div>
        </motion.div>
      </div>
    </footer>
  )
}