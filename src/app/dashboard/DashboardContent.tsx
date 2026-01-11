'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  User, 
  BookOpen, 
  Award, 
  Clock, 
  ArrowRight,
  GraduationCap,
  TrendingUp
} from 'lucide-react';

interface DashboardContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | undefined;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            {/* Avatar */}
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User'}
                width={80}
                height={80}
                className="w-20 h-20 rounded-2xl shadow-xl"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <User className="w-10 h-10 text-white" />
              </div>
            )}

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Ciao, {user?.name || 'Studente'}! 👋
              </h1>
              <p className="text-white/80">
                Bentornato nella tua area personale
              </p>
            </div>
          </motion.div>
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

      {/* Dashboard Content */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              { icon: BookOpen, label: 'Corsi Iscritti', value: '0', color: 'emerald' },
              { icon: GraduationCap, label: 'Corsi Completati', value: '0', color: 'blue' },
              { icon: Clock, label: 'Ore di Studio', value: '0', color: 'purple' },
              { icon: Award, label: 'Certificati', value: '0', color: 'orange' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">I Tuoi Corsi</h2>
                  <Link
                    href="/corsi"
                    className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    Esplora tutti
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Empty State */}
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Non sei ancora iscritto a nessun corso
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Esplora il catalogo e inizia il tuo percorso formativo
                  </p>
                  <Link
                    href="/corsi"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5" />
                    Scopri i Corsi
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Progress & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Progress Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Il Tuo Progresso
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Progresso Generale</span>
                      <span className="font-semibold text-slate-900">0%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-sm mt-4">
                  Inizia un corso per vedere i tuoi progressi qui.
                </p>
              </div>

              {/* User Info Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Il Tuo Profilo</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 opacity-80" />
                    <span>{user?.name || 'Utente'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center opacity-80">@</span>
                    <span className="text-sm opacity-90">{user?.email}</span>
                  </div>
                </div>

                <a
                  href="https://accessibilita.regione.basilicata.it/wp-admin/profile.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full text-center py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
                >
                  Modifica Profilo su WordPress
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

