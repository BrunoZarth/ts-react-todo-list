import request from 'supertest';
import app from '../../src/index';  
import db from '../../config/db-config';  
import { Knex } from 'knex';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

let knexInstance: Knex;
let taskId: number; 
let token: string;  

beforeAll(async () => {
  knexInstance = db;
  await knexInstance.migrate.latest();  

  const newUser = { email: 'tasktest@test.com', password: 'senha12345' };
  await request(app).post('/api/users').send(newUser);

  const loginResponse = await request(app)
    .post('/api/users/login')
    .send(newUser);
  token = loginResponse.body.token;

    const newTask = { name: 'Minha Tarefa', description: 'Descrição da tarefa' };
    const taskResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)  
      .send(newTask);
  
    taskId = 1; 
});

afterAll(async () => {
  await knexInstance.migrate.rollback();  
  await knexInstance.destroy();  
});

describe('Task API Endpoints', () => {
  test('POST /api/tasks - deve criar uma nova tarefa', async () => {
    const newTask = { name: 'Test Task', description: 'Description of the test task' };

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`) 
      .send(newTask);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Tarefa criada');
    expect(response.body).toHaveProperty('id');
    taskId = response.body.id; 
  });

  test('GET /api/tasks - deve retornar todas as tarefas', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    console.log("lista de tarefas: ", JSON.stringify(response.body));
  });

  test('PUT /api/tasks/:id - deve atualizar uma tarefa existente', async () => {
    const updatedTask = { name: 'Updated Task', description: 'Updated description' };

    const response = await request(app)
      .put(`/api/tasks/1`)
      .set('Authorization', `Bearer ${token}`) 
      .send(updatedTask);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Tarefa atualizada');
  });

  test('DELETE /api/tasks/:id - deve deletar uma tarefa existente', async () => {
    const response = await request(app)
      .delete(`/api/tasks/1`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Tarefa deletada');
  });
});
