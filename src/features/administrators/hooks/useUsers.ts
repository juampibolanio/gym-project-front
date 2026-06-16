import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UsersService } from "../services/users.service";
import { CreateUserPayload, UpdateUserPayload } from "../interfaces/user.interface";
import toast from "react-hot-toast";

export const useUsers = (page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ['users', { page, limit }],
        queryFn: () => UsersService.getAll(page, limit),
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
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Ocurrió un error al crear el usuario';
            toast.error(message);
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: UpdateUserPayload}) => 
            UsersService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('Usuario actualizado con éxito');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'No se pudo actualizar el usuario';
            toast.error(message);
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => UsersService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('Usuario eliminado con éxito');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Ocurrió un error al eliminar el usuario';
            toast.error(message);
        },
    });
};
