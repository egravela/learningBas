'use client';

import { motion } from 'framer-motion';
import { FolderOpen, Download, FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { MaterialeDidattico } from '@/lib/api';
import { stripHtml } from '@/lib/utils';

interface MaterialiDidatticiViewProps {
  materiali: MaterialeDidattico[];
}

export default function MaterialiDidatticiView({ materiali }: MaterialiDidatticiViewProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 overflow-hidden">
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
            <FolderOpen className="w-4 h-4" />
            Risorse
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Materiali Didattici
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Scarica dispense, guide e documenti per approfondire i contenuti dei corsi
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
          {materiali.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materiali.map((materiale, index) => (
                <motion.div
                  key={materiale.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={materiale.meta?.link_al_pdf || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                        <FileText className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {materiale.title?.rendered ? stripHtml(materiale.title.rendered) : 'Materiale'}
                        </h3>
                        {materiale.meta?.tipologia && (
                          <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full mb-2">
                            {materiale.meta.tipologia}
                          </span>
                        )}
                        {materiale.excerpt?.rendered && (
                          <p className="text-sm text-slate-500 line-clamp-2">
                            {stripHtml(materiale.excerpt.rendered)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Scarica PDF
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-700 mb-2">
                Nessun materiale disponibile
              </h2>
              <p className="text-slate-500">
                I materiali didattici verranno aggiunti prossimamente
              </p>
              <Link
                href="/corsi"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
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

