import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/common/components/layout/ThemeToggle';
import { ArrowLeft, Shield } from 'lucide-react';

interface LegalLayoutProps {
  children: React.ReactNode;
}

export default function LegalLayout({ children }: Readonly<LegalLayoutProps>) {
  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col transition-colors selection:bg-brand-surface selection:text-brand-main">
      <header className="sticky top-0 z-40 bg-surface/85 backdrop-blur-md border-b border-border-primary transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main rounded-lg p-1"
              aria-label="Ir al inicio de sesión de ChacuGym"
            >
              <Image
                src="/images/logo-chacugym.webp"
                alt="Logotipo oficial de ChacuGym"
                width={32}
                height={32}
                priority
                className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
              />
              <span className="font-bold text-lg text-text-main group-hover:text-brand-main transition-colors">
                ChacuGym
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-surface text-brand-main border border-brand-main/20">
              <Shield size={12} aria-hidden="true" />
              <span>Centro Legal y Privacidad</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-text-muted hover:text-text-main px-3 py-1.5 rounded-lg border border-border-primary hover:border-brand-main/40 hover:bg-surface-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Volver</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>

      <footer className="border-t border-border-primary bg-surface py-6 text-center text-xs text-text-muted transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ChacuGym • Desarrollado por Chacú.IO</p>
          <nav className="flex items-center gap-4 font-medium" aria-label="Navegación legal">
            <Link 
              href="/terminos" 
              className="hover:text-brand-main hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main rounded px-1"
            >
              Términos de Uso
            </Link>
            <span aria-hidden="true">•</span>
            <Link 
              href="/privacidad" 
              className="hover:text-brand-main hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main rounded px-1"
            >
              Política de Privacidad
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
