'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
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
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500"
          />

          <StaggerContainer className="space-y-12">
            {experience.experiences.map((exp, index) => (
              <StaggerItem key={exp.id}>
                <div
                  className={`relative flex items-center justify-between md:justify-normal ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot — animated pulse */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                    className="absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full border-4 border-slate-950 shadow-lg shadow-purple-500/30" />
                    <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
                  </motion.div>

                  {/* Content — slide in from alternating sides */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                    className={`w-full md:w-[calc(50%-2rem)] ml-8 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <GlassCard className="p-6 group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 shrink-0 group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-all">
                          <Briefcase className="text-purple-400" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-purple-400 font-semibold text-sm mt-0.5">{exp.company}</p>

                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {exp.location}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                              {exp.type}
                            </span>
                          </div>

                          <p className="text-gray-400 mt-3 text-sm leading-relaxed">{exp.description}</p>

                          {/* Achievements */}
                          <ul className="mt-4 space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                <ChevronRight size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech) => (
                              <motion.span
                                key={tech}
                                whileHover={{ scale: 1.05, y: -1 }}
                                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300 cursor-default"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
