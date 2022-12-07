/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE teams CASCADE')
  // Deletes ALL existing entries
  await knex('teams').del()
  await knex('teams').insert([
    {id: 1, name: 'CI Team 1', city_base: 'Camp Arifjan', country: 'Kuwait', comms_status: 'yellow', personnel_status: 'green', equipment_status: 'green'},
    {id: 2, name: 'HUMINT Team 1', city_base: 'Air Base Ali Al Salem', country: 'Kuwait', comms_status: 'green', personnel_status: 'red', equipment_status: 'green'},
    {id: 3, name: 'SIGINT Team 1', city_base: 'Camp Partriot Army Base', country: 'Kuwait', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 4, name: 'CI Team Team 2', city_base: 'H-4 Air Base', country: 'Jordan', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 5, name: 'HUMINT Team 2', city_base: 'Camp Arifjan', country: 'Kuwait', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 6, name: 'SIGINT Team 2', city_base: 'King Abdullah II Air Base', country: 'Jordan', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 7, name: 'CI Team Team 3', city_base: 'Air Base Ali Al Salem', country: 'Kuwait', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 8, name: 'HUMINT Team 3', city_base: 'H-4 Air Base', country: 'Jordan', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 9, name: 'SIGINT Team 3', city_base: 'Air Base Ali Al Salem', country: 'Kuwait', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 10, name: 'CI Team Team 4', city_base: 'Camp Partriot Army Base', country: 'Kuwait', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 11, name: 'HUMINT Team 4', city_base: 'King Abdullah II Air Base', country: 'Jordan', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 12, name: 'SIGINT Team 4', city_base: 'H-4 Air Base', country: 'Jordan', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 13, name: 'CI Team Team 5', city_base: 'Air Base Ali Al Salem', country: 'Kuwait', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 14, name: 'HUMINT Team 5', city_base: 'Camp Partriot Army Base', country: 'Kuwait', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 15, name: 'SIGINT Team 5', city_base: 'King Abdullah II Air Base', country: 'Jordan', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'},
    {id: 16, name: 'Maintenance Team', city_base: 'Camp Arifjan', country: 'Kuwait', comms_status: 'green', personnel_status: 'green', equipment_status: 'green'}
  ]);
};
