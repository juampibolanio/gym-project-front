import { useAuthStore } from "../store/auth.store"

export const useRole = () => {
    const user = useAuthStore((state) => state.user);

    const role = user?.role?.toString().toLowerCase() || 'user';

    return { 
        role,
        isAdmin: role === 'admin',
        isUser: role === 'user',
        isSuperAdmin: role === 'super_admin'
    };
};
