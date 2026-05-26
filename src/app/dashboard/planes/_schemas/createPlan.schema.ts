import * as z from "zod";

export const createPlanSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(100),
    price: z.coerce.number().positive(),
    frequency: z.enum(["day", "weekly", "month", "year"], {
        errorMap: () => ({ message: "Selecciona una frecuencia válida" }),
    }),
    description: z.array(z.string()).min(1),
    durationDays: z.number().positive().min(1),
})
