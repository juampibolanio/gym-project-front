import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LegalTab } from './LegalTab';

describe('LegalTab Component', () => {
  it('should render compliance highlights and regulations', () => {
    render(<LegalTab />);

    expect(screen.getByText(/Marco Legal y Privacidad/i)).toBeInTheDocument();
    expect(screen.getByText(/Ley N° 25.326/i)).toBeInTheDocument();
    expect(screen.getByText(/Cifrado y Sesión Segura/i)).toBeInTheDocument();
    expect(screen.getByText(/Aislamiento Multi-Tenant/i)).toBeInTheDocument();
    expect(screen.getByText(/No Comercialización/i)).toBeInTheDocument();
  });

  it('should render direct links to terms and privacy documents', () => {
    render(<LegalTab />);

    const termsLink = screen.getByRole('link', { name: /Términos y Condiciones/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terminos');
    expect(termsLink).toHaveAttribute('target', '_blank');

    const privacyLink = screen.getByRole('link', { name: /Política de Privacidad/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacidad');
    expect(privacyLink).toHaveAttribute('target', '_blank');
  });

  it('should display software version and developer information', () => {
    render(<LegalTab />);

    expect(screen.getByText(/ChacuGym v1.9.0 • Desarrollado por Chacú.IO/i)).toBeInTheDocument();
  });
});
