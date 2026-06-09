'use server';

import { createMemberSchema } from "../_schemas/createMember.schema";

import * as z from "zod";

export async function createMemberAction(data: z.infer<typeof createMemberSchema>) {
  try {
    const validData = createMemberSchema.parse(data);
    
    console.log('Datos validados y listos para BD:', validData);
    return { success: true, message: "Miembro registrado exitosamente" };
  } catch (error) {
    console.error('Error de validación en el servidor:', error);
    return { success: false, error: "Datos inválidos" };
  }
}
