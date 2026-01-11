import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import DashboardContent from './DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard | Formazione Accessibilità - Regione Basilicata',
  description: 'La tua area personale per gestire i corsi e monitorare i progressi.',
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <DashboardContent user={session.user} />;
}

