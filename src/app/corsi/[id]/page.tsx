import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseDetail from './CourseDetail';
import { getCourse, getCourseLessons } from '@/lib/api';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

import { stripHtml } from '@/lib/utils';

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(Number(id));
  
  if (!course) {
    return {
      title: 'Corso non trovato | Formazione Accessibilità',
    };
  }

  const title = course.title?.rendered ? stripHtml(course.title.rendered) : 'Corso';
  const description = course.excerpt?.rendered ? stripHtml(course.excerpt.rendered).slice(0, 160) : 'Corso sulla formazione in accessibilità digitale';
  
  return {
    title: `${title} | Formazione Accessibilità - Regione Basilicata`,
    description,
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

