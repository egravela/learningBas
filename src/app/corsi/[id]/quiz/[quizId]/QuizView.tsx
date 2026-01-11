'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ClipboardCheck, Clock, Award, CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import type { Quiz, Course, QuizQuestion } from '@/lib/api';
import { stripHtml } from '@/lib/utils';
import SafeHtml from '@/components/SafeHtml';

interface ParsedAnswer {
  id: string;
  text: string;
}

// Funzione per estrarre le risposte dal contenuto HTML della domanda
function extractAnswersFromContent(content: string): ParsedAnswer[] {
  const answers: ParsedAnswer[] = [];
  
  // Prova a trovare liste (ul/ol con li)
  const listItemRegex = /<li[^>]*>([^<]+)<\/li>/gi;
  let match;
  let index = 0;
  while ((match = listItemRegex.exec(content)) !== null) {
    answers.push({
      id: `answer_${index}`,
      text: stripHtml(match[1]).trim()
    });
    index++;
  }
  
  // Se non trova liste, prova con paragrafi che iniziano con lettere/numeri
  if (answers.length === 0) {
    const paragraphRegex = /<p[^>]*>([A-Za-z0-9][).:\s]+[^<]+)<\/p>/gi;
    while ((match = paragraphRegex.exec(content)) !== null) {
      answers.push({
        id: `answer_${index}`,
        text: stripHtml(match[1]).trim()
      });
      index++;
    }
  }
  
  // Prova anche con pattern tipo "A) risposta" o "1. risposta"
  if (answers.length === 0) {
    const lines = stripHtml(content).split(/\n|\r/).filter(line => line.trim());
    const optionRegex = /^[A-Za-z0-9][).:\s]+(.+)$/;
    lines.forEach((line, idx) => {
      const optionMatch = line.trim().match(optionRegex);
      if (optionMatch) {
        answers.push({
          id: `answer_${idx}`,
          text: optionMatch[1].trim()
        });
      }
    });
  }
  
  return answers;
}

// Funzione per ottenere le risposte da una domanda in qualsiasi formato
function getQuestionAnswers(question: QuizQuestion): ParsedAnswer[] {
  // 1. Se ci sono risposte recuperate dall'API separatamente
  if (question.fetchedAnswers && question.fetchedAnswers.length > 0) {
    return question.fetchedAnswers.map((a, i) => ({
      id: a.id || `answer_${i}`,
      text: a.answer
    }));
  }
  
  // 2. Se ci sono risposte nel formato array standard
  if (question.answers && Array.isArray(question.answers) && question.answers.length > 0) {
    return question.answers.map((a, i) => ({
      id: a.id || `answer_${i}`,
      text: a.text
    }));
  }
  
  // 3. Prova a estrarre dal contenuto HTML
  if (question.content?.rendered) {
    const extracted = extractAnswersFromContent(question.content.rendered);
    if (extracted.length > 0) {
      return extracted;
    }
  }
  
  // 4. Prova con il campo question
  if (question.question) {
    const extracted = extractAnswersFromContent(question.question);
    if (extracted.length > 0) {
      return extracted;
    }
  }
  
  return [];
}

// Funzione per ottenere il testo della domanda (senza le opzioni di risposta)
function getQuestionText(question: QuizQuestion): string {
  // Prima prova con il titolo
  if (question.title?.rendered) {
    return question.title.rendered;
  }
  
  // Poi con il campo question
  if (question.question) {
    return question.question;
  }
  
  // Infine con il contenuto
  if (question.content?.rendered) {
    return question.content.rendered;
  }
  
  return 'Domanda';
}

interface QuizViewProps {
  quiz: Quiz;
  course: Course;
  wpQuizUrl: string;
  questions?: QuizQuestion[];
  courseId: number;
}

export default function QuizView({ quiz, course, questions = [], courseId }: QuizViewProps) {
  const quizTitle = quiz.title?.rendered ? stripHtml(quiz.title.rendered) : 'Quiz';
  const courseTitle = course.title?.rendered ? stripHtml(course.title.rendered) : 'Corso';

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  // Memoizza le risposte della domanda corrente
  const currentAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return getQuestionAnswers(currentQuestion);
  }, [currentQuestion]);

  const handleSelectAnswer = (answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Calcola il punteggio (simulato - in un'implementazione reale verificheremmo le risposte corrette)
  const answeredQuestions = Object.keys(selectedAnswers).length;
  const scorePercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  // Se non ci sono domande, mostra un messaggio
  if (questions.length === 0) {
    return (
      <>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link 
                href={`/corsi/${course.id}`} 
                className="inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors"
                style={{ color: 'white' }}
              >
                <ArrowLeft className="w-4 h-4 text-white" />
                <span className="text-white">Torna al corso</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <ClipboardCheck className="w-16 h-16 text-white/50 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">{quizTitle}</h1>
              <p className="text-white/80">
                Il quiz non contiene domande disponibili al momento.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-slate-600 mb-6">
              Le domande del quiz potrebbero non essere accessibili tramite API. 
              Contatta l&apos;amministratore per maggiori informazioni.
            </p>
            <Link
              href={`/corsi/${course.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
            >
              Torna al corso
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Quiz Results View
  if (showResults) {
    return (
      <>
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6"
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Quiz Completato!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/80 text-lg mb-8"
            >
              Hai risposto a {answeredQuestions} domande su {totalQuestions}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <button
                onClick={handleRestartQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Riprova
              </button>
              <Link
                href={`/corsi/${courseId}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-white/90 transition-colors"
              >
                Torna al corso
              </Link>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f8fafc" />
            </svg>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Riepilogo Risposte</h2>
              <div className="space-y-3">
                {questions.map((q, index) => {
                  const answered = selectedAnswers[index] !== undefined;
                  return (
                    <div
                      key={q.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        answered ? 'bg-emerald-50' : 'bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        answered ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'
                      }`}>
                        {answered ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </div>
                      <span className="text-sm text-slate-700 flex-grow">
                        {q.title?.rendered ? stripHtml(q.title.rendered) : `Domanda ${index + 1}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Quiz Start View
  if (!quizStarted) {
    return (
      <>
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link 
                href={`/corsi/${course.id}`} 
                className="inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors"
                style={{ color: 'white' }}
              >
                <ArrowLeft className="w-4 h-4 text-white" />
                <span className="text-white">Torna al corso</span>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                  <ClipboardCheck className="w-4 h-4" />
                  Quiz di Valutazione
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {quizTitle}
                </h1>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2 text-white/80">
                    <Award className="w-5 h-5" />
                    <span>{courseTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-5 h-5" />
                    <span>{totalQuestions} domande</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/30 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <ClipboardCheck className="w-24 h-24 text-white/50" />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f8fafc" />
            </svg>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50"
            >
              {quiz.content?.rendered && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Informazioni sul Quiz</h2>
                  <SafeHtml html={quiz.content.rendered} className="prose prose-slate max-w-none" />
                </div>
              )}

              <div className="bg-amber-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5" />
                  Prima di iniziare
                </h3>
                <ul className="space-y-2 text-amber-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    Il quiz contiene {totalQuestions} domande
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    Puoi navigare tra le domande liberamente
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    Al termine vedrai un riepilogo delle tue risposte
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setQuizStarted(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <ClipboardCheck className="w-5 h-5" />
                Inizia il Quiz
              </button>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  // Quiz Question View
  return (
    <>
      <section className="relative pt-24 pb-8 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80 text-sm">
              Domanda {currentQuestionIndex + 1} di {totalQuestions}
            </span>
            <span className="text-white/80 text-sm">
              {Math.round(progress)}% completato
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </section>

      <section className="py-8 bg-slate-50 min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Domanda {currentQuestionIndex + 1}
              </h2>

              {/* Question Content */}
              {currentQuestion && (
                <div className="mb-6">
                  <SafeHtml 
                    html={getQuestionText(currentQuestion)} 
                    className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:text-base" 
                  />
                </div>
              )}

              {/* Answers */}
              {currentAnswers.length > 0 ? (
                <div className="space-y-3 mb-8">
                  {currentAnswers.map((answer, index) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === answer.id;
                    return (
                      <button
                        key={answer.id}
                        onClick={() => handleSelectAnswer(answer.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isSelected
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className={`flex-grow ${isSelected ? 'text-amber-900' : 'text-slate-700'}`}>
                            {answer.text}
                          </span>
                          {isSelected && <CheckCircle className="w-5 h-5 text-amber-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mb-8">
                  {/* Debug: mostra la struttura della domanda */}
                  <details className="mb-4 p-4 bg-slate-100 rounded-xl">
                    <summary className="text-sm font-medium text-slate-600 cursor-pointer">
                      Debug: Struttura domanda (clicca per espandere)
                    </summary>
                    <pre className="mt-2 text-xs text-slate-500 overflow-auto max-h-60">
                      {JSON.stringify(currentQuestion, null, 2)}
                    </pre>
                  </details>
                  
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <p className="text-amber-800 text-sm mb-2 font-medium">
                      Opzioni di risposta non rilevate automaticamente
                    </p>
                    <p className="text-amber-700 text-xs mb-4">
                      Leggi la domanda sopra e segna quando hai risposto.
                    </p>
                    <button
                      onClick={() => handleSelectAnswer('answered')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedAnswers[currentQuestionIndex] === 'answered'
                          ? 'bg-amber-500 text-white'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {selectedAnswers[currentQuestionIndex] === 'answered' ? '✓ Risposta data' : 'Segna come risposto'}
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Precedente
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {currentQuestionIndex === totalQuestions - 1 ? (
                    <>
                      Termina Quiz
                      <CheckCircle className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Successiva
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Question Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {questions.map((_, index) => {
              const isAnswered = selectedAnswers[index] !== undefined;
              const isCurrent = index === currentQuestionIndex;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-amber-500 text-white scale-110'
                      : isAnswered
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
