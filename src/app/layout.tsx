import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdelrahman Alaa | AI & Software Engineer",
  description:
    "AI and software engineer with 2 years building ERP LLM assistants (Python), enterprise data governance (BUDG / Java, Elasticsearch), and modern frontends with Next.js and React. AWS, Azure, SQL.",
  keywords: [
    "AI Engineer",
    "Software Engineer",
    "Data Scientist",
    "AI Developer",
    "Python",
    "LLM",
    "RAG",
    "ERP",
    "Java",
    "Next.js",
    "React",
    "Elasticsearch",
    "Data Governance",
    "Machine Learning",
    "AWS",
    "Azure",
    "Full-Stack Developer",
    "UAE",
  ],
  authors: [{ name: "Abdelrahman Alaa" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Abdelrahman Alaa | AI & Software Engineer",
    description: "Intelligent data systems, LLM assistants, and production backends.",
    url: "https://abdelrahman-alaa.dev",
    siteName: "Abdelrahman Alaa Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Alaa | AI & Software Engineer",
    description: "Intelligent data systems, LLM assistants, and production backends.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Keep the English portfolio literal — Chrome auto-translate (common on
  // Arabic-locale phones) rewrites React text nodes and crashes the client.
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      translate="no"
      suppressHydrationWarning
      className="dark notranslate"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} notranslate antialiased bg-slate-950 text-white`}
        style={{ direction: "ltr", unicodeBidi: "isolate" }}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
