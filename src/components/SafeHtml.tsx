'use client';

import { decodeHtmlEntities } from '@/lib/utils';

interface SafeHtmlProps {
  html: string;
  className?: string;
}

/**
 * Componente per renderizzare HTML in modo sicuro,
 * decodificando correttamente le entità HTML
 */
export default function SafeHtml({ html, className }: SafeHtmlProps) {
  if (!html) return null;

  // Decodifica le entità HTML nel contenuto
  const decodedHtml = decodeHtmlEntities(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: decodedHtml }}
    />
  );
}

