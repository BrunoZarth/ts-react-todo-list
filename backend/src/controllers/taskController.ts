import { Request, Response } from 'express';
import { TaskModel } from '../models/taskModel'; // Importe o TaskModel
import dotenv from 'dotenv';

dotenv.config();

export class TaskController {
  constructor(private taskModel: TaskModel) {}

  // Método para buscar todas as tarefas
  public async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskModel.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  }

  // Método para criar uma nova tarefa
  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      const taskId = await this.taskModel.createTask({ name, description });
      res.status(201).json({ message: 'Tarefa criada', id: taskId });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  }

  // Método para atualizar uma tarefa existente
  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const taskData = req.body;
      const updatedRows = await this.taskModel.updateTask(Number(id), taskData);
      if (updatedRows) {
        res.status(200).json({ message: 'Tarefa atualizada' });
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  }

  // Método para deletar uma tarefa existente
  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedRows = await this.taskModel.deleteTask(Number(id));
      if (deletedRows) {
        res.status(200).json({ message: 'Tarefa deletada' });
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
  }
}
