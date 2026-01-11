import { Metadata } from 'next';
import { getEserciziAccessibili } from '@/lib/api';
import EserciziAccessibiliView from './EserciziAccessibiliView';

export const metadata: Metadata = {
  title: 'Esercizi Accessibili | LearningBas',
  description: 'Esercizi pratici per applicare i concetti di accessibilità',
};

export const revalidate = 60;

export default async function EserciziAccessibiliPage() {
  const esercizi = await getEserciziAccessibili();
  
  return <EserciziAccessibiliView esercizi={esercizi} />;
}

