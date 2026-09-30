import { useQuery } from '@tanstack/react-query';
import { MetricsService } from '../services/metrics.service';

export const useDashboardMetrics = (year?: string) => {
  return useQuery({
    queryKey: ['dashboard-metrics', year || 'rolling'],
    queryFn: () => MetricsService.getMetricsOverview(year),
    refetchInterval: 300000,
  });
};

