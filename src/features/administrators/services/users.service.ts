import { PaginatedResult } from "@/common/interfaces/pagination.interface";
import { ChangePasswordPayload, CreateUserPayload, UpdateUserPayload, User } from "../interfaces/user.interface";
import { httpClient } from "@/core/api/axios.adapter";

export class UsersService {
    private static readonly ENDPOINT = '/users';

    static async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<User>> {
        return await httpClient.get<PaginatedResult<User>>(`${this.ENDPOINT}?page=${page}&limit=${limit}`);
    }

    static async getById(id: string): Promise<User> {
        return await httpClient.get<User>(`${this.ENDPOINT}/${id}`);
    }

    static async create(payload: CreateUserPayload): Promise<User> {
        return await httpClient.post(this.ENDPOINT, payload);
    }

    static async update(id: string, payload: UpdateUserPayload): Promise<User> {
        return await httpClient.patch<User>(`${this.ENDPOINT}/${id}`, payload);
    }

    static async remove(id: string): Promise<User> {
        return await httpClient.delete<User>(`${this.ENDPOINT}/${id}`);
    }

    static async changePassword(id: string, payload: ChangePasswordPayload): Promise<{ message: string }> {
        return await httpClient.patch<{ message: string }>(`${this.ENDPOINT}/${id}/change-password`, payload);
    }
}
