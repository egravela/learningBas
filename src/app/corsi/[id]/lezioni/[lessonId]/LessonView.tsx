'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Lock } from 'lucide-react';
import Link from 'next/link';
import type { Lesson, Course } from '@/lib/api';
import { stripHtml } from '@/lib/utils';

interface LessonViewProps {
  lesson: Lesson;
  course: Course;
  wpLessonUrl: string;
  session: {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
    };
    wpToken?: string;
  } | null;
}

export default function LessonView({ lesson, course, wpLessonUrl, session }: LessonViewProps) {
  const router = useRouter();
  const lessonTitle = lesson.title?.rendered ? stripHtml(lesson.title.rendered) : 'Lezione';
  const courseTitle = course.title?.rendered ? stripHtml(course.title.rendered) : 'Corso';

  useEffect(() => {
    // Se abbiamo il token WordPress, reindirizza direttamente alla lezione su WordPress
    if (session?.wpToken) {
      // Crea un form temporaneo per autenticarsi su WordPress
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `${process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://accessibilita.regione.basilicata.it'}/wp-login.php`;
      
      // Aggiungi campi per l'autenticazione
      const usernameField = document.createElement('input');
      usernameField.type = 'hidden';
      usernameField.name = 'log';
      usernameField.value = session.user?.email || '';
      
      const passwordField = document.createElement('input');
      passwordField.type = 'hidden';
      passwordField.name = 'pwd';
      passwordField.value = 'temp'; // Non possiamo usare la password reale
      
      const redirectField = document.createElement('input');
      redirectField.type = 'hidden';
      redirectField.name = 'redirect_to';
      redirectField.value = wpLessonUrl;
      
      form.appendChild(usernameField);
      form.appendChild(passwordField);
      form.appendChild(redirectField);
      document.body.appendChild(form);
      
      // Invece di inviare il form, apri direttamente la lezione in una nuova scheda
      // con autenticazione tramite cookie se disponibile
      window.open(wpLessonUrl, '_blank');
      
      // Torna indietro dopo un momento
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }, [session, wpLessonUrl, router]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/corsi/${course.id}`}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div className="flex-1">
              <Link
                href={`/corsi/${course.id}`}
                className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
              >
                {courseTitle}
              </Link>
              <h1 className="text-xl font-bold text-slate-900 mt-1">
                {lessonTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50"
        >
          {session?.wpToken ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Reindirizzamento alla lezione...
              </h2>
              <p className="text-slate-600 mb-6">
                Stai per essere reindirizzato alla lezione su WordPress.
              </p>
              <a
                href={wpLessonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Apri la lezione
              </a>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Autenticazione richiesta
              </h2>
              <p className="text-slate-600 mb-6">
                Devi essere autenticato per accedere a questa lezione.
              </p>
              <Link
                href={`/login?redirect=${encodeURIComponent(`/corsi/${course.id}/lezioni/${lesson.id}`)}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Accedi
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

