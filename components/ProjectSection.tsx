'use client';

import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Github,
  Rocket,
  Users,
  Star,
  TrendingUp
} from 'lucide-react';

const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  image, 
  demoUrl, 
  repoUrl,
  stats 
}: { 
  title: string; 
  description: string; 
  tags: string[]; 
  image: string; 
  demoUrl?: string; 
  repoUrl?: string;
  stats?: { label: string; value: string; icon: any }[];
}) => {
  return (
    <motion.div
      className="group relative bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
      whileHover={{ y: -4, scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      {/* Project Image */}
      <div className="relative rounded-xl overflow-hidden mb-4 aspect-video bg-gradient-to-br from-[#FF7F3E]/10 to-[#3AB0FF]/10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Live Indicator */}
        {demoUrl && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full px-2 py-1 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="text-white text-xs font-medium">LIVE</span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="relative">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#FF7F3E] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>

        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center p-1.5 rounded-lg bg-gray-50">
                <stat.icon 
                  size={14} 
                  className="mx-auto mb-1" 
                  style={{ color: index % 2 === 0 ? '#FF7F3E' : '#3AB0FF' }}
                />
                <div className="text-xs font-bold text-gray-800">{stat.value}</div>
                <div className="text-[10px] text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-lg text-xs font-medium border transition-all duration-200"
              style={{
                backgroundColor: index % 2 === 0 ? '#FF7F3E10' : '#3AB0FF10',
                borderColor: index % 2 === 0 ? '#FF7F3E20' : '#3AB0FF20',
                color: index % 2 === 0 ? '#FF7F3E' : '#3AB0FF'
              }}
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 rounded-lg text-xs font-medium text-gray-500 bg-gray-100">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-white text-xs transition-all duration-200 hover:scale-105 flex-1 justify-center"
              style={{ 
                backgroundColor: '#FF7F3E',
                boxShadow: '0 2px 8px 0 rgba(255, 127, 62, 0.3)'
              }}
              whileHover={{ 
                backgroundColor: '#FFB67B',
              }}
            >
              <ExternalLink size={14} />
              Demo
            </motion.a>
          )}
          
          {repoUrl && (
            <motion.a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-200 hover:scale-105 flex-1 justify-center border"
              style={{ 
                backgroundColor: '#f8fafc',
                borderColor: '#3AB0FF',
                color: '#3AB0FF'
              }}
              whileHover={{ 
                backgroundColor: '#3AB0FF10'
              }}
            >
              <Github size={14} />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const projects = [
    {
      title: "Evolve AI",
      description: "AI-powered grading system with Gemini API integration. Handles 100+ concurrent submissions with 60% faster evaluation.",
      tags: ["Node.js", "Prisma", "Gemini AI", "Docker", "Microservices"],
      image: "/evolve.png",
      repoUrl: "https://github.com/dhananjaykakade/evolve-ai-updated",
      stats: [
        { label: "Concurrent", value: "100+", icon: Users },
        { label: "Speed", value: "60%", icon: TrendingUp },
        { label: "Rank", value: "2nd", icon: Star }
      ]
    },
    {
      title: "Interaction 24",
      description: "Scalable event registration platform for 600+ users with optimized backend architecture.",
      tags: ["Node.js", "Docker", "Nginx", "MongoDB", "Redis"],
      image: "/interaction.png",
      repoUrl: "https://github.com/interactors2025/production-interaction25/",
      stats: [
        { label: "Users", value: "600+", icon: Users },
        { label: "Load", value: "Balanced", icon: TrendingUp },
        { label: "Deploy", value: "Docker", icon: Rocket }
      ]
    },
    {
      title: "Trinity Courses",
      description: "Full-stack online course platform with secure payment integration and advanced authentication.",
      tags: ["Next.js 14", "Supabase", "Razorpay", "Stripe", "Auth"],
      image: "/course.png",
      demoUrl: "https://courses.trinityconsultancy.tech/",
      stats: [
        { label: "Users", value: "20+", icon: Users },
        { label: "Payments", value: "Secure", icon: TrendingUp },
        { label: "Stack", value: "Full", icon: Rocket }
      ]
    },
    {
      title: "MotionPix India",
      description: "Professional animation studio website attracting 1000+ monthly visitors with optimized performance.",
      tags: ["Next.js 14", "Tailwind", "TypeScript", "Vercel", "SEO"],
      image: "/motionpx.png",
      demoUrl: "https://motionpixindia.com/",
      stats: [
        { label: "Monthly", value: "1000+", icon: Users },
        { label: "Perf", value: "95%", icon: TrendingUp },
        { label: "Host", value: "Vercel", icon: Rocket }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section id="projects" className="py-20 relative bg-gray-50">
      {/* Simplified Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-[#FF7F3E] rounded-full mix-blend-multiply filter blur-xl opacity-5" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#3AB0FF] rounded-full mix-blend-multiply filter blur-xl opacity-5" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Compact Heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
              Projects
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Showcasing my latest work in full-stack development and modern web applications
            </p>
          </motion.div>

        {/* Compact Grid - 2x2 layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              demoUrl={project.demoUrl}
              repoUrl={project.repoUrl}
              stats={project.stats}
            />
          ))}
        </motion.div>

        {/* Compact CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/dhananjaykakade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 border"
            style={{
              backgroundColor: 'white',
              borderColor: '#FF7F3E',
              color: '#FF7F3E'
            }}
            whileHover={{
              backgroundColor: '#FF7F3E',
              color: '#FFFFFF'
            }}
          >
            <Github size={18} />
            View All Projects
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}