import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getLesson, getCourse, getCourseLessons } from '@/lib/api';
import LessonView from './LessonView';

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = await getLesson(Number(lessonId));
  
  if (!lesson) {
    return {
      title: 'Lezione non trovata | LearningBas',
    };
  }

  const title = lesson.title?.rendered?.replace(/<[^>]*>/g, '') || 'Lezione';
  
  return {
    title: `${title} | LearningBas`,
    description: 'Visualizza la lezione del corso',
  };
}

export const revalidate = 60;

export default async function LessonPage({ params }: LessonPageProps) {
  const session = await auth();
  
  // Verifica autenticazione
  if (!session) {
    redirect('/login?redirect=' + encodeURIComponent(`/corsi/${(await params).id}/lezioni/${(await params).lessonId}`));
  }

  const { id, lessonId } = await params;
  const courseId = Number(id);
  const lessonIdNum = Number(lessonId);
  
  const [lesson, course, allLessons] = await Promise.all([
    getLesson(lessonIdNum),
    getCourse(courseId),
    getCourseLessons(courseId),
  ]);

  if (!lesson || !course) {
    redirect('/corsi');
  }

  // Trova l'indice della lezione corrente e le lezioni precedente/successiva
  const currentIndex = allLessons.findIndex(l => l.id === lessonIdNum);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Costruisci l'URL WordPress della lezione (non usato ma mantenuto per compatibilità)
  const wpLessonUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://accessibilita.regione.basilicata.it'}/sfwd-lessons/${lesson.slug || `lesson-${lessonId}`}`;

  return (
    <LessonView 
      lesson={lesson} 
      course={course} 
      wpLessonUrl={wpLessonUrl} 
      session={session}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      courseId={courseId}
      allLessons={allLessons}
    />
  );
}

