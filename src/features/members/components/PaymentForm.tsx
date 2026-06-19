import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { paymentSchema } from "@/features/members/schemas/payment.schema";
import { useSubscribeAndPay } from "../hook/useMembers";
import { usePlans } from "@/features/plans/hooks/usePlans";
import { useEffect } from "react";
import { InputField } from "@/common/components/ui/InputField";
import { SelectField } from "@/common/components/ui/SelectField";
import { TextareaField } from "@/common/components/ui/TextareaField";

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
                <InputField
                    label="Miembro seleccionado"
                    type="text"
                    disabled
                    value={`${memberName} ${memberSurname}`}
                    registration={register("planUuid") /* Dummy to satisfy TS, though we don't really register this input */}
                />
            </div>

            <SelectField
                label="Plan a asignar"
                registration={register("planUuid")}
                error={errors.planUuid?.message}
            >
                <option value="">Seleccione un plan</option>
                {plans.map((plan) => (
                    <option key={plan.uuid} value={plan.uuid}>
                        {plan.name} ({plan.durationDays} días)
                    </option>
                ))}
            </SelectField>

            <div className="grid grid-cols-2 gap-4">
                <InputField
                    label="Monto a cobrar"
                    type="number"
                    placeholder="0.00"
                    registration={register("amount")}
                    error={errors.amount?.message}
                    icon={<span className="text-text-muted">$</span>}
                />

                <SelectField
                    label="Método de pago"
                    registration={register("method")}
                    error={errors.method?.message}
                >
                    <option value="CASH">Efectivo</option>
                    <option value="BANK_TRANSFER">Transferencia bancaria</option>
                </SelectField>
            </div>

            <TextareaField
                label="Notas / Observaciones"
                placeholder="Detalles adicionales del pago..."
                registration={register("notes")}
                error={errors.notes?.message}
                rows={3}
            />

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
