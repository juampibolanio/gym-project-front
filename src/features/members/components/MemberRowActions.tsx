'use client';

import Link from 'next/link';
import { MoreHorizontal, Edit, Eye } from 'lucide-react';
import { useRole } from '@/features/auth/hooks/useRole';
import { useFloatingDropdown } from '@/common/hooks/useFloatingDropdown';
import { DeleteMemberButton } from './DeleteMemberButton';

interface MemberRowActionsProps {
  uuid: string;
  name: string;
}

export function MemberRowActions({ uuid, name }: MemberRowActionsProps) {
  const { isAdmin } = useRole();
  const dropdownHeight = isAdmin ? 110 : 70;

  const {
    isOpen,
    setIsOpen,
    toggleDropdown,
    dropdownStyle,
    buttonRef,
    dropdownRef,
  } = useFloatingDropdown({ height: dropdownHeight, width: '160px' });

  return (
    <div className="relative flex justify-end" onClick={(e) => e.stopPropagation()}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        aria-label="Opciones del socio"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="p-1.5 rounded hover:bg-surface-hover transition-colors cursor-pointer"
      >
        <MoreHorizontal className="text-text-muted hover:text-text-main transition-colors" size={20} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          role="menu"
          className="bg-surface border border-border-primary rounded-md shadow-xl py-1 overflow-hidden"
        >
          <Link
            href={`/dashboard/miembros/${uuid}`}
            role="menuitem"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-text-main hover:bg-surface-hover transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Eye size={14} className="text-brand-main" aria-hidden="true" /> 
            <span>Ver Detalles</span>
          </Link>
          
          <Link
            href={`/dashboard/miembros/${uuid}/editar`}
            role="menuitem"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-text-main hover:bg-surface-hover transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Edit size={14} className="text-warning-main" aria-hidden="true" /> 
            <span>Editar</span>
          </Link>

          {isAdmin && (
            <div className="border-t border-border-primary mt-1 pt-1" role="none">
              <DeleteMemberButton
                uuid={uuid}
                name={name}
                onDeleted={() => setIsOpen(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
