import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseDetail from './CourseDetail';
import { getCourse, getCourseLessons } from '@/lib/api';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(Number(id));
  
  if (!course) {
    return {
      title: 'Corso non trovato | Formazione Accessibilità',
    };
  }

  const title = course.title?.rendered?.replace(/<[^>]*>/g, '') || 'Corso';
  
  return {
    title: `${title} | Formazione Accessibilità - Regione Basilicata`,
    description: course.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Corso sulla formazione in accessibilità digitale',
  };
}

export const revalidate = 60;

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const courseId = Number(id);
  
  const [course, lessons] = await Promise.all([
    getCourse(courseId),
    getCourseLessons(courseId),
  ]);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} lessons={lessons} />;
}

