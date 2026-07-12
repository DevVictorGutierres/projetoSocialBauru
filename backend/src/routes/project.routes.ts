import { Router } from 'express';
import { createProjectController, getAllProjectsController, getProjectByIdController, updateProjectController, deleteProjectController } from '../controllers/project.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { projectSchema } from '../validations/project.schema.js';

const projectRouter = Router();

projectRouter.post('/projects',
    validate(projectSchema),
    createProjectController);
projectRouter.get('/projects', getAllProjectsController);
projectRouter.get('/projects/:id', getProjectByIdController);
projectRouter.put('/projects/:id', updateProjectController);
projectRouter.delete('/projects/:id', deleteProjectController);

export default projectRouter;