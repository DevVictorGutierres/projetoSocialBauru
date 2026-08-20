import type { Request, Response } from 'express';
import { createProject, getProjectById, getAllProjects, updateProject, deleteProject, applyToProject, quitFromProject, getUsersOfProject } from '../services/project.service.js';

const createProjectController = async (req: Request, res: Response) => {
    const newProject = await createProject(req.body, req.user.id);
    return res.status(201).json({
      message: 'Projeto criado com sucesso!',
      project: newProject
    });
};

const getProjectByIdController = async (req: Request, res: Response) => {
    const projectId = String(req.params.id)

    const project = await getProjectById(projectId);
    return res.status(200).json(project);
};

const getAllProjectsController = async (req: Request, res: Response) => {
    const projects = await getAllProjects();
    return res.status(200).json(projects);
};

const updateProjectController = async (req: Request, res: Response) => {
  const projectId = String(req.params.id);

    const updatedProject = await updateProject(projectId, req.body, req.user.id);
    return res.status(200).json({
      message: 'Projeto atualizado com sucesso!',
      project: updatedProject
    });
};

const deleteProjectController = async (req: Request, res: Response) => {
    const projectId = String(req.params.id);

    await deleteProject(projectId, req.user.id);
    return res.status(200).json({ message: 'Projeto deletado com sucesso!' });
};

const applyToProjectController = async (req: Request, res: Response) => {
    const projectId = String(req.params.id);

  await applyToProject(req.user.id, projectId);

  return res.status(200).json({ message: 'Cadastrado ao projeto com sucesso!' });
}

const quitFromProjectController = async (req: Request, res: Response) => {
  const projectId = String(req.params.id);

  await quitFromProject(req.user.id, projectId);
  return res.status(200).json({ message: 'Saída do projeto realizada com sucesso!' });
};

const getUsersOfProjectController = async (req: Request, res: Response) => {
  const projectId = String(req.params.id);
  const users = await getUsersOfProject(projectId, req.user.id);
  return res.status(200).json(users);
}

export { createProjectController, getProjectByIdController, getAllProjectsController, updateProjectController, deleteProjectController, applyToProjectController, quitFromProjectController, getUsersOfProjectController };