'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import CourseCard from './CourseCard';
import type { Course } from '@/lib/api';

interface CoursesSectionProps {
  courses: Course[];
  title?: string;
  subtitle?: string;
}

export default function CoursesSection({ 
  courses, 
  title = 'I Nostri Corsi',
  subtitle = 'Esplora il catalogo completo dei corsi sulla formazione in accessibilità digitale'
}: CoursesSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4"
          >
            <BookOpen className="w-4 h-4" />
            Catalogo Corsi
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
          >
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {title.split(' ').slice(-1)}
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              Nessun corso disponibile
            </h3>
            <p className="text-slate-500">
              I corsi saranno disponibili a breve. Torna presto!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

