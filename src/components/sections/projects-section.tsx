'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Trophy, Calendar, X, ArrowRight, Layers, Target, Lightbulb, Code2, Image as ImageIcon } from 'lucide-react';
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
                alt={project.title}
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

            {/* Problem */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} className="text-red-400" />
                <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">The Problem</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {project.title.includes('Diabetes')
                  ? 'Diabetic retinopathy is a leading cause of blindness, but early detection through manual examination is time-consuming and requires specialized expertise not always available.'
                  : project.title.includes('Governance')
                  ? 'Enterprise data was fragmented across multiple systems with no unified metadata management, causing compliance issues, data duplication, and operational inefficiencies.'
                  : 'Data scientists lacked a unified, scalable pipeline for processing large datasets and deploying ML models, leading to inconsistent results and slow time-to-production.'}
              </p>
            </div>

            {/* Solution */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} className="text-yellow-400" />
                <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">The Solution</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Architecture */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers size={18} className="text-purple-400" />
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Architecture & Highlights</h3>
              </div>
              <ul className="space-y-2">
                {(project.title.includes('Diabetes')
                  ? ['CNN with Transfer Learning (ResNet50)', 'Data augmentation for class imbalance', '94%+ accuracy on test dataset', 'Awarded 2nd place in national competition']
                  : project.title.includes('Governance')
                  ? ['Java Spring Boot microservices architecture', 'MySQL with optimized metadata schema', 'Docker containerization for deployment', 'REST APIs with automated documentation']
                  : ['Python-based ETL with Apache Airflow-style orchestration', 'AWS S3 + Azure Blob for scalable storage', 'Scikit-learn model training with cross-validation', 'CI/CD pipeline for model deployment']
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <ArrowRight size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
                  View on GitHub
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
                <GlassCard className="h-full overflow-hidden group cursor-pointer" hover={false}>
                  {/* Project Image */}
                  <div className="relative h-52 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
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

                    {/* Hover overlay with "View Case Study" */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-sm font-semibold flex items-center gap-2">
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
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/50 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
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
