/**
 * Attributes that keep English brand/name copy from being rewritten by
 * browser auto-translate (Chrome on Arabic locales often translates names
 * like "Abdelrahman" → "عبدالرحمن" and then crashes React).
 */
export const ENGLISH_LITERAL_ATTRS = {
  lang: 'en',
  dir: 'ltr' as const,
  translate: 'no' as const,
  className: 'notranslate',
};

export function englishLiteralClassName(extra = ''): string {
  return ['notranslate', extra].filter(Boolean).join(' ').trim();
}

/** Split a display name into words and spaces while keeping Latin tokens whole. */
export function tokenizeDisplayName(name: string): string[] {
  return name.split(/(\s+)/).filter((token) => token.length > 0);
}

export type TypewriterPhase = 'typing' | 'pausing' | 'deleting' | 'advancing';

export interface TypewriterStepInput {
  words: readonly string[];
  currentWordIndex: number;
  currentText: string;
  isDeleting: boolean;
}

export interface TypewriterStepResult {
  phase: TypewriterPhase;
  nextText: string;
  nextWordIndex: number;
  nextIsDeleting: boolean;
  delay: number;
}

/**
 * Pure typewriter state transition — used by the UI effect and unit tests.
 */
export function getNextTypewriterStep(
  input: TypewriterStepInput,
  timing: { typingSpeed: number; deletingSpeed: number; pauseDuration: number }
): TypewriterStepResult | null {
  const { words, currentWordIndex, currentText, isDeleting } = input;
  if (words.length === 0) return null;

  const currentWord = words[currentWordIndex % words.length] ?? '';

  if (!isDeleting) {
    if (currentText.length < currentWord.length) {
      return {
        phase: 'typing',
        nextText: currentWord.slice(0, currentText.length + 1),
        nextWordIndex: currentWordIndex,
        nextIsDeleting: false,
        delay: timing.typingSpeed,
      };
    }

    return {
      phase: 'pausing',
      nextText: currentText,
      nextWordIndex: currentWordIndex,
      nextIsDeleting: true,
      delay: timing.pauseDuration,
    };
  }

  if (currentText.length > 0) {
    return {
      phase: 'deleting',
      nextText: currentText.slice(0, -1),
      nextWordIndex: currentWordIndex,
      nextIsDeleting: true,
      delay: timing.deletingSpeed,
    };
  }

  return {
    phase: 'advancing',
    nextText: '',
    nextWordIndex: (currentWordIndex + 1) % words.length,
    nextIsDeleting: false,
    delay: timing.deletingSpeed,
  };
}
