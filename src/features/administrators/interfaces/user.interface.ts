export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'USER';
export type Roles = Role;

export interface User {
  uuid: string;
  dni: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
  isActive?: boolean;
  gymUuid?: string | null;
  createdAt: string;
  lastEntryDate?: string | null;
}

export interface CreateUserPayload {
  dni: string;
  name: string;
  surname: string;
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export type UpdateUserPayload = Partial<CreateUserPayload>;
