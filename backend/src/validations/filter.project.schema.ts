import { categorias } from "../constants/categorias.js";
import { diasFuncionamento } from "../constants/diasFuncionamento.js";
import { estados } from "../constants/estados.js";
import { projectStatus } from "../constants/status.js";
import { z } from "zod";

export const projectFiltersSchema = z.object({
    nome: z.string().trim().min(3).optional(),
    categoria: z.enum(categorias).optional(),
    cidade: z.string().trim().min(3).optional(),
    estado: z.enum(estados).optional(),
    bairro: z.string().trim().min(3).optional(),
    status: z.enum(projectStatus).optional(),
    diaFuncionamento: z.enum(diasFuncionamento).optional(),
    sort: z.enum(['recent', 'oldest', 'name_asc', 'name_desc']).default('recent'),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});
