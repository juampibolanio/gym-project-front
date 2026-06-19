import { z } from 'zod';

export const registerSchema = z
  .object({
    nombreCompleto: z
      .string()
      .trim()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(100, 'Nombre demasiado largo'),
    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('Por favor ingresa un email válido')
      .max(150),
    nombreGimnasio: z
      .string()
      .trim()
      .min(2, 'El nombre del gimnasio es requerido')
      .max(100),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número')
      .regex(/[^a-zA-Z0-9]/, 'Debe contener al menos un carácter especial'),
    confirmPassword: z.string().min(1, 'Por favor confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
