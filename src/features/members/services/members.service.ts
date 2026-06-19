import { PaginatedResult } from "@/common/interfaces/pagination.interface";
import { httpClient } from "@/core/api/axios.adapter";
import { CreateMemberPayload, Member, UpdateMemberPayload } from "../interfaces/members.interface";

export class MembersService {
    private static readonly ENDPOINT = '/members';

    static async getAll(page: number = 1, limit: number = 10, term?: string): Promise<PaginatedResult<Member>> {
        const query = term ? `?page=${page}&limit=${limit}&term=${term}` : `?page=${page}&limit=${limit}`;
        return await httpClient.get<PaginatedResult<Member>>(`${this.ENDPOINT}${query}`);
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
}
