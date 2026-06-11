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
        <div className="flex flex-col bg-background gap-8">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-text-main">Crear Nuevo Plan</h1>
                    <p className="text-sm text-text-muted">Complete la información para crear un nuevo plan</p>
                </div>

                <div className="flex gap-3">
                    <Link href="/dashboard/planes">
                        <button type="button" className="bg-transparent border border-zinc-700 text-text-main text-sm font-medium py-2 px-4 cursor-pointer hover:bg-zinc-800 transition-colors">
                            Descartar
                        </button>
                    </Link>
                    <button type="button" onClick={handleSubmit(onSubmit)} className="bg-[#2A5D44] text-white text-sm font-medium py-2 px-4 cursor-pointer hover:bg-[#1e4431] transition-colors">
                        Crear plan
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-3xl border-l-4 border-zinc-700 p-6 border">
                
                <div className="flex flex-col gap-6">
                    <h2 className="text-lg font-semibold text-text-main border-b border-zinc-700 pb-2">Información general</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-zinc-400 font-medium">Nombre del Plan</label>
                            <input 
                                {...register("name")} 
                                placeholder="Ej: Pase Libre"
                                className="w-full bg-[#121214] border border-zinc-700 p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors placeholder:text-zinc-600" 
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-zinc-400 font-medium">Precio</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                                <input 
                                    type="number" 
                                    {...register("price")} 
                                    placeholder="0.00"
                                    className="w-full bg-[#121214] border border-zinc-700 p-3 pl-8 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors placeholder:text-zinc-600" 
                                />
                            </div>
                            {errors.price && <span className="text-red-500 text-xs mt-1">Precio inválido</span>}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-lg font-semibold text-text-main border-b border-zinc-700 pb-2">Especificaciones del plan</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-zinc-400 font-medium">Frecuencia de cobro</label>
                            <select 
                                {...register("frequency")} 
                                className="w-full bg-[#121214] border border-zinc-700 p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors cursor-pointer appearance-none"
                            >
                                <option value="day">Diaria</option>
                                <option value="weekly">Semanal</option>
                                <option value="month">Mensual</option>
                                <option value="year">Anual</option>
                            </select>
                            {errors.frequency && <span className="text-red-500 text-xs mt-1">{errors.frequency.message}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-zinc-400 font-medium">Duración (Días)</label>
                            <input 
                                type="number" 
                                {...register("durationDays", { valueAsNumber: true })} 
                                placeholder="Ej: 30"
                                className="w-full bg-[#121214] border border-zinc-700 p-3 text-white text-sm focus:outline-none focus:border-[#2A5D44] transition-colors placeholder:text-zinc-600" 
                            />
                            {errors.durationDays && <span className="text-red-500 text-xs mt-1">Duración inválida</span>}
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}
