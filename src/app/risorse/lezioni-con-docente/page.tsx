import { Metadata } from 'next';
import { getLezioniConDocente } from '@/lib/api';
import LezioniConDocenteView from './LezioniConDocenteView';

export const metadata: Metadata = {
  title: 'Lezioni con Docente | LearningBas',
  description: 'Partecipa alle lezioni live con i docenti del corso',
};

export const revalidate = 60;

export default async function LezioniConDocentePage() {
  const lezioni = await getLezioniConDocente();
  
  return <LezioniConDocenteView lezioni={lezioni} />;
}

