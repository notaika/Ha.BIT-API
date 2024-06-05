/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const habitsData = require('../seed-data/habits')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('habits').del()
  await knex('habits').insert(habitsData);
};
