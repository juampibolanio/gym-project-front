'use client';

import Link from "next/link";
import { ArrowLeft, Award, Loader2 } from "lucide-react";
import { useMember } from "@/features/members/hook/useMembers";
import { PaymentHistoryTable } from "@/features/payments/components/PaymentHistoryTable";
import { MemberProfileCard } from "@/features/members/components/MemberProfileCard";
import { use } from "react";

export default function MemberDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const { data: member, isLoading, isError } = useMember(id);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 w-full bg-surface border border-border-primary rounded-lg">
                <Loader2 className="w-8 h-8 text-brand-main animate-spin mb-4" />
                <p className="text-text-muted text-sm">Cargando perfil del miembro...</p>
            </div>
        );
    }

    if (isError || !member) {
        return (
            <div className="flex flex-col items-center justify-center h-64 w-full bg-surface border border-danger-main/20 rounded-lg">
                <p className="text-text-main text-sm">Error al cargar el perfil o el miembro no existe.</p>
                <Link href="/dashboard/miembros" className="mt-4 text-brand-main hover:underline text-sm">
                    Volver a la lista
                </Link>
            </div>
        );
    }

    const now = new Date();
    const activeSubscription = member.subscriptions?.find(sub => sub.status === 'ACTIVE' && new Date(sub.startDate) <= now) 
        || member.subscriptions?.find(sub => sub.status === 'ACTIVE') 
        || member.subscriptions?.[0];
    const futureSubscriptions = member.subscriptions?.filter(sub => sub.status === 'ACTIVE' && new Date(sub.startDate) > now).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) || [];
    const planName = activeSubscription?.plan?.name || "Sin plan asignado";

    let daysRemaining = 0;
    let progressPercentage = 0;
    let nextDueDate = "-";

    if (activeSubscription) {
        const end = new Date(activeSubscription.endDate);
        const start = new Date(activeSubscription.startDate);
        const now = new Date();
        
        const totalDuration = end.getTime() - start.getTime();
        const elapsed = now.getTime() - start.getTime();
        
        daysRemaining = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        progressPercentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        nextDueDate = end.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    const paymentHistory = member.payments || [];

    const statusTranslations: Record<string, string> = {
        'ACTIVE': 'ACTIVO',
        'INACTIVE': 'INACTIVO',
        'SUSPENDED': 'SUSPENDIDO'
    };

    const statusStyles: Record<string, string> = {
        'ACTIVE': 'border-success-main/30 bg-success-surface text-success-main',
        'INACTIVE': 'border-border-primary bg-surface-hover text-text-muted',
        'SUSPENDED': 'border-warning-main/30 bg-warning-surface text-warning-main'
    };

    const memberState = member.state || 'INACTIVE';
    const displayStatus = statusTranslations[memberState] || memberState;
    const safeStatusStyles = statusStyles[memberState] || statusStyles['INACTIVE'];
    const defaultAmount = activeSubscription?.plan?.price ? Number(activeSubscription.plan.price) : 0;

    return (
        <section>
            <Link href="/dashboard/miembros" className="flex text-text-muted uppercase text-xs font-bold items-center gap-1 mb-4 hover:text-text-main transition-colors">
                <ArrowLeft size={16} />
                <span>Volver a la lista de miembros</span>
            </Link>

            <div className="flex justify-between items-center border-b-2 border-border-primary pb-4 mb-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl text-text-main font-bold">{member.name} {member.surname}</h1>
                    <p className="text-sm text-text-muted">ID/DNI: {member.dni}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-7xl mx-auto p-4">

                <MemberProfileCard 
                    member={member} 
                    displayStatus={displayStatus} 
                    safeStatusStyles={safeStatusStyles} 
                    defaultAmount={defaultAmount}
                />

                <div className="lg:col-span-2 flex flex-col gap-6">

                    <div className="bg-surface border border-border-primary  rounded-lg p-6 flex items-center transition-colors">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Plan Actual</span>
                            <div className="flex items-center gap-2 mt-1">
                                <h3 className="text-2xl font-bold text-text-main">{planName}</h3>
                                <Award size={20} className="text-text-muted" />
                            </div>
                        </div>
                    </div>

                    {futureSubscriptions.length > 0 && (
                        <div className="bg-surface border border-border-primary rounded-lg p-6 flex flex-col gap-4 transition-colors">
                            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Planes Programados ({futureSubscriptions.length})</span>
                            <div className="flex flex-col gap-3 mt-1">
                                {futureSubscriptions.map((sub) => (
                                    <div key={sub.uuid} className="flex justify-between items-center p-3 bg-background border border-border-primary rounded-md">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-bold text-text-main">{sub.plan?.name || "Plan desconocido"}</span>
                                            <span className="text-xs text-text-muted">Inicia: {new Date(sub.startDate).toLocaleDateString('es-ES')}</span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-main/10 text-brand-main rounded-sm">EN ESPERA</span>
                                            <span className="text-xs text-text-muted">Vence: {new Date(sub.endDate).toLocaleDateString('es-ES')}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border-primary  rounded-lg p-6 flex flex-col justify-center gap-4 transition-colors">
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Tiempo Restante</span>
                                <span className="text-sm text-text-main font-bold">{daysRemaining > 0 ? `${daysRemaining} días` : '-'}</span>
                            </div>
                            <div className="w-full bg-border-primary h-2 rounded-full overflow-hidden">
                                <div className="bg-brand-main h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>

                        <div className="bg-surface border border-border-primary  rounded-lg p-6 flex flex-col justify-center gap-2 transition-colors">
                            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Próximo Vencimiento</span>
                            <span className="text-xl font-bold text-text-main">{nextDueDate}</span>
                        </div>
                    </div>

                    <PaymentHistoryTable payments={paymentHistory} />
                </div>
            </div>
        </section >
    );
}
