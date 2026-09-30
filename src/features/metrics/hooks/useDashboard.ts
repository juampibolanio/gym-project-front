import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '../services/metrics.service';

export const useDashboardMetrics = (year?: string) => {
  return useQuery({
    queryKey: ['dashboard-metrics', year || 'rolling'],
    queryFn: () => DashboardService.getMetrics(year),
    refetchInterval: 300000,
  });
};

