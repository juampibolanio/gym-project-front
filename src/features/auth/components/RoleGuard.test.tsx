import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { RoleGuard } from './RoleGuard';
import { useAuthStore } from '../store/auth.store';
import { AuthUser } from '../interfaces/auth.interface';

const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: vi.fn(),
  }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
}));

const mockAdminUser: AuthUser = {
  uuid: 'admin-uuid',
  dni: '35123456',
  name: 'Admin',
  surname: 'User',
  email: 'admin@gym.com',
  role: 'ADMIN',
  gymUuid: 'gym-1',
};

const mockRegularUser: AuthUser = {
  uuid: 'regular-uuid',
  dni: '38123456',
  name: 'Regular',
  surname: 'User',
  email: 'regular@gym.com',
  role: 'USER',
  gymUuid: 'gym-1',
};

describe('RoleGuard', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, refreshToken: null, user: null, domain: null });
    vi.clearAllMocks();
  });

  it('should initially display loading state while hydrating', () => {
    render(
      <RoleGuard allowedRoles={['admin']}>
        <div>Contenido Protegido</div>
      </RoleGuard>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/verificando permisos\.\.\./i)).toBeInTheDocument();
    expect(screen.queryByText('Contenido Protegido')).not.toBeInTheDocument();
  });

  it('should redirect unauthenticated users to /login after hydration', async () => {
    render(
      <RoleGuard allowedRoles={['admin']}>
        <div>Contenido Protegido</div>
      </RoleGuard>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/login');
    });

    expect(screen.queryByText('Contenido Protegido')).not.toBeInTheDocument();
  });

  it('should redirect authenticated users without required role to /dashboard', async () => {
    useAuthStore.setState({
      token: 'valid-token',
      user: mockRegularUser,
    });

    render(
      <RoleGuard allowedRoles={['admin']}>
        <div>Contenido Protegido para Admin</div>
      </RoleGuard>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/dashboard');
    });

    expect(screen.queryByText('Contenido Protegido para Admin')).not.toBeInTheDocument();
  });

  it('should render children when authenticated user possesses the authorized role', async () => {
    useAuthStore.setState({
      token: 'valid-token',
      user: mockAdminUser,
    });

    render(
      <RoleGuard allowedRoles={['admin']}>
        <div>Contenido Protegido para Admin</div>
      </RoleGuard>
    );

    await waitFor(() => {
      expect(screen.getByText('Contenido Protegido para Admin')).toBeInTheDocument();
    });

    expect(mockReplace).not.toHaveBeenCalled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

