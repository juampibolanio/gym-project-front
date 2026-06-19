export interface Payment {
    uuid: string;
    date: string;
    paymentMethod: 'CASH' | 'BANK_TRANSFER';
    amountPaid: number | string;
    notes?: string;
    memberUuid: string;
}

export interface CreatePaymentPayload {
    paymentMethod: 'CASH' | 'BANK_TRANSFER';
    amountPaid: number;
    notes?: string;
    memberUuid: string;
}
