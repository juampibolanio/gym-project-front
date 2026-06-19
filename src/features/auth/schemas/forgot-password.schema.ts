import z from 'zod';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Por favor ingresa un email válido'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export { forgotPasswordSchema };
