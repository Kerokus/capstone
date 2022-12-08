/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE teams CASCADE')
  // Deletes ALL existing entries
  await knex('teams').del()
  await knex('teams').insert([
    {id: 0, name: 'Unassigned Team', location: {"city-base": "", "country": ""}, comms_status: '', personnel_status: '', equipment_status: '', is_archived: false},
    {id: 1, name: 'CI Team 1', location: {"city-base": "Camp Arifjan", "country": "Kuwait"}, comms_status: 'yellow', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 2, name: 'HUMINT Team 1', location: {"city-base": "Air Base Ali Al Salem", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'red', equipment_status: 'green', is_archived: false},
    {id: 3, name: 'SIGINT Team 1', location: {"city-base": "Camp Partriot Army Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 4, name: 'CI Team Team 2', location: {"city-base": "H-4 Air Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 5, name: 'HUMINT Team 2', location: {"city-base": "Camp Arifjan", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 6, name: 'SIGINT Team 2', location: {"city-base": "King Abdullah II Air Base", "country": "Jordan"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 7, name: 'CI Team Team 3', location: {"city-base": "Air Base Ali Al Salem", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 8, name: 'HUMINT Team 3', location: {"city-base": "H-4 Air Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 9, name: 'SIGINT Team 3', location: {"city-base": "Air Base Ali Al Salem", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 10, name: 'CI Team Team 4', location: {"city-base": "Camp Partriot Army Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 11, name: 'HUMINT Team 4', location: {"city-base": "King Abdullah II Air Base", "country": "Jordan"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 12, name: 'SIGINT Team 4', location: {"city-base": "H-4 Air Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 13, name: 'CI Team Team 5', location: {"city-base": "Air Base Ali Al Salem", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 14, name: 'HUMINT Team 5', location: {"city-base": "Camp Partriot Army Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 15, name: 'SIGINT Team 5', location: {"city-base": "King Abdullah II Air Base", "country": "Jordan"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 16, name: 'Maintenance Team', location: {"city-base": "Camp Arifjan", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false}
  ]);
};
