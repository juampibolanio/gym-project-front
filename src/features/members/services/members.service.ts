import { PaginatedResult } from "@/common/interfaces/pagination.interface";
import { httpClient } from "@/core/api/axios.adapter";
import { CreateMemberPayload, Member, UpdateMemberPayload } from "../interfaces/members.interface";

export class MembersService {
    private static readonly ENDPOINT = '/members';

    static async getAll(page: number = 1, limit: number = 10, term?: string, state?: string): Promise<PaginatedResult<Member>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        if (term) params.append('term', term);
        if (state) params.append('state', state);

        return await httpClient.get<PaginatedResult<Member>>(`${this.ENDPOINT}?${params.toString()}`);
    }

    static async getById(id: string): Promise<Member> {
        return await httpClient.get<Member>(`${this.ENDPOINT}/${id}`);
    }

    static async create(payload: CreateMemberPayload): Promise<Member> {
        return await httpClient.post(this.ENDPOINT, payload);
    }

    static async update(id: string, payload: UpdateMemberPayload): Promise<Member> {
        return await httpClient.patch<Member>(`${this.ENDPOINT}/${id}`, payload);
    }

    static async remove(id: string): Promise<Member> {
        return await httpClient.delete<Member>(`${this.ENDPOINT}/${id}`);
    }

    static async subscribeAndPay(id: string, payload: import('../interfaces/members.interface').SubscribeAndPayPayload): Promise<{ subscription: import('../interfaces/members.interface').Subscription; payment: import('../interfaces/members.interface').Payment }> {
        return await httpClient.post(`${this.ENDPOINT}/${id}/subscribe-and-pay`, payload);
    }
}
