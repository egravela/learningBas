'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, FileText, ChevronLeft, ChevronRight, PlayCircle, ClipboardCheck, Layers } from 'lucide-react';
import Link from 'next/link';
import type { Lesson, Course, Topic, Quiz } from '@/lib/api';
import { stripHtml } from '@/lib/utils';
import SafeHtml from '@/components/SafeHtml';

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
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  courseId: number;
  allLessons?: Lesson[];
  topics?: Topic[];
  quizzes?: Quiz[];
  isLastLesson?: boolean;
}

export default function LessonView({ 
  lesson, 
  course, 
  prevLesson, 
  nextLesson, 
  courseId, 
  allLessons = [],
  topics = [],
  quizzes = [],
  isLastLesson = false
}: LessonViewProps) {
  const lessonTitle = lesson.title?.rendered ? stripHtml(lesson.title.rendered) : 'Lezione';
  const courseTitle = course.title?.rendered ? stripHtml(course.title.rendered) : 'Corso';
  const prevLessonTitle = prevLesson?.title?.rendered ? stripHtml(prevLesson.title.rendered) : 'Lezione Precedente';
  const nextLessonTitle = nextLesson?.title?.rendered ? stripHtml(nextLesson.title.rendered) : 'Lezione Successiva';

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 overflow-hidden">
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
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna al corso
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
                <BookOpen className="w-4 h-4" />
                Lezione
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {lessonTitle}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <FileText className="w-5 h-5" />
                  <span>{courseTitle}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-5 h-5" />
                  <span>Online</span>
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
                <BookOpen className="w-24 h-24 text-white/50" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Contenuto della Lezione
                </h2>
                <SafeHtml
                  html={lesson.content.rendered}
                  className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
                />
              </div>

              {/* Topics Section */}
              {topics.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 mb-8">
                  <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-500" />
                        Argomenti della Lezione
                      </h3>
                      <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                        {topics.length} {topics.length === 1 ? 'argomento' : 'argomenti'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-100">
                    {topics.map((topic, index) => (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="p-6"
                      >
                        <h4 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          {topic.title?.rendered ? stripHtml(topic.title.rendered) : `Argomento ${index + 1}`}
                        </h4>
                        <SafeHtml
                          html={topic.content.rendered}
                          className="prose prose-sm prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz Section - Only show on last lesson */}
              {isLastLesson && quizzes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 shadow-lg mb-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <ClipboardCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Complimenti! Hai completato tutte le lezioni
                      </h3>
                      <p className="text-white/80 text-sm">
                        Ora puoi sostenere il quiz di valutazione
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {quizzes.map((quiz) => (
                      <Link
                        key={quiz.id}
                        href={`/corsi/${courseId}/quiz/${quiz.id}`}
                        className="block"
                      >
                        <div className="bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-all duration-200 flex items-center gap-3">
                          <ClipboardCheck className="w-5 h-5 text-white" />
                          <span className="text-white font-medium flex-grow">
                            {quiz.title?.rendered ? stripHtml(quiz.title.rendered) : 'Quiz'}
                          </span>
                          <span className="text-white/80 text-sm">Inizia →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Navigation Links */}
              <div className="grid md:grid-cols-2 gap-6">
            {/* Previous Lesson */}
            {prevLesson ? (
              <Link href={`/corsi/${courseId}/lezioni/${prevLesson.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-500/10 border-2 border-slate-100 hover:border-emerald-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-500 flex items-center justify-center transition-colors">
                      <ChevronLeft className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-500 mb-1">Lezione Precedente</p>
                      <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                        {prevLessonTitle}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-100 opacity-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400 mb-1">Lezione Precedente</p>
                    <h3 className="font-semibold text-slate-400">Nessuna lezione precedente</h3>
                  </div>
                </div>
              </div>
            )}

            {/* Next Lesson */}
            {nextLesson ? (
              <Link href={`/corsi/${courseId}/lezioni/${nextLesson.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-500/10 border-2 border-slate-100 hover:border-emerald-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-sm text-slate-500 mb-1">Lezione Successiva</p>
                      <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                        {nextLessonTitle}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-500 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-100 opacity-50">
                <div className="flex items-center gap-4">
                  <div className="flex-1 text-right">
                    <p className="text-sm text-slate-400 mb-1">Lezione Successiva</p>
                    <h3 className="font-semibold text-slate-400">Nessuna lezione successiva</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center">
                    <ChevronRight className="w-6 h-6 text-slate-400" />
                  </div>
                </div>
              </div>
            )}
              </div>
            </motion.div>

            {/* Sidebar - Lessons List */}
            {allLessons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 sticky top-24">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Lezioni del Corso
                  </h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {allLessons.map((l, index) => {
                      const isActive = l.id === lesson.id;
                      return (
                        <Link
                          key={l.id}
                          href={`/corsi/${courseId}/lezioni/${l.id}`}
                          className="no-underline"
                        >
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-emerald-50 border-2 border-emerald-400'
                                : 'hover:bg-slate-50 border-2 border-transparent'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                              isActive
                                ? 'bg-emerald-500 text-white'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                isActive ? 'text-emerald-700' : 'text-slate-700'
                              }`}>
                                {l.title?.rendered ? stripHtml(l.title.rendered) : `Lezione ${index + 1}`}
                              </p>
                            </div>
                            {isActive && (
                              <PlayCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

