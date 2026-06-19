import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../interfaces/auth.interface';
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
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Error al iniciar sesión';
      toast.error(errorMessage);
      console.error('Error al iniciar sesión:', errorMessage);
    },
  });
};
