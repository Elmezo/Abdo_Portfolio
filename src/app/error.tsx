'use client';

import { useEffect } from 'react';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Standalone of LocaleProvider in case the provider tree itself failed. */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const dictionary = getDictionary('en');

  useEffect(() => {
    console.error('Portfolio client error:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <p className="mb-2 text-sm font-medium text-cyan-300">{dictionary.error.eyebrow}</p>
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">{dictionary.error.title}</h1>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-300">
        {dictionary.error.body}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25"
        >
          {dictionary.error.retry}
        </button>
        <button
          type="button"
          onClick={() => {
            try {
              window.localStorage.setItem('portfolio-locale', 'ar');
            } catch {
              // ignore
            }
            window.location.reload();
          }}
          className="min-h-11 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
        >
          العربية
        </button>
      </div>
    </main>
  );
}
