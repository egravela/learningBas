'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardCheck, ExternalLink, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import type { Quiz, Course } from '@/lib/api';
import { stripHtml } from '@/lib/utils';
import SafeHtml from '@/components/SafeHtml';

interface QuizViewProps {
  quiz: Quiz;
  course: Course;
  wpQuizUrl: string;
}

export default function QuizView({ quiz, course, wpQuizUrl }: QuizViewProps) {
  const quizTitle = quiz.title?.rendered ? stripHtml(quiz.title.rendered) : 'Quiz';
  const courseTitle = course.title?.rendered ? stripHtml(course.title.rendered) : 'Corso';

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              href={`/corsi/${course.id}`} 
              className="inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors"
              style={{ color: 'white' }}
            >
              <ArrowLeft className="w-4 h-4 text-white" />
              <span className="text-white">Torna al corso</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                <ClipboardCheck className="w-4 h-4" />
                Quiz di Valutazione
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {quizTitle}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="w-5 h-5" />
                  <span>{courseTitle}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-5 h-5" />
                  <span>Tempo illimitato</span>
                </div>
              </div>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/30 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ClipboardCheck className="w-24 h-24 text-white/50" />
              </div>
            </motion.div>
          </div>
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
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50"
          >
            {/* Quiz Description */}
            {quiz.content?.rendered && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Informazioni sul Quiz
                </h2>
                <SafeHtml
                  html={quiz.content.rendered}
                  className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600"
                />
              </div>
            )}

            {/* Quiz Info */}
            <div className="bg-amber-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" />
                Prima di iniziare
              </h3>
              <ul className="space-y-2 text-amber-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  Assicurati di aver completato tutte le lezioni del corso
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  Il quiz verrà aperto in una nuova finestra su WordPress
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  I risultati saranno salvati automaticamente nel tuo profilo
                </li>
              </ul>
            </div>

            {/* Start Quiz Button */}
            <a
              href={wpQuizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <ClipboardCheck className="w-5 h-5" />
              Inizia il Quiz
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

            <p className="text-center text-slate-500 text-sm mt-4">
              Il quiz si aprirà in una nuova finestra
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

