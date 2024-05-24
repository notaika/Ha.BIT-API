/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const inventoryData = require('../seed-data/inventory');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory').del()
  await knex('inventory').insert(inventoryData);
};
