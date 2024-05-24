/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('shop', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('image', 255).notNullable();
    table.string('description', 255).notNullable();
    table.integer('price').notNullable();
    table.integer('attack').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('shop');
};
