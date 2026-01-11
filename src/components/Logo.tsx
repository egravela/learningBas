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
  const logoUrl = 'https://accessibilita.regione.basilicata.it/wp-content/uploads/2024/08/RB_logo_350x163.gif';
  
  // Per sfondi colorati/scuri, applica filtro per rendere il logo bianco/invertito
  const isLightVariant = variant === 'light';
  const isDarkVariant = variant === 'dark';
  
  return (
    <div className={cn('relative', className)}>
      <Image
        src={logoUrl}
        alt="Regione Basilicata"
        width={width}
        height={height}
        className={cn(
          'h-auto transition-all duration-300',
          isLightVariant && 'brightness-0 invert', // Logo bianco su sfondo scuro/colorato
          isDarkVariant && 'brightness-0', // Logo nero su sfondo chiaro
          !isLightVariant && !isDarkVariant && 'h-14 w-auto' // Default
        )}
        priority
      />
    </div>
  );
}

