import { createProjectController, getAllProjectsController, getProjectByIdController, updateProjectController, deleteProjectController, applyToProjectController, quitFromProjectController, getUsersOfProjectController } from '../controllers/project.controller.js';
import { projectFiltersSchema } from '../validations/filter.project.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateQuery } from '../middlewares/query.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { projectSchema } from '../validations/project.schema.js';
import { Router } from 'express';

const projectRouter = Router();

projectRouter.post('/projects',
    authMiddleware,
    validate(projectSchema),
    createProjectController);

projectRouter.get('/projects', 
    validateQuery(projectFiltersSchema),
    getAllProjectsController);

projectRouter.get('/projects/:id', getProjectByIdController);

projectRouter.get('/projects/:id/users',
    authMiddleware,
    getUsersOfProjectController);

projectRouter.put('/projects/:id',
    authMiddleware,
    updateProjectController);

projectRouter.delete('/projects/:id',
    authMiddleware,
    deleteProjectController);

projectRouter.patch('/projects/:id/apply',
    authMiddleware,
    applyToProjectController);

projectRouter.patch('/projects/:id/quit',
    authMiddleware,
    quitFromProjectController);

export default projectRouter;