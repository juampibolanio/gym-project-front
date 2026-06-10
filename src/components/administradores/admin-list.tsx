'use client';
import * as React from 'react';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface AdminListProps {
  name: string;
  adminID: string;
  status: 'Activo' | 'Inactivo';
  rol: string;
  email: string;
}

export function AdminList({ 
  name, 
  adminID, 
  status, 
  rol, 
  email
}: AdminListProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const statusStyles = {
    'Activo': 'bg-success-surface text-success-main border-success-main/30',
    'Inactivo': 'bg-surface-hover text-text-muted border-border-primary'
  };

  const dotStyles = {
    'Activo': 'bg-success-main',
    'Inactivo': 'bg-text-muted'
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_2fr_100px] items-center px-5 py-4 border-b border-border-primary hover:bg-surface-hover transition-colors last:border-b-0 last:rounded-b-lg">
      
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-background border border-border-primary flex items-center justify-center text-xs font-bold text-text-muted">
            {initials}
          </div>
          <div>
            <p className="text-sm font-light text-text-main">{name}</p>
            <p className="text-xs text-text-muted mt-0.5">{adminID}</p>
          </div>
        </div>
      </div>
      
      <div>
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold border rounded-full uppercase transition-colors ${statusStyles[status]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`}></span>
          {status}
        </span>
      </div>
      
      <div>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 rounded-full uppercase transition-colors">
          {rol}
        </span>
      </div>
      
      <div>
        <p className="text-sm font-light text-text-main">{email}</p>
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
            <Link href={`/dashboard/administradores/${adminID}`}className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-main hover:bg-surface-hover transition-colors">
              <Eye size={14} className="text-text-muted" /> Ver Detalles
            </Link>
            <Link href={`/dashboard/administradores/${adminID}/editar`} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-main hover:bg-surface-hover transition-colors">
              <Edit size={14} className="text-text-muted" /> Editar
            </Link>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-500/10 transition-colors">
              <Trash2 size={14} /> Eliminar
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
