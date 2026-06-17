import { PlansGrid } from "@/features/plans/components/PlansGrid";
import CreatePlanButton from "@/features/plans/components/CreatePlanButton";

export default function PlansPage() {

    return (
        <div className="bg-background flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-text-main">Configuración de planes</h1>
                    <p className="text-md text-text-muted transition-colors">Gestione los planes y la estructura de precios</p>
                </div>

                <CreatePlanButton />
            </div>

            <PlansGrid />
        </div>
    );
}
