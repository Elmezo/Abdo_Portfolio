'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, ExternalLink, Sparkles, Send } from 'lucide-react';
import { FloatingElement, FadeIn, TypewriterEffect } from '../ui-custom/animations';
import { GlassButton } from '../ui-custom/glass-card';
import { useLocale } from '@/lib/i18n/locale-provider';

type ProfileHero = {
  name: string;
  title: string;
  shortBio: string;
  heroLead?: string;
  heroStack?: string;
  resume: string;
  email: string;
  social: { github: string; linkedin: string };
};

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

const floatingBadges = [
  { label: 'AI', className: 'left-[4%] top-[24%]', duration: 6.5, delay: 0.1 },
  { label: 'Python', className: 'left-[12%] bottom-[28%]', duration: 7.5, delay: 0.8 },
  { label: 'Next.js', className: 'right-[7%] top-[26%]', duration: 8, delay: 0.35 },
  { label: 'SQL', className: 'right-[13%] bottom-[30%]', duration: 6.8, delay: 1.1 },
  { label: 'Cloud', className: 'left-[22%] top-[14%]', duration: 8.8, delay: 0.55 },
  { label: 'LLMs', className: 'right-[24%] top-[15%]', duration: 7.2, delay: 1.35 },
];

/**
 * Whole-name animation keeps one text node so Arabic/English translation
 * (or locale switch) renders correctly — never letter-split Latin names.
 */
function AnimatedName({ name, locale }: { name: string; locale: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.h1
      key={`${locale}-${name}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24, delay: 0.18 }}
      className="relative mx-auto mb-5 max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl"
    >
      <motion.span
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.035, 1], opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-x-6 top-1/2 h-20 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/20 via-cyan-400/20 to-fuchsia-500/20 blur-3xl"
      />
      <motion.span
        animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative inline-block bg-gradient-to-r from-purple-300 via-cyan-300 to-fuchsia-300 bg-[length:220%_auto] bg-clip-text text-transparent animate-gradient text-glow drop-shadow-[0_0_18px_rgba(34,211,238,0.2)]"
      >
        {name}
      </motion.span>
    </motion.h1>
  );
}

export function HeroSection() {
  const { dictionary, profile, locale } = useLocale();
  const p = profile as ProfileHero;
  const prefersReducedMotion = useReducedMotion();
  const heroLead = p.heroLead ?? p.shortBio;
  const heroStack = p.heroStack ?? 'Next.js · React · Python · SQL · cloud';
  const typewriterWords = dictionary.hero.typewriter;

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_50%)]" />

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

      <div aria-hidden="true" className="absolute inset-0 hidden md:block">
        {floatingBadges.map((badge) => (
          <motion.div
            key={badge.label}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -18, 0],
                    x: [0, badge.label.length % 2 ? 10 : -10, 0],
                    rotate: [0, badge.label.length % 2 ? 4 : -4, 0],
                  }
            }
            transition={{ duration: badge.duration, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
            className={`absolute rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.16)] backdrop-blur-md ${badge.className}`}
          >
            {badge.label}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <FadeIn delay={0.1}>
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
            {dictionary.hero.badge}
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-purple-300 text-lg sm:text-xl mb-3 font-medium"
          >
            {dictionary.hero.greeting}
          </motion.p>
        </FadeIn>

        <AnimatedName name={p.name} locale={locale} />

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
          <motion.p variants={fadeUp} className="text-xs sm:text-sm md:text-base text-gray-300 tracking-wide" dir="ltr">
            {heroStack}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mx-auto inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)]"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            <span className="shrink-0 text-gray-300">{dictionary.hero.iBuild}</span>
            <TypewriterEffect
              key={locale}
              words={typewriterWords}
              typingSpeed={75}
              deletingSpeed={36}
              pauseDuration={1300}
              className="font-semibold text-white"
            />
          </motion.div>
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
            {dictionary.hero.contactMe}
          </motion.a>
          <motion.div variants={ctaItem}>
            <GlassButton
              className="inline-flex min-h-[48px] items-center justify-center"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ExternalLink className={`inline-block h-4 w-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {dictionary.hero.viewCaseStudies}
            </GlassButton>
          </motion.div>
          <motion.div variants={ctaItem}>
            <motion.a
              href={p.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl font-medium bg-white/10 border border-white/25 text-white hover:bg-white/15 transition-all duration-300"
            >
              <Github className={`inline-block h-4 w-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {dictionary.hero.githubProfile}
            </motion.a>
          </motion.div>
          <motion.div variants={ctaItem}>
            <GlassButton
              variant="outline"
              hoverShapeMorph
              className="inline-flex min-h-[48px] items-center justify-center"
              onClick={() => window.open(p.resume, '_blank')}
            >
              <Download className={`inline-block h-4 w-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {dictionary.hero.downloadCv}
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
              href={p.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              variants={ctaItem}
              href={p.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              variants={ctaItem}
              href={`mailto:${p.email}`}
              aria-label="Email"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </FadeIn>

        <FloatingElement duration={2} distance={8}>
          <motion.button
            type="button"
            aria-label={dictionary.hero.scrollToAbout}
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
