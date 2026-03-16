'use client';

import { Navigation } from '@/components/ui-custom/navigation';
import { ParticleBackground } from '@/components/ui-custom/particle-background';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { GitHubSection } from '@/components/sections/github-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <GitHubSection />
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
