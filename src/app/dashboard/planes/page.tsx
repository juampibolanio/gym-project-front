import Link from "next/link";
import { PlansGrid } from "@/features/plans/components/PlansGrid";

export default function PlansPage() {
    return (
        <div className="bg-background flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-text-main">Configuración de planes</h1>
                    <p className="text-md text-text-muted transition-colors">Gestione los planes y la estructura de precios</p>
                </div>
                <Link 
                    href="/dashboard/planes/nuevo" 
                    className="bg-brand-main hover:bg-brand-hover text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
                >
                    + Nuevo Plan
                </Link>
            </div>

            <PlansGrid />
        </div>
    );
}
