import { ReactNode } from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trendText?: string;
  trendIcon?: ReactNode;
  trendColor?: string;
  action?: ReactNode;
  badge?: ReactNode;
  tooltipText?: string;
  subText?: string;
  href?: string;
  hrefLabel?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  trendText,
  trendIcon,
  trendColor = 'text-brand-main',
  action,
  badge,
  tooltipText,
  subText,
  href,
  hrefLabel,
}: MetricCardProps) {
  return (
    <article className="bg-surface rounded-lg p-5 border border-border-primary transition-colors shadow-sm flex flex-col justify-between">
      <header className="flex justify-between items-start mb-4 gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-[10px] font-bold text-text-muted tracking-wider uppercase">
            {title}
          </h3>
          {tooltipText && (
            <span
              tabIndex={0}
              role="note"
              aria-label={tooltipText}
              title={tooltipText}
              className="inline-flex text-text-muted hover:text-text-main transition-colors cursor-help focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-main rounded-full"
            >
              <HelpCircle size={12} aria-hidden="true" />
            </span>
          )}
          {action}
        </div>
        {icon && (
          <div aria-hidden="true" className="text-text-muted shrink-0">
            {icon}
          </div>
        )}
      </header>

      <div>
        <div className="text-3xl font-bold text-text-main transition-colors tracking-tight">
          {value}
        </div>
        {subText && (
          <p className="text-[11px] text-text-muted mt-1 truncate" title={subText}>
            {subText}
          </p>
        )}
      </div>

      {(trendText || badge || href) && (
        <footer className="flex items-center justify-between mt-3 text-xs transition-colors gap-2 flex-wrap">
          <div className={`flex items-center gap-1 font-medium ${trendColor}`}>
            {trendIcon && (
              <span aria-hidden="true" className="shrink-0">
                {trendIcon}
              </span>
            )}
            {trendText && <span>{trendText}</span>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {badge && <div>{badge}</div>}
            {href && (
              <Link
                href={href}
                className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-brand-main hover:text-brand-hover hover:underline transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-main rounded px-1"
                aria-label={`Gestionar ${title.toLowerCase()}`}
              >
                {hrefLabel || 'Ver'} →
              </Link>
            )}
          </div>
        </footer>
      )}
    </article>
  );
}
