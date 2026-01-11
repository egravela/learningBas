'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, ArrowRight, Users } from 'lucide-react';
import type { Course } from '@/lib/api';

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  // Rimuovi tag HTML dal titolo e dall'estratto
  const title = course.title?.rendered?.replace(/<[^>]*>/g, '') || 'Corso';
  const excerpt = course.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 150) || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/corsi/${course.id}`} className="group block h-full">
        <article className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500">
            {course.featured_image_url ? (
              <Image
                src={course.featured_image_url}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
              </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-emerald-600 text-xs font-semibold shadow-lg">
                <BookOpen className="w-3.5 h-3.5" />
                Corso
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
              {title}
            </h3>
            
            {excerpt && (
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Online</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>Tutti i livelli</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center text-emerald-600 font-semibold text-sm group/cta">
              <span>Scopri il corso</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/cta:translate-x-1 group-hover:translate-x-2" />
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-emerald-100/50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </article>
      </Link>
    </motion.div>
  );
}

