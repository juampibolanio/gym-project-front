import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../../tests/mocks/server';
import { AxiosAdapter } from './axios.adapter';
import { useAuthStore } from '@/features/auth/store/auth.store';

describe('AxiosAdapter', () => {
  let adapter: AxiosAdapter;

  beforeEach(() => {
    adapter = new AxiosAdapter();
    useAuthStore.setState({ token: null, user: null, domain: null });
  });

  describe('Configuration & Initialization', () => {
    it('should configure axios instance with withCredentials: true and base URL', () => {
      // Access internal axiosInstance defaults to verify withCredentials configuration
      const internalAxios = (adapter as unknown as { axiosInstance: { defaults: { withCredentials?: boolean; baseURL?: string } } }).axiosInstance;
      expect(internalAxios.defaults.withCredentials).toBe(true);
      expect(internalAxios.defaults.baseURL).toContain('/api/v1');
    });
  });

  describe('Request Interceptor', () => {
    it('should attach Authorization Bearer header when token is present in auth store', async () => {
      let receivedAuthHeader: string | null = null;

      server.use(
        http.get('*/api/v1/test-auth-header', ({ request }) => {
          receivedAuthHeader = request.headers.get('authorization');
          return HttpResponse.json({ ok: true });
        })
      );

      useAuthStore.setState({ token: 'active-jwt-token' });
      await adapter.get('/test-auth-header');

      expect(receivedAuthHeader).toBe('Bearer active-jwt-token');
    });

    it('should not attach Authorization header when token is null in auth store', async () => {
      let receivedAuthHeader: string | null = null;

      server.use(
        http.get('*/api/v1/test-no-auth', ({ request }) => {
          receivedAuthHeader = request.headers.get('authorization');
          return HttpResponse.json({ ok: true });
        })
      );

      useAuthStore.setState({ token: null });
      await adapter.get('/test-no-auth');

      expect(receivedAuthHeader).toBeNull();
    });
  });

  describe('Response Interceptor & Token Refresh Flow', () => {
    it('should return response data directly on successful requests', async () => {
      server.use(
        http.get('*/api/v1/test-success', () => {
          return HttpResponse.json({ data: 'success-payload' });
        })
      );

      const result = await adapter.get<{ data: string }>('/test-success');
      expect(result).toEqual({ data: 'success-payload' });
    });

    it('should reject non-401 errors directly without attempting refresh', async () => {
      server.use(
        http.get('*/api/v1/test-server-error', () => {
          return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        })
      );

      await expect(adapter.get('/test-server-error')).rejects.toThrow();
    });

    it('should reject 401 error on auth excluded URLs without triggering refresh', async () => {
      server.use(
        http.post('*/api/v1/auth/login', () => {
          return HttpResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
        })
      );

      await expect(adapter.post('/auth/login', { email: 'bad@test.com' })).rejects.toThrow();
    });

    it('should refresh token via HttpOnly cookies and retry original request with new token on 401', async () => {
      let refreshCalled = false;
      let retryAuthHeader: string | null = null;
      let callCount = 0;

      server.use(
        http.post('*/api/v1/auth/refresh', () => {
          refreshCalled = true;
          return HttpResponse.json({ access_token: 'fresh-rotated-token' });
        }),
        http.get('*/api/v1/test-retry-flow', ({ request }) => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json({ message: 'Token expired' }, { status: 401 });
          }
          retryAuthHeader = request.headers.get('authorization');
          return HttpResponse.json({ success: true, count: callCount });
        })
      );

      useAuthStore.setState({ token: 'expired-token' });

      const response = await adapter.get<{ success: boolean; count: number }>('/test-retry-flow');

      expect(refreshCalled).toBe(true);
      expect(useAuthStore.getState().token).toBe('fresh-rotated-token');
      expect(retryAuthHeader).toBe('Bearer fresh-rotated-token');
      expect(response).toEqual({ success: true, count: 2 });
    });

    it('should force logout when refresh endpoint fails with 401', async () => {
      server.use(
        http.post('*/api/v1/auth/refresh', () => {
          return HttpResponse.json({ message: 'Refresh token expired' }, { status: 401 });
        }),
        http.get('*/api/v1/test-refresh-fail', () => {
          return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
        })
      );

      useAuthStore.setState({
        token: 'expired-token',
        user: {
          uuid: 'user-1',
          dni: '12345678',
          name: 'Admin',
          surname: 'User',
          email: 'admin@gym.com',
          role: 'ADMIN',
          gymUuid: 'gym-1',
        },
        domain: 'fitness',
      });

      await expect(adapter.get('/test-refresh-fail')).rejects.toThrow();

      // Verify that auth store was sanitized / reset
      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().domain).toBeNull();
    });
  });

  describe('HTTP Method Wrappers', () => {
    it('should correctly handle get, post, put, patch, delete requests', async () => {
      server.use(
        http.get('*/api/v1/test-crud', () => HttpResponse.json({ method: 'GET' })),
        http.post('*/api/v1/test-crud', () => HttpResponse.json({ method: 'POST' })),
        http.put('*/api/v1/test-crud', () => HttpResponse.json({ method: 'PUT' })),
        http.patch('*/api/v1/test-crud', () => HttpResponse.json({ method: 'PATCH' })),
        http.delete('*/api/v1/test-crud', () => HttpResponse.json({ method: 'DELETE' }))
      );

      expect(await adapter.get<{ method: string }>('/test-crud')).toEqual({ method: 'GET' });
      expect(await adapter.post<{ method: string }>('/test-crud', { a: 1 })).toEqual({ method: 'POST' });
      expect(await adapter.put<{ method: string }>('/test-crud', { a: 1 })).toEqual({ method: 'PUT' });
      expect(await adapter.patch<{ method: string }>('/test-crud', { a: 1 })).toEqual({ method: 'PATCH' });
      expect(await adapter.delete<{ method: string }>('/test-crud')).toEqual({ method: 'DELETE' });
    });
  });
});
