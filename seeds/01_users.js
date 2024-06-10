/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const userData = require('../seed-data/users')
exports.seed = async function(knex) {
  await knex('user').del()
  await knex('user').insert(userData);
};
