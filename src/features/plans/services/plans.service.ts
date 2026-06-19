import { httpClient } from '@/core/api/axios.adapter';
import {
  CreatePlanPayload,
  Plan,
  UpdatePlanPayload,
} from '../interfaces/plan.interface';
import { PaginatedResult } from '@/common/interfaces/pagination.interface';

export class PlansService {
  private static readonly ENDPOINT = '/membership-plans';

  static async getAll(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<Plan>> {
    return await httpClient.get<PaginatedResult<Plan>>(
      `${this.ENDPOINT}?page=${page}&limit=${limit}`
    );
  }

  static async getById(id: string): Promise<Plan> {
    return await httpClient.get<Plan>(`${this.ENDPOINT}/${id}`);
  }

  static async create(payload: CreatePlanPayload): Promise<Plan> {
    return await httpClient.post(this.ENDPOINT, payload);
  }

  static async update(id: string, payload: UpdatePlanPayload): Promise<Plan> {
    return await httpClient.patch<Plan>(`${this.ENDPOINT}/${id}`, payload);
  }

  static async remove(id: string): Promise<Plan> {
    return await httpClient.delete<Plan>(`${this.ENDPOINT}/${id}`);
  }
}
