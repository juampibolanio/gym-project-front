import { LoginForm } from '@/features/auth/components/LoginForm';
import { Dumbbell, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="w-full max-w-100 flex flex-col items-center">

      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full border border-border-primary bg-surface flex items-center justify-center mb-4 shadow-sm dark:shadow-none transition-colors">
          <Dumbbell className="text-brand-main" size={24} />
        </div>
        <h1 className="text-xl font-bold text-text-main transition-colors">GymSystem</h1>
        <p className="text-sm text-text-muted mt-1 transition-colors">Terminal de Inicio Administradores</p>
      </div>

      <div className="w-full bg-surface border-t-4 border-t-brand-main border border-border-primary rounded-xl p-6 shadow-xl dark:shadow-2xl transition-colors">

        <LoginForm />

        <div className="mt-6 pt-4 border-t border-border-primary flex flex-col items-center gap-4 transition-colors">
          <div className="flex items-center justify-center gap-2 text-text-muted transition-colors">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-bold tracking-wider uppercase">Terminal de Acceso Seguro</span>
          </div>
          <div className="text-text-muted text-xs transition-colors">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="ml-1 font-medium text-brand-main hover:text-brand-hover transition-colors">
              Crea una aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
