import { describe, it, expect } from 'vitest';
import { loginSchema } from './login.schema';

describe('loginSchema', () => {
  it('should validate valid email and password successfully', () => {
    const result = loginSchema.safeParse({
      email: 'admin@gym.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('admin@gym.com');
      expect(result.data.password).toBe('password123');
    }
  });

  it('should trim surrounding whitespace from email', () => {
    const result = loginSchema.safeParse({
      email: '  user@gym.com  ',
      password: 'password123',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('user@gym.com');
    }
  });

  it('should fail when email is empty or invalid format', () => {
    const emptyEmail = loginSchema.safeParse({
      email: '',
      password: 'password123',
    });
    expect(emptyEmail.success).toBe(false);

    const invalidEmail = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
    });
    expect(invalidEmail.success).toBe(false);
    if (!invalidEmail.success) {
      expect(invalidEmail.error.issues[0].message).toBe(
        'Por favor ingresa un correo electrónico válido'
      );
    }
  });

  it('should fail when password has less than 6 characters', () => {
    const result = loginSchema.safeParse({
      email: 'admin@gym.com',
      password: '123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'La contraseña debe tener al menos 6 caracteres'
      );
    }
  });

  it('should fail when password exceeds 100 characters', () => {
    const result = loginSchema.safeParse({
      email: 'admin@gym.com',
      password: 'a'.repeat(101),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('La contraseña es demasiado larga');
    }
  });
});

