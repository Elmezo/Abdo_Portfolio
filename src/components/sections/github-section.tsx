'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { FadeIn, SectionHeading } from '../ui-custom/animations';
import { GradientText } from '../ui-custom/glass-card';
import { useLocale } from '@/lib/i18n/locale-provider';

const GITHUB_README_STATS_PRIMARY = 'https://github-readme-stats.shion.dev';
const GITHUB_README_STATS_FALLBACK = 'https://github-readme-stats.vercel.app';

function githubUsernameFromProfileUrl(githubProfileUrl: string): string {
  try {
    const segments = new URL(githubProfileUrl).pathname.split('/').filter(Boolean);
    return segments[0] || 'elmezo';
  } catch {
    return 'elmezo';
  }
}

function githubStatsCardUrl(host: string, username: string): string {
  const q = new URLSearchParams({
    username,
    show_icons: 'true',
    theme: 'dark',
    hide_border: 'true',
    title_color: '10b981',
    icon_color: '10b981',
    text_color: '9ca3af',
    bg_color: '0f172a',
  });
  return `${host}/api?${q}`;
}

function githubTopLangsCardUrl(host: string, username: string): string {
  const q = new URLSearchParams({
    username,
    layout: 'compact',
    theme: 'dark',
    hide_border: 'true',
    title_color: '10b981',
    text_color: '9ca3af',
    bg_color: '0f172a',
  });
  return `${host}/api/top-langs/?${q}`;
}

export function GitHubSection() {
  const { dictionary, profile } = useLocale();
  const githubUsername = githubUsernameFromProfileUrl(profile.social.github);
  const statsPrimary = githubStatsCardUrl(GITHUB_README_STATS_PRIMARY, githubUsername);
  const statsFallback = githubStatsCardUrl(GITHUB_README_STATS_FALLBACK, githubUsername);
  const langsPrimary = githubTopLangsCardUrl(GITHUB_README_STATS_PRIMARY, githubUsername);
  const langsFallback = githubTopLangsCardUrl(GITHUB_README_STATS_FALLBACK, githubUsername);

  return (
    <section id="github" className="relative overflow-x-clip py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 min-w-0">
        <SectionHeading
          title={<GradientText>{dictionary.sections.github}</GradientText>}
          description={
            <p className="text-base text-gray-300 sm:text-lg">
              {dictionary.sections.githubDesc}
            </p>
          }
        />

        <FadeIn delay={0.3}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center overflow-hidden">
              <img
                src={statsPrimary}
                alt="GitHub Stats"
                className="w-full h-auto max-w-full rounded-lg"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.dataset.fallbackApplied === '1') return;
                  img.dataset.fallbackApplied = '1';
                  img.src = statsFallback;
                }}
              />
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center overflow-hidden">
              <img
                src={langsPrimary}
                alt="Top Languages"
                className="w-full h-auto max-w-full rounded-lg"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.dataset.fallbackApplied === '1') return;
                  img.dataset.fallbackApplied = '1';
                  img.src = langsFallback;
                }}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="text-center mt-8">
            <motion.a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors"
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
