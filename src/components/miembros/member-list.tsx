import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface MemberListProps {
  name: string;
  memberID: string;
  status: 'Activo' | 'Vencido' | 'Inactivo';
  plan: string;
  lastPayment: string;
  nextExpiration?: string;
}

export function MemberList({ 
  name, 
  memberID, 
  status, 
  plan, 
  lastPayment, 
  nextExpiration,
}: MemberListProps) {
  
  const statusStyles = {
    'Activo': 'bg-brand-main text-brand-main-dark border-brand-main/20',
    'Vencido': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'Inactivo': 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  };

  const dotStyles = {
    'Activo': 'bg-text-main',
    'Vencido': 'bg-orange-500',
    'Inactivo': 'bg-gray-400'
  };

  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
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
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold border rounded-full uppercase transition-colors ${statusStyles[status]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`}></span>
          {status}
        </span>
      </div>
      
      <div>
        <p className="text-sm font-light text-text-main">{plan}</p>
      </div>
      
      <div>
        <p className="text-sm font-light text-text-main">{lastPayment}</p>
      </div>
      
      <div>
        <p className="text-sm font-light text-text-main">{nextExpiration}</p>
      </div>
      
      <div>
        <MoreHorizontal className="text-text-muted hover:text-text-main cursor-pointer transition-colors" />
      </div>

    </div>
  );
}