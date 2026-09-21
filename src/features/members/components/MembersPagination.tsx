'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MembersPaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function MembersPagination({
  currentPage,
  totalPages,
  isLoading,
  onPrevPage,
  onNextPage,
}: MembersPaginationProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-border-primary">
      <p className="text-sm text-text-muted">
        Mostrando página {currentPage} de {totalPages || 1}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1 || isLoading}
          className="p-1 text-text-muted hover:text-text-main disabled:opacity-50 disabled:hover:text-text-muted transition-colors cursor-pointer disabled:cursor-not-allowed"
          aria-label="Página anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage >= totalPages || isLoading}
          className="p-1 text-text-muted hover:text-text-main disabled:opacity-50 disabled:hover:text-text-muted transition-colors cursor-pointer disabled:cursor-not-allowed"
          aria-label="Página siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
