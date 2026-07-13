export type Locale = 'en' | 'ar';

export const LOCALE_STORAGE_KEY = 'portfolio-locale';

export const LOCALES: readonly Locale[] = ['en', 'ar'] as const;

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'en' || value === 'ar';
}

export function localeDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/** Prefer saved choice, otherwise Arabic browsers open the Arabic experience. */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // ignore storage failures (private mode)
  }

  const candidates = [
    ...(window.navigator.languages ?? []),
    window.navigator.language,
  ]
    .filter(Boolean)
    .map((lang) => lang.toLowerCase());

  return candidates.some((lang) => lang === 'ar' || lang.startsWith('ar-'))
    ? 'ar'
    : 'en';
}

export function applyDocumentLocale(locale: Locale): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.lang = locale;
  root.dir = localeDirection(locale);
  root.dataset.locale = locale;
}
