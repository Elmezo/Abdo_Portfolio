'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { GradientText } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg font-bold"
          >
            <GradientText>&lt;Abdelrahman /&gt;</GradientText>
          </motion.p>

          {/* Copyright */}
          <p className="text-gray-400 text-sm flex items-center gap-1">
            © {currentYear} {profile.name}. Made with
            <Heart className="text-red-500 animate-pulse" size={14} />
            in {profile.location}
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <motion.a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
