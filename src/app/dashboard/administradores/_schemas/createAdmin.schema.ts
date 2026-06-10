import * as z from 'zod';

export const createAdminSchema = z.object({
  primerNombre: z.string().min(2, 'Mínimo 2 caracteres').max(50, 'Máximo 50 caracteres'),
  apellido: z.string().min(2, 'Mínimo 2 caracteres').max(50, 'Máximo 50 caracteres'),
  telefono: z.string().min(8, 'Teléfono inválido').max(20, 'Teléfono inválido'),
  email: z.string().email('Email inválido'),
  rol: z.string().min(1, 'El rol es obligatorio'),
  notas: z.string().max(500, 'Máximo 500 caracteres').optional(),
});
