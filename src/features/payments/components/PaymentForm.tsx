import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePayment } from '../hooks/usePayments';
import {
  PaymentFormValues,
  paymentSchema,
} from '@/features/payments/schemas/payment.schema';
import { PaymentFormProps } from '../interfaces/payments.interface';
import { InputField } from '@/common/components/ui/InputField';
import { SelectField } from '@/common/components/ui/SelectField';
import { TextareaField } from '@/common/components/ui/TextareaField';

export function PaymentForm({
  memberName,
  memberSurname,
  uuid,
  defaultAmount,
  onSuccess,
  onCancel,
  isNewMember,
}: PaymentFormProps) {
  const { mutate: createPayment, isPending } = useCreatePayment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: defaultAmount || 0,
      method: 'CASH',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    createPayment(
      {
        memberUuid: uuid,
        paymentMethod: data.method,
        amountPaid: data.amount,
        notes: data.notes || undefined,
      },
      {
        onSuccess: () => {
          reset();
          onSuccess();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mt-2"
    >
      <p className="text-sm text-text-muted -mt-4 mb-2">
        Registre un nuevo pago para el miembro
      </p>

      {isNewMember && (
        <div className="bg-brand-main/10 border border-brand-main/20 p-3 rounded-md mb-2">
          <p className="text-xs text-brand-main font-medium">
            Si no registra el pago ahora, el miembro quedará activo pero sin
            pagos. Tendrá 5 días para registrarlo desde la vista de detalle, o
            su estado pasará automáticamente a Inactivo.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <InputField
          label="Miembro seleccionado"
          type="text"
          disabled
          value={`${memberName} ${memberSurname}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Monto a cobrar"
          type="text"
          placeholder="0.00"
          registration={register('amount', {
            onChange: (e) => {
              const rawValue = e.target.value.replace(/\D/g, '');
              e.target.value = rawValue
                ? new Intl.NumberFormat('es-AR').format(Number(rawValue))
                : '';
            },
          })}
          error={errors.amount?.message}
          icon={<span className="text-text-muted">$</span>}
        />

        <SelectField
          label="Método de pago"
          registration={register('method')}
          error={errors.method?.message}
        >
          <option value="CASH">Efectivo</option>
          <option value="BANK_TRANSFER">Transferencia bancaria</option>
          <option value="MERCADO_PAGO">Mercado Pago</option>
          <option value="DEBIT_CARD">Tarjeta de débito </option>
          <option value="CREDIT_CARD">Tarjeta de crédito</option>
          <option value="OTHER">Otro</option>
        </SelectField>
      </div>

      <TextareaField
        label="Notas / Observaciones"
        placeholder="Detalles adicionales del pago..."
        registration={register('notes')}
        error={errors.notes?.message}
        rows={3}
      />

      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={() => {
            reset();
            onCancel();
          }}
          className="bg-transparent border border-border-primary text-text-main text-sm font-medium py-2.5 px-6 rounded-sm cursor-pointer hover:bg-surface-hover transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-brand-main text-white text-sm font-medium py-2.5 px-6 rounded-sm cursor-pointer hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Procesando...' : 'Confirmar Pago'}
        </button>
      </div>
    </form>
  );
}
