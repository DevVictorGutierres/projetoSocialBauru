import { prisma } from '../config/prisma.js';

const createUser = async (userData: any) => {
  return prisma.user.create({
    data: userData
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

