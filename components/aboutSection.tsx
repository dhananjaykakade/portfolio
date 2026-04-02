'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Download, Code2, Rocket, Trophy, Zap, ChevronRight, Server, Database, Globe } from 'lucide-react';
import { useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const storyCards = [
    {
      icon: Code2,
      chapter: "The Beginning",
      title: "From Curiosity to Code",
      content: "Started my journey with a simple 'Hello World' and fell in love with problem-solving. BSc in Computer Science at Modern College, Pune laid the foundation.",
      highlight: "Top 5% of class",
      color: "#FF7F3E"
    },
    {
      icon: Server,
      chapter: "The Craft",
      title: "Backend Obsession",
      content: "Discovered my passion for building the invisible infrastructure that powers applications. Microservices, APIs, and databases became my playground.",
      highlight: "Node.js • MongoDB • Redis",
      color: "#3AB0FF"
    },
    {
      icon: Rocket,
      chapter: "The Leap",
      title: "Real-World Impact",
      content: "From IoT water monitoring systems for PCMC to building SaaS platforms serving 100+ users. Every project taught me that code should solve real problems.",
      highlight: "80% automation achieved",
      color: "#FF7F3E"
    },
    {
      icon: Trophy,
      chapter: "The Recognition",
      title: "Hackathon Champion",
      content: "Runner-up at GDG InnoVyuh 2025 leading a 4-member team. Built an AI-powered grading system that handles 100+ concurrent submissions.",
      highlight: "9+ hackathons competed",
      color: "#3AB0FF"
    }
  ];

  const techStack = [
    { name: "Node.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "MongoDB", level: 88 },
    { name: "React/Next.js", level: 85 },
    { name: "PostgreSQL", level: 82 },
    { name: "Docker", level: 78 },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 relative bg-[#F9F9F9] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF7F3E]/10 to-transparent rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#3AB0FF]/10 to-transparent rounded-full blur-3xl"
          style={{ y: y2 }}
        />
        {/* Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#1F2937 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Hero Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7F3E]/10 text-[#FF7F3E] text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Zap className="w-4 h-4" />
            Available for opportunities
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-[#1F2937] mb-6">
            Hey, I'm <span className="text-[#FF7F3E]">Dhananjay</span>
          </h2>
          <p className="text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
            Full Stack Developer from Pune, India currently pursuing MCA at IMCC. 
            I build <span className="text-[#3AB0FF] font-semibold">scalable backends</span> and 
            <span className="text-[#FF7F3E] font-semibold"> real-time systems</span> that solve real problems.
          </p>
        </motion.div>

        {/* Profile + Quick Info */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Profile Card */}
          <div className="relative group">
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-[#FF7F3E] to-[#3AB0FF] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"
            />
            <motion.div
              className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-2xl"
              whileHover={{ scale: 1.02, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/dk.png"
                alt="Dhananjay Kakade"
                className="w-full h-full object-cover"
              />
              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
              >
                <span className="text-white font-semibold">Building cool stuff 🚀</span>
              </motion.div>
            </motion.div>
            {/* Status Badge */}
            <motion.div
              className="absolute -bottom-3 -right-3 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              viewport={{ once: true }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-[#1F2937]">Open to work</span>
            </motion.div>
          </div>

          {/* Quick Info Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
            {[
              { icon: MapPin, label: "Based in", value: "Pune, India", color: "#FF7F3E" },
              { icon: Mail, label: "Email", value: "kakadedhananjay59@gmail.com", color: "#3AB0FF" },
              { icon: Globe, label: "Focus", value: "Backend & Full Stack", color: "#FF7F3E" },
              { icon: Database, label: "Specialty", value: "Microservices & APIs", color: "#3AB0FF" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF7F3E]/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280] uppercase tracking-wider">{item.label}</div>
                    <div className="text-sm font-semibold text-[#1F2937]">{item.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Cards - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl font-bold text-[#1F2937] mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Journey <span className="text-[#FF7F3E]">→</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyCards.map((card, index) => (
              <motion.div
                key={card.chapter}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Connection Line */}
                {index < storyCards.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-6 h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0" />
                )}
                
                <motion.div
                  className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  {/* Gradient accent on hover */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}80)` }}
                  />
                  
                  {/* Chapter Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      <card.icon className="w-6 h-6" style={{ color: card.color }} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      {card.chapter}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-[#1F2937] mb-3">{card.title}</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{card.content}</p>
                  
                  {/* Highlight Badge */}
                  <div 
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${card.color}10`, color: card.color }}
                  >
                    <ChevronRight className="w-3 h-3" />
                    {card.highlight}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Progress */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-[#1F2937] mb-6 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#FF7F3E]" />
            Tech Proficiency
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#1F2937]">{tech.name}</span>
                  <span className="text-xs text-[#6B7280]">{tech.level}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ 
                      background: index % 2 === 0 
                        ? 'linear-gradient(90deg, #FF7F3E, #FFB67B)' 
                        : 'linear-gradient(90deg, #3AB0FF, #7DD3FC)'
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6B7280] mb-6">Want to know more? Let's connect!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-[#FF7F3E] hover:bg-[#e66f35] text-white px-8 py-6 rounded-xl font-semibold shadow-lg shadow-[#FF7F3E]/25 transition-all duration-300"
                asChild
              >
                <a href="/Dhananjaykakade_95552935559.pdf" download className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline"
                className="border-2 border-[#1F2937] text-[#1F2937] hover:bg-[#1F2937] hover:text-white px-8 py-6 rounded-xl font-semibold transition-all duration-300"
                asChild
              >
                <a  href="#contact" className="flex text-white items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}