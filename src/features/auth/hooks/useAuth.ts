import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/auth.service';

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
