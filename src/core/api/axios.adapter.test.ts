import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { AxiosAdapter } from './axios.adapter';
import { useAuthStore } from '@/features/auth/store/auth.store';

vi.mock('axios', async () => {
  const actual = await vi.importActual<typeof import('axios')>('axios');
  return {
    ...actual,
    default: {
      ...actual.default,
      create: vi.fn(),
      post: vi.fn(),
    },
  };
});

describe('AxiosAdapter', () => {
  let mockAxiosInstance: {
    defaults: { baseURL: string };
    interceptors: {
      request: { use: ReturnType<typeof vi.fn> };
      response: { use: ReturnType<typeof vi.fn> };
    };
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let requestInterceptorSuccess: (config: Record<string, unknown>) => Record<string, unknown>;
  let responseInterceptorSuccess: (response: unknown) => unknown;
  let responseInterceptorError: (error: unknown) => Promise<unknown>;

  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ token: null, user: null, domain: null });

    mockAxiosInstance = {
      defaults: { baseURL: 'http://localhost:3000/api/v1' },
      interceptors: {
        request: {
          use: vi.fn((successFn) => {
            requestInterceptorSuccess = successFn;
          }),
        },
        response: {
          use: vi.fn((successFn, errorFn) => {
            responseInterceptorSuccess = successFn;
            responseInterceptorError = errorFn;
          }),
        },
      },
      get: vi.fn().mockResolvedValue({ data: { result: 'ok' } }),
      post: vi.fn().mockResolvedValue({ data: { result: 'ok' } }),
      put: vi.fn().mockResolvedValue({ data: { result: 'ok' } }),
      patch: vi.fn().mockResolvedValue({ data: { result: 'ok' } }),
      delete: vi.fn().mockResolvedValue({ data: { result: 'ok' } }),
    };

    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as unknown as ReturnType<typeof axios.create>);
  });

  describe('Configuration & Initialization', () => {
    it('should create axios instance with withCredentials: true and default headers', () => {
      new AxiosAdapter();

      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: expect.any(String),
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });
  });

  describe('Request Interceptor', () => {
    it('should attach Authorization Bearer header when token is present in auth store', () => {
      useAuthStore.setState({ token: 'active-jwt-token' });
      new AxiosAdapter();

      const config = { headers: {} };
      const interceptedConfig = requestInterceptorSuccess(config) as { headers: { Authorization?: string } };

      expect(interceptedConfig.headers.Authorization).toBe('Bearer active-jwt-token');
    });

    it('should not attach Authorization header when token is null', () => {
      useAuthStore.setState({ token: null });
      new AxiosAdapter();

      const config = { headers: {} };
      const interceptedConfig = requestInterceptorSuccess(config) as { headers: { Authorization?: string } };

      expect(interceptedConfig.headers.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptor & Token Refresh Flow', () => {
    it('should pass successful response through unchanged', () => {
      new AxiosAdapter();

      const mockResponse = { status: 200, data: { success: true } };
      expect(responseInterceptorSuccess(mockResponse)).toBe(mockResponse);
    });

    it('should reject non-401 errors directly without calling refresh', async () => {
      new AxiosAdapter();

      const error = {
        response: { status: 500, data: { message: 'Server Error' } },
        config: { url: '/members' },
      };

      await expect(responseInterceptorError(error)).rejects.toEqual(error);
      expect(axios.post).not.toHaveBeenCalled();
    });

    it('should reject 401 error on auth excluded URLs without refreshing', async () => {
      new AxiosAdapter();

      const excludedUrls = ['/auth/login', '/auth/refresh', '/auth/forgot-password', '/auth/reset-password'];

      for (const url of excludedUrls) {
        const error = {
          response: { status: 401 },
          config: { url },
        };

        await expect(responseInterceptorError(error)).rejects.toEqual(error);
      }

      expect(axios.post).not.toHaveBeenCalled();
    });

    it('should refresh token via HttpOnly cookies and retry original request on 401', async () => {
      const adapter = new AxiosAdapter();

      const callableInstance = vi.fn().mockResolvedValue({ data: { retried: true } });
      Object.assign(callableInstance, mockAxiosInstance);
      vi.mocked(axios.create).mockReturnValue(callableInstance as unknown as ReturnType<typeof axios.create>);

      // Recreate adapter to bind callableInstance
      new AxiosAdapter();

      vi.mocked(axios.post).mockResolvedValueOnce({
        data: { access_token: 'new-rotated-token' },
      });

      const originalRequest = {
        url: '/members',
        headers: {},
        _retry: false,
      };

      const error = {
        response: { status: 401 },
        config: originalRequest,
      };

      await responseInterceptorError(error);

      // Verify POST /auth/refresh was called with empty body and withCredentials: true
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/auth/refresh',
        {},
        { withCredentials: true }
      );

      // Verify Zustand store received updated access token
      expect(useAuthStore.getState().token).toBe('new-rotated-token');

      // Verify original request retry was executed with new Authorization header
      expect(originalRequest.headers).toEqual(
        expect.objectContaining({ Authorization: 'Bearer new-rotated-token' })
      );
    });

    it('should force logout when refresh request fails', async () => {
      new AxiosAdapter();

      useAuthStore.setState({
        token: 'expired-token',
        user: {
          uuid: '1',
          dni: '123',
          name: 'John',
          surname: 'Doe',
          email: 'john@example.com',
          role: 'ADMIN',
          gymUuid: 'gym-1',
        },
        domain: 'fitness',
      });

      const refreshError = new Error('Refresh token invalid or expired');
      vi.mocked(axios.post).mockRejectedValueOnce(refreshError);

      const originalRequest = {
        url: '/members',
        headers: {},
        _retry: false,
      };

      const error = {
        response: { status: 401 },
        config: originalRequest,
      };

      await expect(responseInterceptorError(error)).rejects.toBe(refreshError);

      // Verify state was cleared
      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().domain).toBeNull();
    });
  });

  describe('HTTP Method Wrappers', () => {
    it('should correctly delegate get, post, put, patch, delete methods', async () => {
      const adapter = new AxiosAdapter();

      await adapter.get('/test');
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);

      await adapter.post('/test', { foo: 'bar' });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', { foo: 'bar' }, undefined);

      await adapter.put('/test', { foo: 'bar' });
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test', { foo: 'bar' }, undefined);

      await adapter.patch('/test', { foo: 'bar' });
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test', { foo: 'bar' }, undefined);

      await adapter.delete('/test');
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test', undefined);
    });
  });
});
