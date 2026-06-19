"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, X } from "lucide-react";
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
                className="w-full py-2.5 bg-brand-main hover:bg-brand-hover text-white font-medium text-sm transition-colors rounded-sm shadow-sm dark:shadow-none flex items-center justify-center gap-2"
            >
                <CreditCard size={20} />
                <span>Registrar nuevo pago</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-[#121214] border border-zinc-800 w-full max-w-md flex flex-col">

                        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold text-white">Registrar Pago</h2>
                                <p className="text-sm text-zinc-400">Registre un nuevo pago para el miembro</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="text-zinc-400 hover:text-white cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-5">

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-400 font-medium">Miembro seleccionado</label>
                                <input
                                    type="text"
                                    disabled
                                    value={`${memberName} ${memberSurname}`}
                                    className="w-full bg-zinc-800/40 border border-zinc-800 p-3 text-zinc-400 text-sm focus:outline-none cursor-not-allowed"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-zinc-400 font-medium">Monto</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                                        <input
                                            type="number"
                                            {...register("amount")}
                                            placeholder="0.00"
                                            className="w-full bg-[#121214] border border-zinc-800 p-3 pl-8 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors"
                                        />
                                    </div>
                                    {errors.amount && <span className="text-danger-main text-xs">{errors.amount.message}</span>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-zinc-400 font-medium">Fecha</label>
                                    <input
                                        type="date"
                                        {...register("date")}
                                        className="w-full bg-[#121214] border border-zinc-800 p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors"
                                    />
                                    {errors.date && <span className="text-danger-main text-xs">{errors.date.message}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-400 font-medium">Método de pago</label>
                                <select
                                    {...register("method")}
                                    className="w-full bg-[#121214] border border-zinc-800 p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors cursor-pointer"
                                >
                                    <option value="credit_card">Tarjeta de crédito / débito</option>
                                    <option value="cash">Efectivo</option>
                                    <option value="transfer">Transferencia bancaria</option>
                                </select>
                                {errors.method && <span className="text-danger-main text-xs">{errors.method.message}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-400 font-medium">Notas / Observaciones</label>
                                <textarea
                                    {...register("notes")}
                                    placeholder="Detalles adicionales del pago..."
                                    className="w-full bg-[#121214] border border-zinc-800 p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors min-h-20 resize-none"
                                />
                                {errors.notes && <span className="text-danger-main text-xs">{errors.notes.message}</span>}
                            </div>

                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-zinc-800">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="bg-transparent border border-zinc-700 text-text-main text-sm font-medium py-2 px-4 cursor-pointer hover:bg-zinc-800 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#2A5D44] text-white text-sm font-medium py-2 px-4 cursor-pointer hover:bg-[#1e4431] transition-colors"
                                >
                                    Confirmar Pago
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
}