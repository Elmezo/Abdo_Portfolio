'use client';

import { Navigation } from '@/components/ui-custom/navigation';
import { ParticleBackground } from '@/components/ui-custom/particle-background';
import { AmbientMotion } from '@/components/ui-custom/ambient-motion';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { CaseStudiesSection } from '@/components/sections/case-studies-section';
import { GitHubSection } from '@/components/sections/github-section';
import { ContactSection } from '@/components/sections/contact-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      <AmbientMotion />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <GitHubSection />
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
