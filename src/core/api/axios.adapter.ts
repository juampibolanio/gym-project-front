import axios, { 
  AxiosInstance, 
  AxiosError, 
  InternalAxiosRequestConfig, 
  AxiosRequestConfig 
} from 'axios';
import { HttpAdapter } from './http.adapter';
import { useAuthStore } from '@/features/auth/store/auth.store'; 

const AUTH_EXCLUDED_URLS = ['/auth/login', '/auth/refresh', '/auth/forgot-password', '/auth/reset-password'];

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: {
    resolve: (token: string) => void;
    reject: (reason?: unknown) => void;
  }[] = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: unknown) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        const isAuthRoute = AUTH_EXCLUDED_URLS.some((url) => originalRequest?.url?.includes(url));
        if (!originalRequest || isAuthRoute) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const { setTokens, setLogout } = useAuthStore.getState();

          if (this.isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          this.isRefreshing = true;

          try {
            const response = await axios.post<{ access_token: string }>(
              `${this.axiosInstance.defaults.baseURL}/auth/refresh`,
              {},
              { withCredentials: true }
            );

            const { access_token } = response.data;

            setTokens(access_token);
            this.processQueue(null, access_token);

            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return this.axiosInstance(originalRequest);
            
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            this.forceLogout(setLogout);
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: unknown, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error || !token) {
        prom.reject(error || new Error('No access token available'));
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  private forceLogout(setLogoutFn: () => void) {
    if (typeof window !== 'undefined') {
      setLogoutFn();
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

export const httpClient = new AxiosAdapter();
