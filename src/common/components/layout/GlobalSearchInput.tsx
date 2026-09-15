'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const urlQ = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(urlQ);
  const [prevUrlQ, setPrevUrlQ] = useState(urlQ);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  if (urlQ !== prevUrlQ) {
    setPrevUrlQ(urlQ);
    setSearchTerm(urlQ);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const pushSearchToUrl = (query: string, immediate = false) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const execute = () => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = query.trim();
      if (trimmed) {
        params.set('q', trimmed);
      } else {
        params.delete('q');
      }
      params.delete('page');

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    };

    if (immediate) {
      execute();
    } else {
      timerRef.current = setTimeout(execute, 350);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    pushSearchToUrl(val, false);
  };

  const handleClear = () => {
    setSearchTerm('');
    pushSearchToUrl('', true);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
      inputRef.current?.blur();
    }
  };

  if (!SEARCH_CONFIG[pathname]) {
    return null;
  }

  return (
    <div className="relative flex items-center gap-2.5 bg-surface border border-border-primary rounded-lg px-3.5 py-2 w-full focus-within:border-brand-main focus-within:ring-1 focus-within:ring-brand-main/30 transition-all shadow-xs">
      <Search size={16} className="text-text-muted shrink-0" />
      <input
        ref={inputRef}
        type="text"
        placeholder={SEARCH_CONFIG[pathname]?.placeholder || 'Buscar...'}
        className="bg-transparent border-none outline-hidden text-sm text-text-main w-full placeholder:text-text-muted"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          title="Limpiar búsqueda"
          className="text-text-muted hover:text-text-main p-0.5 rounded-full hover:bg-surface-hover transition-colors shrink-0 cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
