import { prisma } from '../config/prisma.js';

export const createUserService = async (userData: any) => {

  return await prisma.user.create({
    data: userData
  });
};

export const createProjectService = async (projectData: any) => {

  return await prisma.project.create({
    data: projectData
  });
};