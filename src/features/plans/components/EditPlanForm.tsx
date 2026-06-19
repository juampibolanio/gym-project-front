"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema, PlanFormValues } from "@/features/plans/schemas/plan.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { usePlan, useUpdatePlan, useDeletePlan } from "../hooks/usePlans";
import { FormSkeleton } from "@/common/components/ui/FormSkeleton";
import { Modal } from "@/common/components/ui/Modal"; 

export function EditPlanForm({ id }: { id: string }) {
    const router = useRouter();
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { data: currentPlan, isLoading: isFetchingPlan } = usePlan(id);
    const { mutate: updatePlan, isPending: isUpdating } = useUpdatePlan();
    const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PlanFormValues>({
        resolver: zodResolver(planSchema),
    });

    useEffect(() => {
        if (currentPlan) {
            reset({
                name: currentPlan.name,
                price: currentPlan.price,
                durationDays: currentPlan.durationDays,
                description: currentPlan.description || '',
            });
        }
    }, [currentPlan, reset]);

    const onSubmit = (data: PlanFormValues) => {
        updatePlan({ id, payload: data }, {
            onSuccess: () => {
                router.push('/dashboard/planes');
            }
        });
    };

    const confirmDelete = () => {
        deletePlan(id, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                router.push('/dashboard/planes');
            }
        });
    };

    if (isFetchingPlan) return <FormSkeleton />;
    if (!currentPlan) return <div className="text-red-500">No se pudo cargar la información del plan.</div>;

    const isProcessing = isUpdating || isDeleting;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 shadow-sm dark:shadow-none relative">
                
                <div className="flex flex-col gap-6">
                    <h2 className="text-[15px] font-bold text-text-main">Información general</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-main">Nombre del Plan</label>
                            <input 
                                {...register("name")} 
                                disabled={isProcessing}
                                placeholder="Ej: Pase Libre"
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
                                    disabled={isProcessing}
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
                                disabled={isProcessing}
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
                            disabled={isProcessing}
                            {...register("description")} 
                            placeholder="Acceso a sala de musculación&#10;Clases grupales incluidas"
                            rows={4}
                            className={`w-full px-4 py-2.5 bg-background border ${errors.description ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors disabled:opacity-70 disabled:cursor-not-allowed resize-none`} 
                        />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 justify-between pt-4 border-t border-border-primary">
                    
                    <button 
                        type="button" 
                        onClick={() => setIsDeleteModalOpen(true)}
                        disabled={isProcessing}
                        className="bg-transparent text-danger-main hover:bg-danger-main/10 text-sm font-medium py-2 px-4 rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <Trash2 size={16} />
                        Eliminar plan
                    </button>

                    <div className="flex items-center gap-3">
                        <Link href="/dashboard/planes" className="px-4 py-2 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded-sm text-xs font-bold transition-colors">
                            Descartar
                        </Link>
                        <button 
                            type="submit" 
                            disabled={isProcessing}
                            className="bg-brand-main hover:bg-brand-hover text-white flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-medium text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                        >
                            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Guardar cambios'}
                        </button>
                    </div>
                </div>
            </form>

            <Modal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)}
                title="Eliminar Plan"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-red-500 bg-red-500/10 p-3 rounded border border-red-500/20">
                        <AlertTriangle size={24} className="shrink-0" />
                        <p className="text-sm">Esta acción no se puede deshacer. Los socios que actualmente tienen este plan no lo perderán, pero ya no estará disponible para nuevas ventas.</p>
                    </div>
                    
                    <p className="text-text-main">¿Estás seguro de que deseas eliminar el plan <strong>&quot;{currentPlan.name}&quot;</strong>?</p>

                    <div className="flex justify-end gap-3 mt-4">
                        <button 
                            onClick={() => setIsDeleteModalOpen(false)}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium text-text-main border border-zinc-700 hover:bg-zinc-800 transition-colors rounded cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors rounded flex items-center gap-2 cursor-pointer"
                        >
                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sí, eliminar plan'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
