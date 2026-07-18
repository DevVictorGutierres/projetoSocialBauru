import { prisma } from '../config/prisma.js';
import type { CreateProjectDTO } from '../dtos/project/create.project.js';
import type { UpdateProjectDTO } from '../dtos/project/update.project.js';
import { AppError } from '../utils/appError.js';

const createProject = async (projectData: CreateProjectDTO, ownerId: string) => {

  return prisma.project.create({
    data: {
      ...projectData,
      ownerId
    }
  });
};

const getProjectById = async (projectId: string) => {

  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });
  if (!project) {
    throw new AppError('Projeto não encontrado', 404)
  }

  return project;
}

const getAllProjects = async () => {
  return prisma.project.findMany();
}

const updateProject = async (projectId: string, projectData: UpdateProjectDTO, ownerId: string) => {
  const project = await getProjectById(projectId);

  if (project.ownerId !== ownerId) {
    throw new AppError('Voce não tem permissão para alterar esse projeto', 403);
  }
  return prisma.project.update({
    where: { id: projectId },
    data: projectData
  });
}

const deleteProject = async (projectId: string, ownerId: string) => {
  const project = await getProjectById(projectId);
  
  if (project.ownerId !== ownerId) {
    throw new AppError('Voce não tem permissão para alterar esse projeto', 403);
  }
  return prisma.project.delete({
    where: { id: projectId }
  });
}

export { createProject, getProjectById, getAllProjects, updateProject, deleteProject };