import { httpClient } from '@/core/api/axios.adapter';
import { PaginatedResult } from '@/common/interfaces/pagination.interface';
import {
  CreateMemberPayload,
  GetMembersParams,
  Member,
  UpdateMemberPayload,
} from '../interfaces/members.interface';

export class MembersService {
  private static readonly ENDPOINT = '/members';

  /**
   * Retrieves a paginated and filtered list of members.
   */
  static async getAll(
    params: GetMembersParams = {}
  ): Promise<PaginatedResult<Member>> {
    const {
      page = 1,
      limit = 10,
      term,
      state,
      planId,
      sortBy,
      order,
      initial,
    } = params;

    const searchParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (term) searchParams.append('term', term);
    if (state) searchParams.append('state', state);
    if (planId) searchParams.append('planId', planId);
    if (sortBy) searchParams.append('sortBy', sortBy);
    if (order) searchParams.append('order', order);
    if (initial) searchParams.append('initial', initial);

    return await httpClient.get<PaginatedResult<Member>>(
      `${this.ENDPOINT}?${searchParams.toString()}`
    );
  }

  /**
   * Retrieves a specific member by their UUID.
   */
  static async getById(id: string): Promise<Member> {
    return await httpClient.get<Member>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Creates a new member in the system.
   */
  static async create(payload: CreateMemberPayload): Promise<Member> {
    return await httpClient.post<Member>(this.ENDPOINT, payload);
  }

  /**
   * Updates an existing member's information.
   */
  static async update(id: string, payload: UpdateMemberPayload): Promise<Member> {
    return await httpClient.patch<Member>(`${this.ENDPOINT}/${id}`, payload);
  }

  /**
   * Permanently deletes a member from the system (if no financial records exist).
   */
  static async remove(id: string): Promise<Member> {
    return await httpClient.delete<Member>(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Soft-deactivates a member and cancels their active subscriptions.
   */
  static async deactivate(id: string): Promise<Member> {
    return await httpClient.patch<Member>(`${this.ENDPOINT}/${id}/deactivate`);
  }

  /**
   * Renews a member's plan and processes the payment.
   */
  static async renewPlan(
    id: string,
    payload: { planUuid: string; paymentMethod: string }
  ): Promise<Member> {
    return await httpClient.post<Member>(`${this.ENDPOINT}/${id}/renew`, payload);
  }

  /**
   * Changes a member's active plan, adjusting billing and scheduling.
   */
  static async changePlan(
    id: string,
    payload: {
      newPlanUuid: string;
      paymentMethod: string;
      activationType: 'IMMEDIATE' | 'SCHEDULED';
    }
  ): Promise<Member> {
    return await httpClient.post<Member>(
      `${this.ENDPOINT}/${id}/change-plan`,
      payload
    );
  }
}
