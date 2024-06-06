/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('levels', (table) => {
    table.increments('id').primary();
    table.integer('level').notNullable();
    table.string('name', 255).notNullable();
    table.integer('time').notNullable();
    table.integer('coins').defaultTo(0);
    table.string('spritesheet', 255).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('levels');
};
