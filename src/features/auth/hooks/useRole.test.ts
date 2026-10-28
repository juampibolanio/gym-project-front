import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRole } from './useRole';
import { useAuthStore } from '../store/auth.store';
import { AuthUser } from '../interfaces/auth.interface';

const mockBaseUser: AuthUser = {
  uuid: 'user-uuid-123',
  dni: '38123456',
  name: 'Test',
  surname: 'User',
  email: 'test@gym.com',
  role: 'USER',
  gymUuid: null,
};

describe('useRole', () => {
  beforeEach(() => {
    act(() => {
      useAuthStore.setState({ user: null });
    });
  });

  it('should return null role and all false flags when user is unauthenticated (null)', () => {
    const { result } = renderHook(() => useRole());

    expect(result.current.role).toBeNull();
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isUser).toBe(false);
    expect(result.current.isSuperAdmin).toBe(false);
  });

  it('should correctly evaluate ADMIN role', () => {
    act(() => {
      useAuthStore.setState({
        user: { ...mockBaseUser, role: 'ADMIN' },
      });
    });

    const { result } = renderHook(() => useRole());

    expect(result.current.role).toBe('admin');
    expect(result.current.isAdmin).toBe(true);
    expect(result.current.isUser).toBe(false);
    expect(result.current.isSuperAdmin).toBe(false);
  });

  it('should correctly evaluate USER role', () => {
    act(() => {
      useAuthStore.setState({
        user: { ...mockBaseUser, role: 'USER' },
      });
    });

    const { result } = renderHook(() => useRole());

    expect(result.current.role).toBe('user');
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isUser).toBe(true);
    expect(result.current.isSuperAdmin).toBe(false);
  });

  it('should correctly evaluate SUPER_ADMIN role', () => {
    act(() => {
      useAuthStore.setState({
        user: { ...mockBaseUser, role: 'SUPER_ADMIN' },
      });
    });

    const { result } = renderHook(() => useRole());

    expect(result.current.role).toBe('super_admin');
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isUser).toBe(false);
    expect(result.current.isSuperAdmin).toBe(true);
  });
});
