"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";
import { Modal } from "@/common/components/ui/Modal";
import * as z from "zod";
import { paymentSchema } from "@/features/members/schemas/payment.schema";

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface RegisterPaymentButtonProps {
    memberName: string;
    memberSurname: string;
    uuid: string;
}

export default function RegisterPaymentButton({ memberName, memberSurname, uuid }: RegisterPaymentButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            amount: undefined,
            method: "credit_card",
            date: new Date().toISOString().split('T')[0],
            notes: "",
        }
    });

    const onSubmit = (data: PaymentFormValues) => {
        console.log("Pago registrado para:", memberName, uuid, data);
        reset();
        setIsOpen(false);
    };

    const handleClose = () => {
        reset();
        setIsOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full py-2.5 bg-brand-main hover:bg-brand-hover text-white font-medium text-sm transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
            >
                <CreditCard size={20} />
                <span>Registrar nuevo pago</span>
            </button>

            <Modal isOpen={isOpen} onClose={handleClose} title="Registrar Pago">
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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-text-muted font-medium">Monto</label>
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
                            <label className="text-sm text-text-muted font-medium">Fecha</label>
                            <input
                                type="date"
                                {...register("date")}
                                className={`w-full bg-background border ${errors.date ? 'border-danger-main' : 'border-border-primary'} rounded-md p-3 text-text-main text-sm focus:outline-none focus:border-brand-main transition-colors`}
                            />
                            {errors.date && <span className="text-danger-main text-xs">{errors.date.message}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-text-muted font-medium">Método de pago</label>
                        <select
                            {...register("method")}
                            className={`w-full bg-background border ${errors.method ? 'border-danger-main' : 'border-border-primary'} rounded-md p-3 text-text-main text-sm focus:outline-none focus:border-brand-main transition-colors cursor-pointer`}
                        >
                            <option value="credit_card">Tarjeta de crédito / débito</option>
                            <option value="cash">Efectivo</option>
                            <option value="transfer">Transferencia bancaria</option>
                        </select>
                        {errors.method && <span className="text-danger-main text-xs">{errors.method.message}</span>}
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
                            onClick={handleClose}
                            className="bg-transparent border border-border-primary text-text-main text-sm font-medium py-2.5 px-6 rounded-sm cursor-pointer hover:bg-surface-hover transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-brand-main text-white text-sm font-medium py-2.5 px-6 rounded-sm cursor-pointer hover:bg-brand-hover transition-colors"
                        >
                            Confirmar Pago
                        </button>
                    </div>

                </form>
            </Modal>
        </>
    );
}