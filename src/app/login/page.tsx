import { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Accedi | Formazione Accessibilità - Regione Basilicata',
  description: 'Accedi alla piattaforma e-learning della Regione Basilicata per iniziare i corsi sull\'accessibilità digitale.',
};

export default function LoginPage() {
  return <LoginForm />;
}

