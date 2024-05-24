/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const shopData = require('../seed-data/shop');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('shop').del()
  await knex('shop').insert(shopData);
};
