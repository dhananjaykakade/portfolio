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
  SiGo,
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
  Zap,
  TrendingUp,
  Star,
} from "lucide-react";

// Bento Card Component
const BentoCard = ({
  children,
  className = "",
  size = "default",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "default" | "large" | "wide" | "tall";
  delay?: number;
}) => {
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    default: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    large: "col-span-2 row-span-2",
    wide: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
  };

  return (
    <motion.div
      className={`group relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#FF7F3E]/20 transition-all duration-500 overflow-hidden ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F3E]/5 via-transparent to-[#3AB0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Tech Icon Component
const TechIcon = ({
  icon: Icon,
  name,
  color,
  size = "default",
}: {
  icon: any;
  name: string;
  color: string;
  size?: "small" | "default" | "large";
}) => {
  const sizeClasses = {
    small: "w-8 h-8 md:w-10 md:h-10",
    default: "w-10 h-10 md:w-12 md:h-12",
    large: "w-12 h-12 md:w-16 md:h-16",
  };

  const iconSizes = {
    small: "w-4 h-4 md:w-5 md:h-5",
    default: "w-5 h-5 md:w-6 md:h-6",
    large: "w-6 h-6 md:w-8 md:h-8",
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 md:gap-2"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div
        className={`${sizeClasses[size]} rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg`}
        style={{
          backgroundColor: `${color}15`,
          border: `1.5px solid ${color}30`,
        }}
      >
        <Icon className={iconSizes[size]} style={{ color }} />
      </div>
      <span className="text-[10px] md:text-xs font-medium text-[#4B5563] group-hover:text-[#1F2937] transition-colors text-center">
        {name}
      </span>
    </motion.div>
  );
};

// Skill Progress Component
const SkillProgress = ({
  name,
  level,
  color,
}: {
  name: string;
  level: number;
  color: string;
}) => {
  return (
    <div className="space-y-1.5 md:space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs md:text-sm font-medium text-[#1F2937]">{name}</span>
        <span className="text-[10px] md:text-xs text-[#6B7280]">{level}%</span>
      </div>
      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

export default function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const primaryTech = [
    { icon: SiNodedotjs, name: "Node.js", color: "#339933", level: 95 },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6", level: 90 },
    { icon: SiMongodb, name: "MongoDB", color: "#47A248", level: 88 },
    { icon: SiReact, name: "React", color: "#61DAFB", level: 85 },
  ];

  const frontendTech = [
    { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
    { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
    { icon: SiRedux, name: "Redux", color: "#764ABC" },
  ];

  const backendTech = [
    { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { icon: SiExpress, name: "Express", color: "#000000" },
    { icon: SiPython, name: "Python", color: "#3776AB" },
    { icon: SiGo, name: "Golang", color: "#00ADD8" },
    { icon: Server, name: "REST API", color: "#FF7F3E" },
  ];

  const databaseTech = [
    { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
    { icon: SiRedis, name: "Redis", color: "#DC382D" },
    { icon: SiPrisma, name: "Prisma", color: "#2D3748" },
  ];

  const devopsTech = [
    { icon: SiDocker, name: "Docker", color: "#2496ED" },
    { icon: SiGit, name: "Git", color: "#F05032" },
    { icon: SiNginx, name: "Nginx", color: "#009639" },
    { icon: Terminal, name: "Linux", color: "#FCC624" },
  ];

  return (
    <section
      id="skills"
      className="py-16 md:py-24 lg:py-32 relative bg-[#F9F9F9] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 right-20 w-48 md:w-72 lg:w-96 h-48 md:h-72 lg:h-96 bg-gradient-to-br from-[#FF7F3E]/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 md:w-72 lg:w-96 h-48 md:h-72 lg:h-96 bg-gradient-to-tr from-[#3AB0FF]/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(#1F2937 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#FF7F3E]/10 text-[#FF7F3E] text-xs md:text-sm font-medium mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Technologies & Tools
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1F2937] mb-3 md:mb-4">
            My Tech Stack
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Building modern, scalable solutions with cutting-edge technologies
          </p>
        </motion.div>

        {/* Bento Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 auto-rows-[minmax(100px,auto)] md:auto-rows-[minmax(120px,auto)]">
          
          {/* Hero Card - Primary Skills */}
          <BentoCard size="large" className="col-span-2 row-span-2" delay={0}>
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#FF7F3E] to-[#FFB67B] flex items-center justify-center">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#1F2937]">Core Stack</h3>
                  <p className="text-[10px] md:text-xs text-[#6B7280]">Primary technologies</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-2 md:space-y-3">
                {primaryTech.map((tech) => (
                  <SkillProgress
                    key={tech.name}
                    name={tech.name}
                    level={tech.level}
                    color={tech.color}
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Frontend Card */}
          <BentoCard className="col-span-2 row-span-1 md:col-span-2 md:row-span-1" delay={0.1}>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Palette className="w-4 h-4 md:w-5 md:h-5 text-[#3AB0FF]" />
              <h3 className="text-sm md:text-base font-bold text-[#1F2937]">Frontend</h3>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {frontendTech.map((tech) => (
                <TechIcon
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  color={tech.color}
                  size="small"
                />
              ))}
            </div>
          </BentoCard>

          {/* Stats Card */}
          <BentoCard className="col-span-1 row-span-1 md:col-span-1 md:row-span-1" delay={0.15}>
            <div className="h-full flex flex-col items-center justify-center text-center">
              <motion.div
                className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                viewport={{ once: true }}
              >
                20+
              </motion.div>
              <p className="text-[10px] md:text-xs text-[#6B7280] mt-1">Technologies</p>
            </div>
          </BentoCard>

          {/* Experience Card */}
          <BentoCard className="col-span-1 row-span-1 md:col-span-1 md:row-span-1" delay={0.2}>
            <div className="h-full flex flex-col items-center justify-center text-center">
              <motion.div
                className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#3AB0FF] to-[#7DD3FC] bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.35 }}
                viewport={{ once: true }}
              >
                1+
              </motion.div>
              <p className="text-[10px] md:text-xs text-[#6B7280] mt-1">Years Exp</p>
            </div>
          </BentoCard>

          {/* Backend Card */}
          <BentoCard className="col-span-2 row-span-1 md:col-span-2 md:row-span-1" delay={0.25}>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Server className="w-4 h-4 md:w-5 md:h-5 text-[#FF7F3E]" />
              <h3 className="text-sm md:text-base font-bold text-[#1F2937]">Backend</h3>
              <span className="ml-auto px-2 py-0.5 bg-[#FF7F3E]/10 rounded-full text-[10px] md:text-xs font-medium text-[#FF7F3E]">
                Specialty
              </span>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {backendTech.map((tech) => (
                <TechIcon
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  color={tech.color}
                  size="small"
                />
              ))}
            </div>
          </BentoCard>

          {/* Database Card */}
          <BentoCard className="col-span-2 row-span-1 md:col-span-2 md:row-span-1" delay={0.3}>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Database className="w-4 h-4 md:w-5 md:h-5 text-[#47A248]" />
              <h3 className="text-sm md:text-base font-bold text-[#1F2937]">Database</h3>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {databaseTech.map((tech) => (
                <TechIcon
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  color={tech.color}
                  size="small"
                />
              ))}
            </div>
          </BentoCard>

          {/* DevOps Card */}
          <BentoCard className="col-span-2 row-span-1 md:col-span-2 md:row-span-1" delay={0.35}>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Settings className="w-4 h-4 md:w-5 md:h-5 text-[#2496ED]" />
              <h3 className="text-sm md:text-base font-bold text-[#1F2937]">DevOps</h3>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {devopsTech.map((tech) => (
                <TechIcon
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  color={tech.color}
                  size="small"
                />
              ))}
            </div>
          </BentoCard>

          {/* Learning Card */}
          <BentoCard className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 bg-gradient-to-br from-[#FFF5F0] to-white" delay={0.4}>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FF7F3E]/20 to-[#3AB0FF]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#FF7F3E]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-bold text-[#1F2937]">Always Learning</h3>
                <p className="text-[10px] md:text-xs text-[#6B7280]">
                  Currently exploring Kubernetes, GraphQL & System Design
                </p>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFB67B]" />
              </motion.div>
            </div>
          </BentoCard>
        </div>

        {/* Bottom Stats Row - Mobile Optimized */}
        <motion.div
          className="mt-8 md:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Projects Built", value: "15+", color: "#FF7F3E" },
            { label: "Happy Clients", value: "5+", color: "#3AB0FF" },
            { label: "APIs Created", value: "30+", color: "#47A248" },
            { label: "Coffee Cups", value: "∞", color: "#8B4513" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#FF7F3E]/20 transition-all duration-300 text-center"
              whileHover={{ y: -5 }}
            >
              <div
                className="text-xl md:text-2xl lg:text-3xl font-black mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs lg:text-sm text-[#6B7280] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
