import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-100 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full border border-border-primary bg-surface flex items-center justify-center mb-4  transition-colors">
          <Dumbbell className="text-brand-main" size={24} />
        </div>
        <h1 className="text-xl font-bold text-text-main transition-colors">
          ChacuGym
        </h1>
        <p className="text-sm text-text-muted mt-1 transition-colors text-center">
          Recuperación de Contraseña
        </p>
      </div>

      <div className="w-full bg-surface border-t-4 border-t-brand-main border border-border-primary rounded-xl p-6 shadow-xl dark:shadow-2xl transition-colors">
        <ForgotPasswordForm />

        <div className="mt-6 pt-4 border-t border-border-primary flex flex-col items-center transition-colors">
          <Link
            href="/login"
            className="flex items-center gap-2 text-xs font-medium text-brand-main hover:text-brand-hover transition-colors"
          >
            <ArrowLeft size={14} /> Volver al Inicio de Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
