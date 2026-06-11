import { create } from "zustand";
import { AuthResponse } from "../interfaces/auth.interface";
import { persist } from "zustand/middleware";

interface AuthState {
    token: string | null;
    user: AuthResponse['user'] | null;
    domain: string | null;

    setLogin: (data: AuthResponse, domain: string) => void;
    setLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            domain: null,

            setLogin: (data, domain) => {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('jwt_token', data.access_token);
                }
                set({ token: data.access_token, user: data.user, domain });
            },

            setLogout: () => {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('jwt_token');
                }
                set({ token: null, user: null, domain: null });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
)
