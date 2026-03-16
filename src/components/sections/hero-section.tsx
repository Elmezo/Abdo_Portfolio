'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <FadeIn delay={0.2}>
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-purple-400 text-lg mb-4 font-medium"
          >
            Hello, I'm
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
          <div className="text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 h-12">
            <span className="text-gray-400">I'm a </span>
            <TypewriterEffect
              words={profile.roles}
              className="text-cyan-400 font-semibold"
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          {/* Short bio */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            {profile.shortBio}
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <GlassButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="inline-block mr-2 h-4 w-4" />
              Get In Touch
            </GlassButton>
            <GlassButton variant="outline">
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
