"use client"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { Award, Users, GraduationCap } from "lucide-react"

const achievementsList = [
  {
    icon: Award,
    title: "2nd Place, GDG InnoVyuh Hackathon 2025",
    description: "Awarded for developing an innovative AI Grading System.",
    // Add a link if available
    link: "https://drive.google.com/file/d/1_farIUF-VYFH8Gmk3r25a_fE6dHoiIhQ/view?usp=sharing"
  },
  {
    icon: Users,
    title: "Core Lead for 'Interaction 24' Fest",
    description: "Successfully managed and served 600+ participants during a 3-day fest.",
    link:"https://drive.google.com/file/d/1ACRaRTTHD-uLrFlBLk1DxUDlYkCJ6-7L/view?usp=sharing"
  },
  {
    icon: GraduationCap,
    title: "Ranked in Top 3% (IMCC)",
    description: "Achieved top academic performance during my Master of Computer Applications.",
    link:'#achievements' // Link to the Achievements section
  },
  {
    icon: GraduationCap,
    title: "Ranked in Top 5% (Modern College)",
    description: "Maintained excellent academic standing during my Bachelor of Computer Applications.",
    link:'#achievements' // Link to the Achievements section
  },
]

export function Achievements() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {achievementsList.map((achievement, index) => (
        <GlassmorphicCard key={index}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <achievement.icon className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
              <p className="text-zinc-200">{achievement.description}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={achievement.link}
              className="text-red-500 hover:text-red-400 "
              onClick={(e) => {
                e.preventDefault();
                window.open(achievement.link, "_blank", "noopener,noreferrer");}}
            >
              View 
            </a>
          </div>
        </GlassmorphicCard>
      ))}
    </div>
  )
}
