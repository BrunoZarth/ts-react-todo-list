import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary(); 
    table.string('name').notNullable(); 
    table.text('description').notNullable(); 
    table.timestamp('created_at').defaultTo(knex.fn.now()); 
    table.timestamp('updated_at').defaultTo(knex.fn.now()); 
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('tasks'); 
}
