import { useAuthStore } from '../store/auth.store';

/**
 * Hook to retrieve and evaluate the current user's role.
 * Simplifies role-based conditional rendering and authorization across the application.
 * 
 * @returns Object containing the normalized role string and boolean flags for access control.
 */
export const useRole = () => {
  const user = useAuthStore((state) => state.user);

  const role = user?.role?.toString().toLowerCase() || 'user';

  return {
    role,
    isAdmin: role === 'admin',
    isUser: role === 'user',
    isSuperAdmin: role === 'super_admin',
  };
};
