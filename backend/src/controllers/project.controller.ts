import type { Request, Response } from 'express';
import { createProject, getProjectById, getAllProjects, updateProject, deleteProject } from '../services/project.service.js';

const createProjectController = async (req: Request, res: Response) => {
    const newProject = await createProject(req.body, req.user.id);
    return res.status(201).json({
      message: 'Projeto criado com sucesso!',
      project: newProject
    });

};

const getProjectByIdController = async (req: Request, res: Response) => {
    const id = String(req.params.id)

    const project = await getProjectById(id);
    return res.status(200).json(project);

};

const getAllProjectsController = async (req: Request, res: Response) => {
    const projects = await getAllProjects();
    return res.status(200).json(projects);
};

const updateProjectController = async (req: Request, res: Response) => {
  const id = String(req.params.id);

    const updatedProject = await updateProject(id, req.body, req.user.id);
    return res.status(200).json({
      message: 'Projeto atualizado com sucesso!',
      project: updatedProject
    });
};

const deleteProjectController = async (req: Request, res: Response) => {
    const id = String(req.params.id);

    await deleteProject(id, req.user.id);
    return res.status(200).json({ message: 'Projeto deletado com sucesso!' });
};

export { createProjectController, getProjectByIdController, getAllProjectsController, updateProjectController, deleteProjectController };