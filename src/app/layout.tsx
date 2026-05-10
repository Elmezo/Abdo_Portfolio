import type { Metadata } from "next";
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
  title: "Abdelrahman Alaa | Software Engineer & Data Scientist",
  description: "Software Engineer and Data Scientist with 2 years of experience, including enterprise data governance on BUDG (Java, Elasticsearch, MySQL) at Bussma. Python, SQL, AWS, Azure, and ML for scalable data platforms.",
  keywords: ["Software Engineer", "Data Scientist", "Python", "Java", "Elasticsearch", "Data Governance", "Machine Learning", "AWS", "Azure", "Full-Stack Developer", "UAE"],
  authors: [{ name: "Abdelrahman Alaa" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Abdelrahman Alaa | Software Engineer & Data Scientist",
    description: "Building scalable data-driven systems and transforming data into business value",
    url: "https://abdelrahman-alaa.dev",
    siteName: "Abdelrahman Alaa Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Alaa | Software Engineer & Data Scientist",
    description: "Building scalable data-driven systems and transforming data into business value",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
