'use client';

import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem, SectionHeading } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import { Quote, User, Linkedin } from 'lucide-react';
import testimonialsData from '../../../content/testimonials.json';
import { useLocale } from '@/lib/i18n/locale-provider';

export function TestimonialsSection() {
  const { dictionary } = useLocale();

  return (
    <section id="testimonials" className="relative overflow-x-clip py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 min-w-0">
        <SectionHeading
          title={<GradientText>{dictionary.sections.testimonials}</GradientText>}
          description={
            <p className="text-base text-gray-300 sm:text-lg">
              {dictionary.sections.testimonialsDesc}
            </p>
          }
        />

        <StaggerContainer staggerDelay={0.2} className="grid md:grid-cols-2 gap-8">
          {testimonialsData.testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.div whileHover={{ y: -4 }} className="h-full">
                <GlassCard className="h-full p-8 relative" hover={true}>
                  <Quote className="absolute top-6 right-6 text-emerald-500/20" size={64} />

                  <div className="mb-6 relative z-10">
                    <p className="text-gray-300 text-lg leading-relaxed italic border-l-2 border-emerald-500/50 pl-4 py-1">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                      <User className="text-emerald-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-emerald-400 text-sm">{testimonial.role}</p>
                    </div>
                    {testimonial.linkedin && (
                      <a
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn profile of ${testimonial.name}`}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-emerald-500/50 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
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
