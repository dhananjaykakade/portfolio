'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { 
  IconTrophy,
  IconStar,
  IconAward,
  IconMedal,
  IconFlame,
  IconUsers,
  IconClock,
  IconRocket,
  IconCertificate,
  IconTrendingUp
} from '@tabler/icons-react';

const AchievementCard = ({ 
  title, 
  description, 
  icon: Icon,
  year,
  position,
  participants,
  color 
}: { 
  title: string; 
  description: string; 
  icon: any;
  year: string;
  position?: string;
  participants?: string;
  color: string;
}) => {
  return (
    <motion.div
      className="group relative bg-[#FFF5F0] rounded-3xl p-6 shadow-lg border border-[#FFB67B]/20 hover:shadow-2xl transition-all duration-500 overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF7F3E]/10 to-[#3AB0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Icon Container */}
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ 
              backgroundColor: `${color}15`,
              border: `2px solid ${color}30`
            }}
          >
            <Icon 
              size={32} 
              style={{ color: color }}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {/* Title and Year */}
          <div>
            <h3 className="text-xl font-black text-[#1F2937] group-hover:text-[#FF7F3E] transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <IconClock size={16} className="text-[#4B5563]" />
              <span className="text-sm text-[#4B5563] font-semibold">{year}</span>
            </div>
          </div>
        </div>

        {/* Position Badge */}
        {position && (
          <div 
            className="px-3 py-1 rounded-full text-xs font-black text-white uppercase tracking-wide shadow-lg"
            style={{ backgroundColor: color }}
          >
            {position}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-[#4B5563] leading-relaxed mb-4">
        {description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-[#FFB67B]/20">
        {participants && (
          <div className="flex items-center gap-2">
            <IconUsers size={16} className="text-[#4B5563]" />
            <span className="text-sm text-[#4B5563] font-semibold">{participants}</span>
          </div>
        )}
        
        {/* Achievement Level */}
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((star) => (
            <IconStar 
              key={star}
              size={16} 
              className={star <= (position === '1st' ? 3 : position === '2nd' ? 2 : 1) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
            />
          ))}
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#FF7F3E]/5 to-[#3AB0FF]/5 -z-10" />
    </motion.div>
  );
};

const StatsCard = ({ number, label, icon: Icon, color }: { number: string; label: string; icon: any; color: string }) => {
  return (
    <motion.div
      className="text-center p-6 rounded-3xl bg-[#FFF5F0] shadow-lg border border-[#FFB67B]/20"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        style={{ 
          backgroundColor: `${color}15`,
          border: `2px solid ${color}30`
        }}
      >
        <Icon size={32} style={{ color: color }} />
      </div>
      <div 
        className="text-4xl font-black mb-2"
        style={{ color: color }}
      >
        {number}
      </div>
      <div className="text-[#4B5563] font-semibold text-sm">
        {label}
      </div>
    </motion.div>
  );
};

export default function AchievementsSection() {
  const achievements = [
    {
      title: "GDG InnoVyuh Hackathon 2025",
      description: "Led a 4-member team to build an AI-powered grading system, ranking 2nd place among 100+ competing teams with innovative solutions.",
      icon: IconTrophy,
      year: "2025",
      position: "2nd",
      participants: "100+ Teams",
      color: "#FF7F3E"
    },
    {
      title: "BNB Chain Bombay Global Hackathon",
      description: "Advanced to Round 2 in a 36-hour global competition, building scalable projects under tight deadlines and intense pressure.",
      icon: IconAward,
      year: "2024",
      position: "Round 2",
      participants: "Global",
      color: "#3AB0FF"
    },
    {
      title: "Hackathon Veteran",
      description: "Participated in 6+ hackathons, demonstrating strong experience in rapid prototyping, team leadership, and delivering under pressure.",
      icon: IconFlame,
      year: "2023-2025",
      participants: "6+ Events",
      color: "#FF7F3E"
    },
    {
      title: "Open Source Contributor",
      description: "Active contributor to multiple open-source projects, collaborating with developers worldwide to improve tools and libraries.",
      icon: IconCertificate,
      year: "2024-Present",
      color: "#3AB0FF"
    }
  ];

  const stats = [
    { number: "2nd", label: "Hackathon Rank", icon: IconMedal, color: "#FF7F3E" },
    { number: "6+", label: "Hackathons", icon: IconTrophy, color: "#3AB0FF" },
    { number: "100+", label: "Teams Competed", icon: IconUsers, color: "#FF7F3E" },
    { number: "36hr", label: "Longest Hack", icon: IconClock, color: "#3AB0FF" }
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
    <section id="achievements" className="py-32 relative bg-[#F9F9F9] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#FF7F3E] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#3AB0FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Celebration Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-4xl">🏆</div>
          <div className="absolute top-20 right-20 text-3xl">⭐</div>
          <div className="absolute bottom-20 left-20 text-4xl">🚀</div>
          <div className="absolute bottom-10 right-10 text-3xl">💫</div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,127,62,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,127,62,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Heading */}
  <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
                Achievements & Highlights
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
                Showcasing my journey through hackathons, competitions, and open-source contributions that highlight my skills, creativity, and passion for technology.
            </p>
          </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.label}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.title}
              title={achievement.title}
              description={achievement.description}
              icon={achievement.icon}
              year={achievement.year}
              position={achievement.position}
              participants={achievement.participants}
              color={achievement.color}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#FF7F3E',
              color: '#FFFFFF',
              boxShadow: '0 8px 25px rgba(255, 127, 62, 0.3)'
            }}
            whileHover={{
              backgroundColor: '#FFB67B',
              boxShadow: '0 12px 35px rgba(255, 127, 62, 0.4)'
            }}
          >
            <IconRocket size={24} />
            Let's Achieve Greatness Together
            <IconTrendingUp size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}