import { clsx, type ClassValue } from 'clsx';

// Utility per combinare classi CSS
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Rimuovi tag HTML da una stringa
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
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

