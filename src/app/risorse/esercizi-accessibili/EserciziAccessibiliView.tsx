'use client';

import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { EsercizioAccessibile } from '@/lib/api';
import { stripHtml } from '@/lib/utils';

interface EserciziAccessibiliViewProps {
  esercizi: EsercizioAccessibile[];
}

export default function EserciziAccessibiliView({ esercizi }: EserciziAccessibiliViewProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-sky-600 overflow-hidden">
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
            <Target className="w-4 h-4" />
            Risorse
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Esercizi Accessibili
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Esercizi pratici per applicare i concetti di accessibilità web
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
          {esercizi.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {esercizi.map((esercizio, index) => (
                <motion.div
                  key={esercizio.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Image or Icon */}
                  <div className="h-40 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                    {esercizio.featured_image_url ? (
                      <Image
                        src={esercizio.featured_image_url}
                        alt={esercizio.title?.rendered ? stripHtml(esercizio.title.rendered) : 'Esercizio'}
                        width={400}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Target className="w-16 h-16 text-teal-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {esercizio.title?.rendered ? stripHtml(esercizio.title.rendered) : 'Esercizio'}
                    </h3>
                    
                    {esercizio.excerpt?.rendered && (
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        {stripHtml(esercizio.excerpt.rendered)}
                      </p>
                    )}

                    <div className="flex items-center text-teal-600 font-medium text-sm">
                      <span>Inizia esercizio</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-700 mb-2">
                Nessun esercizio disponibile
              </h2>
              <p className="text-slate-500">
                Gli esercizi accessibili verranno aggiunti prossimamente
              </p>
              <Link
                href="/corsi"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors"
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

