'use client';

import { motion } from 'framer-motion';
import { 
  Accessibility, 
  Laptop, 
  Users, 
  FileCheck, 
  Clock, 
  Award,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Accessibility,
    title: 'Accessibilità Web',
    description: 'Impara le linee guida WCAG e le normative italiane ed europee per creare contenuti accessibili.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Laptop,
    title: 'Formazione Online',
    description: 'Segui i corsi quando vuoi, da qualsiasi dispositivo. Contenuti sempre disponibili.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Users,
    title: 'Per Tutti',
    description: 'Corsi pensati per dipendenti pubblici, web developer e content manager.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: FileCheck,
    title: 'Documenti Accessibili',
    description: 'Scopri come creare PDF, documenti Word e presentazioni accessibili.',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Clock,
    title: 'Flessibilità',
    description: 'Studia al tuo ritmo con accesso illimitato ai materiali didattici.',
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-50',
  },
  {
    icon: Award,
    title: 'Certificazione',
    description: 'Ottieni attestati di completamento per ogni corso terminato.',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4"
          >
            <Accessibility className="w-4 h-4" />
            Perché scegliere i nostri corsi
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
          >
            Formazione di{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Qualità
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            La piattaforma e-learning della Regione Basilicata offre corsi completi 
            e aggiornati sull&apos;accessibilità digitale.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full p-8 bg-white rounded-2xl shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} style={{ color: feature.color.includes('emerald') ? '#10b981' : feature.color.includes('blue') ? '#3b82f6' : feature.color.includes('purple') ? '#a855f7' : feature.color.includes('orange') ? '#f97316' : feature.color.includes('rose') ? '#f43f5e' : '#6366f1' }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/corsi"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            Scopri tutti i corsi
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

