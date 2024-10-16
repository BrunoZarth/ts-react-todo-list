exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments('id');
      table.string('email').notNullable();
      table.string('password').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
  };
  