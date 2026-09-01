import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';
import type { CreateUserDTO } from '../dtos/user/create.user.js';
import type { UpdateUserDTO } from '../dtos/user/update.user.js';
import { AppError } from '../utils/appError.js';

const safeUserSelect = {
  id: true,
  nome: true,
  email: true,
  telefone: true,
  endereco: true,
  bairro: true,
  cidade: true,
  estado: true,
  cep: true,
  avatarUrl: true,
  createdAt: true
} as const;

const createUser = async (dadosUsuario: CreateUserDTO) => {
  const [emailExists, cpfExists] = await Promise.all([
    prisma.user.findUnique({ where: { email: dadosUsuario.email } }),
    prisma.user.findUnique({ where: { cpf: dadosUsuario.cpf } })
  ]);

  if (emailExists) {
    throw new AppError("E-mail já cadastrado", 409);
  }

  if (cpfExists) {
    throw new AppError("CPF já cadastrado", 409);
  }

  const senhaHash = await bcrypt.hash(dadosUsuario.senha, 10);
  return prisma.user.create({
    data: {
      ...dadosUsuario,
      senha: senhaHash
    },
    select: safeUserSelect
  });
};

const getUserById = async (userId: string) => {

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: safeUserSelect
  });
  if (!user) {
    throw new AppError('Usuário não encontrado', 404);
  }
  return user;
}

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: safeUserSelect
  });
}

const updateUser = async (userId: string, userData: UpdateUserDTO) => {

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const [existingUserByEmail, existingUserByCpf] = await Promise.all([

    userData.email && userData.email !== user.email
      ? prisma.user.findUnique({ where: { email: userData.email } })
      : Promise.resolve(null),

    userData.cpf && userData.cpf !== user.cpf
      ? prisma.user.findUnique({ where: { cpf: userData.cpf } })
      : Promise.resolve(null),
  ]);

  if (existingUserByEmail) {
    throw new AppError("E-mail já cadastrado", 409);
  }
  if (existingUserByCpf) {
    throw new AppError("CPF já cadastrado", 409);
  }

  const data = { ...userData };
  if (data.senha) {
    data.senha = await bcrypt.hash(data.senha, 10);
  }
  return prisma.user.update({
    where: { id: userId },
    data,
    select: safeUserSelect
  });
};

const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: { id: userId }
  });
}

const getProjectsUser = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: {
      userIds: {
        has: userId
      }
    }
})

  return projects;
}


export { createUser, getUserById, getAllUsers, updateUser, deleteUser, getProjectsUser };

