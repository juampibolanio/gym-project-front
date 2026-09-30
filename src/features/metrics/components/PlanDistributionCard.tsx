'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { PieChart } from 'lucide-react';
import { PlanDistributionItem } from '../interfaces/metrics.interface';

interface PlanDistributionCardProps {
  distribution: PlanDistributionItem[];
}

interface PieTooltipParam {
  name: string;
  value: number;
  percent: number;
  color: string;
}

export const PlanDistributionCard = ({ distribution }: PlanDistributionCardProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <article className="bg-surface border border-border-primary rounded-xl p-6 flex flex-col shadow-sm h-full transition-colors">
        <header className="flex items-center gap-3 border-b border-border-primary pb-4 mb-4">
          <div className="p-2 bg-brand-surface rounded-lg">
            <PieChart size={20} className="text-brand-main" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-main">Distribución de Planes</h3>
            <p className="text-xs text-text-muted">Suscripciones activas</p>
          </div>
        </header>
        <div className="flex-1 w-full flex items-center justify-center min-h-65 bg-surface-hover/30 rounded-lg animate-pulse">
          <span className="sr-only">Cargando gráfico de distribución de planes...</span>
        </div>
      </article>
    );
  }

  const isDark = theme === 'dark';
  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const mainTextColor = isDark ? '#f3f4f6' : '#111827';
  const borderColor = isDark ? '#111827' : '#ffffff';

  const chartData = distribution.map((plan) => ({
    name: plan.name,
    value: plan.count,
  }));

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: mainTextColor },
      formatter: (params: unknown) => {
        const payload = params as PieTooltipParam;
        return `
          <div class="font-bold mb-1">${payload.name}</div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full" style="background-color: ${payload.color}"></span>
            <span class="font-medium">${payload.value.toLocaleString('es-AR')} alumnos (${payload.percent}%)</span>
          </div>
        `;
      },
    },
    legend: {
      bottom: '0',
      left: 'center',
      textStyle: { color: textColor },
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
    },
    series: [
      {
        name: 'Planes',
        type: 'pie',
        radius: ['45%', '75%'], 
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: borderColor,
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: mainTextColor,
            formatter: '{b}\n{c}',
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
      },
    ],
  };

  return (
    <article 
      className="bg-surface border border-border-primary rounded-xl p-6 flex flex-col shadow-sm h-full transition-colors"
      aria-label="Gráfico de distribución de planes activos"
    >
      <header className="flex items-center gap-3 border-b border-border-primary pb-4 mb-4">
        <div className="p-2 bg-brand-surface rounded-lg">
          <PieChart size={20} className="text-brand-main" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-main">Distribución de Planes</h3>
          <p className="text-xs text-text-muted">Suscripciones activas</p>
        </div>
      </header>

      {!distribution || distribution.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-text-muted">
          <p className="text-sm">No hay datos suficientes.</p>
        </div>
      ) : (
        <div 
          className="flex-1 w-full flex items-center justify-center min-h-62.5"
          aria-hidden="true"
        >
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%', minHeight: '260px' }}
            notMerge={true}
            lazyUpdate={true}
          />
        </div>
      )}
    </article>
  );
};
