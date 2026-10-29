import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PaymentForm } from './PaymentForm';
import { renderWithProviders } from '../../../../tests/utils/test-utils';

describe('PaymentForm Component', () => {
  const defaultProps = {
    memberName: 'Juan',
    memberSurname: 'Pérez',
    uuid: 'member-uuid-123',
    defaultAmount: 15000,
    onSuccess: vi.fn(),
    onCancel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields with prefilled member info, default amount and alert notice', () => {
    renderWithProviders(<PaymentForm {...defaultProps} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/aviso importante/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/socio/i)).toHaveValue('Juan Pérez');
    expect(screen.getByLabelText(/monto a cobrar/i)).toHaveValue('15.000');
    expect(screen.getByLabelText(/método de pago/i)).toHaveValue('CASH');
    expect(screen.getByLabelText(/fecha del pago/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/concepto \/ observaciones/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar pago/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('should format amount dynamically on user input', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PaymentForm {...defaultProps} defaultAmount={0} />);

    const amountInput = screen.getByLabelText(/monto a cobrar/i);
    await user.type(amountInput, '35000');

    expect(amountInput).toHaveValue('35.000');
  });

  it('should display validation error when submitting with an excessive amount', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PaymentForm {...defaultProps} defaultAmount={0} />);

    const amountInput = screen.getByLabelText(/monto a cobrar/i);
    await user.type(amountInput, '10000001');

    const submitButton = screen.getByRole('button', { name: /registrar pago/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/monto excedido/i)).toBeInTheDocument();
    });

    expect(defaultProps.onSuccess).not.toHaveBeenCalled();
  });

  it('should successfully submit payment via MSW and trigger onSuccess callback', async () => {
    const user = userEvent.setup();
    const handleSuccess = vi.fn();

    renderWithProviders(<PaymentForm {...defaultProps} onSuccess={handleSuccess} />);

    const notesInput = screen.getByLabelText(/concepto \/ observaciones/i);
    await user.type(notesInput, 'Pago de pase diario');

    const submitButton = screen.getByRole('button', { name: /registrar pago/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(handleSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('should trigger onCancel callback when clicking the Cancel button', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    renderWithProviders(<PaymentForm {...defaultProps} onCancel={handleCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
