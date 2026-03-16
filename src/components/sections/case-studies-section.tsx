'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag, BookOpen } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import Image from 'next/image';

const caseStudies = [
  {
    id: 1,
    title: 'How I Built a Car Maintenance Analytics System',
    category: 'Data Engineering',
    readTime: '8 min read',
    excerpt: 'A deep dive into designing a real-time analytics platform for tracking vehicle maintenance events, predicting failure risks, and generating automated reports using Python, SQL, and cloud services.',
    image: '/projects/ml-pipeline.png',
    tags: ['Python', 'SQL', 'Analytics', 'Cloud'],
    color: 'from-purple-500/20 to-cyan-500/20',
    accent: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  {
    id: 2,
    title: 'Building an AI Diabetes Detection System from Scratch',
    category: 'Machine Learning',
    readTime: '12 min read',
    excerpt: 'From raw retinal image data to a production-ready CNN model — how I designed the architecture, handled class imbalance, applied transfer learning, and achieved 94%+ accuracy.',
    image: '/projects/diabetes-detection.png',
    tags: ['CNN', 'TensorFlow', 'Transfer Learning', 'Image Classification'],
    color: 'from-cyan-500/20 to-purple-500/20',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  {
    id: 3,
    title: 'Scaling Enterprise Data Governance at Bussma',
    category: 'Enterprise Engineering',
    readTime: '10 min read',
    excerpt: 'The challenges and solutions behind building a metadata management platform for enterprise data assets — including automated lineage tracking, bulk operations, and compliance reporting.',
    image: '/projects/data-governance.png',
    tags: ['Java', 'Spring Boot', 'Docker', 'MySQL'],
    color: 'from-amber-500/20 to-purple-500/20',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
  },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-6">
              <BookOpen size={14} />
              Deep Dives & Learnings
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Case <GradientText>Studies</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Behind-the-scenes stories of how I approach complex engineering challenges
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <StaggerItem key={study.id}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
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
                      Read Case Study
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
