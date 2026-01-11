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

