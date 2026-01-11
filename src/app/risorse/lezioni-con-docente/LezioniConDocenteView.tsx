'use client';

import { motion } from 'framer-motion';
import { Video, FileText, ExternalLink, Play } from 'lucide-react';
import Link from 'next/link';
import type { LezioneConDocente } from '@/lib/api';
import { stripHtml } from '@/lib/utils';

interface LezioniConDocenteViewProps {
  lezioni: LezioneConDocente[];
}

export default function LezioniConDocenteView({ lezioni }: LezioniConDocenteViewProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6"
          >
            <Video className="w-4 h-4" />
            Risorse
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Lezioni con Docente
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Partecipa alle lezioni live e accedi alle registrazioni e slide
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {lezioni.length > 0 ? (
            <div className="space-y-6">
              {lezioni.map((lezione, index) => (
                <motion.div
                  key={lezione.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Video className="w-8 h-8 text-purple-600" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {lezione.title?.rendered ? stripHtml(lezione.title.rendered) : 'Lezione'}
                      </h3>
                      
                      {lezione.meta?.sottotitolo && (
                        <p className="text-slate-600 mb-4">{lezione.meta.sottotitolo}</p>
                      )}

                      {lezione.meta?.descrizione && (
                        <p className="text-slate-500 text-sm mb-4">{lezione.meta.descrizione}</p>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap gap-3">
                        {lezione.meta?.link_alla_video_conferenza && (
                          <a
                            href={lezione.meta.link_alla_video_conferenza}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            Guarda Video
                          </a>
                        )}
                        
                        {lezione.meta?.link_alle_slide && (
                          <a
                            href={lezione.meta.link_alle_slide}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Slide
                          </a>
                        )}

                        {lezione.meta?.link_alle_slide_2 && (
                          <a
                            href={lezione.meta.link_alle_slide_2}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Slide 2
                          </a>
                        )}

                        {lezione.meta?.link_alle_slide_3 && (
                          <a
                            href={lezione.meta.link_alle_slide_3}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Slide 3
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-700 mb-2">
                Nessuna lezione disponibile
              </h2>
              <p className="text-slate-500">
                Le lezioni con docente verranno aggiunte prossimamente
              </p>
              <Link
                href="/corsi"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors"
              >
                Vai ai corsi
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

