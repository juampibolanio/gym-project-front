import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-100 flex flex-col items-center">
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full border border-border-primary bg-surface flex items-center justify-center mb-4 shadow-sm dark:shadow-none transition-colors">
          <Dumbbell className="text-brand-main" size={24} />
        </div>
        <h1 className="text-xl font-bold text-text-main transition-colors">GymSystem</h1>
        <p className="text-sm text-text-muted mt-1 transition-colors">Terminal de Registro Administradores</p>
      </div>

      <div className="w-full bg-surface border-t-4 border-t-brand-main border border-border-primary rounded-xl p-6 shadow-xl dark:shadow-2xl transition-colors">
        
        <RegisterForm />

        <div className="mt-6 pt-4 border-t border-border-primary flex items-center justify-center text-text-muted text-xs transition-colors">
          Ya tienes una cuenta?{' '}
          <Link href="/login" className="ml-1 font-medium text-brand-main hover:text-brand-hover transition-colors">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
