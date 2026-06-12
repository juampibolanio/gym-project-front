"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlanSchema } from "@/features/plans/schemas/createPlan.schema";
import * as z from "zod";
import Link from "next/link";

type PlanFormValues = z.infer<typeof createPlanSchema>;

export function NewPlanForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PlanFormValues>({
        resolver: zodResolver(createPlanSchema),
    });

    const onSubmit = (data: PlanFormValues) => {
        console.log("Formulario enviado:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 shadow-sm dark:shadow-none">
                
                <div className="flex flex-col gap-6">
                    <h2 className="text-[15px] font-bold text-text-main">Información general</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-text-muted tracking-wide">Nombre del Plan</label>
                            <input 
                                {...register("name")} 
                                placeholder="Ej: Pase Libre"
                                className={`w-full bg-background border ${errors.name ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors`} 
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-text-muted tracking-wide">Precio</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                                <input 
                                    type="number" 
                                    {...register("price")} 
                                    placeholder="0.00"
                                    className={`w-full bg-background border ${errors.price ? 'border-red-500' : 'border-border-primary'} rounded pl-8 pr-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors`} 
                                />
                            </div>
                            {errors.price && <span className="text-red-500 text-xs mt-1">Precio inválido</span>}
                        </div>
                    </div>
                </div>

                <hr className="border-border-primary" />

                <div className="flex flex-col gap-6">
                    <h2 className="text-[15px] font-bold text-text-main">Especificaciones del plan</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-text-muted tracking-wide">Frecuencia de cobro</label>
                            <select 
                                {...register("frequency")} 
                                className={`w-full bg-background border ${errors.frequency ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-muted focus:outline-none focus:border-brand-main transition-colors appearance-none`}
                            >
                                <option value="day">Diaria</option>
                                <option value="weekly">Semanal</option>
                                <option value="month">Mensual</option>
                                <option value="year">Anual</option>
                            </select>
                            {errors.frequency && <span className="text-red-500 text-xs mt-1">{errors.frequency.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-text-muted tracking-wide">Duración (Días)</label>
                            <input 
                                type="number" 
                                {...register("durationDays", { valueAsNumber: true })} 
                                placeholder="Ej: 30"
                                className={`w-full bg-background border ${errors.durationDays ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors`} 
                            />
                            {errors.durationDays && <span className="text-red-500 text-xs mt-1">Duración inválida</span>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
                    <Link href="/dashboard/planes" className="px-4 py-2 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded text-xs font-bold transition-colors">
                        Descartar
                    </Link>
                    <button type="submit" className="px-4 py-2 bg-brand-main hover:bg-brand-hover text-white rounded text-xs font-bold transition-colors shadow-sm">
                        Crear plan
                    </button>
                </div>
            </form>
    );
}
