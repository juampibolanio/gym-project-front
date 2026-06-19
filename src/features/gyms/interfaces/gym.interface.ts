export interface Gym {
  uuid: string;
  name: string;
  address: string;
  phoneNumber: string;
  subdomain: string;
}

export interface CreateGymPayload {
  name: string;
  address: string;
  phoneNumber: string;
}

export type UpdateGymPayload = Partial<CreateGymPayload>;
