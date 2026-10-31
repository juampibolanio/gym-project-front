import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MetricsKpiGrid } from './MetricsKpiGrid';
import { MetricsOverview } from '../interfaces/metrics.interface';

const mockMetrics: MetricsOverview = {
  activeMembers: {
    total: 120,
    newToday: 3,
    newThisMonth: 18,
    newLastMonthMTD: 15,
    trend: 20,
  },
  monthlyRevenue: {
    total: 1500000,
    trend: 12.5,
    lastMonthMTD: 1333333,
  },
  overdueAccounts: {
    total: 7,
  },
  statusDistribution: {
    active: 120,
    suspended: 7,
    inactive: 10,
  },
  upcomingRenewals: [],
  upcomingBirthdays: [],
  revenueTrajectory: [],
  membersTrajectory: [],
  planDistribution: [],
};

describe('MetricsKpiGrid Component', () => {
  it('should render all 4 cards when canViewRevenue is true', () => {
    render(
      <MetricsKpiGrid
        metrics={mockMetrics}
        isRevenueVisible={true}
        onToggleRevenueVisible={vi.fn()}
        canViewRevenue={true}
      />
    );

    expect(screen.getByText(/miembros activos/i)).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('+3 hoy')).toBeInTheDocument();
    expect(screen.getByText('(18 en el mes)')).toBeInTheDocument();

    expect(screen.getByText(/ingresos mensuales/i)).toBeInTheDocument();
    expect(screen.getByText('$1.500.000')).toBeInTheDocument();
    expect(screen.getByText(/mismo período mes anterior: \$1.333.333/i)).toBeInTheDocument();

    expect(screen.getByText(/cuentas vencidas/i)).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText(/requieren cobranza/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /gestionar cuentas vencidas/i })).toHaveAttribute(
      'href',
      '/dashboard/miembros?filter=SUSPENDED'
    );

    expect(screen.getByText(/fecha de hoy/i)).toBeInTheDocument();
  });

  it('should mask monthly revenue when isRevenueVisible is false', () => {
    render(
      <MetricsKpiGrid
        metrics={mockMetrics}
        isRevenueVisible={false}
        onToggleRevenueVisible={vi.fn()}
        canViewRevenue={true}
      />
    );

    expect(screen.getByText('****')).toBeInTheDocument();
    expect(screen.queryByText('$1.500.000')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mostrar ingresos mensuales/i })).toBeInTheDocument();
  });

  it('should trigger onToggleRevenueVisible when eye button is clicked', async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    render(
      <MetricsKpiGrid
        metrics={mockMetrics}
        isRevenueVisible={true}
        onToggleRevenueVisible={handleToggle}
        canViewRevenue={true}
      />
    );

    const toggleBtn = screen.getByRole('button', { name: /ocultar ingresos mensuales/i });
    await user.click(toggleBtn);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('should hide revenue card when canViewRevenue is false', () => {
    render(
      <MetricsKpiGrid
        metrics={mockMetrics}
        isRevenueVisible={true}
        onToggleRevenueVisible={vi.fn()}
        canViewRevenue={false}
      />
    );

    expect(screen.queryByText(/ingresos mensuales/i)).not.toBeInTheDocument();
    expect(screen.getByText(/miembros activos/i)).toBeInTheDocument();
    expect(screen.getByText(/cuentas vencidas/i)).toBeInTheDocument();
  });

  it('should display "Sin deudas pendientes" and no action link when overdue accounts is 0', () => {
    const metricsNoDebt: MetricsOverview = {
      ...mockMetrics,
      overdueAccounts: { total: 0 },
    };

    render(
      <MetricsKpiGrid
        metrics={metricsNoDebt}
        isRevenueVisible={true}
        onToggleRevenueVisible={vi.fn()}
        canViewRevenue={true}
      />
    );

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText(/sin deudas pendientes/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /gestionar cuentas vencidas/i })).not.toBeInTheDocument();
  });
});

