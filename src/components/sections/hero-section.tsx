'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, ExternalLink, Sparkles, Send } from 'lucide-react';
import { FloatingElement, FadeIn } from '../ui-custom/animations';
import { GlassButton, GradientText } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';

type ProfileHero = typeof profile & { heroLead?: string; heroStack?: string };

export function HeroSection() {
  const p = profile as ProfileHero;
  const heroLead = p.heroLead ?? p.shortBio;
  const heroStack = p.heroStack ?? 'Next.js · React · Python · SQL · cloud';

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
      
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_50%)]" />

      {/* Animated Orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <FadeIn delay={0.1}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8"
          >
            <Sparkles size={14} className="text-purple-400" />
            Internships · remote roles · freelance
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.3}>
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-purple-300 text-lg sm:text-xl mb-3 font-medium"
          >
            Hello, I&apos;m
          </motion.p>
        </FadeIn>

        <FadeIn delay={0.4}>
          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-5 md:mb-6 tracking-tight">
            <GradientText>{profile.name}</GradientText>
          </h1>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div className="max-w-3xl mx-auto mb-8 md:mb-10 space-y-3 md:space-y-4">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-white leading-snug tracking-tight">
              {p.title}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              {heroLead}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 tracking-wide">{heroStack}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.75}>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
            {p.shortBio}
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-14">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 transition-shadow duration-300 border border-white/10"
            >
              <Send className="shrink-0" size={20} />
              Contact me
            </motion.a>
            <GlassButton
              className="inline-flex min-h-[48px] items-center justify-center"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ExternalLink className="inline-block mr-2 h-4 w-4" />
              View case studies
            </GlassButton>
            <motion.a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl font-medium bg-white/10 border border-white/25 text-white hover:bg-white/15 transition-all duration-300"
            >
              <Github className="inline-block mr-2 h-4 w-4" />
              GitHub Profile
            </motion.a>
            <GlassButton
              variant="outline"
              hoverShapeMorph
              className="inline-flex min-h-[48px] items-center justify-center"
              onClick={() => window.open(profile.resume, '_blank')}
            >
              <Download className="inline-block mr-2 h-4 w-4" />
              Download CV
            </GlassButton>
          </div>
        </FadeIn>

        <FadeIn delay={1.2}>
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <motion.a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              whileHover={{ scale: 1.2, y: -5 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              whileHover={{ scale: 1.2, y: -5 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              whileHover={{ scale: 1.2, y: -5 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FloatingElement duration={2} distance={8}>
          <motion.button
            type="button"
            aria-label="Scroll to about section"
            onClick={scrollToAbout}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 hover:text-white transition-colors"
          >
            <ChevronDown size={32} />
          </motion.button>
        </FloatingElement>
      </div>
    </section>
  );
}
