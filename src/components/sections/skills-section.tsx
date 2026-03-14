'use client';

import { motion } from 'framer-motion';
import { Code, Brain, BarChart3, Cloud, Database, Wrench } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import skills from '../../../content/skills.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Brain,
  BarChart3,
  Cloud,
  Database,
  Wrench,
};

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
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
                <GlassCard className="p-6 h-full" hover={true}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                      <IconComponent className="text-purple-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 text-sm">{skill.name}</span>
                          <span className="text-purple-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
