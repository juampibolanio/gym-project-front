import { httpClient } from '@/core/api/axios.adapter';
import { DashboardMetrics } from '../interfaces/metrics.interface';

export class DashboardService {
  private static readonly ENDPOINT = '/metrics';

  static async getMetrics(): Promise<DashboardMetrics> {
    return await httpClient.get<DashboardMetrics>(this.ENDPOINT);
  }
}
