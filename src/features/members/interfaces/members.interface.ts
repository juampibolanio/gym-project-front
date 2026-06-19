export interface Member {
    uuid: string;
    dni: string;
    name: string;
    surname: string;
    birthDate: string;
    phoneNumber?: string;
    state: string;
    observations?: string;
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
