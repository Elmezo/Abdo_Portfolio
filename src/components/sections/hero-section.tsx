'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { TypewriterEffect, FloatingElement, FadeIn } from '../ui-custom/animations';
import { GlassButton, GradientText } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';

export function HeroSection() {
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
            Available for new opportunities
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.3}>
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-purple-400 text-lg mb-4 font-medium"
          >
            Hello, I&apos;m
          </motion.p>
        </FadeIn>

        <FadeIn delay={0.4}>
          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <GradientText>{profile.name}</GradientText>
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          {/* Typewriter */}
          <div className="text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-6 h-12">
            <span className="text-gray-400">I&apos;m a </span>
            <TypewriterEffect
              words={profile.roles}
              className="text-cyan-400 font-semibold"
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          {/* Strong Tagline */}
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed font-light">
            I design{' '}
            <span className="text-purple-400 font-semibold">intelligent systems</span>,{' '}
            <span className="text-cyan-400 font-semibold">data platforms</span>, and{' '}
            <span className="text-purple-400 font-semibold">real-world automation tools</span>.
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          {/* Short bio */}
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            {profile.shortBio}
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <GlassButton
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ExternalLink className="inline-block mr-2 h-4 w-4" />
              View Projects
            </GlassButton>
            <motion.a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 rounded-xl font-medium bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all duration-300"
            >
              <Github className="inline-block mr-2 h-4 w-4" />
              GitHub Profile
            </motion.a>
            <GlassButton
              variant="outline"
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
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/50 transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FloatingElement duration={2} distance={8}>
          <motion.button
            onClick={scrollToAbout}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronDown size={32} />
          </motion.button>
        </FloatingElement>
      </div>
    </section>
  );
}
