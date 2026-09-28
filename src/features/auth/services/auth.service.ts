import { httpClient } from '@/core/api/axios.adapter';
import { 
  AuthResponse, 
  LoginPayload, 
  ForgotPasswordPayload, 
  ResetPasswordPayload 
} from '../interfaces/auth.interface';

export class AuthService {

  /**
   * Authenticates a user and retrieves session tokens.
   */
  static async login(payload: LoginPayload): Promise<AuthResponse> {
    return await httpClient.post<AuthResponse>(`/auth/login`, payload);
  }

  /**
   * Requests a password reset email for a given domain.
   */
  static async forgotPassword(payload: ForgotPasswordPayload): Promise<{ message: string }> {
    return await httpClient.post<{ message: string }>(
      `/auth/forgot-password`,
      payload
    );
  }

  /**
   * Resets the user's password using a valid recovery token.
   */
  static async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    return await httpClient.post<{ message: string }>(
      `/auth/reset-password`,
      payload
    );
  }

  /**
   * Invalidates the current session tokens on the server.
   */
  static async logout(): Promise<{ message: string }> {
    return await httpClient.post<{ message: string }>(`/auth/logout`);
  }
}
