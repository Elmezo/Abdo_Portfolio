import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { SkipLink } from "@/components/ui-custom/skip-link";
import { TRANSLATE_GUARD_INLINE_SCRIPT } from "@/lib/i18n/react-translate-guard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
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
    "عبدالرحمن",
    "مهندس ذكاء اصطناعي",
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
    alternateLocale: ["ar_SA"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} antialiased bg-slate-950 text-white`}
        suppressHydrationWarning
      >
        {/* First body node: blocking inline patch before any React tree. */}
        <script
          id="portfolio-translate-guard"
          dangerouslySetInnerHTML={{ __html: TRANSLATE_GUARD_INLINE_SCRIPT }}
        />
        <LocaleProvider>
          <SkipLink />
          {children}
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
