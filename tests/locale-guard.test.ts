import { describe, expect, it } from 'vitest';
import {
  englishLiteralClassName,
  getNextTypewriterStep,
  tokenizeDisplayName,
} from '../src/lib/locale-guard';

describe('tokenizeDisplayName', () => {
  it('keeps Latin name words intact with spaces', () => {
    expect(tokenizeDisplayName('Abdelrahman Alaa Eldeen')).toEqual([
      'Abdelrahman',
      ' ',
      'Alaa',
      ' ',
      'Eldeen',
    ]);
  });

  it('does not reverse or reshape Latin characters', () => {
    const tokens = tokenizeDisplayName('Abdelrahman');
    expect(tokens).toEqual(['Abdelrahman']);
    expect(Array.from(tokens[0]!).join('')).toBe('Abdelrahman');
  });
});

describe('englishLiteralClassName', () => {
  it('always includes notranslate', () => {
    expect(englishLiteralClassName('text-2xl')).toBe('notranslate text-2xl');
    expect(englishLiteralClassName()).toBe('notranslate');
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

  it('types the next character', () => {
    const step = getNextTypewriterStep(
      {
        words: ['AI', 'SQL'],
        currentWordIndex: 0,
        currentText: 'A',
        isDeleting: false,
      },
      timing
    );
    expect(step).toMatchObject({
      phase: 'typing',
      nextText: 'AI',
      nextIsDeleting: false,
      delay: 50,
    });
  });

  it('pauses before deleting', () => {
    const step = getNextTypewriterStep(
      {
        words: ['AI'],
        currentWordIndex: 0,
        currentText: 'AI',
        isDeleting: false,
      },
      timing
    );
    expect(step).toMatchObject({
      phase: 'pausing',
      nextIsDeleting: true,
      delay: 1000,
    });
  });

  it('deletes characters then advances to the next word', () => {
    const deleting = getNextTypewriterStep(
      {
        words: ['AI', 'SQL'],
        currentWordIndex: 0,
        currentText: 'A',
        isDeleting: true,
      },
      timing
    );
    expect(deleting).toMatchObject({ phase: 'deleting', nextText: '' });

    const advancing = getNextTypewriterStep(
      {
        words: ['AI', 'SQL'],
        currentWordIndex: 0,
        currentText: '',
        isDeleting: true,
      },
      timing
    );
    expect(advancing).toMatchObject({
      phase: 'advancing',
      nextWordIndex: 1,
      nextIsDeleting: false,
    });
  });
});
