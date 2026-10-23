export type PaymentMethod =
  | 'CASH'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'MERCADO_PAGO'
  | 'BANK_TRANSFER'
  | 'OTHER';

export type PaymentCategory = 'MEMBERSHIP' | 'ADMISSION' | 'OTHER';

export interface Payment {
  uuid: string;
  gymUuid?: string;
  memberUuid: string;
  subscriptionUuid?: string | null;
  date: string;
  paymentMethod: PaymentMethod;
  category?: PaymentCategory;
  amountPaid: number;
  notes?: string | null;
  isVoided: boolean;
  createdAt?: string;
}

export interface CreatePaymentPayload {
  paymentMethod: PaymentMethod;
  amountPaid: number;
  memberUuid: string;
  notes?: string;
  date?: string;
}

export type UpdatePaymentPayload = Partial<Omit<CreatePaymentPayload, 'memberUuid'>>;

export interface PaymentFormProps {
  memberName: string;
  memberSurname: string;
  uuid: string;
  defaultAmount: number;
  onSuccess: () => void;
  onCancel: () => void;
  isNewMember?: boolean;
}

export interface EditPaymentFormProps {
  payment: Payment;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface PaymentHistoryTableProps {
  payments: Payment[];
}

export interface RegisterPaymentButtonProps {
  memberName: string;
  memberSurname: string;
  uuid: string;
  defaultAmount: number;
}
