'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { GradientText } from '../ui-custom/glass-card';
import { useLocale } from '@/lib/i18n/locale-provider';

export function Footer() {
  const { dictionary, profile } = useLocale();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: dictionary.nav.about, id: 'about' },
    { label: dictionary.nav.skills, id: 'skills' },
    { label: dictionary.nav.projects, id: 'projects' },
    { label: dictionary.nav.caseStudies, id: 'case-studies' },
    { label: dictionary.nav.contact, id: 'contact' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl font-bold mb-3"
            >
              <GradientText>{dictionary.brand}</GradientText>
            </motion.p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {dictionary.footer.blurb}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {dictionary.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {dictionary.footer.connect}
            </h4>
            <div className="flex gap-3">
              <motion.a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/50 transition-colors"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.15, y: -3 }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors"
              >
                <Mail size={18} />
              </motion.a>
            </div>
            <p className="text-gray-500 text-xs mt-4" dir="ltr">
              {profile.email}
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1.5 flex-wrap justify-center">
            © {currentYear} {profile.name}. {dictionary.footer.madeWith}
            <Heart className="text-red-500 animate-pulse" size={13} />
            {dictionary.footer.in} {profile.location}
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/40 transition-colors text-sm"
          >
            <ArrowUp size={14} />
            {dictionary.footer.backToTop}
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
