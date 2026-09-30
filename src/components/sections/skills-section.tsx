'use client';

import { Code, Brain, Database, Wrench } from 'lucide-react';
import { StaggerContainer, StaggerItem, SectionHeading } from '../ui-custom/animations';
import { GradientText } from '../ui-custom/glass-card';
import skills from '../../../content/skills.json';
import { useLocale } from '@/lib/i18n/locale-provider';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Code,
  Brain,
  Database,
  Wrench,
};

export function SkillsSection() {
  const { dictionary } = useLocale();

  return (
    <section
      id="skills"
      className="relative overflow-x-clip py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 min-w-0">
        <SectionHeading
          title={<GradientText>{dictionary.sections.skills}</GradientText>}
          description={
            <p className="text-base text-gray-300 sm:text-lg">
              {dictionary.sections.skillsDesc}
            </p>
          }
        />

        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-6">
          {skills.categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Code;

            return (
              <StaggerItem key={category.name}>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
