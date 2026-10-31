import { EChartsOption } from 'echarts';

export interface RevenueDataPoint {
  month: string;
  amount: number;
}

export type RevenueViewMode = 'monthly' | 'cumulative';

export interface BuildRevenueChartOptionsParams {
  data: RevenueDataPoint[];
  isDark: boolean;
  shouldAnimate: boolean;
  viewMode?: RevenueViewMode;
  showAverage?: boolean;
}

interface EChartsTooltipParam {
  name: string;
  value: number | string;
}

export function buildRevenueChartOptions({
  data,
  isDark,
  shouldAnimate,
  viewMode = 'monthly',
  showAverage = false,
}: BuildRevenueChartOptionsParams): EChartsOption {
  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const splitLineColor = isDark ? '#374151' : '#e5e7eb';
  const isCumulative = viewMode === 'cumulative';

  const lineColor = isCumulative ? '#3b82f6' : '#10b981';
  const areaStop0 = isCumulative ? 'rgba(59, 130, 246, 0.35)' : 'rgba(16, 185, 129, 0.4)';
  const areaStop1 = isCumulative ? 'rgba(59, 130, 246, 0.0)' : 'rgba(16, 185, 129, 0.0)';

  return {
    animation: shouldAnimate,
    grid: { top: 25, right: 20, bottom: 20, left: 60, containLabel: false },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f3f4f6' : '#111827' },
      formatter: (params: unknown) => {
        const items = (Array.isArray(params) ? params : [params]) as EChartsTooltipParam[];
        if (!items.length) return '';

        const val = items[0];
        const numericValue = Number(val.value) || 0;
        const modeLabel = isCumulative ? 'Acumulado a la fecha' : 'Recaudación del mes';

        return `
          <div class="font-bold mb-1">${val.name}</div>
          <div class="text-[11px] text-text-muted mb-1">${modeLabel}</div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full" style="background-color: ${lineColor}"></span>
            <span class="font-semibold text-sm">$${numericValue.toLocaleString('es-AR')}</span>
          </div>
        `;
      },
    },
    xAxis: {
      type: 'category' as const,
      data: data.map((d) => d.month),
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: textColor,
        margin: 16,
        fontSize: 12,
        fontWeight: 500,
      },
    },
    yAxis: {
      type: 'value' as const,
      splitLine: { 
        lineStyle: { color: splitLineColor, type: 'dashed' as const } 
      },
      axisLabel: {
        color: textColor,
        formatter: (value: number | string) => {
          const numValue = Number(value);
          if (numValue >= 1000000) return `$${(numValue / 1000000).toFixed(1)}M`;
          if (numValue >= 1000) return `$${(numValue / 1000).toFixed(0)}k`;
          return `$${numValue}`;
        },
      },
    },
    series: [
      {
        name: isCumulative ? 'Recaudación Acumulada' : 'Recaudación Mensual',
        data: data.map((d) => d.amount),
        type: 'line' as const,
        smooth: true,
        showSymbol: false,
        lineStyle: { color: lineColor, width: 3 },
        areaStyle: {
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: areaStop0 },
              { offset: 1, color: areaStop1 },
            ],
          },
        },
        markLine: showAverage
          ? {
              silent: true,
              symbol: 'none',
              lineStyle: {
                color: isDark ? '#9ca3af' : '#6b7280',
                type: 'dashed' as const,
                width: 1.5,
              },
              data: [
                {
                  type: 'average' as const,
                  name: 'Promedio',
                  label: {
                    show: true,
                    position: 'insideEndTop' as const,
                    formatter: (params: { value?: unknown }) =>
                      `Media: $${Math.round(Number(params.value) || 0).toLocaleString('es-AR')}`,
                    fontSize: 11,
                    color: isDark ? '#d1d5db' : '#374151',
                    backgroundColor: isDark
                      ? 'rgba(31, 41, 55, 0.85)'
                      : 'rgba(255, 255, 255, 0.85)',
                    padding: [2, 6],
                    borderRadius: 4,
                  },
                },
              ],
            }
          : undefined,
      },
    ],
  };
}
