'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/common/hooks/useDebounce';

const SEARCH_CONFIG: Record<string, { placeholder: string }> = {
  '/dashboard/miembros': { placeholder: 'Buscar miembros, IDs o planes...' },
  '/dashboard/administradores': {
    placeholder: 'Buscar administradores, rol o estado...',
  },
};

export function GlobalSearchInput() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQ);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    if (debouncedSearchTerm !== currentQ) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearchTerm) {
        params.set('q', debouncedSearchTerm);
      } else {
        params.delete('q');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  if (
    pathname !== '/dashboard/miembros' &&
    pathname !== '/dashboard/administradores'
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 bg-surface border border-border-primary rounded-md px-4 py-2 w-96 focus-within:border-brand-main transition-colors">
      <Search size={16} className="text-text-muted" />
      <input
        type="text"
        placeholder={SEARCH_CONFIG[pathname]?.placeholder || 'Buscar...'}
        className="bg-transparent border-none outline-none text-sm text-text-main w-full placeholder:text-text-muted"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
