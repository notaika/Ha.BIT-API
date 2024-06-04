/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const levelsData = require('../seed-data/levels')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('levels').del()
  await knex('levels').insert(levelsData);
};
