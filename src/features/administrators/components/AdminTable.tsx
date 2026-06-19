'use client';

import { ChevronRight, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import { useUsers } from '../hooks/useUsers'; 
import { useAuthStore } from '@/features/auth/store/auth.store'; 
import { AdminRow } from './AdminRow';
import { useState } from 'react';

export function AdminTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const { data, isLoading, isError } = useUsers(currentPage, itemsPerPage);
  
  const currentUserUuid = useAuthStore((state) => state.user?.uuid);

  if (isLoading && currentPage === 1) {
    return (
        <div className="flex flex-col items-center justify-center h-64 w-full bg-surface border border-border-primary rounded-lg">
            <Loader2 className="w-8 h-8 text-brand-main animate-spin mb-4" />
            <p className="text-text-muted text-sm">Cargando administradores...</p>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex flex-col items-center justify-center h-64 w-full bg-surface border border-danger-main/20 rounded-lg">
            <AlertCircle className="w-8 h-8 text-danger-main mb-4" />
            <p className="text-text-main text-sm">Error al cargar la lista.</p>
        </div>
    );
  }

  const admins = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.lastPage || 1;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-surface border border-border-primary rounded-lg flex flex-col relative">
      <div className="grid grid-cols-[2fr_1fr_2fr_100px] px-5 py-4 border-b border-border-primary text-[10px] font-bold text-text-muted tracking-widest uppercase">
        <div>ADMINISTRADOR E ID</div>
        <div>ROL</div>
        <div>EMAIL</div>
        <div>ACCIONES</div>
      </div>

      <div className="flex flex-col relative">
        {isLoading && currentPage > 1 && (
            <div className="absolute inset-0 bg-surface/80 flex flex-col items-center justify-center z-10 backdrop-blur-[1px]">
              <Loader2 className="w-6 h-6 text-brand-main animate-spin" />
            </div>
        )}
        {admins.map((admin) => (
          <AdminRow 
            key={admin.uuid}
            admin={admin}
            isCurrentUser={admin.uuid === currentUserUuid}
          />
        ))}
        {admins.length === 0 && !isLoading && (
            <p className="text-center text-text-muted py-8 text-sm">No hay administradores registrados.</p>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-t border-border-primary">
        <p className="text-sm text-text-muted">
          Mostrando página {currentPage} de {totalPages || 1}
        </p>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isLoading}
            className="p-1 text-text-muted hover:text-text-main disabled:opacity-50 disabled:hover:text-text-muted transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || isLoading}
            className="p-1 text-text-muted hover:text-text-main disabled:opacity-50 disabled:hover:text-text-muted transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
