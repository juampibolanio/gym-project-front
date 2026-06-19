export type PaymentMethod =
  | 'CASH'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'MERCADO_PAGO'
  | 'BANK_TRANSFER'
  | 'OTHER';

export interface Payment {
  uuid: string;
  date: string;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  notes?: string;
  memberUuid: string;
}

export interface CreatePaymentPayload {
  paymentMethod: PaymentMethod;
  amountPaid: number;
  notes?: string;
  memberUuid: string;
}
