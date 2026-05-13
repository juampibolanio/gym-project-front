import * as React from 'react';

interface RenewalItemProps {
  initials: string;
  name: string;
  plan: string;
  daysText: string;
  isUrgent?: boolean;
  hasBorder?: boolean;
}

export function RenewalItem({ 
  initials, 
  name, 
  plan, 
  daysText, 
  isUrgent = false,
  hasBorder = true
}: RenewalItemProps) {
  
  const borderClass = hasBorder ? "border-b border-zinc-100 dark:border-zinc-800/50" : "";
  const daysColorClass = isUrgent ? "text-red-500 dark:text-red-400" : "text-zinc-500 dark:text-zinc-400";

  return (
    <div className={`flex items-center justify-between px-5 py-4 hover:bg-zinc-50 dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer ${borderClass}`}>
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-300 transition-colors">
          {initials}
        </div>
        <span className="text-sm text-zinc-700 dark:text-zinc-300 transition-colors">
          {name}
        </span>
      </div>
      <div className="flex gap-2 text-sm">
        <span className="text-zinc-500 dark:text-zinc-400 transition-colors">{plan}</span>
        <span className={`${daysColorClass} font-medium transition-colors`}>{daysText}</span>
      </div>
    </div>
  );
}
