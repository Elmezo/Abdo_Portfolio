import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Code2,
  ExternalLink,
  Github,
  Images,
  Layers,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
import projectsData from '../../../../content/projects.json';
import { ParticleBackground } from '@/components/ui-custom/particle-background';
import { GradientText } from '@/components/ui-custom/glass-card';

type ProjectDetailSection = {
  title: string;
  items: string[];
};

type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  oneLinePitch?: string;
  image: string;
  screenshots?: string[];
  technologies: string[];
  github?: string | null;
  demo?: string | null;
  achievement?: string;
  year: string;
  role: string;
  challenge: string;
  solution: string;
  impact?: string;
  highlights: string[];
  detailSections?: ProjectDetailSection[];
};

const projects = projectsData.projects as Project[];

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: 'Project not found | Abdelrahman Alaa',
    };
  }

  return {
    title: `${project.title} | Abdelrahman Alaa`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Abdelrahman Alaa`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const screenshots = project.screenshots?.length ? project.screenshots : [project.image];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-purple-500/50 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <section className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Project case study
              </span>
              {project.achievement ? (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                  {project.achievement}
                </span>
              ) : null}
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
              <GradientText>{project.title}</GradientText>
            </h1>

            <p className="mb-6 max-w-3xl text-lg leading-relaxed text-gray-200 md:text-xl">
              {project.oneLinePitch || project.description}
            </p>

            <p className="max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
              {project.longDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 font-medium text-white transition-colors hover:border-purple-500/50 hover:bg-white/15"
                >
                  <Github size={18} />
                  View source code
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-3 font-medium text-white transition-shadow hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <ExternalLink size={18} />
                  Open external project
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl shadow-purple-500/20">
            <div className="relative aspect-[16/10]">
              <Image
                src={project.image}
                alt={`${project.title} application screenshot`}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
              <Calendar size={16} />
              Year
            </div>
            <p className="text-lg font-semibold text-white">{project.year}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-purple-300">
              <Briefcase size={16} />
              Role
            </div>
            <p className="text-lg font-semibold text-white">{project.role}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-300">
              <Images size={16} />
              Screenshots
            </div>
            <p className="text-lg font-semibold text-white">{screenshots.length} view{screenshots.length === 1 ? '' : 's'}</p>
          </div>
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-300">
              <Target size={18} />
              Challenge
            </div>
            <p className="leading-relaxed text-gray-200">{project.challenge}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-yellow-300">
              <Lightbulb size={18} />
              Solution
            </div>
            <p className="leading-relaxed text-gray-200">{project.solution}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-300">
              <TrendingUp size={18} />
              Impact
            </div>
            <p className="leading-relaxed text-gray-200">{project.impact || 'Delivered a practical, reviewable project workflow with reusable engineering patterns.'}</p>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
              <Code2 size={18} />
              Tech stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-purple-500/30 bg-purple-500/15 px-3 py-1.5 text-sm font-medium text-purple-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-purple-300">
              <Layers size={18} />
              Architecture & highlights
            </div>
            <ul className="space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <ArrowRight size={16} className="mt-1 shrink-0 text-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {project.detailSections?.length ? (
          <section className="grid gap-6 py-12 md:grid-cols-2 xl:grid-cols-3">
            {project.detailSections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="mb-4 text-xl font-bold text-white">{section.title}</h2>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                      <ArrowRight size={14} className="mt-1 shrink-0 text-purple-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        ) : null}

        <section className="py-12">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Application screenshots</p>
              <h2 className="text-3xl font-bold md:text-4xl">
                Project <GradientText>Gallery</GradientText>
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
              BUDG screenshots are shown in the uploaded 1 to 10 order. Other projects use their available uploaded or portfolio images.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {screenshots.map((screenshot, index) => (
              <figure
                key={screenshot}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-purple-500/10"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-gray-300">
                  Screenshot {index + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
