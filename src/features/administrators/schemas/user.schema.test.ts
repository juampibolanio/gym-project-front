import { describe, it, expect } from 'vitest';
import { userSchema } from './user.schema';

describe('userSchema', () => {
  const validAdmin = {
    dni: '35123456',
    name: 'Carlos',
    surname: 'Rodríguez',
    email: 'carlos.admin@gym.com',
  };

  it('should validate a complete valid administrator payload', () => {
    const result = userSchema.safeParse(validAdmin);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.dni).toBe('35123456');
      expect(result.data.name).toBe('Carlos');
      expect(result.data.surname).toBe('Rodríguez');
      expect(result.data.email).toBe('carlos.admin@gym.com');
    }
  });

  it('should trim whitespace from all fields', () => {
    const result = userSchema.safeParse({
      dni: '  35123456  ',
      name: '  Carlos  ',
      surname: '  Rodríguez  ',
      email: '  carlos.admin@gym.com  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.dni).toBe('35123456');
      expect(result.data.name).toBe('Carlos');
      expect(result.data.surname).toBe('Rodríguez');
      expect(result.data.email).toBe('carlos.admin@gym.com');
    }
  });

  it('should fail when DNI is less than 7 or more than 9 digits', () => {
    const shortDni = userSchema.safeParse({ ...validAdmin, dni: '12345' });
    expect(shortDni.success).toBe(false);

    const longDni = userSchema.safeParse({ ...validAdmin, dni: '1234567890' });
    expect(longDni.success).toBe(false);
  });

  it('should fail when DNI contains letters or symbols', () => {
    const nonNumericDni = userSchema.safeParse({ ...validAdmin, dni: '35A23456' });
    expect(nonNumericDni.success).toBe(false);
    if (!nonNumericDni.success) {
      expect(nonNumericDni.error.issues[0].message).toBe('El DNI solo debe contener números');
    }
  });

  it('should fail when name or surname has fewer than 2 characters or exceeds 50', () => {
    const shortName = userSchema.safeParse({ ...validAdmin, name: 'A' });
    expect(shortName.success).toBe(false);

    const longName = userSchema.safeParse({ ...validAdmin, name: 'A'.repeat(51) });
    expect(longName.success).toBe(false);

    const shortSurname = userSchema.safeParse({ ...validAdmin, surname: 'B' });
    expect(shortSurname.success).toBe(false);
  });

  it('should fail when email format is invalid', () => {
    const invalidEmail = userSchema.safeParse({ ...validAdmin, email: 'not-an-email' });
    expect(invalidEmail.success).toBe(false);
    if (!invalidEmail.success) {
      expect(invalidEmail.error.issues[0].message).toBe(
        'Debe ser un email válido (ejemplo@correo.com)'
      );
    }
  });
});

