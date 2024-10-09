import { Knex } from 'knex';

interface Task {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class TaskModel {
  constructor(private knex: Knex) {}

  // Função para criar uma nova tarefa
  public async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<number[]> {
    return this.knex('tasks').insert(task).returning('id');
  }

  // Função para atualizar uma tarefa existente
  public async updateTask(id: number, task: Partial<Omit<Task, 'id'>>): Promise<number> {
    return this.knex('tasks').where({ id }).update(task);
  }

  // Função para deletar uma tarefa
  public async deleteTask(id: number): Promise<number> {
    return this.knex('tasks').where({ id }).del();
  }

  // Função para obter todas as tarefas
  public async getAllTasks(): Promise<Task[]> {
    return this.knex<Task>('tasks').select('*');
  }
}
