import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../interfaces/auth-state.interface';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      domain: null,

      setLogin: (data, domain) => {
        set({ 
          token: data.access_token, 
          user: data.user, 
          domain 
        });
      },

      setTokens: (accessToken: string) => {
        set({ token: accessToken });
      },

      setLogout: () => {
        set({ token: null, user: null, domain: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
