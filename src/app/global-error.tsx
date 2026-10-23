'use client';

import { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log fatal errors that happen inside root layout
    console.error('[GlobalError caught fatal error]:', error);
  }, [error]);

  return (
    <html lang="es">
      <body className="min-h-screen bg-[#fafafa] dark:bg-[#1c1c1c] text-[#18181b] dark:text-[#ffffff] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600 dark:text-red-400 mb-6 border border-red-300 dark:border-red-800">
            <AlertCircle size={32} aria-hidden="true" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Error crítico del sistema</h1>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Ocurrió una falla fundamental al cargar la interfaz. Por favor, intenta reiniciar la aplicación.
          </p>

          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#047857] hover:bg-[#065f46] text-white rounded-md text-sm font-medium transition-colors shadow-sm cursor-pointer"
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>Reiniciar aplicación</span>
          </button>
        </div>
      </body>
    </html>
  );
}

