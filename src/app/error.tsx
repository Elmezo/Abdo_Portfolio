'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Recovers from client-side exceptions (including DOM mutations from browser
 * auto-translate) without leaving the user on the generic Next.js crash screen.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Portfolio client error:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <p className="mb-2 text-sm font-medium text-cyan-300">Something went wrong</p>
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Could not load this page</h1>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-300">
        If your browser tried to auto-translate this site, turn translation off and reload.
        The portfolio is English-only.
      </p>
      <button
        type="button"
        onClick={reset}
        className="min-h-11 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25"
      >
        Try again
      </button>
    </main>
  );
}
