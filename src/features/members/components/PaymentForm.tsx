import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { paymentSchema } from "@/features/members/schemas/payment.schema";
import { useSubscribeAndPay } from "../hook/useMembers";
import { usePlans } from "@/features/plans/hooks/usePlans";
import { useEffect } from "react";

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
    memberName: string;
    memberSurname: string;
    uuid: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export function PaymentForm({ memberName, memberSurname, uuid, onSuccess, onCancel }: PaymentFormProps) {
    const { mutate: subscribeAndPay, isPending } = useSubscribeAndPay();
    const { data: plansData } = usePlans(1, 100);
    const plans = plansData?.data || [];

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            planUuid: "",
            amount: 0,
            method: "CASH",
            date: new Date().toISOString().split('T')[0],
            notes: "",
        }
    });

    const selectedPlanUuid = watch("planUuid");

    useEffect(() => {
        if (selectedPlanUuid) {
            const plan = plans.find(p => p.uuid === selectedPlanUuid);
            if (plan) {
                setValue("amount", Number(plan.price));
            }
        }
    }, [selectedPlanUuid, plans, setValue]);

    const onSubmit = (data: PaymentFormValues) => {
        subscribeAndPay({
            id: uuid,
            payload: {
                planUuid: data.planUuid,
                paymentMethod: data.method,
                amountPaid: data.amount,
                notes: data.notes || undefined,
            }
        }, {
            onSuccess: () => {
                reset();
                onSuccess();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-2">
            <p className="text-sm text-text-muted -mt-4 mb-2">Registre un nuevo pago para el miembro</p>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-text-muted font-medium">Miembro seleccionado</label>
                <input
                    type="text"
                    disabled
                    value={`${memberName} ${memberSurname}`}
                    className="w-full bg-surface-hover border border-border-primary rounded-md p-3 text-text-muted text-sm focus:outline-none cursor-not-allowed"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-text-muted font-medium">Plan a asignar</label>
                <select
                    {...register("planUuid")}
                    className={`w-full bg-background border ${errors.planUuid ? 'border-danger-main' : 'border-border-primary'} rounded-md p-3 text-text-main text-sm focus:outline-none focus:border-brand-main transition-colors cursor-pointer`}
                >
                    <option value="">Seleccione un plan</option>
                    {plans.map((plan) => (
                        <option key={plan.uuid} value={plan.uuid}>
                            {plan.name} ({plan.durationDays} días)
                        </option>
                    ))}
                </select>
                {errors.planUuid && <span className="text-danger-main text-xs">{errors.planUuid.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-text-muted font-medium">Monto a cobrar</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                        <input
                            type="number"
                            {...register("amount")}
                            placeholder="0.00"
                            className={`w-full bg-background border ${errors.amount ? 'border-danger-main' : 'border-border-primary'} rounded-md p-3 pl-8 text-text-main text-sm focus:outline-none focus:border-brand-main transition-colors`}
                        />
                    </div>
                    {errors.amount && <span className="text-danger-main text-xs">{errors.amount.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-text-muted font-medium">Método de pago</label>
                    <select
                        {...register("method")}
                        className={`w-full bg-background border ${errors.method ? 'border-danger-main' : 'border-border-primary'} rounded-md p-3 text-text-main text-sm focus:outline-none focus:border-brand-main transition-colors cursor-pointer`}
                    >
                        <option value="CASH">Efectivo</option>
                        <option value="BANK_TRANSFER">Transferencia bancaria</option>
                    </select>
                    {errors.method && <span className="text-danger-main text-xs">{errors.method.message}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-text-muted font-medium">Notas / Observaciones</label>
                <textarea
                    {...register("notes")}
                    placeholder="Detalles adicionales del pago..."
                    className={`w-full bg-background border ${errors.notes ? 'border-danger-main' : 'border-border-primary'} rounded-md p-3 text-text-main text-sm focus:outline-none focus:border-brand-main transition-colors min-h-[80px] resize-none`}
                />
                {errors.notes && <span className="text-danger-main text-xs">{errors.notes.message}</span>}
            </div>

            <div className="flex justify-end gap-3 mt-2">
                <button
                    type="button"
                    onClick={() => {
                        reset();
                        onCancel();
                    }}
                    className="bg-transparent border border-border-primary text-text-main text-sm font-medium py-2.5 px-6 rounded-sm cursor-pointer hover:bg-surface-hover transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-brand-main text-white text-sm font-medium py-2.5 px-6 rounded-sm cursor-pointer hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Procesando...' : 'Confirmar Pago'}
                </button>
            </div>

        </form>
    );
}
