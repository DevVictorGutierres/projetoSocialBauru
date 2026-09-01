import type { Categoria } from "./create.project.js";

export type ProjectSort = 'recent' | 'oldest' | 'name_asc' | 'name_desc';

export interface ProjectFiltersDTO {
  nome?: string;
  categoria?: Categoria;
  cidade?: string;
  estado?: string;
  bairro?: string;
  status?: 'ATIVO' | 'INATIVO';
  diaFuncionamento?: string;
  sort: ProjectSort;
  page: number;
  limit: number;
}
