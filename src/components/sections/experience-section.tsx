'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import experience from '../../../content/experience.json';

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Work <GradientText>Experience</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My professional journey in software engineering and data science
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500" />

          <StaggerContainer className="space-y-12">
            {experience.experiences.map((exp, index) => (
              <StaggerItem key={exp.id}>
                <div className={`relative flex items-center justify-between md:justify-normal ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-950 z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ml-8 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}>
                    <GlassCard className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 shrink-0">
                          <Briefcase className="text-purple-400" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                          <p className="text-purple-400 font-medium">{exp.company}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {exp.location}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                              {exp.type}
                            </span>
                          </div>

                          <p className="text-gray-400 mt-4 text-sm">
                            {exp.description}
                          </p>

                          {/* Achievements */}
                          <ul className="mt-4 space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-cyan-400 mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
