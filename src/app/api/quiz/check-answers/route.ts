import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://accessibilita.regione.basilicata.it';
const API_USER = process.env.WORDPRESS_API_USER || '';
const API_PASSWORD = process.env.WORDPRESS_API_PASSWORD || '';

export async function POST(request: NextRequest) {
  // Verifica che l'utente sia autenticato
  const session = await auth();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Non autenticato' },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    const { quizId, answers } = body;
    
    if (!quizId) {
      return NextResponse.json(
        { error: 'Quiz ID mancante' },
        { status: 400 }
      );
    }
    
    // Crea header di autenticazione Basic per WordPress
    const credentials = Buffer.from(`${API_USER}:${API_PASSWORD}`).toString('base64');
    
    // Chiama l'endpoint WordPress
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/learndash-quiz-api/v1/quiz/${quizId}/check-answers`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      }
    );
    
    if (!response.ok) {
      console.error('WordPress API error:', response.status, await response.text());
      return NextResponse.json(
        { error: 'Errore durante la verifica del quiz' },
        { status: response.status }
      );
    }
    
    const result = await response.json();
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error in check-answers API:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

