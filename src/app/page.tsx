import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CoursesSection from '@/components/CoursesSection';
import { getPublicCourses } from '@/lib/api';

export const revalidate = 60; // Rigenera ogni 60 secondi

export default async function HomePage() {
  const courses = await getPublicCourses(1, 6);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CoursesSection 
        courses={courses} 
        title="Corsi in Evidenza"
        subtitle="Inizia il tuo percorso formativo con i nostri corsi più popolari"
      />
    </>
  );
}
