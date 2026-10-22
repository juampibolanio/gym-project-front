'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthSession } from '../hooks/useAuthSession';
import { useRole } from '../hooks/useRole';
import { Loader2 } from 'lucide-react';

export interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { isHydrated, isAuthenticated } = useAuthSession();
  const { role } = useRole();
  const router = useRouter();

  const normalizedAllowedRoles = useMemo(
    () => allowedRoles.map((r) => r.toLowerCase()),
    [allowedRoles]
  );

  const hasAccess = Boolean(role && normalizedAllowedRoles.includes(role));

  useEffect(() => {
    // Wait until hydration completes before evaluating access
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (!hasAccess) {
      router.replace('/dashboard');
    }
  }, [isHydrated, isAuthenticated, hasAccess, router]);

  if (!isHydrated || !hasAccess) {
    return (
      <div 
        className="h-64 flex flex-col items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <Loader2 
          className="w-8 h-8 animate-spin text-brand-main mb-4" 
          aria-hidden="true" 
        />
        <p className="text-text-muted text-sm font-medium animate-pulse">
          Verificando permisos...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
