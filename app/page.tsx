"use client";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { SkillBadge } from "@/components/skill-badge";
import { Timeline } from "@/components/timeline";
import { ContactForm } from "@/components/contact-form";
import { CreativeHero } from "@/components/creative-hero";
import FloatingNav from "@/components/floating-nav"; // Corrected import to default
import { MouseFollower } from "@/components/mouse-follower";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionHeading } from "@/components/section-heading";
import { GlassmorphicCard } from "@/components/glassmorphic-card";
import { Achievements } from "@/components/achievements";
import { BlogCard } from "@/components/blog-card";
import { blogPosts } from "@/lib/blog-data";
import HeroSection from "@/components/herosection";
import AboutSection from "@/components/aboutSection";
import SkillsSection from "@/components/skillBadge";
import ProjectsSection from "@/components/ProjectSection";
import AchievementsSection from "@/components/AchievementsSection";
import WorkexperienceSection from "@/components/WorkexperienceSection";
import { motion } from "framer-motion";
import { Phone, Download, Calendar } from "lucide-react";
import { Footer } from "@/components/Footer";
import BlogSection from "@/components/blogSection";

export default function Portfolio() {
  return (
    <div className="min-h-screen overflow-hidden">
      <MouseFollower />
      <ScrollProgress />

      {/* Hero Section */}

      <HeroSection />
      {/* About Section */}
      <AboutSection />

      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Achievements Section */}
      <AchievementsSection />

      {/* Experience Section */}
      <WorkexperienceSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 relative overflow-hidden bg-[#FFF5F0]"
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#FF7F3E]/40 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
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
              Contact Me
            </h2>
            <p className="text-lg text-[#1F2937] max-w-2xl mx-auto">
              Let's build something amazing together!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-16">
            {/* Contact Information Card */}
<motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
>
  <div className="relative rounded-2xl bg-white border border-[#FF7F3E]/20 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
    {/* Gradient Overlay */}
    <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7F3E]/5 to-[#3AB0FF]/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />

    <div className="relative">
      <h3 className="text-xl md:text-2xl font-bold text-[#1F2937] mb-2">
        Contact Information
      </h3>
      <p className="text-[#4B5563] mb-6 md:mb-8 text-sm md:text-base">
        Let's connect and discuss your next project
      </p>

      <div className="space-y-4 md:space-y-6">
        {/* Email */}
        <motion.a
          href="mailto:kakadedhananjay59@gmail.com"
          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/50 border border-[#FF7F3E]/10 hover:border-[#FF7F3E]/30 transition-all duration-300 group/item"
          whileHover={{ x: 5 }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#FF7F3E] to-[#FF9F5A] flex items-center justify-center shadow-md flex-shrink-0">
            <Mail className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs md:text-sm text-[#4B5563]">Email</div>
            <div className="font-medium text-[#1F2937] group-hover/item:text-[#FF7F3E] transition-colors text-sm md:text-base truncate">
              kakadedhananjay59@gmail.com
            </div>
          </div>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://linkedin.com/in/dhananjay-kakade-657087294/"
          target="_blank"
          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/50 border border-[#FF7F3E]/10 hover:border-[#FF7F3E]/30 transition-all duration-300 group/item"
          whileHover={{ x: 5 }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#3AB0FF] to-[#0077B5] flex items-center justify-center shadow-md flex-shrink-0">
            <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs md:text-sm text-[#4B5563]">LinkedIn</div>
            <div className="font-medium text-[#1F2937] group-hover/item:text-[#3AB0FF] transition-colors text-sm md:text-base truncate">
              /in/dhananjay-kakade
            </div>
          </div>
        </motion.a>

        {/* GitHub */}
        <motion.a
          href="https://github.com/dhananjaykakade"
          target="_blank"
          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/50 border border-[#FF7F3E]/10 hover:border-[#FF7F3E]/30 transition-all duration-300 group/item"
          whileHover={{ x: 5 }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#1F2937] to-[#4B5563] flex items-center justify-center shadow-md flex-shrink-0">
            <Github className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs md:text-sm text-[#4B5563]">GitHub</div>
            <div className="font-medium text-[#1F2937] group-hover/item:text-[#1F2937] transition-colors text-sm md:text-base truncate">
              @dhananjaykakade
            </div>
          </div>
        </motion.a>

        {/* Phone */}
        <motion.a
          href="tel:+919552935559"
          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/50 border border-[#FF7F3E]/10 hover:border-[#FF7F3E]/30 transition-all duration-300 group/item"
          whileHover={{ x: 5 }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-md flex-shrink-0">
            <Phone className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs md:text-sm text-[#4B5563]">Phone</div>
            <div className="font-medium text-[#1F2937] group-hover/item:text-[#10B981] transition-colors text-sm md:text-base">
              +91 95529 35559
            </div>
          </div>
        </motion.a>
      </div>

      {/* Current Status */}
      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-[#FF7F3E]/20">
        <h4 className="text-lg font-semibold text-[#1F2937] mb-3 md:mb-4">
          Current Status
        </h4>
        <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-gradient-to-r from-[#10B981]/10 to-[#3AB0FF]/10 border border-[#10B981]/20">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
          <span className="text-[#1F2937] font-medium text-sm md:text-base">
            Available for freelance work and full-time opportunities
          </span>
        </div>
      </div>
    </div>
  </div>
</motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Quick Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2937] text-white font-medium rounded-xl hover:bg-[#374151] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4" />
              Download Resume
            </motion.a>
            <motion.a
              href="https://calendly.com/kakadedhananjay59/30min"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF7F3E] text-white font-medium rounded-xl hover:bg-[#FF9F5A] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="h-4 w-4" />
              Schedule Meeting
            </motion.a>
          </motion.div>
        </div>

        {/* Section Bottom Border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF7F3E]/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        />
      </section>
    </div>
  );
}
