import * as React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trendText: string;
  trendIcon: React.ReactNode;
  trendColor?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon, 
  trendText, 
  trendIcon, 
  trendColor = 'text-emerald-600 dark:text-emerald-500' 
}: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-lg p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none transition-colors">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
          {title}
        </span>
        {icon}
      </div>
      <div className="text-3xl font-bold text-zinc-900 dark:text-white transition-colors">
        {value}
      </div>
      <div className={`text-xs ${trendColor} mt-2 flex items-center gap-1 transition-colors`}>
        {trendIcon}
        <span>{trendText}</span>
      </div>
    </div>
  );
}
