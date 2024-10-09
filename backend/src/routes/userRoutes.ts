import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserModel } from '../models/userModel';
import knexConfig from '../../knexfile';
import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();
import { authMiddleware } from '../middlewares/authMiddleware'; 


const userRouter = Router();
const db = knex(knexConfig.development);
const userModel = new UserModel(db); // Passa a instância do Knex para o UserModel
const userController = new UserController(userModel);

userRouter.get('/', userController.getAllUsers.bind(userController));

userRouter.get('/:email', userController.getUserByEmail.bind(userController));

userRouter.post('/', userController.createUser.bind(userController));

userRouter.put('/:id', userController.updateUser.bind(userController));

userRouter.delete('/:id', authMiddleware, userController.deleteUser.bind(userController));

userRouter.post('/login', userController.login.bind(userController));

export default userRouter;
