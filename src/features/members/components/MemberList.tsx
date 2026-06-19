'use client';
import * as React from 'react';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import { useDeleteMember } from '@/features/members/hook/useMembers';

interface MemberListProps {
  name: string;
  memberID: string;
  uuid: string;
  status: 'Activo' | 'Vencido' | 'Inactivo' | string;
  phoneNumber: string;
  observations: string;
  birthdate: string;
}

export function MemberList({ 
  name, 
  memberID, 
  uuid,
  status, 
  phoneNumber, 
  observations, 
  birthdate,
}: MemberListProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const deleteMemberMutation = useDeleteMember();
  
  const statusTranslations: Record<string, string> = {
    'ACTIVE': 'Activo',
    'INACTIVE': 'Inactivo',
    'SUSPENDED': 'Suspendido',
    'Activo': 'Activo',
    'Vencido': 'Vencido',
    'Inactivo': 'Inactivo',
    'Suspendido': 'Suspendido'
  };

  const statusStyles: Record<string, string> = {
    'ACTIVE': 'bg-success-surface text-success-main border-success-main/30',
    'SUSPENDED': 'bg-warning-surface text-warning-main border-warning-main/30',
    'INACTIVE': 'bg-surface-hover text-text-muted border-border-primary',
    'Activo': 'bg-success-surface text-success-main border-success-main/30',
    'Vencido': 'bg-warning-surface text-warning-main border-warning-main/30',
    'Inactivo': 'bg-surface-hover text-text-muted border-border-primary',
    'Suspendido': 'bg-warning-surface text-warning-main border-warning-main/30'
  };

  const dotStyles: Record<string, string> = {
    'ACTIVE': 'bg-success-main',
    'SUSPENDED': 'bg-warning-main',
    'INACTIVE': 'bg-text-muted',
    'Activo': 'bg-success-main',
    'Vencido': 'bg-warning-main',
    'Inactivo': 'bg-text-muted',
    'Suspendido': 'bg-warning-main'
  };

  const safeStatusStyles = statusStyles[status] || statusStyles['INACTIVE'];
  const safeDotStyles = dotStyles[status] || dotStyles['INACTIVE'];
  const displayStatus = statusTranslations[status] || status;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NA';
  
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] items-center px-5 py-4 border-b border-border-primary hover:bg-surface-hover transition-colors">
      
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-background border border-border-primary flex items-center justify-center text-xs font-bold text-text-muted">
            {initials}
          </div>
          <div>
            <p className="text-sm font-light text-text-main">{name}</p>
            <p className="text-xs text-text-muted mt-0.5">{memberID}</p>
          </div>
        </div>
      </div>
      
      <div>
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold border rounded-full uppercase transition-colors ${safeStatusStyles}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${safeDotStyles}`}></span>
          {displayStatus}
        </span>
      </div>
      
      <div>
        <p className="text-sm font-light text-text-main">{phoneNumber || '-'}</p>
      </div>
      
      <div>
        <p className="text-sm font-light text-text-main truncate max-w-[120px]">{observations || '-'}</p>
      </div>
      
      <div>
        <p className="text-sm font-light text-text-main">{birthdate}</p>
      </div>
      
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-1 rounded hover:bg-surface transition-colors"
        >
          <MoreHorizontal className="text-text-muted hover:text-text-main transition-colors" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-1 w-36 bg-surface border border-border-primary rounded-md shadow-lg z-10 py-1 overflow-hidden">
            <Link href={`/dashboard/miembros/${uuid}`}className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-main hover:bg-surface-hover transition-colors">
              <Eye size={14} className="text-text-muted" /> Ver Detalles
            </Link>
            <Link href={`/dashboard/miembros/${uuid}/editar`} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-main hover:bg-surface-hover transition-colors">
              <Edit size={14} className="text-text-muted" /> Editar
            </Link>
            <button 
              onClick={() => {
                if (window.confirm(`¿Estás seguro de que querés eliminar a ${name}?`)) {
                  deleteMemberMutation.mutate(uuid);
                }
              }}
              disabled={deleteMemberMutation.isPending}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger-main hover:bg-danger-main/10 transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} /> {deleteMemberMutation.isPending ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}