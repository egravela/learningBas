import { Metadata } from 'next';
import { getMaterialiDidattici } from '@/lib/api';
import MaterialiDidatticiView from './MaterialiDidatticiView';

export const metadata: Metadata = {
  title: 'Materiali Didattici | LearningBas',
  description: 'Scarica i materiali didattici dei corsi di formazione',
};

export const revalidate = 60;

export default async function MaterialiDidatticiPage() {
  const materiali = await getMaterialiDidattici();
  
  return <MaterialiDidatticiView materiali={materiali} />;
}

