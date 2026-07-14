import { prisma } from '../config/prisma.js';

const createProject = async (projectData: any, ownerId: string) => {

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

const updateProject = async (projectId: string, projectData: any) => {
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