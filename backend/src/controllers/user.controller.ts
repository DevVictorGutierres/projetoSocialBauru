import type { Request, Response } from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser, getProjectsUser } from '../services/user.service.js';
import { AppError } from '../utils/appError.js';

const createUserController = async (req: Request, res: Response) => {

  const { confirmarSenha, ...userData } = req.body;
  const newUser = await createUser(userData);
  return res.status(201).json({
    message: 'Usuário criado com sucesso!',
    user: newUser
  });
};

const getUserByIdController = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  if (id !== req.user?.id) {
    throw new AppError('Você não tem permissão para acessar este usuário', 403);
  }
  const user = await getUserById(id);
  return res.status(200).json(user);

};

const getAllUsersController = async (req: Request, res: Response) => {

  const users = await getAllUsers();
  return res.status(200).json(users);

};

const updateUserController = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  if (id !== req.user?.id) {
    throw new AppError('Você não tem permissão para atualizar este usuário', 403);
  }
  
  const updatedUser = await updateUser(id, req.body);
  return res.status(200).json({
    message: 'Usuário atualizado com sucesso!',
    user: updatedUser
  });
};

const deleteUserController = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  if (id !== req.user?.id) {
    throw new AppError('Você não tem permissão para deletar este usuário', 403);
  }
  await getUserById(id);
  await deleteUser(id);
  return res.status(200).json({ message: 'Usuário deletado com sucesso!' });

};

const getProjectsUserController = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  if (id !== req.user?.id) {
    throw new AppError('Você não tem permissão para acessar os projetos deste usuário', 403);
  }

  const projects = await getProjectsUser(id);
  return res.status(200).json(projects);
}

export { createUserController, getUserByIdController, getAllUsersController, updateUserController, deleteUserController, getProjectsUserController };