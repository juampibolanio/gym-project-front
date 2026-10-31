'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Calendar,
  Eye,
  EyeOff,
} from 'lucide-react';
import { MetricCard, MetricCardProps } from './MetricCard';
import { MetricsOverview } from '../interfaces/metrics.interface';
import {
  getTrendColor,
  getTrendText,
  getMtdComparisonText,
} from '../utils/trends-styles';

interface MetricsKpiGridProps {
  metrics: MetricsOverview;
  isRevenueVisible: boolean;
  onToggleRevenueVisible: () => void;
  canViewRevenue?: boolean;
}

const renderTrendIcon = (trend?: number) => (
  <TrendingUp
    size={12}
    className={trend && trend < 0 ? 'rotate-180 transform' : ''}
    aria-hidden="true"
  />
);

export function MetricsKpiGrid({
  metrics,
  isRevenueVisible,
  onToggleRevenueVisible,
  canViewRevenue = true,
}: MetricsKpiGridProps) {
  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime({
        date: now.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        time: now.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const isHydrated = dateTime.date !== '';

  const newToday = metrics.activeMembers.newToday ?? 0;
  const newThisMonth = metrics.activeMembers.newThisMonth ?? 0;
  const newLastMonthMTD = metrics.activeMembers.newLastMonthMTD;
  const memberTrend = metrics.activeMembers.trend || 0;

  const monthlyRevenueTotal = metrics.monthlyRevenue.total || 0;
  const revenueTrend = metrics.monthlyRevenue.trend || 0;
  const lastMonthMTD = metrics.monthlyRevenue.lastMonthMTD;

  const overdueTotal = metrics.overdueAccounts.total || 0;

  const cards: MetricCardProps[] = [
    {
      title: 'Miembros Activos',
      value: metrics.activeMembers.total.toLocaleString('es-AR'),
      icon: <Users size={16} className="text-text-muted" aria-hidden="true" />,
      badge: (
        <div className="flex items-center gap-1.5 flex-wrap">
          {newToday > 0 && (
            <span
              className="text-[11px] font-semibold text-success-main bg-success-surface/50 border border-success-main/20 px-1.5 py-0.5 rounded"
              title="Socios dados de alta hoy"
            >
              +{newToday} hoy
            </span>
          )}
          {newThisMonth > 0 && (
            <span
              className="text-[11px] font-medium text-text-muted"
              title="Socios dados de alta este mes"
            >
              ({newThisMonth} en el mes)
            </span>
          )}
        </div>
      ),
      trendText: getTrendText(memberTrend, 'en nuevas altas'),
      trendIcon: renderTrendIcon(memberTrend),
      trendColor: getTrendColor(memberTrend),
      tooltipText:
        newLastMonthMTD !== undefined
          ? `Nuevas altas acumuladas a esta misma fecha el mes anterior: ${newLastMonthMTD}.`
          : 'Variación de nuevas altas respecto al mes anterior.',
    },
    ...(canViewRevenue
      ? [
          {
            title: 'Ingresos Mensuales',
            value: isRevenueVisible
              ? `$${monthlyRevenueTotal.toLocaleString('es-AR')}`
              : '****',
            subText:
              isRevenueVisible && lastMonthMTD !== undefined
                ? getMtdComparisonText(lastMonthMTD, true) ?? undefined
                : undefined,
            icon: (
              <Wallet
                size={16}
                className="text-brand-main transition-colors"
                aria-hidden="true"
              />
            ),
            trendText: getTrendText(revenueTrend, 'vs mes anterior'),
            trendIcon: renderTrendIcon(revenueTrend),
            trendColor: getTrendColor(revenueTrend),
            tooltipText:
              lastMonthMTD !== undefined
                ? `Recaudación acumulada a esta misma fecha el mes anterior: $${lastMonthMTD.toLocaleString('es-AR')}.`
                : 'Comparación de recaudación respecto al mes anterior.',
            action: (
              <button
                type="button"
                onClick={onToggleRevenueVisible}
                className="text-text-muted hover:text-text-main transition-colors ml-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main rounded"
                aria-label={
                  isRevenueVisible
                    ? 'Ocultar ingresos mensuales'
                    : 'Mostrar ingresos mensuales'
                }
                title={isRevenueVisible ? 'Ocultar ingresos' : 'Mostrar ingresos'}
              >
                {isRevenueVisible ? (
                  <EyeOff size={14} aria-hidden="true" />
                ) : (
                  <Eye size={14} aria-hidden="true" />
                )}
              </button>
            ),
          },
        ]
      : []),
    {
      title: 'Cuentas Vencidas',
      value: overdueTotal.toLocaleString('es-AR'),
      icon:
        overdueTotal > 0 ? (
          <AlertTriangle
            size={16}
            className="text-danger-main transition-colors"
            aria-hidden="true"
          />
        ) : (
          <CheckCircle2
            size={16}
            className="text-success-main transition-colors"
            aria-hidden="true"
          />
        ),
      trendText: overdueTotal > 0 ? 'Requieren cobranza' : 'Sin deudas pendientes',
      trendIcon:
        overdueTotal > 0 ? (
          <AlertTriangle size={12} aria-hidden="true" />
        ) : (
          <CheckCircle2 size={12} aria-hidden="true" />
        ),
      trendColor: overdueTotal > 0 ? 'text-danger-main' : 'text-success-main',
      tooltipText:
        'Socios con suscripción vencida en los últimos 30 días que requieren gestión de cobro.',
      href: overdueTotal > 0 ? '/dashboard/miembros?filter=SUSPENDED' : undefined,
      hrefLabel: 'Gestionar',
    },
    {
      title: 'Fecha de Hoy',
      value: isHydrated ? dateTime.date : '--/--/----',
      icon: (
        <Calendar
          size={16}
          className="text-brand-main transition-colors"
          aria-hidden="true"
        />
      ),
      trendText: isHydrated ? dateTime.time : 'Calculando...',
      trendIcon: <Clock size={12} aria-hidden="true" />,
      trendColor: 'text-text-muted',
    },
  ];

  return (
    <section
      className={`grid gap-4 ${
        canViewRevenue
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          : 'grid-cols-1 md:grid-cols-3'
      }`}
      aria-label="Indicadores clave de rendimiento"
    >
      {cards.map((card) => (
        <MetricCard key={card.title} {...card} />
      ))}
    </section>
  );
}
