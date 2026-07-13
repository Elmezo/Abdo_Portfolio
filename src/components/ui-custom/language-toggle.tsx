'use client';

import { useLocale } from '@/lib/i18n/locale-provider';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale, dictionary } = useLocale();

  return (
    <div
      role="group"
      aria-label={dictionary.language.switchTo}
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-semibold ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`min-h-9 min-w-9 rounded-full px-2.5 transition-colors touch-manipulation ${
          locale === 'en'
            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        {dictionary.language.en}
      </button>
      <button
        type="button"
        onClick={() => setLocale('ar')}
        aria-pressed={locale === 'ar'}
        className={`min-h-9 min-w-9 rounded-full px-2.5 transition-colors touch-manipulation ${
          locale === 'ar'
            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        {dictionary.language.ar}
      </button>
    </div>
  );
}
