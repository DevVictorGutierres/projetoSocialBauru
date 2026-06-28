import { Router } from 'express';
import { createProjectController } from '../controllers/controllers.js';

const projectRouter = Router();

projectRouter.post('/projects', createProjectController);

projectRouter.get('/projects', (req, res) => {
  res.send('Rota para listar projetos');
});

projectRouter.get('/projects/:id', (req, res) => {
  res.send(`Rota para listar projeto com ID ${req.params.id}`);
});

projectRouter.delete('/projects/:id', (req, res) => {
  res.send(`Rota para deletar projeto com ID ${req.params.id}`);
});

export default projectRouter;
