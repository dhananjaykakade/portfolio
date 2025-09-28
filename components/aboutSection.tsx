'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Phone, Calendar, Download } from 'lucide-react';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section id="about" className="py-20 relative bg-[#F9F9F9]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-[#FF7F3E] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-[#3AB0FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Centered Content */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Heading */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
              About Me
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Backend-focused developer crafting scalable solutions
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            className="bg-[#FFF5F0] rounded-2xl p-8 shadow-lg border border-[#FFB67B]/20"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Profile Image */}
              <motion.div
                className="flex-shrink-0"
                variants={itemVariants}
              >
                <div className="relative">
                  <motion.div
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src="/dk.png"
                      alt="Dhananjay Kakade"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {/* Status Indicator */}
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  className="mb-6"
                  variants={itemVariants}
                >
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-3">
                    Dhananjay Kakade
                  </h3>
                  <p className="text-lg text-[#4B5563] leading-relaxed">
                    Backend-focused developer from Pune, India. Currently pursuing MCA at IMCC. 
                    I specialize in building efficient, scalable APIs, real-time systems, and 
                    optimizing performance across web platforms.
                  </p>
                </motion.div>

                {/* Key Highlights */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                  variants={containerVariants}
                >
                  {[
                    { 
                      title: "Hackathon Winner", 
                      description: "2nd Place at GDG InnoVyuh 2025",
                      color: "#FF7F3E"
                    },
                    { 
                      title: "Performance Optimizer", 
                      description: "Reduced API latency by 30%",
                      color: "#3AB0FF"
                    },
                    { 
                      title: "Tech Stack", 
                      description: "Node.js, React, MongoDB, Go",
                      color: "#FF7F3E"
                    },
                    { 
                      title: "Open Source", 
                      description: "Active contributor & creator",
                      color: "#3AB0FF"
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div 
                        className="text-sm font-semibold mb-1"
                        style={{ color: item.color }}
                      >
                        {item.title}
                      </div>
                      <div className="text-xs text-[#4B5563]">
                        {item.description}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                  variants={containerVariants}
                >
                  {[
                    { icon: MapPin, label: "Location", value: "Pune, India", color: "#FF7F3E" },
                    { icon: Mail, label: "Email", value: "kakadedhananjay59@gmail.com", color: "#3AB0FF" },
                    { icon: Phone, label: "Phone", value: "+91 95529 35559", color: "#FF7F3E" },
                    { icon: Calendar, label: "Status", value: "Open to opportunities", color: "#10B981" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-3 p-2"
                      variants={itemVariants}
                    >
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      <div className="flex-1">
                        <div className="text-xs text-[#4B5563]">{item.label}</div>
                        <div className="text-sm font-medium text-[#1F2937]">
                          {item.value}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  className="text-center lg:text-left"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-[#FF7F3E] hover:bg-[#FFB67B] text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300">
                    <Download className="w-4 h-4 mr-2" />
                    <a href="/updatedResume.pdf" download>
                      Download Resume
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            variants={containerVariants}
          >
            {[
              { number: "2+", label: "Internships", color: "#FF7F3E" },
              { number: "6+", label: "Hackathons", color: "#3AB0FF" },
              { number: "2nd", label: "Hackathon Win", color: "#FF7F3E" },
              { number: "30%", label: "Performance Gain", color: "#3AB0FF" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-[#FFF5F0] border border-[#FFB67B]/20"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="text-2xl font-black mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-[#4B5563] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}