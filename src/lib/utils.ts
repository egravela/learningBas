import { clsx, type ClassValue } from 'clsx';

// Utility per combinare classi CSS
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Decodifica entità HTML (es: &amp; → &, &apos; → ', &agrave; → à, &#8217; → ')
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  
  if (typeof window !== 'undefined') {
    // Browser: usa il DOM per decodificare (gestisce tutte le entità automaticamente)
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  } else {
    // Server-side: decodifica manuale delle entità comuni
    // Prima decodifica le entità numeriche (&#8217;, &#8220;, ecc.)
    let decoded = text.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });
    
    // Poi decodifica le entità esadecimali (&#x2019;, ecc.)
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    
    // Infine decodifica le entità nominate comuni
    return decoded
      .replace(/&amp;/g, '&')
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&agrave;/g, 'à')
      .replace(/&Agrave;/g, 'À')
      .replace(/&egrave;/g, 'è')
      .replace(/&Egrave;/g, 'È')
      .replace(/&igrave;/g, 'ì')
      .replace(/&Igrave;/g, 'Ì')
      .replace(/&ograve;/g, 'ò')
      .replace(/&Ograve;/g, 'Ò')
      .replace(/&ugrave;/g, 'ù')
      .replace(/&Ugrave;/g, 'Ù')
      .replace(/&eacute;/g, 'é')
      .replace(/&Eacute;/g, 'É')
      .replace(/&iacute;/g, 'í')
      .replace(/&Iacute;/g, 'Í')
      .replace(/&oacute;/g, 'ó')
      .replace(/&Oacute;/g, 'Ó')
      .replace(/&uacute;/g, 'ú')
      .replace(/&Uacute;/g, 'Ú')
      .replace(/&nbsp;/g, ' ')
      .replace(/&ndash;/g, '–')
      .replace(/&mdash;/g, '—')
      .replace(/&hellip;/g, '…')
      .replace(/&copy;/g, '©')
      .replace(/&reg;/g, '®')
      .replace(/&trade;/g, '™');
  }
}

// Rimuovi tag HTML e decodifica entità HTML da una stringa
export function stripHtml(html: string): string {
  if (!html) return '';
  const withoutTags = html.replace(/<[^>]*>/g, '').trim();
  return decodeHtmlEntities(withoutTags);
}

// Tronca testo
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Formatta data
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Calcola percentuale progresso
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

