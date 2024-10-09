import request from 'supertest';
import app from '../../src/index';  
import db from '../../config/db-config';  
import { Knex } from 'knex';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

let knexInstance: Knex;
let userId: number = 2;  // Variável para armazenar o ID do usuário criado
let token: string;    // Variável para armazenar o token JWT do usuário

beforeAll(async () => {
  knexInstance = db; 
  await knexInstance.migrate.latest();  // Aplica as migrações no SQLite em memória

  // Cria um usuário para os testes
  const newUser = { email: 'testes@testes.com', password: 'senha12345' };
  const response = await request(app)
    .post('/api/users')
    .send(newUser);

  //userId = response.body.id; // Armazena o ID do usuário criado

  // Faz login e obtém o token JWT
  const loginResponse = await request(app)
    .post('/api/users/login')
    .send(newUser);
  console.log("loginResponse.body: " + JSON.stringify(loginResponse.body.id) )
  token = loginResponse.body.token; // Armazena o token JWT
});

afterAll(async () => {
  await knexInstance.migrate.rollback();  // Reverte as migrações
  await knexInstance.destroy();  // Fecha a conexão após os testes
});

describe('User API Endpoints', () => {
  
  test('GET /api/users - deve retornar uma lista de todos os usuários', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /api/users - deve criar um novo usuário', async () => {
    const newUser = { email: 'testes2@testes.com', password: 'senha12345' };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário criado');
    expect(response.body).toHaveProperty('id');
  });

  test('GET /api/users/:email - deve retornar um usuário por email', async () => {
    const email = 'testes@testes.com';

    const response = await request(app).get(`/api/users/${email}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', email);
  });

  test('PUT /api/users/:id - deve atualizar um usuário existente', async () => {
    const updatedUser = { password: 'novasenha12345' };

    const response = await request(app)
      .put(`/api/users/${userId}`)  // Usa o ID do usuário criado
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário atualizado');
  });

  test('POST /api/users/login - deve retornar um token JWT ao fazer login', async () => {
    const userLogin = { email: 'testes@testes.com', password: 'senha12345' };

    const response = await request(app)
      .post('/api/users/login')
      .send(userLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token'); // Espera que o token JWT esteja na resposta
  });

  test('DELETE /api/users/:id - deve deletar um usuário autenticado', async () => {
    const response = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`); // Adiciona o token JWT no cabeçalho

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário deletado');
  });

});
