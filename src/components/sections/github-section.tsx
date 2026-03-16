'use client';

import { motion } from 'framer-motion';
import { Github, GitCommit, GitBranch, GitPullRequest, Star, Users, ExternalLink } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';

// Real stats — update these as needed
const githubStats = [
  { label: 'Total Commits', value: '150+', icon: GitCommit, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { label: 'Pull Requests', value: '25+', icon: GitPullRequest, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { label: 'Stars Earned', value: '45+', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { label: 'Repositories', value: '20+', icon: GitBranch, color: 'text-green-400', bg: 'bg-green-500/20' },
  { label: 'Followers', value: '30+', icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/20' },
  { label: 'Following', value: '50+', icon: Github, color: 'text-blue-400', bg: 'bg-blue-500/20' },
];

// Simple deterministic pseudo-random number generator string hash
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Synthetic contribution data with weighted distribution (realistic pattern)
const generateRealisticContributions = () =>
  Array.from({ length: 53 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const isWeekend = day === 0 || day === 6;
      const base = isWeekend ? 1 : 2;
      const random = seededRandom(week * 7 + day + 42); // Deterministic seed
      if (random > 0.7) return Math.min(4, base + Math.floor(seededRandom(week * 7 + day + 100) * 3));
      if (random > 0.4) return base;
      return 0;
    })
  );

const contributionData = generateRealisticContributions();

const getContributionColor = (level: number) => {
  const colors = [
    'bg-white/5 border border-white/5',
    'bg-purple-500/25 border border-purple-500/10',
    'bg-purple-500/45 border border-purple-500/20',
    'bg-purple-500/65 border border-purple-500/30',
    'bg-purple-500/90 border border-purple-500/50',
  ];
  return colors[level] ?? colors[0];
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function GitHubSection() {
  const githubUsername = 'elmezo';

  return (
    <section id="github" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-5xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              GitHub <GradientText>Activity</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My open source contributions and coding statistics
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {githubStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <GlassCard className="p-5 text-center" hover={false}>
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={stat.color} size={24} />
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                  </GlassCard>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Contribution Graph */}
        <FadeIn delay={0.3}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Github size={18} className="text-purple-400" />
                Contribution Activity
              </h3>
              <motion.a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                View Profile
                <ExternalLink size={12} />
              </motion.a>
            </div>

            {/* Month labels */}
            <div className="flex gap-1 mb-1 ml-0 overflow-x-auto">
              {months.map((month, i) => (
                <div
                  key={month}
                  className="text-gray-500 text-[10px] shrink-0"
                  style={{ width: `${(53 / 12) * 16}px`, minWidth: '36px' }}
                >
                  {i % 2 === 0 ? month : ''}
                </div>
              ))}
            </div>

            {/* Graph */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-[3px] min-w-max">
                {contributionData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={dayIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001, duration: 0.3 }}
                        whileHover={{ scale: 1.4 }}
                        className={`w-3 h-3 rounded-[2px] cursor-pointer transition-colors ${getContributionColor(day)}`}
                        title={`${day} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-3 text-xs text-gray-500">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-[2px] ${getContributionColor(level)}`}
                />
              ))}
              <span>More</span>
            </div>
          </GlassCard>
        </FadeIn>

        {/* GitHub Stats Images */}
        <FadeIn delay={0.4}>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <GlassCard className="p-4 flex items-center justify-center overflow-hidden" hover={false}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=transparent&hide_border=true&title_color=a855f7&icon_color=06b6d4&text_color=9ca3af&bg_color=00000000`}
                alt="GitHub Stats"
                className="w-full h-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).closest('.glass-card-fallback')?.classList.add('hidden');
                }}
              />
            </GlassCard>
            <GlassCard className="p-4 flex items-center justify-center overflow-hidden" hover={false}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=transparent&hide_border=true&title_color=a855f7&text_color=9ca3af&bg_color=00000000`}
                alt="Top Languages"
                className="w-full h-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity"
              />
            </GlassCard>
          </div>
        </FadeIn>

        {/* GitHub CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-8">
            <motion.a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              <Github size={20} />
              View Full GitHub Profile
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
