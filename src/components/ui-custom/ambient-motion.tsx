'use client';

import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const floatingAccents = [
  {
    className: 'left-[6%] top-[18%] h-24 w-24 border-purple-400/25',
    animate: { x: [0, 26, -14, 0], y: [0, -36, 18, 0], rotate: [0, 14, -8, 0] },
    duration: 16,
  },
  {
    className: 'right-[8%] top-[28%] h-16 w-16 border-cyan-300/25',
    animate: { x: [0, -34, 12, 0], y: [0, 24, -20, 0], rotate: [0, -18, 10, 0] },
    duration: 18,
  },
  {
    className: 'bottom-[18%] left-[14%] h-20 w-20 border-fuchsia-300/20',
    animate: { x: [0, 22, -28, 0], y: [0, -18, 28, 0], rotate: [0, 22, -12, 0] },
    duration: 20,
  },
  {
    className: 'bottom-[12%] right-[18%] h-28 w-28 border-sky-300/20',
    animate: { x: [0, -18, 30, 0], y: [0, 34, -18, 0], rotate: [0, -10, 16, 0] },
    duration: 22,
  },
];

export function AmbientMotion() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const mouseX = useMotionValue(-240);
  const mouseY = useMotionValue(-240);
  const smoothMouseX = useSpring(mouseX, { stiffness: 70, damping: 24, mass: 0.6 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 70, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX - 112);
      mouseY.set(event.clientY - 112);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className="fixed left-0 top-0 z-[130] h-1 w-full origin-left bg-gradient-to-r from-purple-500 via-cyan-400 to-fuchsia-500 shadow-[0_0_22px_rgba(34,211,238,0.55)]"
      />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <motion.div
          style={prefersReducedMotion ? undefined : { rotate: scrollRotate, y: scrollY }}
          className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/10 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(168,85,247,0.08),rgba(34,211,238,0.08),transparent,rgba(168,85,247,0.08))] blur-[1px]"
        />

        <motion.div
          style={prefersReducedMotion ? undefined : { x: smoothMouseX, y: smoothMouseY }}
          className="absolute hidden h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl md:block"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

        {!prefersReducedMotion &&
          floatingAccents.map((accent) => (
            <motion.div
              key={accent.className}
              animate={accent.animate}
              transition={{ duration: accent.duration, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute rounded-[2rem] border bg-white/[0.015] shadow-[0_0_40px_rgba(168,85,247,0.12)] ${accent.className}`}
            />
          ))}
      </div>
    </>
  );
}
