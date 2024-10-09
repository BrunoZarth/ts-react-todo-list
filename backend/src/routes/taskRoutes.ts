import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { TaskModel } from '../models/taskModel';
import knexConfig from '../../knexfile';
import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();
import { authMiddleware } from '../middlewares/authMiddleware'; 

const taskRouter = Router();
const db = knex(knexConfig.development);
const taskModel = new TaskModel(db); // Passa a instância do Knex para o TaskModel
const taskController = new TaskController(taskModel);

// Rotas públicas ou protegidas, de acordo com sua aplicação
taskRouter.get('/', authMiddleware, taskController.getAllTasks.bind(taskController));

taskRouter.post('/', authMiddleware, taskController.createTask.bind(taskController));

taskRouter.put('/:id', authMiddleware, taskController.updateTask.bind(taskController));

taskRouter.delete('/:id', authMiddleware, taskController.deleteTask.bind(taskController));

export default taskRouter;
