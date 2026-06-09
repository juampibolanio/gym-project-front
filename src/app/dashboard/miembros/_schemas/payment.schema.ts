import * as z from "zod";

export const paymentSchema = z.object({
    amount: z.coerce.number().positive("El monto debe ser mayor a 0").max(10000000, "Monto excedido"),
    method: z.enum(["credit_card", "cash", "transfer"], {
        errorMap: () => ({ message: "Selecciona un método de pago válido" }),
    }),
    date: z.string().min(1, "La fecha es obligatoria").refine((val) => {
        const selected = new Date(val);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return selected <= today;
    }, "La fecha no puede estar en el futuro"),
    notes: z.string().max(500, "Las notas no pueden superar los 500 caracteres").optional(),
});