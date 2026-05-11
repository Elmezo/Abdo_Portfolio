'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag, BookOpen, Github, ExternalLink } from 'lucide-react';
import { StaggerContainer, StaggerItem, SectionHeading } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import Image from 'next/image';

const caseStudies = [
  {
    id: 1,
    title: 'BUDG - Business Data Governance Platform',
    category: 'Enterprise Engineering',
    readTime: '10 screenshots',
    excerpt: 'React bulk upload wizard, job dashboard, Jakarta servlet bulk APIs, WebSocket progress, FastAPI validation, MySQL, Elasticsearch, and migration/export endpoints.',
    image: '/projects/BUDG_Project/1.png',
    href: '/projects/budg-business-data-governance-platform',
    external: false,
    action: 'Read BUDG Summary',
    tags: ['React', 'Java 17', 'Tomcat', 'FastAPI'],
    color: 'from-purple-500/20 to-cyan-500/20',
    accent: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  {
    id: 2,
    title: 'Smart Car Maintenance Analytics System',
    category: 'Open Source',
    readTime: 'GitHub repo',
    excerpt: 'Car maintenance management system with Spring Boot APIs, MySQL, JWT security, Python analytics, failure records, and maintenance prediction workflows.',
    image: '/projects/ml-pipeline.png',
    href: 'https://github.com/Elmezo/car-maintenance-system',
    external: true,
    action: 'Open GitHub',
    tags: ['Spring Boot', 'MySQL', 'Python', 'Analytics'],
    color: 'from-cyan-500/20 to-purple-500/20',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  {
    id: 3,
    title: 'Tailor Management System',
    category: 'Open Source',
    readTime: 'GitHub repo',
    excerpt: 'Business workflow system for tailoring shops to manage customers, body measurements, garment orders, statuses, partial payments, and useful reports.',
    image: '/projects/data-governance.png',
    href: 'https://github.com/Elmezo/Tailor-Management-System',
    external: true,
    action: 'Open GitHub',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL'],
    color: 'from-amber-500/20 to-purple-500/20',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  {
    id: 4,
    title: 'DFU Model for Graduation Project',
    category: 'Machine Learning',
    readTime: 'Kaggle notebook',
    excerpt: 'Computer vision notebook for diabetic foot ulcer / diabetes-related screening, built as a graduation project with a reproducible machine-learning workflow.',
    image: '/projects/diabetes-detection.png',
    href: 'https://www.kaggle.com/code/abdoalaaeldeen/dfu-model-for-graduation-project',
    external: true,
    action: 'Open Kaggle Notebook',
    tags: ['Python', 'CNN', 'Kaggle', 'Medical AI'],
    color: 'from-red-500/20 to-cyan-500/20',
    accent: 'text-red-300',
    border: 'border-red-500/30',
  },
  {
    id: 5,
    title: 'Smart Data Explorer - AI Data Analysis Tool',
    category: 'Open Source',
    readTime: 'GitHub repo',
    excerpt: 'AI-powered CSV/Excel analysis app with drag-and-drop upload, automatic cleaning, generated insights, dashboards, forecasting, and natural-language data questions.',
    image: '/projects/Smart%20Data%20Explorer/1.png',
    href: 'https://github.com/Elmezo/Smart-Data-Explorer-AI-Data-Analysis-Tool-',
    external: true,
    action: 'Open GitHub',
    tags: ['FastAPI', 'React', 'Pandas', 'OpenAI'],
    color: 'from-emerald-500/20 to-cyan-500/20',
    accent: 'text-emerald-300',
    border: 'border-emerald-500/30',
  },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          eyebrow={
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
              <BookOpen size={14} />
              Deep Dives & Learnings
            </div>
          }
          title={
            <>
              Case <GradientText>Studies</GradientText>
            </>
          }
          description={
            <p className="text-base text-gray-300 sm:text-lg">
              Behind-the-scenes stories of how I approach complex engineering challenges
            </p>
          }
        />

        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <StaggerItem key={study.id}>
              <motion.a
                href={study.href}
                target={study.external ? '_blank' : undefined}
                rel={study.external ? 'noopener noreferrer' : undefined}
                aria-label={`${study.action}: ${study.title}`}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="block h-full"
              >
                <GlassCard className="h-full overflow-hidden group cursor-pointer" hover={false}>
                  {/* Image */}
                  <div className={`relative h-48 bg-gradient-to-br ${study.color} overflow-hidden`}>
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
                      style={{ transition: 'transform 0.5s ease, opacity 0.5s ease' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${study.border} bg-slate-900/60 ${study.accent}`}>
                        {study.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {study.readTime}
                      </span>
                      {study.external ? (
                        <span className="flex items-center gap-1">
                          {study.href.includes('github.com') ? <Github size={12} /> : <ExternalLink size={12} />}
                          Public link
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-purple-300 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {study.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 text-xs"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <motion.div
                      className={`flex items-center gap-2 text-sm font-medium ${study.accent} group-hover:gap-3 transition-all duration-200`}
                    >
                      {study.action}
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
