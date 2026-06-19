import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '../services/dashboard.service';

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: () => DashboardService.getMetrics(),
    refetchInterval: 300000,
  });
};
