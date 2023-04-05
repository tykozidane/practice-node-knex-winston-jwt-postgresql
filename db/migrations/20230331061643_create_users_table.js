/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('users', function (table) {
        table.increments('id');
        table.string('username', 255).notNullable();
        table.string('email', 255);
        table.string('password', 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
  };
  
exports.down = function(knex) {
    return knex.schema
      .dropTable('users');
  };