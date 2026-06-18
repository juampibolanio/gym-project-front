import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MembersService } from "../services/members.service";
import { CreateMemberPayload, UpdateMemberPayload } from "../interfaces/members.interface";
import toast from "react-hot-toast";

export const useMembers = (page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ['members', { page, limit }],
        queryFn: () => MembersService.getAll(page, limit),
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
        mutationFn: (payload: CreateMemberPayload) => MembersService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Miembro creado con éxito');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Ocurrió un error al crear el miembro';
            toast.error(message);
        },
    });
};

export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: UpdateMemberPayload}) => 
            MembersService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] })
            toast.success('Miembro actualizado con éxito');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'No se pudo actualizar el miembro';
            toast.error(message);
        },
    });
};

export const useDeleteMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => MembersService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] })
            toast.success('Miembro eliminado con éxito');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Ocurrió un error al eliminar el miembro';
            toast.error(message);
        },
    });
};