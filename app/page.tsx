import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import FloatingNav from "@/components/floating-nav" // Corrected import to default
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { Achievements } from "@/components/achievements"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 mt-4">
                <span className="relative z-10">Software Development Engineer</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-white/20 animate-pulse"></span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">
                Dhananjay Kakade
              </span>
            </h1>
            <p className="text-xl text-zinc-200 max-w-[600px]">Specializing in Scalable Systems & Cloud-native Apps.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="relative overflow-hidden group bg-red-500 border-0">
                <span className="relative z-10 flex items-center">
                  <Link href="/#projects" className="flex items-center">
                  Explore Projects{" "}
                  </Link>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-red-500 hover:text-white hover:border-zinc-500 bg-transparent"
              >
                <a href="/dhananjay_kakade_sde.pdf" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
            </div>
            <div className="flex gap-4 pt-4">
              <Link href="https://github.com/dhananjaykakade" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/in/dhananjay-kakade-657087294/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="mailto:kakadedhananjay59@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <CreativeHero />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="About Me" subtitle="My background and journey" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-red-500/20 to-white/20 blur-xl opacity-70"></div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <img
                  src="/dk.png"
                  alt="Dhananjay Kakade"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassmorphicCard>
                <p className="text-lg text-zinc-200">
                  I'm a passionate backend-focused developer from Pune, India. Currently pursuing MCA at IMCC. I'm
                  skilled in building efficient, scalable APIs, real-time systems, and optimizing performance across web
                  platforms.
                </p>
                <p className="text-lg text-zinc-200 mt-4">
                  I have a proven ability to reduce API response times and frontend load delays. My journey includes
                  being a hackathon winner, an open-source contributor, and a team leader.
                </p>
                <p className="text-lg text-zinc-200 mt-4">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  and staying up-to-date with the latest industry trends.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-400">Name</div>
                    <div className="font-medium">Dhananjay Kakade</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-400">Email</div>
                    <div className="font-medium break-all">kakadedhananjay59@gmail.com</div>

                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-400">Phone</div>
                    <div className="font-medium">+91 95529 35559</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-400">Location</div>
                    <div className="font-medium">Pune, India</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-400">Availability</div>
                    <div className="font-medium text-green-500">Open to opportunities</div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                    <a href="/Dhananjay_Kakade_sde.pdf" download>
                      Download Resume
                    </a>
                  </Button>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="My Skills" subtitle="Technologies I work with" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            {/* Advanced */}
            <SkillBadge name="JavaScript" level={95} />
            <SkillBadge name="React" level={90} />
            <SkillBadge name="Node.js" level={95} />
            <SkillBadge name="MongoDB" level={90} />
            <SkillBadge name="PostgreSQL" level={85} />
            <SkillBadge name="Prisma ORM" level={85} />
            <SkillBadge name="Docker" level={80} />

            {/* Intermediate */}
            <SkillBadge name="Python" level={75} />
            <SkillBadge name="Redux" level={70} />
            <SkillBadge name="Redis" level={65} />
            <SkillBadge name="Go (Gin)" level={60} />
            <SkillBadge name="Tailwind CSS" level={80} />

            {/* Fundamentals */}
            <SkillBadge name="OOP" level={90} />
            <SkillBadge name="DSA" level={85} />
            <SkillBadge name="Linux" level={70} />
            <SkillBadge name="RDBMS" level={80} />
            <SkillBadge name="Networking" level={70} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <ProjectCard
              title="Evolve AI"
              description="AI Grading system with Gemini API. Handles 100+ concurrent submissions with 60% faster evaluation."
              tags={["Node.js", "Prisma", "Gemini AI", "Docker"]}
              image="/evolve.png"
              demoUrl="#" // No live demo provided
              repoUrl="https://github.com/dhananjaykakade/evolve-ai-updated"
            />
            <ProjectCard
              title="Interaction 24"
              description="Event registration platform for 600+ users. Optimized backend, used Nginx reverse proxy for load balancing."
              tags={["Node.js", "Docker", "Nginx", "MongoDB"]}
              image="/interaction.png"
              demoUrl="#" // No live demo provided
              repoUrl="https://github.com/interactors2025/production-interaction25/"
            />
            <ProjectCard
              title="Trinity Courses"
              description="Online course-selling platform with secure payment and authentication. Live users: 20+"
              tags={["Next.js 14", "Supabase", "Razorpay"]}
              image="/course.png"
              demoUrl="https://courses.trinityconsultancy.tech/"
              repoUrl="#" // No repo provided
            />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        <div className="container relative z-10">
          <SectionHeading title="Achievements" subtitle="My notable accomplishments" />
          <div className="mt-16">
            <Achievements />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's build something together!" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">Email</div>
                    <div className="font-medium text-zinc-200">kakadedhananjay59@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">LinkedIn</div>
                    <div className="font-medium text-zinc-200">linkedin.com/in/dhananjay-kakade-657087294/</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Github className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">GitHub</div>
                    <div className="font-medium text-zinc-200">github.com/dhananjaykakade</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-xl text-red-500">+91</span>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">Phone</div>
                    <div className="font-medium text-zinc-200">+91 95529 35559</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-zinc-200">Available for freelance work and full-time opportunities</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">Dhananjay</span>
              <span className="text-white">Kakade</span>
            </Link>
            <p className="text-sm text-zinc-400 mt-2">
              © {new Date().getFullYear()} Dhananjay Kakade. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/dhananjaykakade" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/dhananjay-kakade-657087294/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:kakadedhananjay59@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
