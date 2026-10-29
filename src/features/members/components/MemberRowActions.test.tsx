import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemberRowActions } from './MemberRowActions';
import { renderWithProviders } from '../../../../tests/utils/test-utils';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { AuthUser } from '@/features/auth/interfaces/auth.interface';

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
  uuid: 'user-uuid',
  dni: '38123456',
  name: 'Regular',
  surname: 'User',
  email: 'user@gym.com',
  role: 'USER',
  gymUuid: 'gym-1',
};

describe('MemberRowActions Component', () => {
  const defaultProps = {
    uuid: 'member-uuid-123',
    name: 'Juan Pérez',
  };

  beforeEach(() => {
    useAuthStore.setState({ token: 'mock-token', user: mockAdminUser });
    vi.clearAllMocks();
  });

  it('should render trigger button with closed state initially', () => {
    renderWithProviders(<MemberRowActions {...defaultProps} />);

    const triggerButton = screen.getByRole('button', { name: /opciones del socio/i });
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should open dropdown menu displaying Ver Detalles and Editar links on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MemberRowActions {...defaultProps} />);

    const triggerButton = screen.getByRole('button', { name: /opciones del socio/i });
    await user.click(triggerButton);

    expect(triggerButton).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    const viewDetailsLink = screen.getByRole('menuitem', { name: /ver detalles/i });
    expect(viewDetailsLink).toBeInTheDocument();
    expect(viewDetailsLink).toHaveAttribute('href', '/dashboard/miembros/member-uuid-123');

    const editLink = screen.getByRole('menuitem', { name: /editar/i });
    expect(editLink).toBeInTheDocument();
    expect(editLink).toHaveAttribute('href', '/dashboard/miembros/member-uuid-123/editar');
  });

  it('should render Dar de baja action when user role is ADMIN', async () => {
    useAuthStore.setState({ user: mockAdminUser });
    const user = userEvent.setup();

    renderWithProviders(<MemberRowActions {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /opciones del socio/i }));
    expect(screen.getByRole('button', { name: /dar de baja/i })).toBeInTheDocument();
  });

  it('should NOT render Dar de baja action when user role is regular USER', async () => {
    useAuthStore.setState({ user: mockRegularUser });
    const user = userEvent.setup();

    renderWithProviders(<MemberRowActions {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /opciones del socio/i }));
    expect(screen.queryByRole('button', { name: /dar de baja/i })).not.toBeInTheDocument();
  });

  it('should close dropdown menu when an action link is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MemberRowActions {...defaultProps} />);

    const triggerButton = screen.getByRole('button', { name: /opciones del socio/i });
    await user.click(triggerButton);

    const editLink = screen.getByRole('menuitem', { name: /editar/i });
    await user.click(editLink);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

