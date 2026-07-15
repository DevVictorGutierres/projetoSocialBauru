import { prisma } from '../config/prisma.js';
import type { CreateProjectDTO } from '../dtos/project/create.project.js';
import type { UpdateProjectDTO } from '../dtos/project/update.project.js';

const createProject = async (projectData: CreateProjectDTO, ownerId: string) => {

    return prisma.project.create({
        data: {
            ...projectData,
            ownerId
        }
    });
};

const getProjectById = async (projectId: string) => {
  return prisma.project.findUnique({
    where: { id: projectId }
  });
}

const getAllProjects = async () => {
  return prisma.project.findMany();
}

const updateProject = async (projectId: string, projectData: UpdateProjectDTO) => {
  return prisma.project.update({
    where: { id: projectId },
    data: projectData
  });
}

const deleteProject = async (projectId: string) => {
  return prisma.project.delete({
    where: { id: projectId }
  });
}

export { createProject, getProjectById, getAllProjects, updateProject, deleteProject };