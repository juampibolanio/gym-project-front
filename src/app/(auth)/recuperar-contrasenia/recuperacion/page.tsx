import { Suspense } from 'react';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';
import { Dumbbell } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-100 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full border border-border-primary bg-surface flex items-center justify-center mb-4 transition-colors">
          <Dumbbell className="text-brand-main" size={24} />
        </div>
        <h1 className="text-xl font-bold text-text-main transition-colors">
          ChacuGym
        </h1>
        <p className="text-sm text-text-muted mt-1 transition-colors text-center">
          Crear Nueva Contraseña
        </p>
      </div>

      <div className="w-full bg-surface border-t-4 border-t-brand-main border border-border-primary rounded-xl p-6 shadow-xl dark:shadow-2xl transition-colors">
        <Suspense
          fallback={
            <div className="text-center text-sm text-text-muted">
              Cargando...
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
