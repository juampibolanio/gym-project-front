'use client';

import { useState, useEffect } from 'react';

import {
  Users,
  Wallet,
  AlertTriangle,
  TrendingUp,
  Clock,
  Calendar,
} from 'lucide-react';
import { MetricCard } from '@/features/dashboard/components/MetricCard';
import { RenewalItem } from '@/features/dashboard/components/RenewalItem';
import { useDashboardMetrics } from '@/features/dashboard/hooks/useDashboard';
import { FormSkeleton } from '@/common/components/ui/FormSkeleton';

export default function DashboardPage() {
  const { data: metrics, isLoading, isError } = useDashboardMetrics();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend: number, invert: boolean = false) => {
    if (trend === 0) return 'text-text-muted';
    if (invert) {
      return trend > 0 ? 'text-danger-main' : 'text-success-main';
    }
    return trend > 0 ? 'text-success-main' : 'text-danger-main';
  };

  const getTrendText = (trend: number, suffix: string) => {
    const sign = trend > 0 ? '+' : '';
    return `${sign}${trend}% ${suffix}`;
  };

  const todayStr = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-main">Vista General</h1>
            <p className="text-sm text-text-muted mt-1">Cargando métricas en tiempo real...</p>
          </div>
        </div>
        <FormSkeleton />
      </div>
    );
  }

  if (isError || !metrics) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-text-main">Vista General</h1>
        <p className="text-sm text-danger-main">Error al cargar las métricas. Intente nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-wide transition-colors">
            Vista General
          </h1>
          <p className="text-sm text-text-muted mt-1 transition-colors">
            Métricas en tiempo real
          </p>
        </div>
        <div className="px-3 py-1 bg-brand-surface border border-brand-main/20 rounded text-brand-main text-xs font-bold tracking-widest transition-colors flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-main animate-pulse"></span>
          DATOS EN VIVO
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Miembros Activos"
          value={metrics.activeMembers.total.toLocaleString('es-AR')}
          icon={<Users size={16} className="text-text-muted" />}
          trendText={getTrendText(metrics.activeMembers.trend || 0, 'este mes')}
          trendIcon={<TrendingUp size={12} className={metrics.activeMembers.trend && metrics.activeMembers.trend < 0 ? 'rotate-180 transform' : ''} />}
          trendColor={getTrendColor(metrics.activeMembers.trend || 0)}
        />

        <MetricCard
          title="Ingresos Mensuales"
          value={`$${metrics.monthlyRevenue.total.toLocaleString('es-AR')}`}
          icon={
            <Wallet size={16} className="text-brand-main transition-colors" />
          }
          trendText={getTrendText(metrics.monthlyRevenue.trend || 0, 'vs último mes')}
          trendIcon={<TrendingUp size={12} className={metrics.monthlyRevenue.trend && metrics.monthlyRevenue.trend < 0 ? 'rotate-180 transform' : ''} />}
          trendColor={getTrendColor(metrics.monthlyRevenue.trend || 0)}
        />

        <MetricCard
          title="Cuentas Vencidas"
          value={metrics.overdueAccounts.total.toLocaleString('es-AR')}
          icon={
            <AlertTriangle
              size={16}
              className="text-danger-main transition-colors"
            />
          }
          trendText="Requieren atención"
          trendIcon={<AlertTriangle size={12} />}
          trendColor="text-danger-main"
        />

        <MetricCard
          title="Fecha de Hoy"
          value={todayStr}
          icon={
            <Calendar size={16} className="text-brand-main transition-colors" />
          }
          trendText={currentTime ? currentTime : "Calculando..."}
          trendIcon={<Clock size={12} />}
          trendColor="text-text-muted"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border-primary  rounded-lg flex flex-col transition-colors overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border-primary">
            <h2 className="text-sm font-bold text-text-main transition-colors">
              Trayectoria de ingresos Semanales
            </h2>
            <div className="flex bg-background rounded text-xs font-medium transition-colors p-1">
              <button className="px-3 py-1 text-text-muted hover:text-text-main transition-colors">
                7D
              </button>
              <button className="px-3 py-1 bg-surface text-text-main rounded  transition-colors border border-border-primary">
                30D
              </button>
              <button className="px-3 py-1 text-text-muted hover:text-text-main transition-colors">
                90D
              </button>
            </div>
          </div>

          <div className="flex-1 p-5 min-h-[300px] flex items-center justify-center">
            <p className="text-text-muted text-sm italic">
              Espacio reservado para ECharts...
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border-primary  rounded-lg flex flex-col transition-colors overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border-primary">
            <h2 className="text-sm font-bold text-text-main transition-colors">
              Próximos Vencimientos (5 días)
            </h2>
            <div className="text-xs font-bold text-brand-main bg-brand-surface px-2 py-0.5 rounded">
              {metrics.upcomingRenewals.length}
            </div>
          </div>

          <div className="flex-1 p-0">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary text-[10px] font-bold text-text-muted tracking-widest uppercase">
              <span>Miembro</span>
              <span>Plan</span>
            </div>

            <div className="flex flex-col">
              {metrics.upcomingRenewals.length === 0 ? (
                <div className="p-6 text-center text-sm text-text-muted">
                  No hay vencimientos próximos.
                </div>
              ) : (
                metrics.upcomingRenewals.map((renewal, index) => (
                  <RenewalItem
                    key={renewal.id}
                    initials={renewal.initials}
                    name={renewal.name}
                    plan={renewal.plan}
                    daysText={`${renewal.daysLeft}d`}
                    isUrgent={renewal.isUrgent}
                    hasBorder={index !== metrics.upcomingRenewals.length - 1}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
