'use client';

import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { MemberSortBy, SortOrder } from '../interfaces/members.interface';

interface MembersTableHeaderProps {
  sortConfig: { sortBy: MemberSortBy; order: SortOrder } | null;
  onSortName: () => void;
}

export function MembersTableHeader({
  sortConfig,
  onSortName,
}: MembersTableHeaderProps) {
  const isNameSorted = sortConfig?.sortBy === 'name';

  return (
    <div className="grid grid-cols-[2fr_1fr_1.5fr_2fr_1fr_50px] gap-4 items-center px-5 py-3 border-b border-border-primary bg-background min-w-225 select-none">
      <button
        type="button"
        onClick={onSortName}
        className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-left transition-colors cursor-pointer group focus:outline-none"
      >
        <span
          className={
            isNameSorted
              ? 'text-brand-main'
              : 'text-text-muted group-hover:text-text-main'
          }
        >
          NOMBRE Y DNI
        </span>
        {isNameSorted ? (
          sortConfig.order === 'asc' ? (
            <ArrowUp size={14} className="text-brand-main shrink-0" />
          ) : (
            <ArrowDown size={14} className="text-brand-main shrink-0" />
          )
        ) : (
          <ArrowUpDown
            size={13}
            className="text-text-muted/40 group-hover:text-text-muted shrink-0 transition-colors"
          />
        )}
      </button>
      <h5 className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
        ESTADO
      </h5>
      <h5 className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
        TELÉFONO
      </h5>
      <h5 className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
        PLAN
      </h5>
      <h5 className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
        OBSERVACIONES
      </h5>
      <h5 className="text-[10px] font-bold text-text-muted tracking-widest uppercase text-right">
        ACCIONES
      </h5>
    </div>
  );
}
