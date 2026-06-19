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
  trendColor = 'text-brand-main' 
}: MetricCardProps) {
  return (
    <div className="bg-surface rounded-lg p-5 border border-border-primary  transition-colors">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase">
          {title}
        </span>
        {icon}
      </div>
      <div className="text-3xl font-bold text-text-main transition-colors">
        {value}
      </div>
      <div className={`text-xs ${trendColor} mt-2 flex items-center gap-1 transition-colors`}>
        {trendIcon}
        <span>{trendText}</span>
      </div>
    </div>
  );
}
