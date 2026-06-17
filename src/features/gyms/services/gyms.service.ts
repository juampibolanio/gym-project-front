import { httpClient } from "@/core/api/axios.adapter";
import { Gym } from "../interfaces/gym.interface";

export class GymsService {
    private static readonly ENDPOINT = '/gyms';

    static async getByTerm(term: string): Promise<Gym> {
        console.log(`term now: ${term}`)
        return await httpClient.get<Gym>(`${this.ENDPOINT}/${term}`);
    }
    // todo: agregar el resto de metodos cuando se haga el dashboard para los superadmin
}
