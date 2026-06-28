import type { Request, Response } from 'express';
import { createUserService, createProjectService } from '../services/services.js';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: newUser
    });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    return res.status(400).json({ 
      error: 'Erro ao criar usuário', 
      details: error.message
    });
  }
};

export const createProjectController = async (req: Request, res: Response) => {
  try {
    const newProject = await createProjectService(req.body);
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