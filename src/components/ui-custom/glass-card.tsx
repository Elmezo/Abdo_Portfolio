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
      whileHover={
        hover
          ? {
              y: -4,
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`
        relative rounded-2xl
        bg-white/[0.03]
        border border-white/10
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  hoverShapeMorph?: boolean;
}

export function GlassButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  type = 'button',
  hoverShapeMorph = false,
}: GlassButtonProps) {
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-500',
    secondary: 'bg-white/10 text-white border-white/20',
    outline: 'bg-transparent border-white/30 text-white hover:bg-white/10',
  };

  const shapeMorphMotion = hoverShapeMorph
    ? {
        initial: { borderRadius: '0.75rem' },
        whileHover: { borderRadius: '9999px', scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring' as const, stiffness: 380, damping: 24 },
      }
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      {...shapeMorphMotion}
      className={`
        cursor-pointer px-6 py-3 font-medium
        ${hoverShapeMorph ? '' : 'rounded-xl'}
        border
        transition-colors duration-300
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
}

export function GradientText({
  children,
  className = '',
}: GradientTextProps) {
  return (
    <span className={`text-emerald-400 ${className}`}>
      {children}
    </span>
  );
}
