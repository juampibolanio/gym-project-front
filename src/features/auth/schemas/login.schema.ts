import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'El email es requerido').email('Por favor ingresa un email válido').max(150),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export { loginSchema };