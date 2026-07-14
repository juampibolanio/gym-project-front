'use server';
import * as z from 'zod';
import { createMemberSchema } from '@/features/members/schemas/createMember.schema';

export async function createMemberAction(
  data: z.infer<typeof createMemberSchema>
) {
  try {
    const validData = createMemberSchema.parse(data);

    return { success: true, message: 'Miembro registrado exitosamente' };
  } catch (error) {
    return { success: false, error: 'Datos inválidos' };
  }
}
