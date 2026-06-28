import { Router } from 'express';
import { createUserController } from '../controllers/controllers.js';

const userRouter = Router();

userRouter.post('/users', createUserController);

userRouter.get('/users', (req, res) => {
  res.send('Rota para listar usuários');
});

userRouter.get('/users/:id', (req, res) => {
  res.send('Rota para listar usuário');
});

userRouter.delete('/users/:id', (req, res) => {
  res.send(`Rota para deletar usuário com ID ${req.params.id}`);
});

userRouter.put('/users/:id', (req, res) => {
  res.send(`Rota para atualizar usuário com ID ${req.params.id}`);
});

export default userRouter;