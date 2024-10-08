import knex from 'knex';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configurações do Knex
const db = knex({
  client: 'pg', // PostgreSQL como cliente
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'your_db_user', // Substitua pelo usuário do banco
    password: process.env.DB_PASSWORD || 'your_db_password', // Substitua pela senha do banco
    database: process.env.DB_NAME || 'your_db_name', // Substitua pelo nome do banco de dados
  },
  pool: { min: 2, max: 10 }, // Configuração de pool de conexões
});

export default db;
