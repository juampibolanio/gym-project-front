"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema } from "@/features/plans/schemas/plan.schema";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreatePlan } from "@/features/plans/hooks/usePlans";
import { Loader2 } from "lucide-react";

type PlanFormValues = z.infer<typeof planSchema>;

export function NewPlanForm() {
    const router = useRouter();
    
    const { mutate, isPending } = useCreatePlan();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PlanFormValues>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            durationDays: 30,
        }
    });

    const onSubmit = (data: PlanFormValues) => {
        mutate(data, {
            onSuccess: () => {
                router.push('/dashboard/planes');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 shadow-sm dark:shadow-none">
                
                <div className="flex flex-col gap-6">
                    <h2 className="text-[15px] font-bold text-text-main">Información general</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-main">Nombre del Plan</label>
                            <input 
                                {...register("name")} 
                                disabled={isPending}
                                placeholder="Ej: Pase Libre Mensual"
                                className={`w-full px-4 py-2.5 bg-background border ${errors.name ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors disabled:opacity-70 disabled:cursor-not-allowed`} 
                            />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-main">Precio</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    disabled={isPending}
                                    {...register("price")} 
                                    placeholder="0.00"
                                    className={`w-full px-4 py-2.5 pl-8 bg-background border ${errors.price ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors disabled:opacity-70 disabled:cursor-not-allowed`} 
                                />
                            </div>
                            {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
                        </div>
                    </div>
                </div>

                <hr className="border-border-primary" />

                <div className="flex flex-col gap-6">
                    <h2 className="text-[15px] font-bold text-text-main">Especificaciones del plan</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-main">Duración (Días)</label>
                            <input 
                                type="number" 
                                disabled={isPending}
                                {...register("durationDays")} 
                                placeholder="Ej: 30"
                                className={`w-full px-4 py-2.5 bg-background border ${errors.durationDays ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors disabled:opacity-70 disabled:cursor-not-allowed`} 
                            />
                            {errors.durationDays && <span className="text-red-500 text-xs">{errors.durationDays.message}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main">Beneficios del plan (Opcional)</label>
                        <p className="text-xs text-text-muted mb-1">Escribe un beneficio por línea para mostrarlos en la lista.</p>
                        <textarea 
                            disabled={isPending}
                            {...register("description")} 
                            placeholder="Acceso a sala de musculación&#10;Clases grupales incluidas&#10;Duchas y vestuarios"
                            rows={4}
                            className={`w-full px-4 py-2.5 bg-background border ${errors.description ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors disabled:opacity-70 disabled:cursor-not-allowed resize-none`} 
                        />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
                    <Link href="/dashboard/planes" className="px-4 py-2 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded text-xs font-bold transition-colors">
                        Descartar
                    </Link>
                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="bg-brand-main hover:bg-brand-hover text-white flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-medium text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            'Crear plan'
                        )}
                    </button>
                </div>
            </form>
    );
}
