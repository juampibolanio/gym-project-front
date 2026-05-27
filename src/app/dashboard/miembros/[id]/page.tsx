import Link from "next/link";
import { ArrowLeft, Award, CreditCard, Filter, Pencil, User } from "lucide-react";
import RegisterPaymentButton from "../components/RegisterPaymentButton";

export default async function MemberDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const member = {
        id: id,
        name: "Manuel",
        surname: "Vazquez",
        email: "manuel.vazquez@example.com",
        avatarUrl: `https://i.pravatar.cc/150?u=${id}`,
        status: "active",
        plan: "Pase Libre",
        phoneNumber: "+1 555-123-4567",
        startDate: "2026-05-15",
        endDate: "2026-06-15",
        paymentHistory: [
            { id: "payment-1", date: "2026-05-15", amount: 500, method: "Tarjeta de crédito" },
            { id: "payment-2", date: "2026-04-15", amount: 500, method: "Tarjeta de crédito" },
            { id: "payment-3", date: "2026-03-15", amount: 500, method: "Tarjeta de crédito" },
            { id: "payment-4", date: "2026-02-15", amount: 500, method: "Tarjeta de crédito" },
            { id: "payment-5", date: "2026-01-15", amount: 500, method: "Tarjeta de crédito" },
        ]
    };

    const endDate = new Date(member.endDate);
    const startDate = new Date(member.startDate);
    const today = new Date();

    const remainingTimeMs = endDate.getTime() - today.getTime();
    const remainingDays = Math.max(0, Math.ceil(remainingTimeMs / (1000 * 60 * 60 * 24)));

    const totalPlanDurationMs = endDate.getTime() - startDate.getTime();
    let remainingPercentage = 0;
    if (totalPlanDurationMs > 0) {
        remainingPercentage = Math.max(0, Math.min(100, (remainingTimeMs / totalPlanDurationMs) * 100));
    }

    return (
        <section>
            <Link href="/dashboard/miembros" className="flex text-text-muted uppercase text-xs font-bold items-center gap-1 mb-4 hover:text-text-main transition-colors">
                <ArrowLeft size={16} />
                <span>Volver a la lista de miembros</span>
            </Link>

            <div className="flex justify-between items-center border-b-2 border-[#404943] pb-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl text-text-main font-bold">{member.name} {member.surname}</h1>
                    <p className="text-sm text-zinc-400">ID: {member.id}</p>
                </div>

                <div className="flex gap-4">
                    <button type="button" className="flex items-center gap-2 bg-transparent border border-[#404943] py-2 px-4 cursor-pointer hover:bg-zinc-800 transition-colors">
                        <Pencil size={20} />
                        <span className="text-text-main text-sm font-medium">Editar datos</span>
                    </button>

                    <RegisterPaymentButton memberName={member.name} memberSurname={member.surname} uuid={member.id} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-7xl mx-auto p-4">

                <div className="lg:col-span-1  border border-zinc-700 rounded-lg p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-semibold text-white">Perfil del Miembro</span>
                        <span className="px-2.5 py-1 rounded-md border border-[#1b3d28] bg-[#112a1c] text-[#4ade80] text-xs font-bold tracking-wide">
                            ACTIVO
                        </span>
                    </div>

                    <div className="flex flex-col items-center mb-8 pt-4 border-t border-zinc-700">
                        <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-4 border-4 border-zinc-900">
                            <User size={40} className="text-zinc-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{member.name} {member.surname}</h2>
                        <p className="text-sm text-zinc-400 mt-1">Miembro desde: 12 ene, 2022</p>
                    </div>

                    <div className="flex flex-col gap-6 border-t border-zinc-700 pt-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Email</span>
                            <span className="text-sm text-white">{member.email}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Teléfono</span>
                            <span className="text-sm text-white">{member.phoneNumber}</span>
                        </div>

                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-6">

                    <div className=" border border-zinc-700 rounded-lg p-6 flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-zinc-300 font-medium uppercase tracking-wider">Plan Actual</span>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-semibold text-white">{member.plan}</h3>
                                <Award size={20} className="text-[#4ade80]" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-right">
                            <span className="text-xs text-zinc-300 font-medium uppercase tracking-wider">Próximo Vencimiento</span>
                            <span className="text-xl font-semibold text-[#4ade80]">{new Date(member.endDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className=" border border-zinc-700 rounded-lg p-6 flex flex-col justify-center gap-4">
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-zinc-300 font-medium uppercase tracking-wider">Tiempo Restante</span>
                                <span className="text-sm text-white font-medium">{remainingDays} {remainingDays === 1 ? 'Día' : 'Días'}</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#2A5D44] h-full rounded-full" style={{ width: `${remainingPercentage}%` }}></div>
                            </div>
                        </div>

                        <div className=" border border-zinc-700 rounded-lg p-6 flex flex-col justify-center gap-4">
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-zinc-300 font-medium uppercase tracking-wider">Visitas Este Mes</span>
                                <span className="text-sm text-white font-medium">12 / 30</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-zinc-400 w-[40%] h-full rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-zinc-700 rounded-lg p-6 overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Historial de Pagos</h3>
                            <Filter size={18} className="text-zinc-400 cursor-pointer hover:text-white transition-colors" />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-t border-zinc-800">
                                        <th className="pb-3 pt-3 text-xs font-medium text-zinc-300">Fecha</th>
                                        <th className="pb-3 pt-3 text-xs font-medium text-zinc-300">ID de Factura</th>
                                        <th className="pb-3 pt-3 text-xs font-medium text-zinc-300">Monto</th>
                                        <th className="pb-3 pt-3 text-xs font-medium text-zinc-300">Método</th>
                                        <th className="pb-3 pt-3 text-xs font-medium text-zinc-300 text-right">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-zinc-300">
                                    {member.paymentHistory.map((payment) => (
                                        <tr key={payment.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                                            <td className="py-4">{new Date(payment.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                            <td className="py-4">{payment.id}</td>
                                            <td className="py-4 text-white font-medium">${payment.amount.toFixed(2)}</td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard size={16} className="text-zinc-500" />
                                                    <span>{payment.method}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-right">
                                                <span className="px-2 py-1 rounded border border-[#1b3d28] bg-[#112a1c] text-[#4ade80] text-[10px] font-bold tracking-wider uppercase">Pagado</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
