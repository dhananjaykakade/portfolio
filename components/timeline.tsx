"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "MCA Student",
    company: "IMCC, Pune",
    period: "2024 - Present",
    description:
      "Currently pursuing Master of Computer Applications, focusing on advanced software development, data structures, algorithms, and cloud technologies. Ranked in Top 3% of the class.",
  },
  {
    title: "Core Lead",
    company: "Interaction 24 Fest",
    period: "2024",
    description:
      "Served as core lead for a 3-day fest, 'Interaction 24', successfully managing and serving over 600 participants. Oversaw technical aspects and team coordination.",
  },
  {
    title: "Hackathon Winner",
    company: "GDG InnoVyuh Hackathon",
    period: "2025",
    description:
      "Achieved 2nd place for developing an AI Grading System, demonstrating innovation in AI-integrated applications.",
  },
  {
    title: "BCA Graduate",
    company: "Modern College, Pune",
    period: "2021 - 2024",
    description:
      "Completed Bachelor of Computer Applications, gaining foundational knowledge in computer science and software development. Ranked in Top 5% of the class.",
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-red-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-white/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-300 mb-4">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-200">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-white z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
