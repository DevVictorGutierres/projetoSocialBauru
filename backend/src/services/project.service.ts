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
    throw new AppError('Voce não tem permissão para excluir esse projeto', 403);
  }
  return prisma.project.delete({
    where: { id: projectId }
  });
}

const applyToProject = async (userId: string, projectId: string) => {

  const [existingUser, existingProject] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId }
    }),
    prisma.project.findUnique({
      where: { id: projectId }
    })
  ]);

  if (!existingUser) {
    throw new AppError("Usuário não encontrado", 404);
  }

  if (!existingProject) {
    throw new AppError("Projeto não encontrado", 404);
  }

  if (existingProject.ownerId === userId) {
    throw new AppError(
      "O dono do projeto não pode se inscrever no próprio projeto", 400);
  }

  if (existingProject.status !== "ATIVO") {
    throw new AppError(
      "Não é possível se inscrever em um projeto inativo", 400);
  }

  if (existingProject.userIds.includes(userId)) {
    throw new AppError(
      "Usuário já está inscrito neste projeto", 409);
  }

  const result = await prisma.project.updateMany({
    where: {
      id: projectId,
      status: "ATIVO",
      ownerId: {
        not: userId
      },
      NOT: {
        userIds: {
          has: userId
        }
      }
    },
    data: {
      userIds: {
        push: userId
      }
    }
  });

  if (result.count === 0) {
    throw new AppError(
      "Não foi possível realizar a inscrição. Tente novamente.",
      409
    );
  }
};

const quitFromProject = async (userId: string, projectId: string) => {

  const [existingUser, existingProject] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.project.findUnique({ where: { id: projectId } })
  ]);

  if (!existingUser) {
    throw new AppError("Usuário não encontrado", 404);
  }

  if (!existingProject) {
    throw new AppError("Projeto não encontrado", 404);
  }

  if (existingProject.ownerId === userId) {
    throw new AppError("O dono do projeto não pode sair do projeto", 400);
  }

  if (!existingProject.userIds.includes(userId)) {
    throw new AppError("Usuário não está inscrito neste projeto", 400);
  }

  return await prisma.project.update({
    where: { id: projectId },
    data: {
      userIds: existingProject.userIds.filter(id => id !== userId)
    }
  });
}

const getUsersOfProject = async (projectId: string, userId: string) => {
  const project = await getProjectById(projectId);
  if (project.ownerId === userId) {
    return await prisma.user.findMany({
      where: {
        id: {
          in: project.userIds
        }
      },
      select: {
        id: true,
        nome: true,
        avatarUrl: true,
        email: true,
        telefone: true
      }
    });
  }
  return await prisma.user.findMany({
    where: {
      id: {
        in: project.userIds
      }
    },
    select: {
      id: true,
      nome: true,
      avatarUrl: true
    }
  });
}

export { createProject, getProjectById, getAllProjects, updateProject, deleteProject, applyToProject, quitFromProject, getUsersOfProject };