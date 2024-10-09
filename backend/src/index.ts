import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import knex from 'knex';
import knexConfig from '../knexfile'; 
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs';

// Configura o banco de dados com base no ambiente
const db = knex(process.env.NODE_ENV === 'test' ? knexConfig.test : knexConfig.development);

dotenv.config(); 

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); 

// Rotas
import userRoutes from './routes/userRoutes';
app.use('/api/users', userRoutes); 

import taskRoutes from './routes/taskRoutes';
app.use('/api/tasks', taskRoutes);


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

export default app;
