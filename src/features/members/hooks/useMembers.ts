import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MembersService } from '../services/members.service';
import {
  CreateMemberPayload,
  GetMembersParams,
  UpdateMemberPayload,
} from '../interfaces/members.interface';
import toast from 'react-hot-toast';

export const useMembers = (params: GetMembersParams = {}) => {
  return useQuery({
    queryKey: ['members', params],
    queryFn: () => MembersService.getAll(params),
    staleTime: 1000 * 10,
  });
};

export const useMember = (id: string) => {
  return useQuery({
    queryKey: ['member', id],
    queryFn: () => MembersService.getById(id),
    enabled: !!id,
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMemberPayload) =>
      MembersService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: (error: AxiosError<{ message?: string | string[] }>) => {
      const message =
        error.response?.data?.message || 'Ocurrió un error al crear el miembro';
      if (Array.isArray(message)) {
        message.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(message);
      }
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateMemberPayload;
    }) => MembersService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: ['member', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      
      toast.success('Miembro actualizado con éxito');
    },
    onError: (error: AxiosError<{ message?: string | string[] }>) => {
      const message =
        error.response?.data?.message || 'No se pudo actualizar el miembro';
      if (Array.isArray(message)) {
        message.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(message);
      }
    },
  });
};

export const useDeactivateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => MembersService.deactivate(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['member', id] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast.success('Socio desactivado correctamente');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message || 'Error al desactivar el socio'
      );
    },
  });
};

export const useRenewPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { planUuid: string; paymentMethod: string; customStartDate?: string; registerPayment?: boolean };
    }) => MembersService.renewPlan(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['member', variables.id] });
      toast.success('¡Plan renovado con éxito!');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || 'Hubo un error al renovar el plan');
    },
  });
};

export const useChangePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        newPlanUuid: string;
        paymentMethod: string;
        activationType: 'IMMEDIATE' | 'SCHEDULED';
        customStartDate?: string;
        registerPayment?: boolean;
      };
    }) => MembersService.changePlan(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['member', variables.id] });
      toast.success('¡Plan modificado con éxito!');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || 'Hubo un error al cambiar el plan');
    },
  });
};

