import Link from "next/link";
import { Check, Plus } from "lucide-react";

const plansMock = [
    {
        id: 1,
        name: 'Pase Diario',
        price: '15',
        frequency: 'day',
        description: ['Acceso por un día completo', 'Acceso a sala de musculación', 'Acceso a clases grupales'],
    },
    {
        id: 2,
        name: 'Plan Mensual',
        price: '45',
        frequency: 'month',
        description: ['Acceso completo por un mes', 'Acceso a sala de musculación', 'Acceso a clases grupales']
    },
    {
        id: 3,
        name: 'Plan Anual',
        price: '450',
        frequency: 'year',
        description: ['Acceso ilimitado con descuento anual', 'Acceso a sala de musculación', 'Acceso a clases grupales']
    }
]

plansMock.map(plan => {
    switch (plan.frequency) {
        case 'day':
            plan.frequency = 'día';
            break;
        case 'month':
            plan.frequency = 'mes';
            break;
        case 'year':
            plan.frequency = 'año';
            break;
        default:
            break;
    }
})

export default function PlansPage() {
    return (
        <div className="bg-background flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-text-main">Configuración de planes</h1>
                    <p className="text-md text-text-muted transition-colors">Gestione los planes y la estructura de precios</p>
                </div>

                <Link href="/dashboard/planes/nuevo" className="bg-brand-main hover:bg-brand-hover text-white transition-colors flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 rounded-md shadow-sm">
                    <Plus size={16} />
                    <span className="text-xs md:text-sm font-bold">Crear nuevo</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    plansMock.map(plan => (
                        <div key={plan.id} className="flex flex-col border border-border-primary bg-surface rounded-lg shadow-sm dark:shadow-none">
                            <div className="flex flex-col gap-2 border-b border-border-primary p-6">
                                <h2 className="text-xl font-bold text-text-main">{plan.name}</h2>
                                <p className="text-sm text-text-muted"><span className="text-brand-main text-3xl font-semibold">${plan.price}</span> / {plan.frequency}</p>
                            </div>

                            <div className="flex-1 p-6">
                                <ul className="list-none flex flex-col gap-3">
                                    {plan.description.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check size={20} className="text-brand-main shrink-0 mt-0.5" />
                                            <span className="text-md text-text-muted">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-end border-t border-border-primary p-2 bg-background/50 rounded-b-lg">
                                <Link href={`/dashboard/planes/${plan.id}/editar`} className="text-xs tracking-widest text-text-muted font-bold cursor-pointer uppercase px-4 py-3 rounded hover:bg-surface-hover hover:text-text-main transition-colors">
                                    Editar
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}