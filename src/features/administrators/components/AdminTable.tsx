'use client';

import { Loader2, AlertCircle } from 'lucide-react';
import { useUsers } from '../hooks/useUsers'; 
import { useAuthStore } from '@/features/auth/store/auth.store'; 
import { AdminRow } from './AdminRow';

export function AdminTable() {
  const { data, isLoading, isError } = useUsers(1, 50);
  
  const currentUserUuid = useAuthStore((state) => state.user?.uuid);

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-64 w-full bg-surface border border-border-primary rounded-lg">
            <Loader2 className="w-8 h-8 text-brand-main animate-spin mb-4" />
            <p className="text-text-muted text-sm">Cargando administradores...</p>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex flex-col items-center justify-center h-64 w-full bg-surface border border-red-500/20 rounded-lg">
            <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
            <p className="text-text-main text-sm">Error al cargar la lista.</p>
        </div>
    );
  }

  const admins = data?.data || [];

  return (
    <div className="bg-surface border border-border-primary rounded-lg flex flex-col">
      <div className="grid grid-cols-[2fr_1fr_1fr_2fr_100px] px-5 py-4 border-b border-border-primary text-[10px] font-bold text-text-muted tracking-widest uppercase">
        <div>ADMINISTRADOR E ID</div>
        <div>ROL</div>
        <div>EMAIL</div>
        <div>ACCIONES</div>
      </div>

      <div className="flex flex-col">
        {admins.map((admin) => (
          <AdminRow 
            key={admin.uuid}
            admin={admin}
            isCurrentUser={admin.uuid === currentUserUuid}
          />
        ))}
        {admins.length === 0 && (
            <p className="text-center text-text-muted py-8 text-sm">No hay administradores registrados.</p>
        )}
      </div>
    </div>
  );
}
