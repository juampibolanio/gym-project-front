import { describe, it, expect } from 'vitest';
import { paymentSchema } from './payment.schema';

describe('paymentSchema', () => {
  const validPayment = {
    amount: 15000,
    method: 'CASH',
    date: '2026-10-20',
    notes: 'Pago en efectivo en recepción',
  };

  it('should validate a valid payment payload with numeric amount', () => {
    const result = paymentSchema.safeParse(validPayment);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(15000);
      expect(result.data.method).toBe('CASH');
    }
  });

  it('should transform and clean formatted string amounts (dots and commas)', () => {
    const resultWithDots = paymentSchema.safeParse({
      ...validPayment,
      amount: '25.000',
    });
    expect(resultWithDots.success).toBe(true);
    if (resultWithDots.success) {
      expect(resultWithDots.data.amount).toBe(25000);
    }

    const resultWithCommas = paymentSchema.safeParse({
      ...validPayment,
      amount: '30,000',
    });
    expect(resultWithCommas.success).toBe(true);
    if (resultWithCommas.success) {
      expect(resultWithCommas.data.amount).toBe(30000);
    }
  });

  it('should fail when amount is negative or NaN', () => {
    const negative = paymentSchema.safeParse({ ...validPayment, amount: -500 });
    expect(negative.success).toBe(false);

    const nanAmount = paymentSchema.safeParse({ ...validPayment, amount: 'invalid-amount' });
    expect(nanAmount.success).toBe(false);
  });

  it('should fail when amount exceeds 10,000,000', () => {
    const excessive = paymentSchema.safeParse({
      ...validPayment,
      amount: 10000001,
    });
    expect(excessive.success).toBe(false);
    if (!excessive.success) {
      expect(excessive.error.issues[0].message).toBe('Monto excedido');
    }
  });

  it('should fail when payment method is not in enum', () => {
    const invalidMethod = paymentSchema.safeParse({
      ...validPayment,
      method: 'CRYPTO_USDT',
    });
    expect(invalidMethod.success).toBe(false);
    if (!invalidMethod.success) {
      expect(invalidMethod.error.issues[0].message).toBe(
        'Selecciona un método de pago válido'
      );
    }
  });

  it('should fail when date is in the future', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const futureDateStr = tomorrow.toISOString().split('T')[0];

    const result = paymentSchema.safeParse({
      ...validPayment,
      date: futureDateStr,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('La fecha no puede estar en el futuro');
    }
  });

  it('should fail when notes exceed 500 characters', () => {
    const result = paymentSchema.safeParse({
      ...validPayment,
      notes: 'x'.repeat(501),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Las notas no pueden superar los 500 caracteres');
    }
  });
});

