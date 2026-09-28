import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../interfaces/auth.interface';
import { ApiError } from '@/common/interfaces/api-error.interface';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data: AuthResponse, variables) => {
      setLogin(data, variables.domain);
      toast.success(`¡Bienvenido, ${data.user.name}!`);
      router.push('/dashboard');
    },
    onError: (error: ApiError) => {
      console.error('[useAuth] Login failed:', error);
      const message = error?.response?.data?.message;
      toast.error(
        Array.isArray(message) ? message[0] : (message || 'Error al iniciar sesión')
      );
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: AuthService.resetPassword,
  });
};
