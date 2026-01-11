// LearnDash API Service
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://accessibilita.regione.basilicata.it';
const API_USER = process.env.WORDPRESS_API_USER || '';
const API_PASSWORD = process.env.WORDPRESS_API_PASSWORD || '';

// Crea header di autenticazione Basic
const getAuthHeaders = (): HeadersInit => {
  const credentials = Buffer.from(`${API_USER}:${API_PASSWORD}`).toString('base64');
  return {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json',
  };
};

// Tipi per LearnDash
export interface Course {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  featured_image_url?: string;
  meta?: {
    course_price?: string;
    course_price_type?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export interface Lesson {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  course: number;
  menu_order: number;
  link?: string;
  permalink?: string;
  slug?: string;
}

export interface Topic {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  lesson: number;
  course: number;
}

export interface Quiz {
  id: number;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  course: number;
  lesson: number;
  link?: string;
  slug?: string;
}

export interface QuizQuestion {
  id: number;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  question?: string;
  // LearnDash può restituire le risposte in diversi formati
  answers?: Array<{
    id: string;
    text: string;
    correct?: boolean;
  }> | null;
  // Risposte recuperate separatamente
  fetchedAnswers?: Array<{
    id: string;
    answer: string;
    correct?: boolean;
  }>;
  // Formato alternativo per le risposte (oggetto con chiavi)
  _piechartData?: Record<string, { answer: string; correct: boolean }>;
  // Metadati LearnDash
  meta?: {
    _answerData?: string; // JSON string con le risposte
    _answerType?: string;
    _points?: number;
  };
  question_type?: string;
  quiz?: number;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar_urls?: {
    [key: string]: string;
  };
}

export interface UserProgress {
  course_id: number;
  user_id: number;
  steps_completed: number;
  steps_total: number;
  date_started: string;
  date_completed?: string;
  status: 'not_started' | 'in_progress' | 'completed';
}

// Custom Post Types

export interface MaterialeDidattico {
  id: number;
  title: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  featured_image_url?: string;
  meta?: {
    link_al_pdf?: string;
    file_media?: number;
    corso?: string;
    tipologia?: string;
    tag?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export interface LezioneConDocente {
  id: number;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  featured_image_url?: string;
  meta?: {
    sottotitolo?: string;
    link_alla_video_conferenza?: string;
    descrizione?: string;
    link_alle_slide?: string;
    link_alle_slide_2?: string;
    link_alle_slide_3?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export interface EsercizioAccessibile {
  id: number;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  featured_image_url?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

// API Functions

// Recupera tutti i corsi
export async function getCourses(page = 1, perPage = 10): Promise<Course[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-courses?page=${page}&per_page=${perPage}&_embed`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 }, // Cache per 60 secondi
      }
    );
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return [];
    }
    
    const courses = await response.json();
    
    // Aggiungi URL immagine in evidenza
    return courses.map((course: Course) => ({
      ...course,
      featured_image_url: course._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

// Recupera un singolo corso
export async function getCourse(id: number): Promise<Course | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-courses/${id}?_embed`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    const course = await response.json();
    return {
      ...course,
      featured_image_url: course._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    };
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

// Recupera le lezioni di un corso
export async function getCourseLessons(courseId: number): Promise<Lesson[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-lessons?course=${courseId}&per_page=100`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
}

// Recupera i topic di una lezione
export async function getLessonTopics(lessonId: number, courseId: number): Promise<Topic[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-topic?lesson=${lessonId}&course=${courseId}&per_page=100`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
}

// Recupera i quiz di un corso
export async function getCourseQuizzes(courseId: number): Promise<Quiz[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-quiz?course=${courseId}&per_page=100`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }
}

// Recupera un singolo quiz
export async function getQuiz(id: number): Promise<Quiz | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-quiz/${id}`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }
}

// Recupera le domande di un quiz
export async function getQuizQuestions(quizId: number): Promise<QuizQuestion[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-question?quiz=${quizId}&per_page=100`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      console.error('Error fetching quiz questions:', response.status);
      return [];
    }
    
    const questions = await response.json();
    
    // Per ogni domanda, prova a recuperare le risposte
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question: QuizQuestion) => {
        const answers = await getQuestionAnswers(question.id);
        return {
          ...question,
          fetchedAnswers: answers
        };
      })
    );
    
    return questionsWithAnswers;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
}

// Recupera le risposte di una domanda
export async function getQuestionAnswers(questionId: number): Promise<Array<{ id: string; answer: string; correct?: boolean }>> {
  try {
    // Prova diversi endpoint per le risposte, incluso il plugin custom
    const endpoints = [
      // Plugin custom LearnDash Quiz API
      `${WORDPRESS_URL}/wp-json/learndash-quiz-api/v1/question/${questionId}/answers`,
      // Endpoint standard LearnDash
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-question/${questionId}/answers`,
      `${WORDPRESS_URL}/wp-json/wp/v2/sfwd-question/${questionId}?_fields=meta`,
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: getAuthHeaders(),
          next: { revalidate: 60 },
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Risposta dal plugin custom (formato { question_id, answers: [...] })
          if (data.answers && Array.isArray(data.answers)) {
            return data.answers.map((item: { id?: string; text?: string; html?: string }, idx: number) => ({
              id: item.id || `answer_${idx}`,
              answer: item.text || item.html || '',
              correct: undefined // Non esponiamo le risposte corrette per sicurezza
            }));
          }
          
          // Se è un array di risposte
          if (Array.isArray(data)) {
            return data.map((item: { answer?: string; text?: string; correct?: boolean }, idx: number) => ({
              id: `answer_${idx}`,
              answer: item.answer || item.text || '',
              correct: item.correct
            }));
          }
          
          // Se le risposte sono nei meta
          if (data.meta?._answerData) {
            try {
              const answerData = JSON.parse(data.meta._answerData);
              if (Array.isArray(answerData)) {
                return answerData.map((item: { answer?: string; correct?: boolean }, idx: number) => ({
                  id: `answer_${idx}`,
                  answer: item.answer || '',
                  correct: item.correct
                }));
              }
            } catch {
              // JSON parse failed
            }
          }
        }
      } catch {
        // Endpoint non disponibile, prova il prossimo
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching question answers:', error);
    return [];
  }
}

// Recupera una singola lezione
export async function getLesson(id: number): Promise<Lesson | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/ldlms/v2/sfwd-lessons/${id}`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return null;
  }
}

// API pubblica senza autenticazione per dati non sensibili
export async function getPublicCourses(page = 1, perPage = 10): Promise<Course[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/sfwd-courses?page=${page}&per_page=${perPage}&_embed`,
      {
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      // Fallback ai corsi con auth
      return getCourses(page, perPage);
    }
    
    const courses = await response.json();
    return courses.map((course: Course) => ({
      ...course,
      featured_image_url: course._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error('Error fetching public courses:', error);
    return getCourses(page, perPage);
  }
}

// ==========================================
// Quiz Results API
// ==========================================

export interface QuizResult {
  quiz_id: number;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  passing_percentage: number;
  passed: boolean;
  results: Array<{
    question_id: number;
    question_title: string;
    user_answer_id: string | null;
    correct_answer_id: string | null;
    correct_answer_text: string;
    is_correct: boolean;
    answers: Array<{
      id: string;
      text: string;
      html?: string;
      correct?: boolean;
    }>;
  }>;
}

// Verifica le risposte del quiz e ottiene i risultati
export async function checkQuizAnswers(quizId: number, userAnswers: Record<number, string>): Promise<QuizResult | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/learndash-quiz-api/v1/quiz/${quizId}/check-answers`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userAnswers),
      }
    );
    
    if (!response.ok) {
      console.error('Error checking quiz answers:', response.status);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error checking quiz answers:', error);
    return null;
  }
}

// ==========================================
// Custom Post Types API
// ==========================================

// Recupera i materiali didattici
export async function getMaterialiDidattici(perPage = 100): Promise<MaterialeDidattico[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/materiali-didattici?per_page=${perPage}&_embed`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      console.error('Error fetching materiali didattici:', response.status);
      return [];
    }
    
    const items = await response.json();
    return items.map((item: MaterialeDidattico) => ({
      ...item,
      featured_image_url: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error('Error fetching materiali didattici:', error);
    return [];
  }
}

// Recupera le lezioni con docente
export async function getLezioniConDocente(perPage = 100): Promise<LezioneConDocente[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/lezioni-con-docente?per_page=${perPage}&_embed`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      console.error('Error fetching lezioni con docente:', response.status);
      return [];
    }
    
    const items = await response.json();
    return items.map((item: LezioneConDocente) => ({
      ...item,
      featured_image_url: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error('Error fetching lezioni con docente:', error);
    return [];
  }
}

// Recupera gli esercizi accessibili
export async function getEserciziAccessibili(perPage = 100): Promise<EsercizioAccessibile[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/esercizi-accessibili?per_page=${perPage}&_embed`,
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      console.error('Error fetching esercizi accessibili:', response.status);
      return [];
    }
    
    const items = await response.json();
    return items.map((item: EsercizioAccessibile) => ({
      ...item,
      featured_image_url: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error('Error fetching esercizi accessibili:', error);
    return [];
  }
}

