export interface Plan {
  uuid: string;
  name: string;
  price: number;
  durationDays: number;
  description?: string;
}

export interface CreatePlanPayload {
  name: string;
  price: number;
  durationDays: number;
  description?: string;
}

export type UpdatePlanPayload = Partial<CreatePlanPayload>;
