/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('habits_completed', (table) => {
    table.increments('id').primary();
    table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    table
        .integer("habits_id")
        .unsigned()
        .references("id")
        .inTable("habits")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
