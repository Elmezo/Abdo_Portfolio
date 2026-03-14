'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, GraduationCap, Briefcase } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';
import education from '../../../content/education.json';

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <GradientText>Me</GradientText>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Bio */}
          <FadeIn direction="left" delay={0.2}>
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Who I Am
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {profile.bio}
              </p>
              
              {/* Quick facts */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="text-purple-400" size={20} />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="text-cyan-400" size={20} />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="text-purple-400" size={20} />
                  <span>{profile.phone}</span>
                </div>
              </div>
            </GlassCard>
          </FadeIn>

          {/* Right side - Stats & Education */}
          <FadeIn direction="right" delay={0.4}>
            <StaggerContainer className="space-y-6">
              {/* Education */}
              <StaggerItem>
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/20">
                      <GraduationCap className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {education.education[0].degree}
                      </h4>
                      <p className="text-gray-400">
                        {education.education[0].institution}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {education.education[0].period} • GPA: {education.education[0].gpa}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>

              {/* Experience Stats */}
              <StaggerItem>
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/20">
                      <Briefcase className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        1+ Years Experience
                      </h4>
                      <p className="text-gray-400">
                        Software Engineering & Data Science
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>

              {/* Languages */}
              <StaggerItem>
                <GlassCard className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Languages</h4>
                  <div className="flex gap-3">
                    {education.languages.map((lang) => (
                      <div
                        key={lang.name}
                        className="px-4 py-2 rounded-full bg-white/10 border border-white/20"
                      >
                        <span className="text-white font-medium">{lang.name}</span>
                        <span className="text-gray-400 text-sm ml-2">({lang.level})</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </StaggerItem>
            </StaggerContainer>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
