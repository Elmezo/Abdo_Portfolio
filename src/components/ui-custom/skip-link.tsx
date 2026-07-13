'use client';

import { useLocale } from '@/lib/i18n/locale-provider';

export function SkipLink() {
  const { dictionary } = useLocale();

  return (
    <a href="#main-content" className="skip-link">
      {dictionary.skipToContent}
    </a>
  );
}
