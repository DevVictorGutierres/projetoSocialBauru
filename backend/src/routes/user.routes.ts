import { Router } from 'express';
import { createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/users', createUserController);
userRouter.get('/users', getAllUsersController);
userRouter.get('/users/:id', getUserByIdController);
userRouter.put('/users/:id', updateUserController);
userRouter.delete('/users/:id', deleteUserController);

export default userRouter;