'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime errors to the console or monitoring service
    console.error('[ErrorBoundary caught error]:', error);
  }, [error]);

  return (
    <div 
      className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center"
      role="alert"
    >
      <div className="w-16 h-16 rounded-full bg-danger-surface flex items-center justify-center text-danger-main mb-6 border border-danger-main/20">
        <AlertTriangle size={32} aria-hidden="true" />
      </div>

      <h1 className="text-2xl font-bold text-text-main mb-2">
        Ha ocurrido un error inesperado
      </h1>
      
      <p className="text-sm text-text-muted max-w-md mb-8">
        No se pudo completar la operación actual. Puedes intentar recargar la sección o volver al inicio.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-main hover:bg-brand-hover text-white rounded-md text-sm font-medium transition-colors shadow-sm cursor-pointer"
        >
          <RotateCcw size={16} aria-hidden="true" />
          <span>Reintentar</span>
        </button>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-5 py-2.5 border border-border-primary hover:bg-surface-hover text-text-main rounded-md text-sm font-medium transition-colors"
        >
          <Home size={16} aria-hidden="true" />
          <span>Ir al Dashboard</span>
        </Link>
      </div>
    </div>
  );
}

