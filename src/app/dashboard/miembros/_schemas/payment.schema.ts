import * as z from "zod";

export const paymentSchema = z.object({
    amount: z.coerce.number().positive("El monto debe ser mayor a 0"),
    method: z.enum(["credit_card", "cash", "transfer"], {
        errorMap: () => ({ message: "Selecciona un método de pago válido" }),
    }),
    date: z.string().min(1, "La fecha es obligatoria"),
    notes: z.string().optional(),
});