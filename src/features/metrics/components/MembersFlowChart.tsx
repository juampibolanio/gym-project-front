'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react';
import {
  buildMembersChartOptions,
  MembersFlowViewMode,
} from '../utils/members-chart-options';
import { MembersFlowHeader } from './MembersFlowHeader';
import { MembersStatusFooter } from './MembersStatusFooter';
import {
  StatusDistribution,
  MemberTrajectoryItem,
} from '../interfaces/metrics.interface';
import { TimeRangeFilter } from './RevenueChart';

let hasAnimated = false;

export interface MembersFlowChartProps {
  data: MemberTrajectoryItem[];
  statusDistribution?: StatusDistribution;
  periodLabel?: string;
}

interface EChartsInstance {
  dispatchAction: (payload: { type: string; name: string }) => void;
}

export function MembersFlowChart({
  data = [],
  statusDistribution,
  periodLabel = '12 meses',
}: MembersFlowChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shouldAnimate] = useState(!hasAnimated);

  const [viewMode, setViewMode] = useState<MembersFlowViewMode>('flow');
  const [timeRange, setTimeRange] = useState<TimeRangeFilter>('all');

  useEffect(() => {
    hasAnimated = true;
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Filter trajectory data according to selected time range
  const rangedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (timeRange === '3m') return data.slice(-3);
    if (timeRange === '6m') return data.slice(-6);
    return data;
  }, [data, timeRange]);

  const totalNew = useMemo(
    () => rangedData.reduce((acc, curr) => acc + (curr.newMembers || 0), 0),
    [rangedData]
  );
  const totalChurn = useMemo(
    () => rangedData.reduce((acc, curr) => acc + (curr.churnedMembers || 0), 0),
    [rangedData]
  );
  const netGrowth = totalNew - totalChurn;

  const effectiveRangeLabel =
    timeRange === '3m'
      ? 'Últimos 3 meses'
      : timeRange === '6m'
      ? 'Últimos 6 meses'
      : periodLabel;

  if (!mounted) {
    return (
      <article className="bg-surface border border-border-primary rounded-xl p-6 h-full flex flex-col transition-colors shadow-sm">
        <MembersFlowHeader
          totalNew={totalNew}
          totalChurn={totalChurn}
          netGrowth={netGrowth}
          periodLabel={effectiveRangeLabel}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
        <div className="w-full mt-2 min-h-75 flex items-center justify-center bg-surface-hover/30 rounded-lg animate-pulse">
          <span className="sr-only">Cargando gráfico de flujo de miembros...</span>
        </div>
        {statusDistribution && (
          <MembersStatusFooter distribution={statusDistribution} />
        )}
      </article>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const option = buildMembersChartOptions({
    data: rangedData,
    isDark,
    shouldAnimate,
    viewMode,
  });

  const handleLegendSelectChanged = (
    params: { name: string; selected: Record<string, boolean> },
    instance?: EChartsInstance
  ) => {
    const isAllUnselected =
      !params.selected['Nuevas Altas'] && !params.selected['Bajas'];

    if (isAllUnselected && instance) {
      instance.dispatchAction({
        type: 'legendSelect',
        name: params.name,
      });
    }
  };

  return (
    <article
      className="bg-surface border border-border-primary rounded-xl p-6 h-full flex flex-col transition-colors shadow-sm"
      aria-label="Gráfico interactivo de flujo de miembros"
    >
      <MembersFlowHeader
        totalNew={totalNew}
        totalChurn={totalChurn}
        netGrowth={netGrowth}
        periodLabel={effectiveRangeLabel}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      <div className="w-full mt-2 flex-1 min-h-75" aria-hidden="true">
        <ReactECharts
          option={option}
          style={{ height: '100%', minHeight: '300px', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
          onEvents={{
            legendselectchanged: handleLegendSelectChanged,
          }}
        />
      </div>

      {statusDistribution && (
        <MembersStatusFooter distribution={statusDistribution} />
      )}
    </article>
  );
}
