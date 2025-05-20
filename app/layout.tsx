import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dhananjay Kakade | Backend-Focused Full-Stack Developer",
  description:
    "Portfolio of Dhananjay Kakade, a backend-focused full-stack developer specializing in scalable, secure & smart web systems.",
  keywords: [
    "Dhananjay Kakade",
    "Backend Developer",
    "Full-Stack Developer",
    "Web Developer",
    "Portfolio",
    "Software Engineer",
    "Web Systems",
    "Scalable",
    "Secure",
    "Smart",
    "Web Applications",
    "Web Development",
    "Software Development",
    "Programming",]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          {children}
        
      </body>
    </html>
  )
}
