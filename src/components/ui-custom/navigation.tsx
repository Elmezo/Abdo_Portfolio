'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GradientText } from '../ui-custom/glass-card';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'GitHub', href: '#github' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [...navItems].reverse().map((item) => item.href.slice(1));

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const mq = window.matchMedia('(min-width: 768px)');
    if (mq.matches) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => {
      if (mq.matches) setIsOpen(false);
    };
    mq.addEventListener('change', closeOnDesktop);
    return () => mq.removeEventListener('change', closeOnDesktop);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.startsWith('#') ? href.slice(1) : href;
    const element = document.getElementById(id);
    setIsOpen(false);

    if (!element) return;

    const scroll = () => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    };

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    // Let the drawer close / layout settle (iOS Safari is picky here)
    if (isMobile) {
      window.setTimeout(scroll, 120);
    } else {
      scroll();
    }
  };

  return (
    <motion.nav
      style={{
        backdropFilter: `blur(${blur}px)`,
      }}
      className={`fixed top-0 left-0 right-0 isolate px-4 py-4 ${
        isOpen ? 'z-[110]' : 'z-[70]'
      }`}
    >
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[5] md:hidden bg-slate-950/70 backdrop-blur-sm"
        />
      )}

      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="pointer-events-none absolute inset-0 z-0 bg-slate-950/80 border-b border-white/10"
      />

      <div className="relative z-20 max-w-7xl mx-auto flex items-center justify-between">
        <motion.button
          type="button"
          onClick={() => scrollToSection('#home')}
          whileHover={{ scale: 1.05 }}
          className="relative z-30 text-2xl font-bold touch-manipulation notranslate"
          lang="en"
          dir="ltr"
          translate="no"
        >
          <GradientText>&lt;Abdelrahman /&gt;</GradientText>
        </motion.button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              type="button"
              onClick={() => scrollToSection(item.href)}
              whileHover={{ scale: 1.1 }}
              className={`relative text-sm font-medium transition-colors ${
                activeSection === item.href.slice(1)
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.name}
              {activeSection === item.href.slice(1) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                />
              )}
            </motion.button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-30 md:hidden text-white p-2 touch-manipulation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className={`relative z-30 md:hidden ${
          isOpen
            ? 'pointer-events-auto max-h-[min(72dvh,calc(100dvh-5.5rem))] overflow-y-auto overflow-x-hidden'
            : 'pointer-events-none overflow-hidden'
        }`}
      >
        <div className="relative pt-4 pb-2 space-y-2">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`relative z-10 block w-full text-left px-4 py-3 rounded-lg text-base transition-colors touch-manipulation ${
                activeSection === item.href.slice(1)
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white active:bg-white/10'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
