export enum Roles {
    'SUPER_ADMIN',
    'ADMIN',
    'USER',
}

export interface User {
    uuid: string;
    dni: string;
    name: string;
    surname: string;
    email: string;
    role: Roles;
    registrationDate: Date;
    lastEntryDate: Date;
}

export interface CreateUserPayload {
    dni: string;
    name: string;
    surname: string;
    email: string;
}

export type UpdateUserPayload = Partial<CreateUserPayload>;
