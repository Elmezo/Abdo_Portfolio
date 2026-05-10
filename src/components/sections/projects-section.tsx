'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Trophy, Calendar, X, ArrowRight, Layers, Target, Lightbulb, Code2, Image as ImageIcon, Briefcase, TrendingUp } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import projects from '../../../content/projects.json';
import Image from 'next/image';

type Project = typeof projects.projects[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 shadow-2xl shadow-purple-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Project Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Project preview: ${project.title}`}
                fill
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 flex items-center justify-center">
              <div className="text-8xl opacity-40">
                {project.title.includes('Diabetes') ? '🩺' :
                 project.title.includes('Governance') ? '📊' : '🤖'}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            
            {/* Badges overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              {project.achievement && (
                <div className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center gap-1.5 shrink-0 ml-4">
                  <Trophy className="text-amber-400" size={14} />
                  <span className="text-amber-300 text-xs font-medium">{project.achievement}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={18} className="text-cyan-400" />
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Role */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={18} className="text-purple-400" />
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">My Role</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-medium">
                {project.role}
              </p>
            </div>

            {/* Problem */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} className="text-red-400" />
                <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">The Challenge</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} className="text-yellow-400" />
                <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">The Solution</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Impact */}
            {'impact' in project && typeof project.impact === 'string' && project.impact ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-emerald-400" />
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Impact</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{project.impact}</p>
              </div>
            ) : null}

            {/* Architecture */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers size={18} className="text-purple-400" />
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Architecture & Highlights</h3>
              </div>
              <ul className="space-y-2">
                {(Array.isArray(project.highlights) && project.highlights.length > 0
                  ? project.highlights
                  : project.title.includes('Diabetes')
                    ? ['CNN with Transfer Learning (ResNet50)', 'Data augmentation for class imbalance', '94%+ accuracy on test dataset', 'Awarded 2nd place in national competition']
                    : project.title.includes('Governance')
                      ? ['Java services with Jakarta Servlet / Tomcat', 'Elasticsearch-backed discovery', 'MySQL + JWT/LDAP', 'REST APIs with OpenAPI documentation']
                      : ['Python-based ETL with orchestration', 'AWS S3 + Azure Blob for scalable storage', 'Scikit-learn model training with cross-validation', 'CI/CD pipeline for model deployment']
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <ArrowRight size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-300">Engineering & data:</span> production systems rely on
                environment-based config (.env / secret managers) — public repos never ship API keys or customer data.
                Data quality checks and access control follow each deployment&apos;s requirements.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-4 border-t border-white/10">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all font-medium"
                >
                  <Github size={18} />
                  View source code
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Work & <GradientText>Case Studies</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Problem → solution → impact, with the stack and links that are safe to share publicly.
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
                <GlassCard className="h-full overflow-hidden group cursor-pointer" hover={false}>
                  {/* Project Image */}
                  <div className="relative h-52 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`Project card image: ${project.title}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : null}
                    
                    {/* Gradient placeholder always visible if image missing */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
                      <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                        {project.title.includes('Diabetes') ? '🩺' :
                         project.title.includes('Governance') ? '📊' : '🤖'}
                      </div>
                    </div>

                    {/* Achievement badge */}
                    {project.achievement && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-500/10 border border-amber-500/30 flex items-center gap-1.5">
                          <Trophy className="text-amber-400" size={14} />
                          <span className="text-amber-300 text-xs font-medium">
                            {project.achievement}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Year badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 flex items-center gap-1.5">
                        <Calendar className="text-gray-400" size={12} />
                        <span className="text-gray-300 text-xs">{project.year}</span>
                      </div>
                    </div>

                    {/* Hover overlay with more info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                      <p className="text-cyan-300 font-medium text-sm mb-2">{project.role}</p>
                      <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                        {project.challenge}
                      </p>
                      <span className="text-white text-sm font-semibold flex items-center gap-2 self-start bg-white/10 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                        <ImageIcon size={16} className="text-cyan-400" />
                        View Case Study
                      </span>
                    </div>
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
                    <div className="flex gap-3 items-center">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View source code for ${project.title} on GitHub`}
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => e.stopPropagation()}
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
                          aria-label={`Open live demo for ${project.title}`}
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/50 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                      <motion.button
                        type="button"
                        aria-label={`Open case study for ${project.title}`}
                        onClick={() => setSelectedProject(project)}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
                      >
                        Case Study
                        <ArrowRight size={14} />
                      </motion.button>
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

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
