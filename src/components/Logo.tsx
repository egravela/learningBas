'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
  width?: number;
  height?: number;
}

/**
 * Componente Logo che mostra automaticamente la versione corretta
 * in base allo sfondo (chiaro/scuro/colorato)
 */
export default function Logo({ 
  className, 
  variant = 'default',
  width = 175,
  height = 82 
}: LogoProps) {
  // Logo originale per sfondi chiari
  const logoUrl = 'https://accessibilita.regione.basilicata.it/wp-content/uploads/2024/08/RB_logo_350x163.gif';
  
  // Logo bianco per sfondi colorati/scuri
  const logoWhiteUrl = 'https://accessibilita.regione.basilicata.it/wp-content/uploads/2024/08/RB_logo_bianco-1.png';
  
  const isLightVariant = variant === 'light';
  const isDarkVariant = variant === 'dark';
  
  // Usa il logo bianco per sfondi colorati/scuri
  const logoSrc = isLightVariant ? logoWhiteUrl : logoUrl;
  
  return (
    <div className={cn('relative', className)}>
      <Image
        src={logoSrc}
        alt="Regione Basilicata"
        width={width}
        height={height}
        className={cn(
          'h-auto w-auto transition-all duration-300',
          // Non applicare h-14 di default, lascia che sia gestito dalla className passata come prop
        )}
        priority
      />
    </div>
  );
}

