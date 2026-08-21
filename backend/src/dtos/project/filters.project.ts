import type { Categoria } from "./create.project.js";

export interface ProjectFiltersDTO {
  nome?: string;
  categoria?: Categoria;
  cidade?: string;
  page: number;
  limit: number;
}