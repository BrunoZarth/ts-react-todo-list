import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './src/db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/db/seeds',
      extension: 'ts',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',  // Banco em memória para testes
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds'),
      extension: 'ts',
    },
  },
};

export default config;
