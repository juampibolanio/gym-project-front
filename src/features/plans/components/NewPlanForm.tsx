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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-3xl border-l-4 border-zinc-700 p-6 border bg-background">
                
                <div className="flex flex-col gap-6">
                    <h2 className="text-lg font-semibold text-text-main border-b border-zinc-700 pb-2">Información general</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-zinc-400 font-medium">Nombre del Plan</label>
                            <input 
                                {...register("name")} 
                                disabled={isPending}
                                placeholder="Ej: Pase Libre Mensual"
                                className={`w-full bg-[#121214] border ${errors.name ? 'border-red-500' : 'border-zinc-700'} p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors placeholder:text-zinc-600`} 
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-zinc-400 font-medium">Precio</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    disabled={isPending}
                                    {...register("price")} 
                                    placeholder="0.00"
                                    className={`w-full bg-[#121214] border ${errors.price ? 'border-red-500' : 'border-zinc-700'} p-3 pl-8 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors placeholder:text-zinc-600`} 
                                />
                            </div>
                            {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-lg font-semibold text-text-main border-b border-zinc-700 pb-2">Especificaciones del plan</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-zinc-400 font-medium">Duración (Días)</label>
                            <input 
                                type="number" 
                                disabled={isPending}
                                {...register("durationDays")} 
                                placeholder="Ej: 30"
                                className={`w-full bg-[#121214] border ${errors.durationDays ? 'border-red-500' : 'border-zinc-700'} p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors placeholder:text-zinc-600`} 
                            />
                            {errors.durationDays && <span className="text-red-500 text-xs mt-1">{errors.durationDays.message}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-zinc-400 font-medium">Beneficios del plan (Opcional)</label>
                        <p className="text-xs text-zinc-500 mb-1">Escribe un beneficio por línea para mostrarlos en la lista.</p>
                        <textarea 
                            disabled={isPending}
                            {...register("description")} 
                            placeholder="Acceso a sala de musculación&#10;Clases grupales incluidas&#10;Duchas y vestuarios"
                            rows={4}
                            className={`w-full bg-[#121214] border ${errors.description ? 'border-red-500' : 'border-zinc-700'} p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors placeholder:text-zinc-600 resize-none`} 
                        />
                        {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                    </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-zinc-700">
                    <Link href="/dashboard/planes" className="bg-transparent border border-zinc-700 text-text-main text-sm font-medium py-2 px-4 cursor-pointer hover:bg-zinc-800 transition-colors">
                        Descartar
                    </Link>
                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="bg-[#2A5D44] flex items-center gap-2 text-white text-sm font-medium py-2 px-4 cursor-pointer hover:bg-[#1e4431] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
