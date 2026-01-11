'use client';

import { motion } from 'framer-motion';
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
  FolderOpen,
  Video,
  Target,
  ExternalLink,
  Download
} from 'lucide-react';
import type { Course, Lesson, Quiz, MaterialeDidattico, LezioneConDocente, EsercizioAccessibile } from '@/lib/api';
import { stripHtml } from '@/lib/utils';
import SafeHtml from '@/components/SafeHtml';

interface CourseDetailProps {
  course: Course;
  lessons: Lesson[];
  quizzes?: Quiz[];
  materialiDidattici?: MaterialeDidattico[];
  lezioniConDocente?: LezioneConDocente[];
  eserciziAccessibili?: EsercizioAccessibile[];
  currentLessonId?: number;
  isAuthenticated?: boolean;
}

export default function CourseDetail({ 
  course, 
  lessons, 
  quizzes = [], 
  materialiDidattici = [],
  lezioniConDocente = [],
  eserciziAccessibili = [],
  currentLessonId, 
  isAuthenticated = false 
}: CourseDetailProps) {
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

              {/* Lessons */}
              {lessons.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100">
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        Contenuto del Corso
                      </h2>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        {lessons.length} lezioni
                      </span>
                    </div>
                  </div>
                  
                  {/* Lessons List */}
                  <div className="p-3">
                    {lessons.map((lesson, index) => {
                      const isActive = currentLessonId === lesson.id;
                      const isFirst = index === 0;
                      const isLast = index === lessons.length - 1;
                      
                      return (
                        <Link
                          key={lesson.id}
                          href={`/corsi/${course.id}/lezioni/${lesson.id}`}
                          className="block"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.03 }}
                            className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                              isActive
                                ? 'bg-emerald-50 shadow-sm'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            {/* Number Badge */}
                            <div className="relative">
                              <span className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                isActive
                                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                                  : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-emerald-500/20'
                              }`}>
                                {index + 1}
                              </span>
                              {/* Connector Line */}
                              {!isLast && (
                                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-200" />
                              )}
                            </div>
                            
                            {/* Lesson Title */}
                            <div className="flex-grow min-w-0">
                              <span className={`text-sm block truncate transition-colors duration-200 ${
                                isActive
                                  ? 'text-emerald-700 font-medium'
                                  : 'text-slate-600 group-hover:text-slate-900'
                              }`}>
                                {lesson.title?.rendered ? stripHtml(lesson.title.rendered) : `Lezione ${index + 1}`}
                              </span>
                            </div>
                            
                            {/* Play Icon */}
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                              isActive
                                ? 'bg-emerald-500/20'
                                : 'bg-transparent group-hover:bg-emerald-100'
                            }`}>
                              <PlayCircle className={`w-3.5 h-3.5 transition-all duration-200 ${
                                isActive
                                  ? 'text-emerald-600'
                                  : 'text-slate-400 group-hover:text-emerald-500 group-hover:scale-110'
                              }`} />
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quizzes */}
              {quizzes.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100">
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4 text-amber-500" />
                        Quiz di Valutazione
                      </h2>
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        {quizzes.length} {quizzes.length === 1 ? 'quiz' : 'quiz'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Quiz List */}
                  <div className="p-3">
                    {quizzes.map((quiz, index) => (
                      <Link
                        key={quiz.id}
                        href={isAuthenticated ? `/corsi/${course.id}/quiz/${quiz.id}` : '/login'}
                        className="block"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-amber-50"
                        >
                          {/* Quiz Icon */}
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all duration-200">
                            <ClipboardCheck className="w-3.5 h-3.5" />
                          </div>
                          
                          {/* Quiz Title */}
                          <div className="flex-grow min-w-0">
                            <span className="text-sm text-slate-600 group-hover:text-slate-900 block truncate transition-colors duration-200">
                              {quiz.title?.rendered ? stripHtml(quiz.title.rendered) : `Quiz ${index + 1}`}
                            </span>
                          </div>
                          
                          {/* Arrow */}
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-transparent group-hover:bg-amber-100 transition-all duration-200">
                            <PlayCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-all duration-200" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Materiali Didattici */}
              {materialiDidattici.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100">
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-blue-500" />
                        Materiali Didattici
                      </h2>
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {materialiDidattici.length} {materialiDidattici.length === 1 ? 'file' : 'file'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Materials List */}
                  <div className="p-3">
                    {materialiDidattici.map((materiale, index) => (
                      <a
                        key={materiale.id}
                        href={materiale.meta?.link_al_pdf || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-blue-50"
                        >
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">
                            <Download className="w-3.5 h-3.5" />
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <span className="text-sm text-slate-600 group-hover:text-slate-900 block truncate transition-colors duration-200">
                              {materiale.title?.rendered ? stripHtml(materiale.title.rendered) : `Materiale ${index + 1}`}
                            </span>
                            {materiale.meta?.tipologia && (
                              <span className="text-xs text-slate-400">{materiale.meta.tipologia}</span>
                            )}
                          </div>
                          
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-transparent group-hover:bg-blue-100 transition-all duration-200">
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-all duration-200" />
                          </div>
                        </motion.div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Lezioni con Docente */}
              {lezioniConDocente.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100">
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <Video className="w-4 h-4 text-purple-500" />
                        Lezioni con Docente
                      </h2>
                      <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        {lezioniConDocente.length} {lezioniConDocente.length === 1 ? 'lezione' : 'lezioni'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Lessons List */}
                  <div className="p-3">
                    {lezioniConDocente.map((lezione, index) => (
                      <div key={lezione.id} className="mb-3 last:mb-0">
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="p-4 rounded-xl bg-slate-50 hover:bg-purple-50 transition-all duration-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                              <Video className="w-4 h-4" />
                            </div>
                            
                            <div className="flex-grow min-w-0">
                              <h3 className="text-sm font-medium text-slate-800 mb-1">
                                {lezione.title?.rendered ? stripHtml(lezione.title.rendered) : `Lezione ${index + 1}`}
                              </h3>
                              {lezione.meta?.sottotitolo && (
                                <p className="text-xs text-slate-500 mb-2">{lezione.meta.sottotitolo}</p>
                              )}
                              
                              {/* Links */}
                              <div className="flex flex-wrap gap-2">
                                {lezione.meta?.link_alla_video_conferenza && (
                                  <a
                                    href={lezione.meta.link_alla_video_conferenza}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md hover:bg-purple-200 transition-colors"
                                  >
                                    <Video className="w-3 h-3" />
                                    Video
                                  </a>
                                )}
                                {lezione.meta?.link_alle_slide && (
                                  <a
                                    href={lezione.meta.link_alle_slide}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200 transition-colors"
                                  >
                                    <FileText className="w-3 h-3" />
                                    Slide
                                  </a>
                                )}
                                {lezione.meta?.link_alle_slide_2 && (
                                  <a
                                    href={lezione.meta.link_alle_slide_2}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200 transition-colors"
                                  >
                                    <FileText className="w-3 h-3" />
                                    Slide 2
                                  </a>
                                )}
                                {lezione.meta?.link_alle_slide_3 && (
                                  <a
                                    href={lezione.meta.link_alle_slide_3}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200 transition-colors"
                                  >
                                    <FileText className="w-3 h-3" />
                                    Slide 3
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Esercizi Accessibili */}
              {eserciziAccessibili.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100">
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <Target className="w-4 h-4 text-teal-500" />
                        Esercizi Accessibili
                      </h2>
                      <span className="px-2.5 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                        {eserciziAccessibili.length} {eserciziAccessibili.length === 1 ? 'esercizio' : 'esercizi'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Exercises List */}
                  <div className="p-3">
                    {eserciziAccessibili.map((esercizio, index) => (
                      <motion.div
                        key={esercizio.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-teal-50"
                      >
                        <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all duration-200">
                          <Target className="w-3.5 h-3.5" />
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <span className="text-sm text-slate-600 group-hover:text-slate-900 block truncate transition-colors duration-200">
                            {esercizio.title?.rendered ? stripHtml(esercizio.title.rendered) : `Esercizio ${index + 1}`}
                          </span>
                        </div>
                      </motion.div>
                    ))}
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

