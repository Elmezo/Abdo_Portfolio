'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Trophy, Calendar } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import projects from '../../../content/projects.json';

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <GradientText>Projects</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my work in machine learning, software engineering, and data science
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.projects.map((project) => (
            <StaggerItem key={project.id}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <GlassCard className="h-full overflow-hidden group">
                  {/* Project Image/Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-30">
                        {project.title.includes('Diabetes') ? '🩺' : 
                         project.title.includes('Governance') ? '📊' : '🤖'}
                      </div>
                    </div>
                    
                    {/* Achievement badge */}
                    {project.achievement && (
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-500/10 border border-amber-500/30 flex items-center gap-1.5">
                          <Trophy className="text-amber-400" size={14} />
                          <span className="text-amber-300 text-xs font-medium">
                            {project.achievement}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Year badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 flex items-center gap-1.5">
                        <Calendar className="text-gray-400" size={12} />
                        <span className="text-gray-300 text-xs">{project.year}</span>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-400">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors"
                        >
                          <Github size={18} />
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/50 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View More */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-12">
            <motion.a
              href="https://github.com/elmezo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <Github size={18} />
              View More on GitHub
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
