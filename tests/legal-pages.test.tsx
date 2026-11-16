import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TerminosPage from '@/app/(legal)/terminos/page';
import PrivacidadPage from '@/app/(legal)/privacidad/page';
import LegalLayout from '@/app/(legal)/layout';

describe('Legal Pages and Layout', () => {
  describe('LegalLayout', () => {
    it('should render header with ChacuGym branding, back link and footer', () => {
      render(
        <LegalLayout>
          <div data-testid="legal-child">Contenido Legal</div>
        </LegalLayout>
      );

      expect(screen.getByText('ChacuGym')).toBeInTheDocument();
      expect(screen.getByText('Centro Legal y Privacidad')).toBeInTheDocument();
      expect(screen.getByText('Volver')).toBeInTheDocument();
      expect(screen.getByTestId('legal-child')).toBeInTheDocument();

      // Footer links
      const termsLink = screen.getByRole('link', { name: /Términos de Uso/i });
      expect(termsLink).toHaveAttribute('href', '/terminos');

      const privacyLink = screen.getByRole('link', { name: /Política de Privacidad/i });
      expect(privacyLink).toHaveAttribute('href', '/privacidad');
    });
  });

  describe('TerminosPage', () => {
    it('should render terms and conditions title, sections and legal clauses', () => {
      render(<TerminosPage />);

      expect(
        screen.getByRole('heading', { level: 1, name: /Términos y Condiciones de Uso/i })
      ).toBeInTheDocument();

      expect(screen.getByRole('heading', { level: 2, name: /Objeto y Descripción del Servicio/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Cuentas, Credenciales y Responsabilidad de Acceso/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Uso Aceptable y Restricciones/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Propiedad Intelectual/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Ley Aplicable y Jurisdicción/i })).toBeInTheDocument();
    });
  });

  describe('PrivacidadPage', () => {
    it('should render privacy policy title, compliance and security details', () => {
      render(<PrivacidadPage />);

      expect(
        screen.getByRole('heading', { level: 1, name: /Política de Privacidad/i })
      ).toBeInTheDocument();

      expect(screen.getAllByText(/25\.326/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/El Gimnasio \(Responsable\)/i)).toBeInTheDocument();
      expect(screen.getByText(/ChacuGym \(Encargado\)/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Medidas Técnicas de Seguridad y Blindaje/i })).toBeInTheDocument();
      expect(screen.getByText(/Cifrado en Tránsito \(TLS\/HTTPS\)/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Derechos de los Titulares \(Derechos ARCO\)/i })).toBeInTheDocument();
    });
  });
});
