'use client';

import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import { Quote, User } from 'lucide-react';
import testimonialsData from '../../../content/testimonials.json';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-slate-950">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Praise & <GradientText>Testimonials</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              What others have to say about my work, dedication, and technical expertise.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.2} className="grid md:grid-cols-2 gap-8">
          {testimonialsData.testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.div whileHover={{ y: -5 }} className="h-full">
                <GlassCard className="h-full p-8 relative" hover={true}>
                  <Quote className="absolute top-6 right-6 text-purple-500/20" size={64} />
                  
                  <div className="mb-6 relative z-10">
                    <p className="text-gray-300 text-lg leading-relaxed italic border-l-2 border-cyan-500/50 pl-4 py-1">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center p-[2px]">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-2 border-transparent relative overflow-hidden">
                        <User className="text-purple-400" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                    </div>
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
