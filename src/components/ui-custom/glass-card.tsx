'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl
        border border-white/20
        shadow-xl shadow-purple-500/10
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-50" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
}

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
}

export function GlassButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  type = 'button',
}: GlassButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white',
    secondary: 'bg-white/10 text-white border-white/20',
    outline: 'bg-transparent border-white/30 text-white hover:bg-white/10',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl font-medium
        backdrop-blur-md border
        transition-all duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export function GradientText({
  children,
  className = '',
  from = 'from-purple-400',
  via = 'via-cyan-400',
  to = 'to-purple-400',
}: GradientTextProps) {
  return (
    <span
      className={`
        bg-gradient-to-r ${from} ${via} ${to}
        bg-clip-text text-transparent
        bg-[length:200%_auto]
        animate-gradient
        ${className}
      `}
    >
      {children}
    </span>
  );
}
