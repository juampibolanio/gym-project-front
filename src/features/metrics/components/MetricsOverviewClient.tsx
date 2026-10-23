'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMetricsOverview } from '@/features/metrics/hooks/useMetrics';
import { useRole } from '@/features/auth/hooks/useRole';
import { DashboardSkeleton } from '@/common/components/ui/skeletons/DashboardSkeleton';
import { UpcomingRenewalsCard } from '@/features/metrics/components/UpcomingRenewalsCard';
import { UpcomingBirthdaysCard } from '@/features/metrics/components/UpcomingBirthdaysCard';
import { EyeOff } from 'lucide-react';
import { MetricsHeader } from '@/features/metrics/components/MetricsHeader';
import { MetricsKpiGrid } from '@/features/metrics/components/MetricsKpiGrid';

// Dynamic code-splitting for heavy ECharts modules
const RevenueChart = dynamic(
  () => import('@/features/metrics/components/RevenueChart').then((mod) => mod.RevenueChart),
  {
    ssr: false,
    loading: () => (
      <article className="bg-surface border border-border-primary rounded-xl p-6 h-full flex flex-col shadow-sm">
        <header className="mb-4">
          <div className="h-6 w-48 bg-border-primary/40 rounded animate-pulse" />
          <div className="h-4 w-32 bg-border-primary/20 rounded mt-2 animate-pulse" />
        </header>
        <div className="w-full mt-4 min-h-75 flex items-center justify-center bg-surface-hover/30 rounded-lg animate-pulse">
          <span className="sr-only">Cargando gráfico...</span>
        </div>
      </article>
    ),
  }
);

const MembersFlowChart = dynamic(
  () => import('@/features/metrics/components/MembersFlowChart').then((mod) => mod.MembersFlowChart),
  {
    ssr: false,
    loading: () => (
      <article className="bg-surface border border-border-primary rounded-xl p-6 h-full flex flex-col shadow-sm">
        <header className="mb-4">
          <div className="h-6 w-48 bg-border-primary/40 rounded animate-pulse" />
          <div className="h-4 w-32 bg-border-primary/20 rounded mt-2 animate-pulse" />
        </header>
        <div className="w-full mt-4 min-h-75 flex items-center justify-center bg-surface-hover/30 rounded-lg animate-pulse">
          <span className="sr-only">Cargando gráfico...</span>
        </div>
      </article>
    ),
  }
);

const PlanDistributionCard = dynamic(
  () => import('@/features/metrics/components/PlanDistributionCard').then((mod) => mod.PlanDistributionCard),
  {
    ssr: false,
    loading: () => (
      <section className="bg-surface border border-border-primary rounded-lg flex flex-col shadow-sm h-full">
        <header className="flex items-center gap-3 border-b border-border-primary p-5 shrink-0">
          <div className="w-9 h-9 bg-border-primary/30 rounded-lg animate-pulse" />
          <div className="h-5 w-36 bg-border-primary/40 rounded animate-pulse" />
        </header>
        <div className="p-6 flex-1 flex items-center justify-center min-h-60 bg-surface-hover/20 animate-pulse">
          <span className="sr-only">Cargando distribución...</span>
        </div>
      </section>
    ),
  }
);

export function MetricsOverviewClient() {
  const { isUser } = useRole();
  const canViewRevenue = !isUser;
  
  const [selectedPeriod, setSelectedPeriod] = useState('rolling');
  const [isRevenueVisible, setIsRevenueVisible] = useState(true);
  
  const { data: metrics, isLoading, isError } = useMetricsOverview(selectedPeriod);

  if (isLoading) {
    return <DashboardSkeleton canViewRevenue={canViewRevenue} />;
  }

  if (isError || !metrics) {
    return (
      <div className="flex flex-col gap-6" role="alert">
        <h1 className="text-2xl font-bold text-text-main">Vista General</h1>
        <p className="text-sm text-danger-main bg-danger-surface p-4 rounded-md border border-danger-main/30">
          Error al cargar las métricas. Intente nuevamente.
        </p>
      </div>
    );
  }

  const periodLabel =
    selectedPeriod === 'rolling' ? '12 meses' : `Año ${selectedPeriod}`;

  return (
    <div className="flex flex-col gap-6">
      <MetricsHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <MetricsKpiGrid
        metrics={metrics}
        isRevenueVisible={isRevenueVisible}
        onToggleRevenueVisible={() => setIsRevenueVisible(!isRevenueVisible)}
        canViewRevenue={canViewRevenue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {canViewRevenue && (
            <div className="relative flex flex-col">
              <div
                className={`${!isRevenueVisible ? 'filter blur-md select-none transition-all duration-300 opacity-50 pointer-events-none' : 'transition-all duration-300'}`}
                aria-hidden={!isRevenueVisible}
              >
                <RevenueChart
                  data={metrics.revenueTrajectory || []}
                  periodLabel={periodLabel}
                />
              </div>
              {!isRevenueVisible && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <span className="bg-background/80 border border-border-primary px-4 py-2 rounded-full text-sm font-bold text-text-main flex items-center gap-2 backdrop-blur-md shadow-lg">
                    <EyeOff size={16} aria-hidden="true" /> Gráfico Oculto
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="transition-all duration-300">
            <MembersFlowChart
              data={metrics.membersTrajectory || []}
              statusDistribution={metrics.statusDistribution}
              periodLabel={periodLabel}
            />
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <UpcomingRenewalsCard renewals={metrics.upcomingRenewals} />
          <UpcomingBirthdaysCard birthdays={metrics.upcomingBirthdays} />
          <PlanDistributionCard distribution={metrics.planDistribution || []} />
        </aside>
      </div>
    </div>
  );
}
