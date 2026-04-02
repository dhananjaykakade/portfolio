'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  ExternalLink, 
  Github,
  Rocket,
  Users,
  Star,
  TrendingUp,
  ArrowRight,
  Zap,
  Code2,
  Globe
} from 'lucide-react';

// Magazine-style Project Card
const MagazineProjectCard = ({ 
  project, 
  index,
  isReversed 
}: { 
  project: any;
  index: number;
  isReversed: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={cardRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center ${isReversed ? 'lg:grid-flow-dense' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Image Side */}
      <motion.div 
        className={`relative group ${isReversed ? 'lg:col-start-2' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Decorative Elements */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#FF7F3E]/20 to-[#3AB0FF]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main Image Container */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          {/* Project Number Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <span className="text-lg md:text-xl font-black text-[#FF7F3E]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Live Badge */}
          {project.demoUrl && (
            <div className="absolute top-4 right-4 z-20">
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 rounded-full shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-xs font-semibold text-white">LIVE</span>
              </motion.div>
            </div>
          )}

          {/* Image */}
          <div className="aspect-[4/3] md:aspect-video bg-gradient-to-br from-[#FF7F3E]/5 to-[#3AB0FF]/5">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
            <div className="flex gap-3">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-semibold text-gray-900 hover:bg-[#FF7F3E] hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="w-4 h-4" />
                  Visit Site
                </motion.a>
              )}
              {project.repoUrl && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  Code
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Side */}
      <div className={`space-y-4 md:space-y-6 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        {/* Category Tag */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF7F3E]/10 rounded-full text-[#FF7F3E] text-xs md:text-sm font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            {project.category || "Full Stack"}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1F2937] leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-sm md:text-base lg:text-lg text-[#4B5563] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          {project.description}
        </motion.p>

        {/* Stats Row */}
        {project.stats && (
          <motion.div 
            className="flex flex-wrap gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {project.stats.map((stat: any, statIndex: number) => (
              <div 
                key={stat.label}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <stat.icon 
                  className="w-4 h-4 md:w-5 md:h-5" 
                  style={{ color: statIndex % 2 === 0 ? '#FF7F3E' : '#3AB0FF' }}
                />
                <div>
                  <div className="text-xs md:text-sm font-bold text-[#1F2937]">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-[#6B7280]">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tech Tags */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          {project.tags.map((tag: string, tagIndex: number) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: tagIndex % 2 === 0 ? '#FF7F3E15' : '#3AB0FF15',
                color: tagIndex % 2 === 0 ? '#FF7F3E' : '#3AB0FF'
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Action Links - Mobile */}
        <motion.div 
          className="flex gap-3 pt-2 lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
        >
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#FF7F3E] rounded-xl text-sm font-semibold text-white shadow-lg shadow-[#FF7F3E]/25"
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#1F2937] rounded-xl text-sm font-semibold text-[#1F2937]"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const projects = [
    {
      title: "Evolve AI",
      description: "AI-powered grading system with Gemini API integration. Built with microservices architecture to handle 100+ concurrent submissions, reducing manual evaluation time by 60%.",
      category: "AI / EdTech",
      tags: ["Node.js", "Prisma", "Gemini AI", "Docker", "Microservices"],
      image: "/evolve.png",
      repoUrl: "https://github.com/dhananjaykakade/evolve-ai-updated",
      stats: [
        { label: "Submissions", value: "100+", icon: Users },
        { label: "Faster", value: "60%", icon: TrendingUp },
        { label: "Hackathon", value: "2nd", icon: Star }
      ]
    },
    {
      title: "HowToStartAStartup",
      description: "SaaS platform helping aspiring founders go from idea to execution with structured guidance. Currently serving 100+ active users with comprehensive startup resources.",
      category: "SaaS",
      tags: ["Next.js", "MongoDB", "TypeScript", "Clerk Auth", "Vercel"],
      image: "/htsas.png",
      demoUrl: "https://howtostartastartup.live",
      stats: [
        { label: "Active Users", value: "100+", icon: Users },
        { label: "Status", value: "Live", icon: Rocket },
        { label: "Platform", value: "SaaS", icon: Zap }
      ]
    },
    {
      title: "Interaction 25",
      description: "Scalable event registration platform handling 600+ concurrent users with Docker containerization, load balancing via Nginx, and Redis caching for optimal performance.",
      category: "Event Platform",
      tags: ["Node.js", "Docker", "Nginx", "MongoDB", "Redis"],
      image: "/interaction.png",
      repoUrl: "https://github.com/interactors2025/production-interaction25/",
      stats: [
        { label: "Users", value: "600+", icon: Users },
        { label: "Uptime", value: "99.9%", icon: TrendingUp },
        { label: "Deploy", value: "Docker", icon: Rocket }
      ]
    },
    {
      title: "MotionPix India",
      description: "Professional animation studio website optimized for performance and SEO, attracting 1000+ monthly visitors. Built with modern Next.js 14 features and deployed on Vercel.",
      category: "Client Work",
      tags: ["Next.js 14", "Tailwind", "TypeScript", "Vercel", "SEO"],
      image: "/motionpx.png",
      demoUrl: "https://motionpixindia.com/",
      stats: [
        { label: "Monthly", value: "1000+", icon: Users },
        { label: "Performance", value: "95%", icon: TrendingUp },
        { label: "SEO", value: "Optimized", icon: Star }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-16 md:py-24 lg:py-32 relative bg-[#F9F9F9] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-bl from-[#FF7F3E]/10 to-transparent rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gradient-to-tr from-[#3AB0FF]/10 to-transparent rounded-full blur-3xl"
          style={{ y: y2 }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#1F2937 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7F3E]/10 text-[#FF7F3E] text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-4 h-4" />
            Featured Work
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1F2937] mb-4">
            Projects That <span className="text-[#FF7F3E]">Ship</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Real-world applications built with modern technologies, 
            serving actual users and solving genuine problems
          </p>
        </motion.div>

        {/* Magazine Layout Projects */}
        <div className="space-y-16 md:space-y-24 lg:space-y-32 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <MagazineProjectCard
              key={project.title}
              project={project}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 md:mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6B7280] mb-6 text-sm md:text-base">
            Want to see more? Check out my GitHub for additional projects
          </p>
          <motion.a
            href="https://github.com/dhananjaykakade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#1F2937] text-white rounded-xl md:rounded-2xl font-semibold text-sm md:text-base shadow-xl shadow-gray-900/20 hover:bg-[#374151] transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            Explore All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}