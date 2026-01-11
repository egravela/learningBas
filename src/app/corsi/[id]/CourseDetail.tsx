'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle, 
  PlayCircle,
  ArrowLeft,
  Award,
  FileText,
  ClipboardCheck,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import type { Course, Lesson, Quiz, Topic } from '@/lib/api';
import { stripHtml } from '@/lib/utils';
import SafeHtml from '@/components/SafeHtml';

// Tipo per lezione con i suoi topic
interface LessonWithTopics extends Lesson {
  topics: Topic[];
}

interface CourseDetailProps {
  course: Course;
  lessons: LessonWithTopics[];
  quizzes?: Quiz[];
  currentLessonId?: number;
  isAuthenticated?: boolean;
}

export default function CourseDetail({ 
  course, 
  lessons, 
  quizzes = [], 
  currentLessonId, 
  isAuthenticated = false 
}: CourseDetailProps) {
  // Stato per tenere traccia delle lezioni espanse
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set());
  
  const toggleLesson = (lessonId: number) => {
    setExpandedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };
  const title = course.title?.rendered ? stripHtml(course.title.rendered) : 'Corso';
  
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
              href="/corsi" 
              className="inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors"
              style={{ color: 'white' }}
            >
              <ArrowLeft className="w-4 h-4 text-white" />
              <span className="text-white">Torna ai corsi</span>
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
                Corso di Formazione
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-5 h-5" />
                  <span>Online</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="w-5 h-5" />
                  <span>Tutti i livelli</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <FileText className="w-5 h-5" />
                  <span>{lessons.length} Lezioni</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-full font-bold shadow-2xl shadow-black/20 hover:shadow-emerald-900/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <PlayCircle className="w-5 h-5" />
                  Inizia il Corso
                </Link>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                {course.featured_image_url ? (
                  <Image
                    src={course.featured_image_url}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white" />
                    </div>
                  </div>
                )}
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
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Descrizione del Corso
                </h2>
                <SafeHtml
                  html={course.content.rendered}
                  className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline"
                />
              </div>

              {/* Contenuto del Corso - Struttura Gerarchica */}
              {(lessons.length > 0 || quizzes.length > 0) && (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100">
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        Contenuto del Corso
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          {lessons.length} lezioni
                        </span>
                        {quizzes.length > 0 && (
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                            {quizzes.length} quiz
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hierarchical Content */}
                  <div className="p-3">
                    {/* Lezioni con Topic */}
                    {lessons.map((lesson, index) => {
                      const isActive = currentLessonId === lesson.id;
                      const hasTopics = lesson.topics && lesson.topics.length > 0;
                      const isExpanded = expandedLessons.has(lesson.id);
                      const isLast = index === lessons.length - 1 && quizzes.length === 0;
                      
                      return (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.03 }}
                          className="relative"
                        >
                          {/* Linea connettore verticale */}
                          {!isLast && (
                            <div className="absolute left-[13px] top-10 bottom-0 w-0.5 bg-slate-200" />
                          )}
                          
                          {/* Lesson Row */}
                          <div className="flex items-center gap-2">
                            {/* Toggle + Number */}
                            <button
                              onClick={() => hasTopics && toggleLesson(lesson.id)}
                              className={`relative z-10 w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                isActive
                                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                                  : hasTopics
                                  ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white cursor-pointer'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {hasTopics ? (
                                isExpanded ? (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5" />
                                )
                              ) : (
                                index + 1
                              )}
                            </button>
                            
                            {/* Lesson Link */}
                            <Link
                              href={`/corsi/${course.id}/lezioni/${lesson.id}`}
                              className="flex-grow group"
                            >
                              <div className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                                isActive
                                  ? 'bg-emerald-50'
                                  : 'hover:bg-slate-50'
                              }`}>
                                <div className="flex-grow min-w-0">
                                  <span className={`text-sm block truncate transition-colors duration-200 ${
                                    isActive
                                      ? 'text-emerald-700 font-medium'
                                      : 'text-slate-700 group-hover:text-slate-900'
                                  }`}>
                                    {lesson.title?.rendered ? stripHtml(lesson.title.rendered) : `Lezione ${index + 1}`}
                                  </span>
                                  {hasTopics && (
                                    <span className="text-xs text-slate-400">
                                      {lesson.topics.length} argomenti
                                    </span>
                                  )}
                                </div>
                                
                                <PlayCircle className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                                  isActive
                                    ? 'text-emerald-500'
                                    : 'text-slate-400 group-hover:text-emerald-500'
                                }`} />
                              </div>
                            </Link>
                          </div>
                          
                          {/* Topics (Collapsible) */}
                          <AnimatePresence>
                            {hasTopics && isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-3 pl-4 border-l-2 border-emerald-200 mt-1 mb-2"
                              >
                                {lesson.topics.map((topic, topicIndex) => (
                                  <div
                                    key={topic.id}
                                    className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="w-5 h-5 rounded bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0 text-xs font-medium">
                                      {topicIndex + 1}
                                    </div>
                                    <span className="text-sm text-slate-600">
                                      {topic.title?.rendered ? stripHtml(topic.title.rendered) : `Argomento ${topicIndex + 1}`}
                                    </span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                    
                    {/* Quiz alla fine della gerarchia */}
                    {quizzes.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <div className="px-2 py-1 mb-2">
                          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                            <ClipboardCheck className="w-3 h-3" />
                            Quiz di Valutazione
                          </span>
                        </div>
                        {quizzes.map((quiz, index) => (
                          <Link
                            key={quiz.id}
                            href={isAuthenticated ? `/corsi/${course.id}/quiz/${quiz.id}` : '/login'}
                            className="block"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + (lessons.length + index) * 0.03 }}
                              className="group flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-amber-50"
                            >
                              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all duration-200">
                                <ClipboardCheck className="w-3.5 h-3.5" />
                              </div>
                              
                              <div className="flex-grow min-w-0">
                                <span className="text-sm text-slate-700 group-hover:text-slate-900 block truncate transition-colors duration-200">
                                  {quiz.title?.rendered ? stripHtml(quiz.title.rendered) : `Quiz ${index + 1}`}
                                </span>
                              </div>
                              
                              <PlayCircle className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-all duration-200" />
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Features - Prima */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Cosa imparerai
                </h3>
                <ul className="space-y-3">
                  {[
                    'Fondamenti dell\'accessibilità web',
                    'Linee guida WCAG 2.1',
                    'Tecniche di verifica',
                    'Best practices operative',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Info Card - Dopo, sticky */}
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-6">
                  Informazioni Corso
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Formato</span>
                    <span className="font-semibold text-slate-900">Online</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Lezioni</span>
                    <span className="font-semibold text-slate-900">{lessons.length}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Livello</span>
                    <span className="font-semibold text-slate-900">Tutti i livelli</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600">Accesso</span>
                    <span className="font-semibold text-slate-900">Illimitato</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-600">Certificato</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Incluso
                    </span>
                  </div>
                </div>

                {isAuthenticated ? (
                  <Link
                    href={lessons.length > 0 ? `/corsi/${course.id}/lezioni/${lessons[0].id}` : '#'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Inizia il corso
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Accedi per iniziare
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

