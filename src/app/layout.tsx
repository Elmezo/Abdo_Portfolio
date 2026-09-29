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
  metadataBase: new URL('https://abdo-portfolio-eta.vercel.app'),
  title: "Abdelrahman Alaa | AI & Software Engineer",
  description:
    "AI & Software Engineer building ERP LLM assistants, enterprise data governance platforms, and full-stack products. Python, Java, Next.js, React, AWS, Azure.",
  keywords: [
    "AI Engineer",
    "Software Engineer",
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
    "عبدالرحمن",
    "مهندس ذكاء اصطناعي",
  ],
  authors: [{ name: "Abdelrahman Alaa" }],
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: ["/logo.svg"],
    apple: [{ url: "/logo.svg" }],
  },
  openGraph: {
    title: "Abdelrahman Alaa | AI & Software Engineer",
    description: "AI & Software Engineer building ERP LLM assistants, enterprise data governance platforms, and full-stack products.",
    url: "https://abdo-portfolio-eta.vercel.app",
    siteName: "Abdelrahman Alaa Portfolio",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Alaa | AI & Software Engineer",
    description: "AI & Software Engineer building ERP LLM assistants, enterprise data governance platforms, and full-stack products.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Prevent Chrome auto-translate from rewriting React DOM (causes removeChild crash).
  // Arabic is available via the in-app EN | ع toggle and auto-detect.
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} notranslate antialiased bg-slate-950 text-white`}
        suppressHydrationWarning
      >
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
