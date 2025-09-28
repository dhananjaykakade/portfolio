"use client"

import { motion } from "framer-motion"

export const SectionHeading = ({ Title, Subtitle }: { Title: string; Subtitle: string }) => {
  return (
    <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          {Title}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          {Subtitle}
        </motion.div>
      </>
    )
  
}
