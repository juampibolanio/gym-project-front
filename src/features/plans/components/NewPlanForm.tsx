"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema } from "@/features/plans/schemas/plan.schema";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreatePlan } from "@/features/plans/hooks/usePlans";
import { Loader2 } from "lucide-react";
import { InputField } from "@/common/components/ui/InputField";
import { TextareaField } from "@/common/components/ui/TextareaField";

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
        <form onSubmit={handleSubmit(onSubmit)} className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 ">
                
                <div className="flex flex-col gap-6">
                    <h2 className="text-[15px] font-bold text-text-main">Información general</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Nombre del Plan"
                            type="text"
                            placeholder="Ej: Pase Libre Mensual"
                            disabled={isPending}
                            registration={register("name")}
                            error={errors.name?.message}
                        />

                        <InputField
                            label="Precio"
                            type="text"
                            placeholder="0.00"
                            disabled={isPending}
                            registration={register("price", {
                                onChange: (e) => {
                                    const rawValue = e.target.value.replace(/\D/g, '');
                                    e.target.value = rawValue ? new Intl.NumberFormat('es-AR').format(Number(rawValue)) : '';
                                }
                            })}
                            error={errors.price?.message}
                            icon={<span className="text-text-muted">$</span>}
                        />
                    </div>
                </div>

                <hr className="border-border-primary" />

                <div className="flex flex-col gap-6">
                    <h2 className="text-[15px] font-bold text-text-main">Especificaciones del plan</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Duración (Días)"
                            type="number"
                            placeholder="Ej: 30"
                            disabled={isPending}
                            registration={register("durationDays")}
                            error={errors.durationDays?.message}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <TextareaField
                            label="Beneficios del plan (Opcional)"
                            placeholder="Acceso a sala de musculación&#10;Clases grupales incluidas&#10;Duchas y vestuarios"
                            disabled={isPending}
                            registration={register("description")}
                            error={errors.description?.message}
                            rows={4}
                        />
                        <p className="text-xs text-text-muted mt-1">Escribe un beneficio por línea para mostrarlos en la lista.</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
                    <Link href="/dashboard/planes" className="px-4 py-2 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded text-xs font-bold transition-colors">
                        Descartar
                    </Link>
                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="bg-brand-main hover:bg-brand-hover text-white flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-medium text-sm transition-colors  disabled:opacity-50 cursor-pointer"
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
