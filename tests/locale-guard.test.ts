import { describe, expect, it } from 'vitest';
import { getNextTypewriterStep } from '../src/lib/locale-guard';
import { detectBrowserLocale, isLocale, localeDirection } from '../src/lib/i18n/locale';
import { getDictionary } from '../src/lib/i18n/dictionaries';

describe('locale helpers', () => {
  it('validates locales', () => {
    expect(isLocale('ar')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('fr')).toBe(false);
  });

  it('maps Arabic to RTL', () => {
    expect(localeDirection('ar')).toBe('rtl');
    expect(localeDirection('en')).toBe('ltr');
  });

  it('returns Arabic brand name in Arabic dictionary', () => {
    expect(getDictionary('ar').brand).toContain('عبدالرحمن');
    expect(getDictionary('en').brand).toContain('Abdelrahman');
  });

  it('detects Arabic browser languages', () => {
    const originalNavigator = globalThis.navigator;
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: { language: 'ar-SA', languages: ['ar-SA', 'ar'] },
    });
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        localStorage: { getItem: () => null, setItem: () => undefined },
        navigator: { language: 'ar-SA', languages: ['ar-SA', 'ar'] },
      },
    });

    expect(detectBrowserLocale()).toBe('ar');

    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: originalNavigator,
    });
  });
});

describe('getNextTypewriterStep', () => {
  const timing = { typingSpeed: 50, deletingSpeed: 25, pauseDuration: 1000 };

  it('returns null for empty words', () => {
    expect(
      getNextTypewriterStep(
        { words: [], currentWordIndex: 0, currentText: '', isDeleting: false },
        timing
      )
    ).toBeNull();
  });

  it('types Arabic and English phrases', () => {
    const arabic = getNextTypewriterStep(
      {
        words: ['منتجات ذكاء اصطناعي'],
        currentWordIndex: 0,
        currentText: '',
        isDeleting: false,
      },
      timing
    );
    expect(arabic?.nextText).toBe('م');

    const english = getNextTypewriterStep(
      {
        words: ['AI'],
        currentWordIndex: 0,
        currentText: 'A',
        isDeleting: false,
      },
      timing
    );
    expect(english).toMatchObject({ phase: 'typing', nextText: 'AI' });
  });

  it('pauses then deletes then advances', () => {
    expect(
      getNextTypewriterStep(
        { words: ['AI', 'SQL'], currentWordIndex: 0, currentText: 'AI', isDeleting: false },
        timing
      )
    ).toMatchObject({ phase: 'pausing', nextIsDeleting: true });

    expect(
      getNextTypewriterStep(
        { words: ['AI', 'SQL'], currentWordIndex: 0, currentText: 'A', isDeleting: true },
        timing
      )
    ).toMatchObject({ phase: 'deleting', nextText: '' });

    expect(
      getNextTypewriterStep(
        { words: ['AI', 'SQL'], currentWordIndex: 0, currentText: '', isDeleting: true },
        timing
      )
    ).toMatchObject({ phase: 'advancing', nextWordIndex: 1 });
  });
});
