"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "Full Stack Developer (Freelancer)",
    company: "Nexolve Technologies LLP, Pune (Remote)",
    period: "Jun 2024 – Present",
    description: [
      "Delivered 10+ full-stack projects including DeFi insurance platforms, e-commerce solutions, and SaaS applications",
      "Developed scalable backend APIs using Node.js & Express.js, integrated with React.js frontends for seamless user experiences",
      "Architected and optimized MongoDB & PostgreSQL databases, improving query performance by 40%",
      "Implemented secure OAuth 2.0 and JWT authentication systems, protecting 1000+ user accounts",
      "Collaborated with cross-functional teams using Agile methodologies, consistently delivering projects 15% ahead of schedule"
    ],
    tech: ["Node.js", "React.js", "Next.js", "MongoDB", "PostgreSQL", "OAuth", "REST APIs", "Docker", "Git"]
  },
  {
    title: "MCA Student",
    company: "MES, Institute of Management & Career Courses (IMCC), Pune",
    period: "Sept 2024 – Ongoing",
    description: [
      "Applied Agile methodologies (Scrum) in academic projects, using Jira to manage sprints, backlogs, and evaluations",
      "Leading 4-member team in delivering iterative improvements through structured project management"
    ],
    tech: ["Agile", "Scrum", "Jira", "Project Management"]
  },
  {
    title: "BSc Computer Science",
    company: "Modern College, Pune",
    period: "Jul 2021 – May 2024",
    description: [
      "Ranked in the top 5% of the class out of 120+ students based on academic performance",
      "Built strong foundation in computer science fundamentals and software development principles"
    ],
    tech: ["Data Structures", "Algorithms", "Software Engineering"]
  }
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-16 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-[#3AB0FF]/30 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className={`relative z-10 flex items-center ${
            index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {/* Content Card */}
          <div
            className={`w-full md:w-1/2 ${
              index % 2 === 0 ? "md:pl-12" : "md:pr-12"
            }`}
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-[#FFF5F0] p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#FF7F3E]/40 group"
              whileHover={{ y: -5 }}
            >
              {/* Gradient Overlay */}
              <div className="absolute -inset-1  rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
              
              <div className="relative">
                {/* Title & Company */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#1F2937]">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#4B5563] mb-2">
                    <span className="font-medium">{experience.company}</span>
                    <span className="text-[#FF7F3E]">•</span>
                    <span className="text-sm">{experience.period}</span>
                  </div>
                </div>

                {/* Description List */}
                <ul className="space-y-3 mb-6">
                  {experience.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#1F2937]">
                      <span className="text-[#FF7F3E] mt-1.5 flex-shrink-0">▸</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {experience.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/80 border border-[#3AB0FF]/20 rounded-full text-sm text-[#1F2937] font-medium backdrop-blur-sm hover:bg-[#3AB0FF]/5 hover:border-[#3AB0FF]/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline Dot */}
          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7F3E] to-[#3AB0FF] z-10 flex items-center justify-center shadow-lg border-2 border-white"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </motion.div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}