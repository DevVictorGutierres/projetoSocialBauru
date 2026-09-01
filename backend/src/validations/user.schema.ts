import { z } from "zod";
import { estados } from "../constants/estados.js";

export const userSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(255),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Email invalido"),
    senha: z.string().min(8, "A senha deve ter um mínimo de 8 caracteres"),
    confirmarSenha: z.string().min(8, "A senha deve ter um mínimo de 8 caracteres"),
    cpf: z
        .string()
        .regex(/^\d{11}$/, "CPF deve conter exatamente 11 números"),
    telefone: z
        .string()
        .regex(/^\d{10,11}$/, "Telefone inválido"),
    endereco: z.string().min(3, "Endereço deve conter no mínimo 3 caracteres").max(255),
    bairro: z.string().min(3, "Bairro deve conter no mínimo 3 caracteres").max(100),
    cidade: z.string().min(3, "Cidade deve conter no mínimo 3 caracteres").max(100),
    estado: z
        .string()
        .trim()
        .toUpperCase()
        .refine((estado) => estados.includes(estado as typeof estados[number]), {
            message: "Estado inválido",
        }),
    cep: z
        .string()
        .regex(/^\d{8}$/, "CEP inválido"),
}).refine((valor) => valor.senha === valor.confirmarSenha, {
    message: "As senhas não conferem",
    path: ["confirmarSenha"],
});

