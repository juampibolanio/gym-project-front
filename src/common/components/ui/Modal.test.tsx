import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Modal } from './Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Ventana de Confirmación',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should render nothing when isOpen is false', () => {
    render(
      <Modal {...defaultProps} isOpen={false}>
        <p>Contenido Oculto</p>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Contenido Oculto')).not.toBeInTheDocument();
  });

  it('should render dialog, title, children and aria attributes when isOpen is true', () => {
    render(
      <Modal {...defaultProps}>
        <p>Contenido del Modal</p>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Ventana de Confirmación')).toBeInTheDocument();
    expect(screen.getByText('Contenido del Modal')).toBeInTheDocument();
  });

  it('should call onClose when clicking the close button or backdrop', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Modal {...defaultProps} onClose={handleClose}>
        <button type="button">Acción</button>
      </Modal>
    );

    // Click close button
    const closeButton = screen.getByRole('button', { name: /cerrar ventana/i });
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Click backdrop
    const backdrop = screen.getByRole('dialog');
    await user.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('should call onClose when pressing the Escape key', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Modal {...defaultProps} onClose={handleClose}>
        <input placeholder="Campo de texto" />
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should trap focus within the modal on Tab and Shift+Tab navigation', async () => {
    const user = userEvent.setup();

    render(
      <Modal {...defaultProps}>
        <input data-testid="first-input" placeholder="Primero" />
        <button data-testid="last-button" type="button">
          Último
        </button>
      </Modal>
    );

    const closeButton = screen.getByRole('button', { name: /cerrar ventana/i });
    const firstInput = screen.getByTestId('first-input');
    const lastButton = screen.getByTestId('last-button');

    // Focus starts on first element (close button)
    await waitFor(() => {
      expect(document.activeElement).toBe(closeButton);
    });

    // Tab to first input
    await user.tab();
    expect(document.activeElement).toBe(firstInput);

    // Tab to last button
    await user.tab();
    expect(document.activeElement).toBe(lastButton);

    // Tab from last element wraps back to the first focusable element (close button)
    await user.tab();
    expect(document.activeElement).toBe(closeButton);

    // Shift+Tab from first element wraps to the last focusable element
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(lastButton);
  });

  it('should lock document body overflow when open and restore it on unmount', () => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const { unmount } = render(
      <Modal {...defaultProps}>
        <p>Contenido</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe(originalOverflow);
  });
});
