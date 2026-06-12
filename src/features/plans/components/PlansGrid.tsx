'use client';

import Link from "next/link";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { usePlans } from "../hooks/usePlans";
import { formatDuration } from "../utils/format-duration";

const parseDescription = (description?: string | null): string[] => {
    if (!description) return ['Sin beneficios especificados'];
    return description.split('\n').filter(item => item.trim() !== '');
};

export function PlansGrid() {
    const { data, isLoading, isError } = usePlans(1, 10);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 w-full">
                <Loader2 className="w-10 h-10 text-brand-main animate-spin mb-4" />
                <p className="text-text-muted">Cargando planes de membresía...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-64 w-full bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Error de conexión</h3>
                <p className="text-red-600 dark:text-red-300 text-sm mt-1">No se pudieron cargar los planes. Intenta nuevamente.</p>
            </div>
        );
    }

    const plans = data?.data || [];

    if (plans.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border-primary rounded-lg bg-surface/50">
                <p className="text-text-muted text-lg">No hay planes registrados en este gimnasio.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => {
                const features = parseDescription(plan.description);

                return (
                    <div key={plan.uuid} className="flex flex-col border border-border-primary bg-surface rounded-lg shadow-sm dark:shadow-none">
                        <div className="flex flex-col gap-2 border-b border-border-primary p-6">
                            <h2 className="text-xl font-bold text-text-main">{plan.name}</h2>
                            <p className="text-sm text-text-muted">
                                <span className="text-brand-main text-3xl font-semibold">${plan.price}</span> / {formatDuration(plan.durationDays)}
                            </p>
                        </div>

                        <div className="flex-1 p-6">
                            <ul className="list-none flex flex-col gap-3">
                                {features.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check size={20} className="text-brand-main shrink-0 mt-0.5" />
                                        <span className="text-md text-text-muted">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-end border-t border-border-primary p-2 bg-background/50 rounded-b-lg">
                            <Link 
                                href={`/dashboard/planes/${plan.uuid}/editar`} 
                                className="text-xs tracking-widest text-text-muted font-bold cursor-pointer uppercase px-4 py-3 rounded hover:bg-surface-hover hover:text-text-main transition-colors"
                            >
                                Editar
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
