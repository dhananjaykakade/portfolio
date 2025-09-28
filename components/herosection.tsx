'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, MapPin } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="min-h-screen pt-4 bg-[#F9F9F9] relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#FF7F3E] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#3AB0FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFB67B] rounded-full mix-blend-multiply filter blur-3xl opacity-5"
          animate={floatingAnimation}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,127,62,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,127,62,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              <span className="block text-[#1F2937]">HELLO!</span>
              <span className="block text-[#1F2937]">I AM</span>
              <motion.span 
                className="block text-[#FF7F3E] bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                DHANANJAY 
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-[#4B5563]">Full Stack</span>{' '}
              <motion.span
                className="text-[#FF7F3E]"
                animate={{ 
                  color: ['#FF7F3E', '#FFB67B', '#FF7F3E']
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              >
                Developer
              </motion.span>
            </motion.h2>
            <motion.h2 
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1F2937]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-[#4B5563]">&</span>{' '}
              <motion.span
                className="text-[#3AB0FF]"
                animate={{ 
                  color: ['#3AB0FF', '#7BCFFF', '#3AB0FF']
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: 1 
                }}
              >
                Consultant
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Location */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFF5F0] border border-[#FFB67B]/30 shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px -10px rgba(255, 127, 62, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <MapPin className="w-5 h-5 text-[#FF7F3E]" />
              <span className="text-[#4B5563] font-medium">Made in India</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-[#FF7F3E] hover:bg-[#FFB67B] text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View My Work
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-[#1F2937] text-white hover:bg-[#1F2937] hover:text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
              >
                <a href="#contact">
                Get In Touch
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 text-[#4B5563]"
            variants={itemVariants}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6" />
            </motion.div>
            <span className="text-sm font-medium">Scroll to explore</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-20 w-4 h-4 bg-[#FF7F3E] rounded-full"
        animate={{
          y: [0, -30, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-20 w-6 h-6 bg-[#3AB0FF] rounded-full"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-3/4 right-40 w-3 h-3 bg-[#FFB67B] rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: 1.5
        }}
      />
    </section>
  );
}