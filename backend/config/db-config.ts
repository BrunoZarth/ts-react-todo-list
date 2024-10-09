import knex from 'knex';
import knexfile from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
const dbConfig = knexfile[environment];

const db = knex(dbConfig);
export default db;
