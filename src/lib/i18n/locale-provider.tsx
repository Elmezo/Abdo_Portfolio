'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getDictionary, type UiDictionary } from './dictionaries';
import {
  applyDocumentLocale,
  detectBrowserLocale,
  LOCALE_STORAGE_KEY,
  localeDirection,
  type Locale,
} from './locale';
import { installReactTranslateGuard } from './react-translate-guard';
import profileEn from '../../../content/profile.json';
import profileAr from '../../../content/profile.ar.json';

export type ProfileContent = typeof profileEn;

interface LocaleContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  dictionary: UiDictionary;
  profile: ProfileContent;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function profileForLocale(locale: Locale): ProfileContent {
  return locale === 'ar' ? (profileAr as ProfileContent) : profileEn;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const uninstall = installReactTranslateGuard();
    const initial = detectBrowserLocale();
    setLocaleState(initial);
    applyDocumentLocale(initial);
    setReady(true);
    return uninstall;
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyDocumentLocale(locale);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: localeDirection(locale),
      dictionary: getDictionary(locale),
      profile: profileForLocale(locale),
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}
