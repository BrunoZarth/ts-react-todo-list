import request from 'supertest';
import app from '../../src/index';  
import db from '../db-config';  
import { Knex } from 'knex';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

let knexInstance: Knex;

beforeAll(async () => {
  knexInstance = db; 
  await knexInstance.migrate.latest();  // Aplica as migrações no SQLite em memória
});

afterAll(async () => {
  await knexInstance.migrate.rollback();  // Reverte as migrações
  await knexInstance.destroy();  // Fecha a conexão após os testes
});

describe('User API Endpoints', () => {

  test('GET /api/users - deve retornar uma lista vazia inicialmente', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);  
  });

  test('POST /api/users - deve criar um novo usuário', async () => {
    const newUser = { email: 'teste@teste.com', password: 'senha123' };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário criado');
    expect(response.body).toHaveProperty('id');
  });

  test('GET /api/users/:email - deve retornar um usuário por email', async () => {
    const email = 'teste@teste.com';

    const response = await request(app).get(`/api/users/${email}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', email);
  });

  test('PUT /api/users/:id - deve atualizar um usuário existente', async () => {
    const updatedUser = { password: 'novaSenha123' };

    const response = await request(app)
      .put('/api/users/1')  // Supondo que o id do usuário seja 1
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário atualizado');
  });

  test('DELETE /api/users/:id - deve deletar um usuário', async () => {
    const response = await request(app).delete('/api/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário deletado');
  });

});
