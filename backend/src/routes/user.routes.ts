import { Router } from 'express';
import { createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { userSchema } from '../validations/user.schema.js';

const userRouter = Router();

userRouter.post('/users',
    validate(userSchema),    
    createUserController);
userRouter.get('/users', getAllUsersController);
userRouter.get('/users/:id', getUserByIdController);
userRouter.put('/users/:id', updateUserController);
userRouter.delete('/users/:id', deleteUserController);

export default userRouter;