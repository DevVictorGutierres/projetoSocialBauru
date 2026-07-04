import type { Request, Response } from 'express';
import { createProject, getProjectById, getAllProjects, updateProject, deleteProject } from '../services/project.service.js';

const createProjectController = async (req: Request, res: Response) => {
  try {
    const newProject = await createProject(req.body);
    res.status(201).json({
        message: 'Projeto criado com sucesso!',
        project: newProject
    });
  } catch (error: any) {
    console.error('Erro ao criar projeto:', error);
    return res.status(400).json({ 
      error: 'Erro ao criar projeto', 
      details: error.message
    });
  }
};

const getProjectByIdController = async (req: Request, res: Response) => {
  try {
    const project = await getProjectById(String(req.params.id));
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    res.status(200).json(project);
  } catch (error: any) {
    console.error('Erro ao buscar projeto:', error);
    return res.status(400).json({
      error: 'Erro ao buscar projeto',
      details: error.message
    });
  }
};

const getAllProjectsController = async (req: Request, res: Response) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (error: any) {
    console.error('Erro ao buscar projetos:', error);
    return res.status(400).json({
      error: 'Erro ao buscar projetos',
      details: error.message
    });
  }
};

const updateProjectController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    const updatedProject = await updateProject(id, req.body);
    res.status(200).json({
      message: 'Projeto atualizado com sucesso!',
      project: updatedProject
    });
  } catch (error: any) {
    console.error('Erro ao atualizar projeto:', error);
    return res.status(400).json({
      error: 'Erro ao atualizar projeto',
      details: error.message
    });
  }
};

const deleteProjectController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    await deleteProject(id);
    res.status(200).json({ message: 'Projeto deletado com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao deletar projeto:', error);
    return res.status(400).json({
      error: 'Erro ao deletar projeto',
      details: error.message
    });
  }
};

export { createProjectController, getProjectByIdController, getAllProjectsController, updateProjectController, deleteProjectController };