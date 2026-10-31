'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react';
import {
  buildRevenueChartOptions,
  RevenueViewMode,
} from '../utils/revenue-chart-options';
import { RevenueTrajectoryItem } from '../interfaces/metrics.interface';

let hasAnimated = false;

export type TimeRangeFilter = 'all' | '6m' | '3m';

export interface RevenueChartProps {
  data: RevenueTrajectoryItem[];
  periodLabel?: string;
}

export function RevenueChart({
  data,
  periodLabel = '12 meses',
}: RevenueChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shouldAnimate] = useState(!hasAnimated);

  const [viewMode, setViewMode] = useState<RevenueViewMode>('monthly');
  const [timeRange, setTimeRange] = useState<TimeRangeFilter>('all');
  const [showAverage, setShowAverage] = useState(false);

  useEffect(() => {
    hasAnimated = true;

    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Filter by time range (all, 6m, 3m)
  const rangedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (timeRange === '3m') return data.slice(-3);
    if (timeRange === '6m') return data.slice(-6);
    return data;
  }, [data, timeRange]);

  // Compute cumulative values if viewMode is 'cumulative'
  const chartData = useMemo(() => {
    if (viewMode === 'monthly') return rangedData;

    let runningTotal = 0;
    return rangedData.map((item) => {
      runningTotal += item.amount;
      return {
        month: item.month,
        amount: runningTotal,
      };
    });
  }, [rangedData, viewMode]);

  const effectiveRangeLabel =
    timeRange === '3m'
      ? 'Últimos 3 meses'
      : timeRange === '6m'
      ? 'Últimos 6 meses'
      : periodLabel;

  if (!mounted) {
    return (
      <article className="bg-surface border border-border-primary rounded-xl p-6 h-full flex flex-col shadow-sm">
        <header className="mb-4">
          <h3 className="text-lg font-bold text-text-main">
            Trayectoria de Ingresos
          </h3>
          <p className="text-sm text-text-muted">
            Evolución de recaudación ({periodLabel})
          </p>
        </header>
        <div className="w-full mt-4 min-h-75 flex items-center justify-center bg-surface-hover/30 rounded-lg animate-pulse">
          <span className="sr-only">Cargando gráfico...</span>
        </div>
      </article>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const option = buildRevenueChartOptions({
    data: chartData,
    isDark,
    shouldAnimate,
    viewMode,
    showAverage,
  });

  return (
    <article
      className="bg-surface border border-border-primary rounded-xl p-6 h-full flex flex-col transition-colors shadow-sm"
      aria-label="Gráfico de trayectoria de ingresos"
    >
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-text-main">
            Trayectoria de Ingresos
          </h3>
          <p className="text-sm text-text-muted">
            {viewMode === 'cumulative' ? 'Recaudación acumulada' : 'Evolución de recaudación mensual'} ({effectiveRangeLabel})
          </p>
        </div>

        {/* Interactive Controls Toolbar */}
        <div
          className="flex items-center gap-2 flex-wrap"
          role="toolbar"
          aria-label="Controles del gráfico de ingresos"
        >
          {/* View Mode: Monthly vs Cumulative */}
          <div
            className="flex items-center bg-surface-hover/70 border border-border-primary rounded-lg p-0.5"
            role="radiogroup"
            aria-label="Modo de visualización"
          >
            <button
              type="button"
              role="radio"
              aria-checked={viewMode === 'monthly'}
              onClick={() => setViewMode('monthly')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main ${
                viewMode === 'monthly'
                  ? 'bg-surface text-brand-main shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={viewMode === 'cumulative'}
              onClick={() => setViewMode('cumulative')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main ${
                viewMode === 'cumulative'
                  ? 'bg-surface text-brand-main shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Acumulado
            </button>
          </div>

          {/* Time Range Filter */}
          <div
            className="flex items-center bg-surface-hover/70 border border-border-primary rounded-lg p-0.5"
            role="radiogroup"
            aria-label="Rango temporal"
          >
            {(['all', '6m', '3m'] as const).map((range) => {
              const label = range === 'all' ? '12M' : range === '6m' ? '6M' : '3M';
              const isActive = timeRange === range;
              return (
                <button
                  key={range}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setTimeRange(range)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main ${
                    isActive
                      ? 'bg-surface text-brand-main shadow-xs'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Average Line Toggle */}
          <button
            type="button"
            aria-pressed={showAverage}
            onClick={() => setShowAverage(!showAverage)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main ${
              showAverage
                ? 'bg-brand-surface text-brand-main border-brand-main/40 font-bold shadow-xs'
                : 'bg-surface-hover/70 text-text-muted hover:text-text-main border-border-primary'
            }`}
            title="Alternar línea de promedio mensual de recaudación"
          >
            Media
          </button>
        </div>
      </header>

      <div
        className="w-full mt-2 flex-1 min-h-75"
        aria-hidden="true"
      >
        <ReactECharts
          option={option}
          style={{ height: '100%', minHeight: '300px', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </article>
  );
}
