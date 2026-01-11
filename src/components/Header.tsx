'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Home, LogIn, LogOut, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Logo from './Logo';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/corsi', label: 'Corsi', icon: BookOpen },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  // Nascondi header nella pagina di login
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Non renderizzare l'header nella pagina di login
  if (isLoginPage) {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-emerald-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo o Titolo */}
          <Link href="/" className="relative z-10">
            {isScrolled ? (
              // Quando sticky, mostra solo il titolo
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <h1 className="text-xl font-bold text-slate-900">
                  LearningBas
                </h1>
              </motion.div>
            ) : (
              // Quando non sticky, mostra il logo
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3"
              >
                <Logo 
                  variant="light" 
                  className="h-14"
                />
              </motion.div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 no-underline ${
                      isScrolled
                        ? 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50'
                        : 'text-white hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    {item.label}
                  </Link>
              </motion.div>
            ))}

            {/* Auth Section */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {status === 'loading' ? (
                <div className={`px-6 py-2.5 rounded-full ${isScrolled ? 'bg-slate-100' : 'bg-white/10'}`}>
                  <div className="w-16 h-4 skeleton rounded" />
                </div>
              ) : session ? (
                <div className="flex items-center gap-3">
                  {/* User Info */}
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 no-underline ${
                      isScrolled
                        ? 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50'
                        : 'text-white hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isScrolled ? 'bg-emerald-100 text-emerald-600' : 'bg-white/20 text-white'
                      }`}>
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <span className="font-medium hidden lg:block">
                      {session.user?.name || session.user?.email?.split('@')[0]}
                    </span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleSignOut}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 no-underline ${
                      isScrolled
                        ? 'text-slate-500 hover:text-red-600 hover:bg-red-50'
                        : 'text-white hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:block">Esci</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    isScrolled
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5'
                      : 'bg-white text-emerald-600 hover:bg-emerald-50 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Accedi
                </Link>
              )}
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-emerald-100"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4"
              >
                {session ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl">
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-800">
                          {session.user?.name || 'Utente'}
                        </p>
                        <p className="text-sm text-slate-500">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      Esci
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25"
                  >
                    <LogIn className="w-5 h-5" />
                    Accedi
                  </Link>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
