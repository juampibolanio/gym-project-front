import * as z from "zod";

export const editPlanSchema = z.object({
    name: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres").max(100, "Nombre demasiado largo"),
    price: z.coerce.number().positive("El precio debe ser mayor a 0").max(10000000, "Precio excesivo"),
    frequency: z.enum(["day", "weekly", "month", "year"], {
        errorMap: () => ({ message: "Selecciona una frecuencia válida" }),
    }),
    description: z.array(z.string()).min(1, "Debe tener al menos un beneficio"),
    durationDays: z.number().positive("La duración debe ser positiva").max(3650, "La duración no puede exceder los 10 años"),
})
