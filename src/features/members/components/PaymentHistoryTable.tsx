import { CreditCard } from "lucide-react";
import { Payment } from "../interfaces/members.interface";

interface PaymentHistoryTableProps {
    payments: Payment[];
}

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
    const paymentMethods: Record<string, string> = {
        'CASH': 'Efectivo',
        'BANK_TRANSFER': 'Transferencia',
    };

    return (
        <div className="bg-surface border border-border-primary rounded-lg p-6 overflow-hidden flex flex-col transition-colors">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Historial de Pagos</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-t border-border-primary">
                            <th className="pb-3 pt-3 text-xs font-bold text-text-muted uppercase tracking-wider">Fecha</th>
                            <th className="pb-3 pt-3 text-xs font-bold text-text-muted uppercase tracking-wider">ID de Factura</th>
                            <th className="pb-3 pt-3 text-xs font-bold text-text-muted uppercase tracking-wider">Monto</th>
                            <th className="pb-3 pt-3 text-xs font-bold text-text-muted uppercase tracking-wider">Método</th>
                            <th className="pb-3 pt-3 text-xs font-bold text-text-muted uppercase tracking-wider">Notas</th>
                            <th className="pb-3 pt-3 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-text-main">
                        {payments.map((payment) => (
                            <tr key={payment.uuid} className="border-b border-border-primary hover:bg-surface-hover transition-colors">
                                <td className="py-4">{new Date(payment.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                <td className="py-4">{payment.uuid.split('-')[0].toUpperCase()}</td>
                                <td className="py-4 font-bold text-text-main">${Number(payment.amountPaid).toLocaleString('es-AR')}</td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={16} className="text-text-muted" />
                                        <span>{paymentMethods[payment.paymentMethod] || payment.paymentMethod}</span>
                                    </div>
                                </td>
                                <td className="py-4 max-w-[200px] truncate" title={payment.notes || ''}>
                                    {payment.notes ? (
                                        <span className="text-sm text-text-muted">{payment.notes}</span>
                                    ) : (
                                        <span className="text-text-muted">-</span>
                                    )}
                                </td>
                                <td className="py-4 text-right">
                                    <span className="px-2.5 py-1 rounded-md border border-success-main/30 bg-success-surface text-success-main text-[10px] font-bold tracking-widest uppercase">Pagado</span>
                                </td>
                            </tr>
                        ))}
                        {payments.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-text-muted">
                                    No hay pagos registrados aún.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
