'use client';

import Link from "next/link";
import { Check, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { usePlans } from "../hooks/usePlans";
import { formatDuration } from "../utils/format-duration";
import { useRole } from "@/features/auth/hooks/useRole";

import { useState } from "react";

const parseDescription = (description?: string | null): string[] => {
    if (!description) return ['Sin beneficios especificados'];
    return description.split('\n').filter(item => item.trim() !== '');
};

export function PlansGrid() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    const { data, isLoading, isError } = usePlans(currentPage, itemsPerPage);
    const { isAdmin } = useRole();
    
    const meta = data?.meta;
    const totalPages = meta?.lastPage || 1;

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((index) => (
                    <div key={index} className="flex flex-col border border-border-primary bg-surface rounded-lg shadow-sm animate-pulse">
                        <div className="flex flex-col gap-2 border-b border-border-primary p-6">
                            <div className="h-6 w-3/4 bg-border-primary/80 rounded"></div>
                            <div className="h-8 w-1/2 bg-border-primary/40 rounded mt-1"></div>
                        </div>
                        <div className="flex-1 p-6 flex flex-col gap-4">
                            <div className="h-4 w-full bg-border-primary/30 rounded"></div>
                            <div className="h-4 w-5/6 bg-border-primary/30 rounded"></div>
                            <div className="h-4 w-4/6 bg-border-primary/30 rounded"></div>
                        </div>
                        {isAdmin && (
                            <div className="flex justify-end border-t border-border-primary p-3 bg-background/50 rounded-b-lg">
                                <div className="h-6 w-16 bg-border-primary/40 rounded"></div>
                            </div>
                        )}
                    </div>
                ))}
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
        <div>
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

                            {
                                isAdmin && (
                                    <div className="flex justify-end border-t border-border-primary p-2 bg-background/50 rounded-b-lg">
                                        <Link
                                            href={`/dashboard/planes/${plan.uuid}/editar`}
                                            className="text-xs tracking-widest text-text-muted font-bold cursor-pointer uppercase px-4 py-3 rounded hover:bg-surface-hover hover:text-text-main transition-colors"
                                        >
                                            Editar
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    );
                })}
            </div>
            
            <div className="flex items-center justify-between px-5 py-4 border-t border-border-primary mt-6 bg-surface rounded-lg">
                <p className="text-sm text-text-muted">
                    Mostrando página {currentPage} de {totalPages || 1}
                </p>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handlePrevPage}
                        disabled={currentPage === 1 || isLoading}
                        className="p-1 text-text-muted hover:text-text-main disabled:opacity-50 disabled:hover:text-text-muted transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button 
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages || isLoading}
                        className="p-1 text-text-muted hover:text-text-main disabled:opacity-50 disabled:hover:text-text-muted transition-colors cursor-pointer"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
