import { categorias } from "../constants/categorias.js";
import type { ProjectFiltersDTO } from "../dtos/project/filters.project.js";
import { z } from "zod";

export const projectFiltersSchema = z.object({
    nome: z.string().trim().min(3).optional(),
    categoria: z.enum(categorias).optional(),
    cidade: z.string().trim().min(3).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
});