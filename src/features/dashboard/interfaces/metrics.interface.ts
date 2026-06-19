export interface MetricValue {
  total: number;
  trend?: number;
}

export interface UpcomingRenewal {
  id: string;
  initials: string;
  name: string;
  plan: string;
  daysLeft: number;
  isUrgent: boolean;
}

export interface RenewalItemProps {
  initials: string;
  name: string;
  plan: string;
  daysText: string;
  isUrgent?: boolean;
  hasBorder?: boolean;
}

export interface DashboardMetrics {
  activeMembers: MetricValue;
  monthlyRevenue: MetricValue;
  overdueAccounts: MetricValue;
  upcomingRenewals: UpcomingRenewal[];
  revenueTrajectory: { month: string; amount: number }[];
}
