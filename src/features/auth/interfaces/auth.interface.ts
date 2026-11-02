export type Roles = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export interface LoginPayload {
  email: string;
  password: string;
  domain: string;
}

export interface AuthUser {
  uuid: string;
  dni: string;
  name: string;
  surname: string;
  email: string;
  role: Roles;
  gymUuid: string | null;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: AuthUser;
}

export interface RefreshResponse {
  access_token: string;
}

export interface ForgotPasswordPayload {
  email: string;
  domain: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}
