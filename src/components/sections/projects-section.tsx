'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Trophy, Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem, SectionHeading } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import projects from '../../../content/projects.json';
import Image from 'next/image';

type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string | null;
  demo?: string | null;
  featured?: boolean;
  achievement?: string;
  year: string;
  role: string;
  challenge: string;
  impact?: string;
};

const projectList = projects.projects as Project[];

function getProjectIcon(title: string) {
  if (title.includes('Diabetes')) return '🩺';
  if (title.includes('BUDG') || title.includes('Governance')) return '📊';
  if (title.includes('Smart Data Explorer')) return '🔎';
  return '🤖';
}

export function ProjectsSection() {
  const router = useRouter();

  const openProject = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <SectionHeading
          title={
            <>
              Work & <GradientText>Case Studies</GradientText>
            </>
          }
          description={
            <p className="text-base text-gray-300 sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Problem → solution → impact, with the stack and links that are safe to share publicly.
            </p>
          }
        />

        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project) => (
            <StaggerItem key={project.id}>
              <motion.div
                whileHover={{ y: -12 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="rounded-2xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
                role="link"
                tabIndex={0}
                onClick={() => openProject(project.slug)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openProject(project.slug);
                  }
                }}
              >
                <GlassCard
                  className={`h-full overflow-hidden group cursor-pointer ${
                    project.featured
                      ? 'ring-2 ring-purple-400/40 ring-offset-2 ring-offset-slate-950'
                      : ''
                  }`}
                  hover={false}
                >
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
                        {getProjectIcon(project.title)}
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
                      <p className="text-cyan-300 font-semibold text-sm mb-2">{project.role}</p>
                      <p className="text-gray-200 text-sm line-clamp-2 mb-4">
                        {project.challenge}
                      </p>
                      <span className="text-white text-sm font-semibold flex items-center gap-2 self-start bg-white/10 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                        <ImageIcon size={16} className="text-cyan-400" />
                        Open Project Page
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-2 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    {'impact' in project && typeof project.impact === 'string' && project.impact ? (
                      <p className="text-xs text-emerald-400/95 font-medium line-clamp-2 mb-3 leading-snug">
                        Impact: {project.impact}
                      </p>
                    ) : null}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/15 text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/15 text-gray-300">
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
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-white/5 border border-white/15 text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
                        >
                          <Github size={18} />
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open external page for ${project.title}`}
                          whileHover={{ scale: 1.1 }}
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-white/5 border border-white/15 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                      <motion.button
                        type="button"
                        aria-label={`Open project page for ${project.title}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          openProject(project.slug);
                        }}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
                      >
                        Project Page
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
    </section>
  );
}
