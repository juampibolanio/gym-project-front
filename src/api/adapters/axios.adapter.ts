import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";

export class AxiosAdapter implements HttpAdapter {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // todo: aca hay q añadir interceptores (para el token jwt por ej )
    }

    async get<T>(url: string, config?: any): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    async post<T>(url: string, data: any, config?: any): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data: any, config?: any): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    async patch<T>(url: string, data: any, config?: any): Promise<T> {
        const response = await this.axiosInstance.patch<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: any): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }

}

export const httpClient = new AxiosAdapter();