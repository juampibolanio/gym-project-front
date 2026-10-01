import { httpClient } from '@/core/api/axios.adapter';
import { 
  AuthResponse, 
  LoginPayload, 
  ForgotPasswordPayload, 
  ResetPasswordPayload 
} from '../interfaces/auth.interface';

export class AuthService {

  /**
   * Authenticates a user and retrieves session tokens alongside user profile data.
   * 
   * @param payload - The login credentials (email and password).
   * @returns A promise that resolves to the authentication response containing the user data and JWT token.
   */
  static async login(payload: LoginPayload): Promise<AuthResponse> {
    return await httpClient.post<AuthResponse>(`/auth/login`, payload);
  }

  /**
   * Requests a password reset email for a specific account.
   * 
   * @param payload - Object containing the user's email address.
   * @returns A promise that resolves to a confirmation message indicating the email was sent.
   */
  static async forgotPassword(payload: ForgotPasswordPayload): Promise<{ message: string }> {
    return await httpClient.post<{ message: string }>(
      `/auth/forgot-password`,
      payload
    );
  }

  /**
   * Resets the user's password using a valid recovery token provided via email.
   * 
   * @param payload - Object containing the recovery token and the new password.
   * @returns A promise that resolves to a success message upon password update.
   */
  static async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    return await httpClient.post<{ message: string }>(
      `/auth/reset-password`,
      payload
    );
  }

  /**
   * Invalidates the current session tokens on the server, effectively logging the user out.
   * 
   * @returns A promise that resolves to a success message upon successful logout.
   */
  static async logout(): Promise<{ message: string }> {
    return await httpClient.post<{ message: string }>(`/auth/logout`);
  }
}
