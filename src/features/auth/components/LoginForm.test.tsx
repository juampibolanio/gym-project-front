import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { LoginForm } from './LoginForm';
import { renderWithProviders } from '../../../../tests/utils/test-utils';
import { useAuthStore } from '../store/auth.store';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/login',
  useSearchParams: () => new URLSearchParams(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, refreshToken: null, user: null, domain: null });
    vi.clearAllMocks();
  });

  it('should render all form inputs, buttons, and links', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText(/dirección email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /¿has olvidado la contraseña\?/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mostrar contraseña/i })).toBeInTheDocument();
  });

  it('should toggle password visibility when clicking the eye button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const toggleButton = screen.getByRole('button', { name: /mostrar contraseña/i });

    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /ocultar contraseña/i })).toBeInTheDocument();

    // Click to hide password
    await user.click(screen.getByRole('button', { name: /ocultar contraseña/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should display validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/el correo electrónico es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should display validation error for invalid email format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText(/dirección email/i);
    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/por favor ingresa un correo electrónico válido/i)).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should submit successfully with valid credentials and navigate to dashboard', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText(/dirección email/i);
    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    await user.type(emailInput, 'admin@gym.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(useAuthStore.getState().token).toBe('mock-access-token');
      expect(useAuthStore.getState().user?.email).toBe('admin@gym.com');
      expect(toast.success).toHaveBeenCalledWith('¡Bienvenido, Carlos!');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
