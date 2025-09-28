import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster for toasts
import Script from "next/script";
import { Footer } from "@/components/Footer"
import "./globals.css";
import FloatingNav from "@/components/floating-nav"; // Corrected import to default

export const metadata: Metadata = {
  title:
    "Dhananjay Kakade — Software Engineer (Node.js, React, Prisma, Docker)",
  description:
    "Portfolio of Dhananjay Kakade, Software Development Engineer skilled in backend engineering, microservices, and AI-integrated apps.",
  keywords: [
    "Dhananjay Kakade",
    "dhananjaykakade",
    "dhananajaykakde",
    "Software Engineer",
    "Full Stack Developer",
    "frontend developer",
    "Backend Developer Pune",
    "Node.js Engineer",
    "Prisma",
    "Docker",
    "Software Portfolio",
    "dhananjaykakade.tech",
    "Software Engineer",
    "Full Stack Developer",
    "Microservices",
    "Web Development",
    "Software Engineer Pune",
    "Software Development Engineer",
    "Software Engineer India",
    "Software Engineer Pune",
    "Software Engineer India",
    "Software Engineer Portfolio",
    "Software Engineer Resume",
    "Software Engineer CV",
    "Software Engineer Projects",
    "Software Engineer Skills",
    "Software Engineer Experience",
    "Software Engineer Education",
    "Software Engineer Contact",
    "Software Engineer About Me",
    "Software Engineer Contact",
    "dhananjaykakade",
    "dhananjaykakade.tech",
    "Dhananjay Kakade Portfolio",
    "Dhananjay Kakade Resume",
    "Dhananjay Kakade CV",
    "Dhananjay Kakade Projects",
    "Dhananjay Kakade Skills",
    "Dhananjay Kakade Experience",
    "Dhananjay Kakade Education",
    "Dhananjay Kakade Contact",
    "Dhananjay Kakade About Me",
    "Dhananjay Kakade Contact",
    "Dhananjay Kakade Software Engineer",
    "Dhananjay Kakade Full Stack Developer",
    "Dhananjay Kakade Backend Developer",
    "Dhananjay Kakade Node.js Engineer",
    "Web Developer Pune",
    "Web Developer India",
    "Web Developer Portfolio",
    "Web Developer Resume",
    "Web Developer CV",
    "Web Developer Projects",
    "Web Developer Skills",
    "Web Developer Experience",
    "Web Developer Education",
    "MES IMCC Pune alumni",
    "MES Institute of Management and Career Courses student",
    "MES IMCC Pune student",
    "Modern college Pune alumni",
    "Modern college Pune student",
    "Modern college of Arts Science and Commerce Pune alumni",
    "Modern college of Arts Science and Commerce Pune student",
    "",
  ],
  alternates: {
    canonical: "https://dhananjaykakade.tech",
  },
  icons: {
    icon: "/favicon.ico", // Link to the new favicon
  },
  openGraph: {
    title:
      "Dhananjay Kakade — Software Engineer (Node.js, React, Prisma, Docker)",
    description:
      "Portfolio of Dhananjay Kakade, Software Development Engineer skilled in backend engineering, microservices, and AI-integrated apps.",
    url: "https://dhananjaykakade.tech",
    siteName: "Dhananjay Kakade",
    images: [
      {
        url: "/dk.png", // Link to the new OG image
        width: 1200,
        height: 630,
        alt: "Dhananjay Kakade Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dhananjay Kakade — Software Engineer (Node.js, React, Prisma, Docker)",
    description:
      "Portfolio of Dhananjay Kakade, Software Development Engineer skilled in backend engineering, microservices, and AI-integrated apps.",
    images: ["/og-image.png"], // Link
    creator: "@dhananjaykakade",
  },
  robots: {
  index: true,
  follow: true,
  nocache: false,
},
authors: [
    {
      name: "Dhananjay Kakade",
      url: "https://dhananjaykakade.tech",
    },
  ],
  creator: "Dhananjay Kakade",
  applicationName: "Dhananjay Kakade Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="CS0_YCpM6cAq7DQRdKZBIBHo0IpZAe1zOZFEgwOAqBw" />
        {/* add google analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QWWPY6H4GS"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QWWPY6H4GS');
            `,
          }}
        />
        <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Dhananjay Kakade",
      url: "https://dhananjaykakade.tech",
      image: "https://dhananjaykakade.tech/dk.png",
      sameAs: [
        "https://github.com/dhananjaykakade",
        "https://www.linkedin.com/in/dhananjay-kakade-657087294/",
       
      ],
      jobTitle: "Software Development Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Your Company or Freelancer",
      },
    }),
  }}
/>

      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default to dark theme as requested
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav />
          {children}
          <Footer />
          <Toaster /> {/* Add Toaster component */}
        </ThemeProvider>
      </body>
    </html>
  );
}
