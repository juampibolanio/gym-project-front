import { httpClient } from '@/core/api/axios.adapter';
import { AuthResponse, LoginPayload } from '../interfaces/auth.interface';

export class AuthService {
  static async login(payload: LoginPayload): Promise<AuthResponse> {
    return await httpClient.post<AuthResponse>('auth/login', payload);
  }
}
