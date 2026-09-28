'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthSession } from '../hooks/useAuthSession'; 
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isHydrated, isAuthenticated } = useAuthSession();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div 
        className="min-h-screen w-full flex flex-col items-center justify-center bg-background"
        role="status"
        aria-live="polite"
      >
        <Loader2 
          className="w-10 h-10 text-brand-main animate-spin mb-4" 
          aria-hidden="true" 
        />
        <p className="text-text-muted text-sm font-medium animate-pulse">
          Verificando sesión...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}