"use client";

import { motion } from "framer-motion";

import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGit,
  SiNginx,
  SiJest,
  SiPrisma,
} from "react-icons/si";
import {
  Database,
  Cpu,
  Code2,
  Cloud,
  Server,
  Terminal,
  GitBranch,
  Workflow,
} from "lucide-react";

const CustomMarquee = ({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Left Gradient Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-[#F9F9F9] to-transparent z-10" />

      {/* Right Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-l from-[#F9F9F9] to-transparent z-10" />

      <motion.div
        className="flex gap-4 sm:gap-6 lg:gap-8 py-3 sm:py-4"
        animate={{
        x: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 8,
            ease: "linear",
          },
        }}
      >
        <div className="flex gap-8">{children}</div>
        <div className="flex gap-8">{children}</div>
      </motion.div>
    </div>
  );
};

const TechnologyIcon = ({ icon: Icon, name, color }: { icon: any; name: string; color: string }) => {
  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center bg-[#FFF5F0] rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-[#FFB67B]/20 hover:shadow-2xl transition-all duration-500 min-w-[80px] sm:min-w-[90px] md:min-w-[100px]"
      whileHover={{ y: -6, scale: 1.08 }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${color}15`,
          border: `2px solid ${color}30`,
        }}
      >
        <Icon
          size={24}
          className="sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all duration-300 group-hover:scale-110"
          style={{ color }}
        />
      </div>
    </motion.div>
  );
};

export default function SkillsSection() {
  const technologies = [
    // Programming Languages
    { icon: SiJavascript, name: "JavaScript", color: "#FF7F3E" },
    { icon: SiTypescript, name: "TypeScript", color: "#3AB0FF" },
    { icon: SiPython, name: "Python", color: "#FF7F3E" },

    // Frontend
    { icon: SiReact, name: "React", color: "#FF7F3E" },
    { icon: SiNextdotjs, name: "Next.js", color: "#3AB0FF" },
    { icon: SiTailwindcss, name: "Tailwind CSS", color: "#FF7F3E" },
    { icon: SiRedux, name: "Redux", color: "#3AB0FF" },

    // Backend
    { icon: SiNodedotjs, name: "Node.js", color: "#FF7F3E" },
    { icon: SiExpress, name: "Express.js", color: "#3AB0FF" },
    { icon: Server, name: "REST APIs", color: "#FF7F3E" },

    // Databases
    { icon: SiMongodb, name: "MongoDB", color: "#3AB0FF" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "#FF7F3E" },
    { icon: SiRedis, name: "Redis", color: "#3AB0FF" },
    { icon: Database, name: "RDBMS", color: "#FF7F3E" },

    // Tools & DevOps
    { icon: SiDocker, name: "Docker", color: "#3AB0FF" },
    { icon: SiGit, name: "Git", color: "#FF7F3E" },
    { icon: SiNginx, name: "Nginx", color: "#FF7F3E" },
    { icon: SiJest, name: "Jest", color: "#3AB0FF" },
    { icon: Terminal, name: "Linux", color: "#FF7F3E" },

    // ORM & Others
    { icon: SiPrisma, name: "Prisma", color: "#3AB0FF" },
    { icon: Cpu, name: "OOP", color: "#FF7F3E" },
    { icon: Code2, name: "DSA", color: "#3AB0FF" },
    { icon: Workflow, name: "System Design", color: "#FF7F3E" },
    { icon: Cloud, name: "Microservices", color: "#3AB0FF" },
    { icon: GitBranch, name: "CI/CD", color: "#FF7F3E" },
  ];

  // Duplicate the array to create seamless loop
  const duplicatedTechnologies = [
    ...technologies,
    ...technologies,
    ...technologies,
  ];

  return (
    <section
      id="skills"
      className="py-32 relative bg-[#F9F9F9] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-[#FF7F3E] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-[#3AB0FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
            My Tech Stack
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            A showcase of the technologies and tools I work with to build modern
            web applications.
          </p>
        </motion.div>
        {/* Custom Marquee Sections */}
        <div className="space-y-8 mb-16">
          {/* First Row - Forward */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <CustomMarquee>
              {duplicatedTechnologies.map((tech, index) => (
                <TechnologyIcon
                  key={`row1-${index}`}
                  icon={tech.icon}
                  name={tech.name}
                  color={tech.color}
                />
              ))}
            </CustomMarquee>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
