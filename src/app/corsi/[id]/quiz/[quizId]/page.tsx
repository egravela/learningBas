import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getQuiz, getCourse, getQuizQuestions } from '@/lib/api';
import QuizView from './QuizView';

interface QuizPageProps {
  params: Promise<{ id: string; quizId: string }>;
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { quizId } = await params;
  const quiz = await getQuiz(Number(quizId));
  
  if (!quiz) {
    return {
      title: 'Quiz non trovato | LearningBas',
    };
  }

  const title = quiz.title?.rendered?.replace(/<[^>]*>/g, '') || 'Quiz';
  
  return {
    title: `${title} | LearningBas`,
    description: 'Quiz di valutazione del corso',
  };
}

export const revalidate = 60;

export default async function QuizPage({ params }: QuizPageProps) {
  const session = await auth();
  
  // Verifica autenticazione
  if (!session) {
    redirect('/login?redirect=' + encodeURIComponent(`/corsi/${(await params).id}/quiz/${(await params).quizId}`));
  }

  const { id, quizId } = await params;
  const courseId = Number(id);
  const quizIdNum = Number(quizId);
  
  const [quiz, course, questions] = await Promise.all([
    getQuiz(quizIdNum),
    getCourse(courseId),
    getQuizQuestions(quizIdNum),
  ]);

  if (!quiz || !course) {
    redirect('/corsi');
  }

  // Costruisci l'URL WordPress del quiz
  const wpQuizUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://accessibilita.regione.basilicata.it'}/sfwd-quiz/${quiz.slug || `quiz-${quizId}`}`;

  return <QuizView quiz={quiz} course={course} wpQuizUrl={wpQuizUrl} questions={questions} courseId={courseId} />;
}

