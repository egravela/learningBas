'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 shadow-lg shadow-emerald-500/25"
        >
          <BookOpen className="w-10 h-10 text-white" />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            Caricamento...
          </h2>
          <p className="text-slate-500">
            Un momento, stiamo preparando i contenuti
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-48 h-1.5 bg-slate-200 rounded-full mt-6 mx-auto overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-full w-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}

