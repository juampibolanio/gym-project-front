export interface MonthlyRevenueMetric {
  total: number;
  trend: number;
  lastMonthMTD?: number;
}

export interface ActiveMembersMetric {
  total: number;
  newToday: number;
  newThisMonth: number;
  newLastMonthMTD?: number;
  trend: number;
}

export interface OverdueAccountsMetric {
  total: number;
}

/**
 * Generic metric value kept for backward compatibility with older components.
 */
export interface MetricValue {
  total: number;
  trend?: number;
  newToday?: number;
  newThisMonth?: number;
  lastMonthMTD?: number;
  newLastMonthMTD?: number;
}

export interface MemberTrajectoryItem {
  month: string;
  newMembers: number;
  churnedMembers: number;
}

export interface RevenueTrajectoryItem {
  month: string;
  amount: number;
}

export interface StatusDistribution {
  active: number;
  suspended: number;
  inactive: number;
}

export interface UpcomingRenewal {
  id: string;
  initials: string;
  name: string;
  plan: string;
  daysLeft: number;
  isUrgent: boolean;
}

export interface UpcomingBirthday {
  id: string;
  name: string;
  initials: string;
  profileImageUrl?: string | null;
  daysLeft: number;
  isToday: boolean;
  birthDate: string;
}

export interface PlanDistributionItem {
  name: string;
  count: number;
  percentage: number;
}

export interface MetricsOverview {
  activeMembers: ActiveMembersMetric;
  monthlyRevenue: MonthlyRevenueMetric;
  overdueAccounts: OverdueAccountsMetric;
  statusDistribution?: StatusDistribution;
  upcomingRenewals: UpcomingRenewal[];
  upcomingBirthdays: UpcomingBirthday[];
  revenueTrajectory: RevenueTrajectoryItem[];
  membersTrajectory?: MemberTrajectoryItem[];
  planDistribution?: PlanDistributionItem[];
}
