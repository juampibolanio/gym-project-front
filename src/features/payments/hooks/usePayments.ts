import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PaymentsService } from "../services/payments.service";
import { CreatePaymentPayload } from "../interfaces/payments.interface";
import toast from "react-hot-toast";

export const useCreatePayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreatePaymentPayload) => PaymentsService.create(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['payments'] });
            queryClient.invalidateQueries({ queryKey: ['member', variables.memberUuid] });
            toast.success('Pago registrado con éxito');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Ocurrió un error al registrar el pago';
            if (Array.isArray(message)) {
                message.forEach((msg: string) => toast.error(msg));
            } else {
                toast.error(message);
            }
        },
    });
};
