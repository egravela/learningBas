'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-9xl font-bold bg-gradient-to-br from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Pagina non trovata
        </h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          Ops! La pagina che stai cercando non esiste o è stata spostata. 
          Prova a tornare alla home o a cercare tra i nostri corsi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Torna alla Home
          </Link>

          <Link
            href="/corsi"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-full font-semibold border border-slate-200 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            Esplora i Corsi
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex items-center justify-center gap-2 text-slate-400">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">
            Usa i pulsanti sopra per navigare
          </span>
        </div>
      </motion.div>
    </div>
  );
}

