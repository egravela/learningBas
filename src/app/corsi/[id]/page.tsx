import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseDetail from './CourseDetail';
import { 
  getCourse, 
  getCourseLessons, 
  getCourseQuizzes,
  getLessonTopics,
  type Lesson,
  type Topic
} from '@/lib/api';
import { auth } from '@/lib/auth';

import type { Quiz } from '@/lib/api';

// Tipo per lezione con i suoi topic e quiz
export interface LessonWithContent extends Lesson {
  topics: Topic[];
  quizzes: Quiz[];
}

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
  
  const [course, lessons, quizzes, session] = await Promise.all([
    getCourse(courseId),
    getCourseLessons(courseId),
    getCourseQuizzes(courseId),
    auth(),
  ]);

  if (!course) {
    notFound();
  }

  // Carica i topic per ogni lezione e associa i quiz
  const lessonsWithContent: LessonWithContent[] = await Promise.all(
    lessons.map(async (lesson) => {
      const topics = await getLessonTopics(lesson.id, courseId);
      // Filtra i quiz che appartengono a questa lezione
      const lessonQuizzes = quizzes.filter(quiz => quiz.lesson === lesson.id);
      return {
        ...lesson,
        topics,
        quizzes: lessonQuizzes,
      };
    })
  );

  // Quiz non associati a nessuna lezione (quiz del corso)
  const courseQuizzes = quizzes.filter(quiz => !quiz.lesson || quiz.lesson === 0);

  return (
    <CourseDetail 
      course={course} 
      lessons={lessonsWithContent} 
      courseQuizzes={courseQuizzes}
      isAuthenticated={!!session} 
    />
  );
}

