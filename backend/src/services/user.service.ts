import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';

const createUser = async (userData: any) => {
  const { confirmarSenha, ...dadosUsuario } = userData;
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

const updateUser = async (userId: string, userData: any) => {
  return prisma.user.update({
    where: { id: userId },
    data: userData
  });
}

const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: { id: userId }
  });
}

export { createUser, getUserById, getAllUsers, updateUser, deleteUser };

