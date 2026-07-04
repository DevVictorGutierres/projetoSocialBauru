import type { Request, Response } from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from '../services/user.service.js';

const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
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

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(400).json({
      error: 'Erro ao buscar usuário',
      details: error.message
    });
  }
};

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(400).json({
      error: 'Erro ao buscar usuários',
      details: error.message
    });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const updatedUser = await updateUser(id, req.body);
    return res.status(200).json({
      message: 'Usuário atualizado com sucesso!',
      user: updatedUser
    });
  } catch (error: any) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(400).json({
      error: 'Erro ao atualizar usuário',
      details: error.message
    });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await deleteUser(id);
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(400).json({
      error: 'Erro ao deletar usuário',
      details: error.message
    });
  }
};

export { createUserController, getUserByIdController, getAllUsersController, updateUserController, deleteUserController };