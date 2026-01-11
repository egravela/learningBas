import { Metadata } from 'next';
import CoursesSection from '@/components/CoursesSection';
import PageTransition from '@/components/PageTransition';
import { getPublicCourses } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Tutti i Corsi | Formazione Accessibilità - Regione Basilicata',
  description: 'Scopri tutti i corsi disponibili sulla formazione in accessibilità digitale della Regione Basilicata.',
};

export const revalidate = 60;

export default async function CorsiPage() {
  const courses = await getPublicCourses(1, 50);

  return (
    <PageTransition>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Catalogo Corsi
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Esplora tutti i corsi disponibili e inizia il tuo percorso formativo 
            sull&apos;accessibilità digitale.
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Courses List */}
      <CoursesSection 
        courses={courses}
        title="Tutti i Corsi"
        subtitle="Scegli tra i nostri corsi per migliorare le tue competenze sull'accessibilità"
      />
    </PageTransition>
  );
}

