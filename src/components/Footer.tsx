'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://accessibilita.regione.basilicata.it/wp-content/uploads/2024/08/RB_logo_350x163.gif"
                alt="Regione Basilicata"
                width={175}
                height={82}
                className="h-16 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-md mb-6">
              Piattaforma di e-learning della Regione Basilicata per la formazione 
              sull&apos;accessibilità digitale. Impara a creare contenuti e servizi 
              accessibili a tutti.
            </p>
            <div className="flex items-center gap-2 text-emerald-400">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Formazione Accessibilità</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Link Rapidi</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/corsi', label: 'Tutti i Corsi' },
                { href: '/login', label: 'Accedi' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://accessibilita.regione.basilicata.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors" />
                  Portale Accessibilità
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Via Vincenzo Verrastro, 4<br />85100 Potenza (PZ)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>0971 668111</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <a 
                  href="mailto:accessibilita@regione.basilicata.it"
                  className="hover:text-emerald-400 transition-colors"
                >
                  accessibilita@regione.basilicata.it
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} Regione Basilicata. Tutti i diritti riservati.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Note Legali</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

