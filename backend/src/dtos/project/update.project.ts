import { projectStatus } from "../../constants/status.js";
import { estados } from "../../constants/estados.js";
import { diasFuncionamento } from "../../constants/diasFuncionamento.js";
import { categorias } from "../../constants/categorias.js";

export type ProjectStatus = typeof projectStatus[number];
export type Estado = typeof estados[number];
export type DiaFuncionamento = typeof diasFuncionamento[number];
export type Categoria = typeof categorias[number];

export interface UpdateProjectDTO {
    nome?: string;
    email?: string;
    telefone?: string;
    diasFuncionamento?: DiaFuncionamento[];
    endereco?: string;
    bairro?: string;
    cidade?: string;
    estado?: Estado;
    cep?: string;
    descricao?: string;
    categoria?: Categoria;
    avatarUrl?: string;
    instagram?: string;
    facebook?: string;
    site?: string;
    imagensProjeto?: string[];
    status?: ProjectStatus;
}