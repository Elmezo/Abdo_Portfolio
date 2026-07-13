import { describe, expect, it } from 'vitest';
import { TRANSLATE_GUARD_INLINE_SCRIPT } from '../src/lib/i18n/react-translate-guard';

describe('react translate guard boot script', () => {
  it('patches removeChild/insertBefore/replaceChild before React hydrates', () => {
    expect(TRANSLATE_GUARD_INLINE_SCRIPT).toContain('Node.prototype.removeChild');
    expect(TRANSLATE_GUARD_INLINE_SCRIPT).toContain('Node.prototype.insertBefore');
    expect(TRANSLATE_GUARD_INLINE_SCRIPT).toContain('Node.prototype.replaceChild');
    expect(TRANSLATE_GUARD_INLINE_SCRIPT).toContain('parentNode !== this');
    expect(TRANSLATE_GUARD_INLINE_SCRIPT).toContain('portfolio-locale');
    expect(TRANSLATE_GUARD_INLINE_SCRIPT).toContain('dataset.locale');
  });
});
