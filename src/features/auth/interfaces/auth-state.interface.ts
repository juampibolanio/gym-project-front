import { AuthResponse } from './auth.interface';

export interface AuthState {
  token: string | null;
  user: AuthResponse['user'] | null;
  domain: string | null;

  setLogin: (data: AuthResponse, domain: string) => void;
  setLogout: () => void;
}
