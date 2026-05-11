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
              y: -7,
              scale: 1.025,
              boxShadow: '0 24px 70px rgba(139, 92, 246, 0.22)',
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`
        group/glass relative isolate overflow-hidden rounded-2xl
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl
        border border-white/20
        shadow-xl shadow-purple-500/10
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-50" />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-24 bg-[conic-gradient(from_180deg,transparent,rgba(168,85,247,0.16),rgba(34,211,238,0.14),transparent_35%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover/glass:opacity-100"
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Shine effect */}
      <motion.div
        aria-hidden="true"
        animate={{ x: ['-120%', '120%'] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.8 }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/glass:opacity-100"
      />
    </motion.div>
  );
}

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  /** Animate border from rounded rect to pill on hover */
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
    primary: 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white',
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
        backdrop-blur-md border
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
