'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AdminRowProps } from '../interfaces/admin-row.interface';
import { DeleteAdminButton } from './DeleteAdminButton';
import { MoreHorizontal, Edit, ShieldAlert } from 'lucide-react';

export function AdminRow({ admin, isCurrentUser }: AdminRowProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fullName = `${admin.name} ${admin.surname}`;
  const initials = admin.name[0] + admin.surname[0];

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr_2fr_100px] items-center px-5 py-4 border-b border-border-primary hover:bg-surface-hover transition-colors last:border-b-0 last:rounded-b-lg">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-background border border-border-primary flex items-center justify-center text-xs font-bold text-text-muted uppercase">
              {initials}
            </div>
            <div>
              <p className="text-sm font-medium text-text-main flex items-center gap-2">
                {fullName}
                {isCurrentUser && (
                  <span className="text-[9px] bg-brand-main/10 text-brand-main px-1.5 py-0.5 rounded font-bold uppercase">
                    Tú
                  </span>
                )}
              </p>
              <p className="text-xs text-text-muted mt-0.5">{admin.dni}</p>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 rounded-full uppercase transition-colors">
            {admin.role}
          </span>
        </div>

        <div>
          <p className="text-sm font-light text-text-main truncate pr-4">
            {admin.email}
          </p>
        </div>

        <div className="relative flex justify-center" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-1 rounded hover:bg-surface transition-colors cursor-pointer"
          >
            <MoreHorizontal className="text-text-muted hover:text-text-main transition-colors" />
          </button>

          {showDropdown && (
            <div className="absolute right-6 top-full mt-1 w-36 bg-surface border border-border-primary rounded-md shadow-lg z-10 py-1 overflow-hidden">
              <Link
                href={`/dashboard/administradores/${admin.uuid}/editar`}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-main hover:bg-surface-hover transition-colors"
              >
                <Edit size={14} className="text-text-muted" /> Editar
              </Link>

              {isCurrentUser ? (
                <button
                  disabled
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-muted bg-surface-hover cursor-not-allowed"
                  title="No puedes eliminar tu propia cuenta"
                >
                  <ShieldAlert size={14} /> Eliminar
                </button>
              ) : (
                <DeleteAdminButton
                  admin={admin}
                  onDeleted={() => setShowDropdown(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
