import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Terminal de acceso seguro para usuarios de ChacuGym.',
};

export default function LoginPage() {
  return (
    <main className="w-full max-w-100 flex flex-col items-center">
      <header className="flex flex-col items-center mb-8">
        <Image
          src="/images/logo-chacugym.webp"
          alt="Logotipo oficial de ChacuGym"
          width={80}
          height={80}
          priority
          className="w-16 h-16 object-contain mb-3"
        />

        <h1 className="text-xl font-bold text-text-main transition-colors">
          ChacuGym
        </h1>
        <p className="text-sm text-text-muted mt-1 transition-colors">
          Terminal de Inicio de Sesión
        </p>
      </header>

      <section className="w-full bg-surface border-t-4 border-t-brand-main border border-border-primary rounded-xl p-6 shadow-xl dark:shadow-2xl transition-colors">
        <LoginForm />

        <footer className="mt-6 pt-4 border-t border-border-primary flex flex-col items-center gap-3 transition-colors">
          <div className="flex items-center justify-center gap-2 text-text-muted transition-colors">
            <ShieldAlert size={14} aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              Terminal de Acceso Seguro
            </span>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-[11px] text-text-muted transition-colors">
            <Link 
              href="/terminos" 
              className="hover:text-brand-main hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main rounded px-1"
            >
              Términos de uso
            </Link>
            <span aria-hidden="true" className="text-border-primary">•</span>
            <Link 
              href="/privacidad" 
              className="hover:text-brand-main hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main rounded px-1"
            >
              Privacidad
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-text-muted transition-colors -mt-0.5">
            <span className="text-[10px] font-bold tracking-wider uppercase">
              v1.9.0 - by Chacú.IO
            </span>
          </div>
        </footer>
      </section>
    </main>
  );
}
