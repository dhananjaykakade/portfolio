import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dhananjay Kakade | Backend-Focused Full-Stack Developer",
  description:
    "Portfolio of Dhananjay Kakade, a backend-focused full-stack developer specializing in scalable, secure & smart web systems.",
  applicationName: "Dhananjay Kakade Portfolio",
  generator: "Next.js",
  keywords: [
    "Dhananjay Kakade",
    "Portfolio",
    "Backend Developer",
    "Full-Stack Developer",
    "Web Developer",
    "Software Engineer",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React",
    "Next.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "GraphQL",
    "REST API",
    "Web Applications",
    "Cloud Computing",
    "Docker",
    "AWS",
    "Vercel",
    "DevOps",
    "Agile",
    "Scrum",
    "MCA",
    "Computer Science",
  ],
  themeColor: "#000000",
  colorScheme: "dark",
  icons: {
    icon: "/d.png",
    apple: "/d.png",
  },
  authors: [
    {
      name: "Dhananjay Kakade",
      url: "https://dhananjay-kakade.vercel.app/",
    },
  ],
  creator: "Dhananjay Kakade",
  publisher: "Dhananjay Kakade",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dhananjay-kakade.vercel.app/",
    siteName: "Dhananjay Kakade Portfolio",
    title: "Dhananjay Kakade | Backend-Focused Full-Stack Developer",
    description:
      "Explore the work and skills of Dhananjay Kakade, a backend-focused full-stack developer building scalable web applications.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dhananjay Kakade Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dhananjay_kakade", // Optional: replace with actual Twitter handle
    creator: "@dhananjay_kakade",
    title: "Dhananjay Kakade | Backend-Focused Full-Stack Developer",
    description:
      "Explore Dhananjay Kakade's portfolio – scalable web systems, backend expertise, and cloud-native full-stack development.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  
  alternates: {
    canonical: "https://dhananjay-kakade.vercel.app/",
    languages: {
      "en-IN": "https://dhananjay-kakade.vercel.app/",
      "en-US": "https://dhananjay-kakade.vercel.app/",
    },
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
