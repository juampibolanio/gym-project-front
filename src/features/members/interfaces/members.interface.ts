import { Plan } from '../../plans/interfaces/plan.interface';

export interface Subscription {
  uuid: string;
  planUuid: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  plan?: Plan;
}

export interface Payment {
  uuid: string;
  date: string;
  paymentMethod: 'CASH' | 'BANK_TRANSFER';
  amountPaid: number | string;
  notes?: string;
}

export interface Member {
  uuid: string;
  dni: string;
  name: string;
  surname: string;
  birthDate: string;
  phoneNumber?: string;
  state: string;
  observations?: string;
  subscriptions?: Subscription[];
  payments?: Payment[];
}

export interface CreateMemberPayload {
  dni: string;
  name: string;
  surname: string;
  birthDate: string;
  phoneNumber?: string;
  state?: string;
  observations?: string;
}

export type UpdateMemberPayload = Partial<CreateMemberPayload>;

export interface SubscribeAndPayPayload {
  planUuid: string;
  paymentMethod: 'CASH' | 'BANK_TRANSFER';
  amountPaid: number;
  notes?: string;
}
