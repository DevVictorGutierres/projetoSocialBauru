export interface CreateUserDTO {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    telefone: string;
    endereco: string;
    avatar_url?: string;
}