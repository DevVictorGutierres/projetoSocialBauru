import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';
import type { CreateUserDTO } from '../dtos/user/create.user.js';
import type { UpdateUserDTO } from '../dtos/user/update.user.js';

const createUser = async (dadosUsuario : CreateUserDTO) => {
  const senhaHash = await bcrypt.hash(dadosUsuario.senha, 10);
  return prisma.user.create({
    data: {
      ...dadosUsuario,
      senha: senhaHash
    }
  });
};

const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId }
  });
}

const getAllUsers = async () => { 
  return prisma.user.findMany();
}

const updateUser = async (userId: string,userData: UpdateUserDTO) => {
    const data = { ...userData };
    if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 10);
    }
    return prisma.user.update({
        where: { id: userId },
        data
    });
};

const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: { id: userId }
  });
}

export { createUser, getUserById, getAllUsers, updateUser, deleteUser };

