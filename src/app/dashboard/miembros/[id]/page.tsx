'use client';

import Link from "next/link";
import { ArrowLeft, Award, Pencil, User, Loader2 } from "lucide-react";
import RegisterPaymentButton from "@/features/members/components/RegisterPaymentButton";
import { useMember } from "@/features/members/hook/useMembers";
import { PaymentHistoryTable } from "@/features/members/components/PaymentHistoryTable";
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

    const activeSubscription = member.subscriptions?.find(sub => sub.status === 'ACTIVE') || member.subscriptions?.[0];
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

                <div className="lg:col-span-1 bg-surface border border-border-primary  rounded-lg p-6 flex flex-col transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-text-main">Perfil del Miembro</span>
                        <span className={`px-2.5 py-1 rounded-md border text-[10px] font-bold tracking-widest uppercase ${safeStatusStyles}`}>
                            {displayStatus}
                        </span>
                    </div>

                    <div className="flex flex-col items-center mb-8 pt-4 border-t border-border-primary">
                        <div className="w-24 h-24 bg-background border border-border-primary rounded-full flex items-center justify-center mb-4 shadow-inner">
                            <User size={40} className="text-text-muted" />
                        </div>
                        <h2 className="text-xl font-bold text-text-main">{member.name} {member.surname}</h2>
                        <p className="text-sm text-text-muted mt-1">Nacimiento: {new Date(member.birthDate).toLocaleDateString('es-ES')}</p>
                    </div>

                    <div className="flex flex-col gap-6 border-t border-border-primary pt-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Teléfono</span>
                            <span className="text-sm text-text-main">{member.phoneNumber || '-'}</span>
                        </div>
                        {member.observations && (
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Observaciones</span>
                                <span className="text-sm text-text-main">{member.observations}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-border-primary">
                        <RegisterPaymentButton memberName={member.name} memberSurname={member.surname} uuid={member.uuid} />
                        <Link href={`/dashboard/miembros/${member.uuid}/editar`} className="w-full py-2.5 bg-transparent border border-border-primary hover:bg-surface-hover text-text-main font-medium text-sm transition-colors rounded-sm  flex items-center justify-center gap-2">
                            <Pencil size={16} /> Editar datos
                        </Link>
                    </div>
                </div>

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
