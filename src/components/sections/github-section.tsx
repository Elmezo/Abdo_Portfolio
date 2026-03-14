'use client';

import { motion } from 'framer-motion';
import { Github, GitCommit, GitBranch, GitPullRequest, Star, Users } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';

// Mock GitHub stats - In production, you'd fetch these from GitHub API
const githubStats = {
  totalCommits: 150,
  totalPRs: 25,
  totalStars: 45,
  totalForks: 12,
  followers: 30,
  following: 50,
};

const contributionData = Array.from({ length: 52 }, (_, week) =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
);

const getContributionColor = (level: number) => {
  const colors = [
    'bg-white/5',
    'bg-purple-500/20',
    'bg-purple-500/40',
    'bg-purple-500/60',
    'bg-purple-500/80',
  ];
  return colors[level];
};

export function GitHubSection() {
  return (
    <section id="github" className="relative py-24 md:py-32">
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Stats Cards */}
          <StaggerContainer className="grid grid-cols-2 gap-4">
            <StaggerItem>
              <GlassCard className="p-4 text-center">
                <GitCommit className="text-purple-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{githubStats.totalCommits}+</p>
                <p className="text-gray-400 text-sm">Total Commits</p>
              </GlassCard>
            </StaggerItem>
            <StaggerItem>
              <GlassCard className="p-4 text-center">
                <GitPullRequest className="text-cyan-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{githubStats.totalPRs}+</p>
                <p className="text-gray-400 text-sm">Pull Requests</p>
              </GlassCard>
            </StaggerItem>
            <StaggerItem>
              <GlassCard className="p-4 text-center">
                <Star className="text-amber-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{githubStats.totalStars}+</p>
                <p className="text-gray-400 text-sm">Stars Earned</p>
              </GlassCard>
            </StaggerItem>
            <StaggerItem>
              <GlassCard className="p-4 text-center">
                <Users className="text-green-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{githubStats.followers}+</p>
                <p className="text-gray-400 text-sm">Followers</p>
              </GlassCard>
            </StaggerItem>
          </StaggerContainer>

          {/* Contribution Graph */}
          <FadeIn direction="right" delay={0.3}>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Contribution Graph</h3>
                <span className="text-gray-400 text-sm">Last 52 weeks</span>
              </div>
              
              <div className="overflow-x-auto">
                <div className="flex gap-1 min-w-max">
                  {contributionData.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <motion.div
                          key={dayIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (weekIndex * 7 + dayIndex) * 0.002 }}
                          className={`w-3 h-3 rounded-sm ${getContributionColor(day)}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
                <span>More</span>
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        {/* GitHub CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-8">
            <motion.a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              <Github size={20} />
              View GitHub Profile
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
