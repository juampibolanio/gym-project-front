import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

export function useAuthSession() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const domain = useAuthStore((state) => state.domain);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    isHydrated,
    token,
    user,
    domain,
    isAuthenticated: !!token,
  };
}