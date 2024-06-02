/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('levels', function(table) {
        table.integer('coins').defaultTo(0);
        table.integer('sprites_id')
            .unsigned()
            .references('sprites.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('levels');
};
