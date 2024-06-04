/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const taskData = require('../seed-data/tasks');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert(taskData);
};
