import { z } from "zod";

export const authSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Email inválido"),

    senha: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
});