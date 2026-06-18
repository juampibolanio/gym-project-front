import * as z from "zod";

export const planSchema = z.object({
    name: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres").max(100, "Nombre demasiado largo"),
    price: z.coerce.number().positive("El precio debe ser mayor a 0").max(10000000, "Precio excesivo"),
    durationDays: z.coerce.number().positive("La duración debe ser positiva").max(3650, "La duración no puede exceder los 10 años"),
    description: z.string().max(500, "La descripción no puede superar los 500 caracteres").optional(),
});

export type PlanFormValues = z.infer<typeof planSchema>;