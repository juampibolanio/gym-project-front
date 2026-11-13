import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '../services/users.service';
import {
  ChangePasswordPayload,
  CreateUserPayload,
  UpdateUserPayload,
} from '../interfaces/user.interface';
import toast from 'react-hot-toast';
import { getApiErrorMessage } from '@/common/utils/api-error';

export const useUsers = (
  page: number = 1,
  limit: number = 10,
  term?: string
) => {
  return useQuery({
    queryKey: ['users', { page, limit, term }],
    queryFn: () => UsersService.getAll(page, limit, term),
    staleTime: 1000 * 10,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => UsersService.getById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserPayload) => UsersService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuario creado con éxito');
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Ocurrió un error al crear el usuario'));
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      UsersService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      toast.success('Usuario actualizado con éxito');
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'No se pudo actualizar el usuario'));
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UsersService.remove(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuario eliminado con éxito');
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Ocurrió un error al eliminar el usuario'));
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ChangePasswordPayload;
    }) => UsersService.changePassword(id, payload),
    onSuccess: () => {
      toast.success('Contraseña actualizada con éxito');
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Error al cambiar la contraseña'));
    },
  });
};
