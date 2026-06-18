export interface Member {
    dni: string;
    name: string;
    surname: string;
    birthdate: Date;
    phoneNumber: string;
    state: string;
    observations: string;
}

export interface CreateMemberPayload {
    dni: string;
    name: string;
    surname: string;
    birthdate: Date;
    phoneNumber: string;
    state: string;
    observations: string;
}

export type UpdateMemberPayload = Partial<CreateMemberPayload>;

