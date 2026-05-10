'use client';

import { motion, type Variants } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, ExternalLink, Sparkles, Send } from 'lucide-react';
import { FloatingElement, FadeIn } from '../ui-custom/animations';
import { GlassButton, GradientText } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';

type ProfileHero = typeof profile & { heroLead?: string; heroStack?: string };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const staggerWrap: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.52 },
  },
};

const ctaStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.85 },
  },
};

const socialStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const ctaItem: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 340, damping: 22 },
  },
};

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
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8"
          >
            <motion.span
              animate={{ rotate: [0, 14, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <Sparkles size={14} className="text-purple-400" />
            </motion.span>
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

        <motion.div
          className="max-w-3xl mx-auto mb-8 md:mb-10 space-y-3 md:space-y-4"
          variants={staggerWrap}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-white leading-snug tracking-tight">
            {p.title}
          </motion.p>
          <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            {heroLead}
          </motion.p>
          <motion.p variants={fadeUp} className="text-xs sm:text-sm md:text-base text-gray-300 tracking-wide">
            {heroStack}
          </motion.p>
        </motion.div>

        <FadeIn delay={0.7}>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
            {p.shortBio}
          </p>
        </FadeIn>

        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-14"
          variants={ctaStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            variants={ctaItem}
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 transition-shadow duration-300 border border-white/10"
          >
            <Send className="shrink-0" size={20} />
            Contact me
          </motion.a>
          <motion.div variants={ctaItem}>
            <GlassButton
              className="inline-flex min-h-[48px] items-center justify-center"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ExternalLink className="inline-block mr-2 h-4 w-4" />
              View case studies
            </GlassButton>
          </motion.div>
          <motion.div variants={ctaItem}>
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
          </motion.div>
          <motion.div variants={ctaItem}>
            <GlassButton
              variant="outline"
              hoverShapeMorph
              className="inline-flex min-h-[48px] items-center justify-center"
              onClick={() => window.open(profile.resume, '_blank')}
            >
              <Download className="inline-block mr-2 h-4 w-4" />
              Download CV
            </GlassButton>
          </motion.div>
        </motion.div>

        <FadeIn delay={1.05}>
          <motion.div
            className="flex justify-center gap-6"
            variants={socialStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              variants={ctaItem}
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              variants={ctaItem}
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              variants={ctaItem}
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </FadeIn>

        {/* Scroll indicator */}
        <FloatingElement duration={2} distance={8}>
          <motion.button
            type="button"
            aria-label="Scroll to about section"
            onClick={scrollToAbout}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 hover:text-white transition-colors"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <ChevronDown size={32} />
            </motion.span>
          </motion.button>
        </FloatingElement>
      </div>
    </section>
  );
}
