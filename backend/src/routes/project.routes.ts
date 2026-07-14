import { createProjectController, getAllProjectsController, getProjectByIdController, updateProjectController, deleteProjectController } from '../controllers/project.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { projectSchema } from '../validations/project.schema.js';
import { Router } from 'express';

const projectRouter = Router();

projectRouter.post('/projects',
    authMiddleware,
    validate(projectSchema),
    createProjectController);

projectRouter.get('/projects', getAllProjectsController);

projectRouter.get('/projects/:id', getProjectByIdController);

projectRouter.put('/projects/:id', 
    authMiddleware,
    updateProjectController);

projectRouter.delete('/projects/:id', 
    authMiddleware,
    deleteProjectController);

export default projectRouter;