import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import knex from 'knex';
import knexConfig from '../knexfile'; // Importa a configuração do Knex

var db = knex(knexConfig.development);
if(process.env.NODE_ENV == 'test') db = knex(knexConfig.test);
  


dotenv.config(); 

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); 

// Testa a conexão com o banco de dados
db.raw('SELECT 1')
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((err: any) => {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  });

  app.get('/', (req: Request, res: Response) => {
    res.send('Servidor está funcionando!');
  });

// Rotas
import userRoutes from './routes/userRoutes';
app.use('/api/users', userRoutes); 

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app;
