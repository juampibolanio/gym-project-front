export interface Plan {
  uuid: string;
  gymUuid?: string;
  name: string;
  price: number;
  durationDays: number;
  description?: string | null;
  isActive?: boolean;
  createdAt?: string;
}

export interface CreatePlanPayload {
  name: string;
  price: number;
  durationDays: number;
  description?: string;
}

export interface UpdatePlanPayload extends Partial<CreatePlanPayload> {
  isActive?: boolean;
}

export interface DeletePlanButtonProps {
  id: string;
  planName: string;
  disabled?: boolean;
}
