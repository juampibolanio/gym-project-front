import { describe, it, expect } from 'vitest';
import { planSchema } from './plan.schema';

describe('planSchema', () => {
  const validPlan = {
    name: 'Pase Libre Musculación',
    price: 15000,
    durationDays: 30,
    description: 'Acceso total a la sala de musculación',
  };

  it('should validate a plan with numeric price', () => {
    const result = planSchema.safeParse(validPlan);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.price).toBe(15000);
      expect(result.data.durationDays).toBe(30);
    }
  });

  it('should transform formatted string price into an integer', () => {
    const result = planSchema.safeParse({
      ...validPlan,
      price: '25.000',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.price).toBe(25000);
    }
  });

  it('should fail when price is zero or negative', () => {
    const zeroPrice = planSchema.safeParse({ ...validPlan, price: 0 });
    expect(zeroPrice.success).toBe(false);

    const negativePrice = planSchema.safeParse({ ...validPlan, price: -100 });
    expect(negativePrice.success).toBe(false);
  });

  it('should fail when price exceeds 10,000,000', () => {
    const result = planSchema.safeParse({
      ...validPlan,
      price: 10000001,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Precio excesivo');
    }
  });

  it('should coerce durationDays string to a positive number', () => {
    const result = planSchema.safeParse({
      ...validPlan,
      durationDays: '60' as unknown as number,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.durationDays).toBe(60);
    }
  });

  it('should fail when plan name has fewer than 3 characters', () => {
    const result = planSchema.safeParse({
      ...validPlan,
      name: 'AB',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('El nombre debe tener al menos 3 caracteres');
    }
  });
});

