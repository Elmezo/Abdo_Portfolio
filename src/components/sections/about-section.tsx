'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, GraduationCap, Briefcase, Code2, Database, Trophy } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';
import education from '../../../content/education.json';

// Animated counter hook
function useCounter(end: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function StatCounter({ value, label, icon: Icon, color, suffix = '+' }: {
  value: number;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(value, 1800, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center p-4">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
        <Icon className="text-white" size={20} />
      </div>
      <p className="text-3xl font-bold text-white">
        {count}<span className="text-purple-400">{suffix}</span>
      </p>
      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <GradientText>Me</GradientText>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Bio */}
          <FadeIn direction="left" delay={0.2}>
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{profile.bio}</p>
              
              {/* Quick facts */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="text-purple-400 shrink-0" size={20} />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="text-cyan-400 shrink-0" size={20} />
                  <span className="break-all">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="text-purple-400 shrink-0" size={20} />
                  <span>{profile.phone}</span>
                </div>
              </div>
            </GlassCard>

            {/* Animated Stats */}
            <GlassCard className="mt-6 p-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-white/5">
                <StatCounter value={1} label="Year Experience" icon={Briefcase} color="bg-purple-500/40" suffix="+" />
                <StatCounter value={5} label="Projects Built" icon={Code2} color="bg-cyan-500/40" suffix="+" />
                <StatCounter value={3} label="Tech Stacks" icon={Database} color="bg-green-500/40" suffix="+" />
                <StatCounter value={1} label="Award Won" icon={Trophy} color="bg-amber-500/40" suffix="" />
              </div>
            </GlassCard>
          </FadeIn>

          {/* Right side - Stats & Education */}
          <FadeIn direction="right" delay={0.4}>
            <StaggerContainer className="space-y-6">
              {/* Education */}
              <StaggerItem>
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/20 shrink-0">
                      <GraduationCap className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {education.education[0].degree}
                      </h4>
                      <p className="text-gray-400">{education.education[0].institution}</p>
                      <p className="text-gray-500 text-sm">
                        {education.education[0].period} • GPA: {education.education[0].gpa}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>

              {/* Experience */}
              <StaggerItem>
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/20 shrink-0">
                      <Briefcase className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">1+ Years Experience</h4>
                      <p className="text-gray-400">Software Engineering & Data Science</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {['Python', 'Java', 'SQL', 'AWS', 'Azure', 'ML'].map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.05 }}
                            className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>

              {/* Languages */}
              <StaggerItem>
                <GlassCard className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Languages</h4>
                  <div className="space-y-3">
                    {education.languages.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-400" />
                          <span className="text-white font-medium">{lang.name}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </StaggerItem>
            </StaggerContainer>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
