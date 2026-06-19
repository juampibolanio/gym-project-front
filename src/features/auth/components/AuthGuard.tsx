'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  const shouldShowLoader = isChecking && !token;

  if (shouldShowLoader) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-brand-main animate-spin mb-4" />
        <p className="text-text-muted text-sm font-medium animate-pulse">
          Verificando credenciales...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
