import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Formazione Accessibilità | Regione Basilicata',
  description: 'Piattaforma e-learning della Regione Basilicata per la formazione sull\'accessibilità digitale. Impara a creare contenuti e servizi accessibili a tutti.',
  keywords: ['accessibilità', 'wcag', 'formazione', 'e-learning', 'regione basilicata', 'corsi online'],
  authors: [{ name: 'Regione Basilicata' }],
  openGraph: {
    title: 'Formazione Accessibilità | Regione Basilicata',
    description: 'Piattaforma e-learning per la formazione sull\'accessibilità digitale',
    url: 'https://accessibilita.regione.basilicata.it',
    siteName: 'Formazione Accessibilità Basilicata',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={outfit.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
