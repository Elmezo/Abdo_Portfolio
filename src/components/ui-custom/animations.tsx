'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useEffect, useRef, ReactNode, useState } from 'react';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 26,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 320, damping: 26 },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScaleIn({ children, delay = 0, className = '' }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({
  children,
  scale = 1.05,
  className = '',
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Staggered reveal for section headers and short lists */
export const sectionRevealParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.02 },
  },
};

export const sectionRevealChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 26 },
  },
};

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      className={`text-center mb-12 md:mb-16 ${className}`}
      variants={sectionRevealParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {eyebrow ? (
        <motion.div variants={sectionRevealChild} className="mb-5 flex justify-center">
          {eyebrow}
        </motion.div>
      ) : null}
      <motion.h2
        variants={sectionRevealChild}
        className="mb-3 text-3xl font-bold text-white sm:text-4xl md:mb-4 md:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.div variants={sectionRevealChild} className="mx-auto mb-2 max-w-2xl px-2">
          {description}
        </motion.div>
      ) : null}
      <motion.div
        variants={sectionRevealChild}
        className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
      />
    </motion.div>
  );
}

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  /** Cursor bar; default uses currentColor (fine for solid text). Use a gradient-friendly cursor when text is `bg-clip-text`. */
  cursorClassName?: string;
}

export function TypewriterEffect({
  words,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  cursorClassName,
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[currentWordIndex] ?? '';

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  const cursor =
    cursorClassName ??
    'inline-block w-[3px] h-[1em] bg-current ml-1 align-middle rounded-sm';

  if (!words.length) {
    return null;
  }

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className={cursor}
      />
    </span>
  );
}

interface JsxTagTypewriterProps {
  /** Strings cycled by the typewriter (e.g. first name, full name). */
  words: string[];
  bracketClassName?: string;
  nameClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

/** Hero-style `<Name />` with monospace brackets and a typing cursor on the identifier only. */
export function JsxTagTypewriter({
  words,
  bracketClassName = 'font-mono font-normal text-purple-400/85 md:text-[0.92em] tracking-tight select-none',
  nameClassName =
    'bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-bold min-w-[0.5ch]',
  typingSpeed = 95,
  deletingSpeed = 48,
  pauseDuration = 2200,
}: JsxTagTypewriterProps) {
  return (
    <span className="inline-flex max-w-full flex-wrap items-baseline justify-center gap-x-[0.15em] gap-y-1">
      <span className={bracketClassName} aria-hidden>
        {'<'}
      </span>
      <TypewriterEffect
        words={words}
        className={nameClassName}
        typingSpeed={typingSpeed}
        deletingSpeed={deletingSpeed}
        pauseDuration={pauseDuration}
        cursorClassName="inline-block w-[3px] h-[1em] ml-1 align-middle rounded-sm bg-gradient-to-b from-purple-400 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.45)]"
      />
      <span className={bracketClassName} aria-hidden>
        {'/>'}
      </span>
    </span>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FloatingElement({
  children,
  duration = 3,
  distance = 10,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface GlowEffectProps {
  children: ReactNode;
  className?: string;
}

export function GlowEffect({ children, className = '' }: GlowEffectProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
      }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
