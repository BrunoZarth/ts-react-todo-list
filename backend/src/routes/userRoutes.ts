import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserModel } from '../models/userModel';
import knexConfig from '../../knexfile';
import knex from 'knex';

const userRouter = Router();
const db = knex(knexConfig.development); // Inicializa a instância do Knex
const userModel = new UserModel(db); // Passa a instância do Knex para o UserModel
const userController = new UserController(userModel);

userRouter.get('/', userController.getAllUsers.bind(userController));

userRouter.get('/:email', userController.getUserByEmail.bind(userController));

userRouter.post('/', userController.createUser.bind(userController));

userRouter.put('/:id', userController.updateUser.bind(userController));

userRouter.delete('/:id', userController.deleteUser.bind(userController));

export default userRouter;
