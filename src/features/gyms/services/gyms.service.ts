import { httpClient } from "@/core/api/axios.adapter";
import { Gym, UpdateGymPayload } from "../interfaces/gym.interface";

export class GymsService {
    private static readonly ENDPOINT = '/gyms';

    static async getByTerm(term: string): Promise<Gym> {
        console.log(`term now: ${term}`)
        return await httpClient.get<Gym>(`${this.ENDPOINT}/${term}`);
    }

    static async update(id: string, payload: UpdateGymPayload): Promise<Gym> {
        return await httpClient.patch<Gym>(`${this.ENDPOINT}/${id}`, payload);
    }

    // todo: agregar el resto de metodos cuando se haga el dashboard para los superadmin
}
