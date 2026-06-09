import * as z from "zod";

export const createMemberSchema = z.object({
  primerNombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(50, "Nombre demasiado largo"),
  apellido: z.string().trim().min(2, "El apellido debe tener al menos 2 caracteres").max(50, "Apellido demasiado largo"),
  inicial: z.string().max(5, "Inicial muy larga").optional(),
  telefono: z.string().min(8, "Teléfono inválido").max(20, "Teléfono muy largo"),
  email: z.string().trim().email("Debe ser un email válido").max(100, "Email muy largo"),
  fechaActivacion: z.string().min(1, "La fecha de activación es obligatoria"),
  plan: z.string().min(1, "Debe seleccionar un plan"),
  notas: z.string().max(500, "Las notas no pueden superar los 500 caracteres").optional(),
});
