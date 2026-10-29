import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { NewPlanForm } from './NewPlanForm';
import { renderWithProviders } from '../../../../tests/utils/test-utils';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
  }),
  usePathname: () => '/dashboard/planes/nuevo',
  useSearchParams: () => new URLSearchParams(),
}));

describe('NewPlanForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all form inputs, legends, and action buttons', () => {
    renderWithProviders(<NewPlanForm />);

    expect(screen.getByLabelText(/nombre del plan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/duración/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/beneficios del plan/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear plan/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /descartar/i })).toBeInTheDocument();
  });

  it('should automatically format the price input with thousand separators', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NewPlanForm />);

    const priceInput = screen.getByLabelText(/precio/i);
    await user.type(priceInput, '15000');

    expect(priceInput).toHaveValue('15.000');
  });

  it('should display validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NewPlanForm />);

    const submitButton = screen.getByRole('button', { name: /crear plan/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/el nombre debe tener al menos 3 caracteres/i)).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should successfully submit valid plan and redirect to /dashboard/planes', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NewPlanForm />);

    const nameInput = screen.getByLabelText(/nombre del plan/i);
    const priceInput = screen.getByLabelText(/precio/i);
    const durationInput = screen.getByLabelText(/duración/i);
    const descriptionInput = screen.getByLabelText(/beneficios del plan/i);
    const submitButton = screen.getByRole('button', { name: /crear plan/i });

    await user.type(nameInput, 'Pase Libre Full');
    await user.type(priceInput, '25000');
    await user.clear(durationInput);
    await user.type(durationInput, '30');
    await user.type(descriptionInput, 'Acceso ilimitado a todas las salas');

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard/planes');
    });
  });

  it('should have a working discard link pointing to /dashboard/planes', () => {
    renderWithProviders(<NewPlanForm />);

    const discardLink = screen.getByRole('link', { name: /descartar/i });
    expect(discardLink).toHaveAttribute('href', '/dashboard/planes');
  });
});
