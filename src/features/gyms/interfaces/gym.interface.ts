export interface Gym {
  uuid: string;
  name: string;
  subdomain: string;
  address: string;
  phoneNumber: string | null;
  isActive?: boolean;
  createdAt?: string;
}

export interface CreateGymPayload {
  name: string;
  address: string;
  phoneNumber: string;
}

export type UpdateGymPayload = Partial<CreateGymPayload>;
