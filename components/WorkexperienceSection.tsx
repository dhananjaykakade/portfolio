'use client';

import { motion } from 'framer-motion';
import { Timeline } from './timeline';


import React from 'react'

const WorkexperienceSection = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-[#F9F9F9]">
  {/* Enhanced Background Elements */}
  <div className="absolute inset-0 z-0">
    {/* Animated Gradient Orbs */}
    <motion.div
      className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#F9F9F9]0 to-[#F9F9F9]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#F9F9F9]  rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      animate={{
        x: [0, -25, 0],
        y: [0, 15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    {/* Grid Pattern Overlay */}
    <div 
      className="absolute inset-0 opacity-5"
       style={{
            backgroundImage: `linear-gradient(#111827 1px, transparent 1px),
                             linear-gradient(90deg, #111827 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
    />
  </div>

  {/* Floating Particles */}
  <div className="absolute inset-0 z-0">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-[#FF7F3E] rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>

  <div className="container relative z-10">
    {/* Enhanced Section Heading with Animation */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
                Work Experience
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
                My professional journey
            </p>
          </motion.div>

    {/* Timeline Container with Staggered Animation */}
    <motion.div 
      className="mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <Timeline />
    </motion.div>
  </div>

  {/* Section Bottom Border */}
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-px bg-[#F9F9F9] to-transparent"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }}
  />
</section>
  )
}

export default WorkexperienceSection
