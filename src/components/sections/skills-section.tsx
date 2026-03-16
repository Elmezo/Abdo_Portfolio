'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Brain, BarChart3, Cloud, Database, Wrench } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GradientText } from '../ui-custom/glass-card';
import skills from '../../../content/skills.json';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Code,
  Brain,
  BarChart3,
  Cloud,
  Database,
  Wrench,
};

// 3D Tilt Card component
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10 ${className}`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-50" />
      {/* Shine on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <GradientText>Skills</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive toolkit spanning software engineering, data science, and cloud technologies
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Code;

            return (
              <StaggerItem key={category.name}>
                <TiltCard className="p-6 h-full group" >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20"
                    >
                      <IconComponent className="text-purple-400" size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 text-sm">{skill.name}</span>
                          <span className="text-purple-400 text-sm font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full relative"
                          >
                            {/* Animated shimmer on the bar */}
                            <motion.div
                              animate={{ x: ['0%', '200%'] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 1 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
                            />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
