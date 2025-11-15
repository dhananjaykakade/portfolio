"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
  Layers,
  Palette,
  Settings,
} from "lucide-react";

const CustomMarquee = ({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Left Gradient Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-[#FFF5F0] to-transparent z-10 pointer-events-none" />

      {/* Right Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-l from-[#FFF5F0] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-3"
        animate={{
          x: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          },
        }}
      >
        <div className="flex gap-3 sm:gap-4 lg:gap-6">{children}</div>
        <div className="flex gap-3 sm:gap-4 lg:gap-6">{children}</div>
      </motion.div>
    </div>
  );
};

const TechnologyIcon = ({ icon: Icon, name, color }: { icon: any; name: string; color: string }) => {
  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md border border-[#FF7F3E]/10 hover:shadow-xl hover:border-[#FF7F3E]/30 transition-all duration-300 min-w-[70px] sm:min-w-[85px] md:min-w-[100px] flex-shrink-0"
      whileHover={{ y: -4, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F3E]/5 to-[#3AB0FF]/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${color}10`,
          border: `1.5px solid ${color}25`,
        }}
      >
        <Icon
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-300"
          style={{ color }}
        />
      </div>
      
      <span className="relative text-[10px] sm:text-xs md:text-sm font-medium text-[#1F2937] group-hover:text-[#FF7F3E] transition-colors duration-300 text-center">
        {name}
      </span>

      {/* Tooltip on hover (desktop only) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden sm:block">
        {name}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1F2937] rotate-45" />
      </div>
    </motion.div>
  );
};

const CategoryTab = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] text-white shadow-lg"
          : "bg-white text-[#1F2937] border border-[#FF7F3E]/20 hover:border-[#FF7F3E]/40"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
    </motion.button>
  );
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", icon: Layers, label: "All Stack" },
    { id: "frontend", icon: Palette, label: "Frontend" },
    { id: "backend", icon: Server, label: "Backend" },
    { id: "database", icon: Database, label: "Database" },
    { id: "devops", icon: Settings, label: "DevOps" },
  ];

  const technologies = {
    frontend: [
      { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
      { icon: SiReact, name: "React", color: "#61DAFB" },
      { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
      { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
      { icon: SiRedux, name: "Redux", color: "#764ABC" },
    ],
    backend: [
      { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
      { icon: SiExpress, name: "Express", color: "#000000" },
      { icon: Server, name: "REST API", color: "#FF7F3E" },
      { icon: SiPython, name: "Python", color: "#3776AB" },
      { icon: Cloud, name: "Microservices", color: "#3AB0FF" },
      { icon: Workflow, name: "System Design", color: "#FF7F3E" },
    ],
    database: [
      { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
      { icon: SiRedis, name: "Redis", color: "#DC382D" },
      { icon: SiPrisma, name: "Prisma", color: "#2D3748" },
      { icon: Database, name: "RDBMS", color: "#FF7F3E" },
    ],
    devops: [
      { icon: SiDocker, name: "Docker", color: "#2496ED" },
      { icon: SiGit, name: "Git", color: "#F05032" },
      { icon: SiNginx, name: "Nginx", color: "#009639" },
      { icon: SiJest, name: "Jest", color: "#C21325" },
      { icon: Terminal, name: "Linux", color: "#FCC624" },
      { icon: GitBranch, name: "CI/CD", color: "#FF7F3E" },
    ],
    concepts: [
      { icon: Cpu, name: "OOP", color: "#FF7F3E" },
      { icon: Code2, name: "DSA", color: "#3AB0FF" },
    ],
  };

  const allTechnologies = [
    ...technologies.frontend,
    ...technologies.backend,
    ...technologies.database,
    ...technologies.devops,
    ...technologies.concepts,
  ];

  const getDisplayedTechnologies = () => {
    if (activeCategory === "all") return allTechnologies;
    return technologies[activeCategory as keyof typeof technologies] || [];
  };

  const displayedTechs = getDisplayedTechnologies();
  
  // Duplicate technologies for seamless loop
  const duplicatedTechs = [...displayedTechs, ...displayedTechs, ...displayedTechs];

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 md:py-32 relative bg-[#FFF5F0] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FF7F3E]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Large gradient blobs */}
        <motion.div
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#FF7F3E] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 25, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#3AB0FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#FF7F3E]/10 to-[#3AB0FF]/10 border border-[#FF7F3E]/20 rounded-full text-xs sm:text-sm font-semibold text-[#FF7F3E]">
              Technologies & Tools
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2937] mb-3 sm:mb-4 leading-tight">
            My Tech Stack
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#4B5563] max-w-2xl mx-auto px-4">
            Building modern, scalable solutions with cutting-edge technologies
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              icon={category.icon}
              label={category.label}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </motion.div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          key={activeCategory}
        >
          <CustomMarquee>
            {duplicatedTechs.map((tech, index) => (
              <TechnologyIcon
                key={`tech-${index}`}
                icon={tech.icon}
                name={tech.name}
                color={tech.color}
              />
            ))}
          </CustomMarquee>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Technologies", value: `${allTechnologies.length}+` },
            { label: "Years Exp", value: "1+" },
            { label: "Projects", value: "15+" },
            { label: "Happy Clients", value: "5+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-[#FF7F3E]/10 hover:shadow-xl hover:border-[#FF7F3E]/30 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[#FF7F3E] to-[#3AB0FF] bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-[#4B5563] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Section Bottom Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF7F3E]/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      />
    </section>
  );
}
