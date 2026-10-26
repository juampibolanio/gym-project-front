import { describe, it, expect } from 'vitest';
import { memberSchema } from './member.schema';

describe('memberSchema', () => {
  const validMember = {
    dni: '38123456',
    name: 'Juan',
    surname: 'Pérez',
    birthDate: '1995-05-15',
    phoneNumber: '+5491123456789',
    observations: 'Sin observaciones médicas',
    emergencyName: 'María Pérez',
    emergencyPhone: '+5491198765432',
    emergencyRelation: 'Madre',
  };

  it('should validate a full valid member payload', () => {
    const result = memberSchema.safeParse(validMember);
    expect(result.success).toBe(true);
  });

  it('should validate when optional fields and emergency data are empty', () => {
    const minimalMember = {
      dni: '12345678',
      name: 'Ana',
      surname: 'Gómez',
      birthDate: '2000-01-01',
      phoneNumber: '',
      observations: '',
      emergencyName: '',
      emergencyPhone: '',
      emergencyRelation: '',
    };
    const result = memberSchema.safeParse(minimalMember);
    expect(result.success).toBe(true);
  });

  it('should fail when DNI is less than 7 or more than 9 digits', () => {
    const shortDni = memberSchema.safeParse({ ...validMember, dni: '123456' });
    expect(shortDni.success).toBe(false);

    const longDni = memberSchema.safeParse({ ...validMember, dni: '1234567890' });
    expect(longDni.success).toBe(false);
  });

  it('should fail when DNI contains letters or symbols', () => {
    const nonNumericDni = memberSchema.safeParse({ ...validMember, dni: '38A23456' });
    expect(nonNumericDni.success).toBe(false);
    if (!nonNumericDni.success) {
      expect(nonNumericDni.error.issues[0].message).toBe('El DNI solo debe contener números');
    }
  });

  it('should fail when birthDate is in the future', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const futureDateStr = tomorrow.toISOString().split('T')[0];

    const result = memberSchema.safeParse({ ...validMember, birthDate: futureDateStr });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('La fecha de nacimiento no puede estar en el futuro');
    }
  });

  it('should fail when phoneNumber format is invalid', () => {
    const result = memberSchema.safeParse({ ...validMember, phoneNumber: '123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('El teléfono debe tener entre 10 y 15 dígitos');
    }
  });

  it('should require all emergency contact fields if at least one is provided', () => {
    // Only emergencyName is provided; phone and relation are missing
    const partialEmergency = {
      ...validMember,
      emergencyName: 'Carlos Gómez',
      emergencyPhone: '',
      emergencyRelation: '',
    };

    const result = memberSchema.safeParse(partialEmergency);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issuePaths = result.error.issues.map((i) => i.path[0]);
      expect(issuePaths).toContain('emergencyPhone');
      expect(issuePaths).toContain('emergencyRelation');
    }
  });
});

