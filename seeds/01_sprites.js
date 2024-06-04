/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const spritesData = require('../seed-data/sprites')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sprites').del()
  await knex('sprites').insert(spritesData);
};
