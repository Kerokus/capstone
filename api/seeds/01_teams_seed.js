/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE teams CASCADE')
  // Deletes ALL existing entries
  await knex('teams').del()
  await knex('teams').insert([
    {id: 1, team_name: 'Unassigned Team', location: {"city_base": "", "country": ""}, comms_status: '', personnel_status: '', equipment_status: '', is_archived: false},
    {id: 2, team_name: 'CI Team 1', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 3, team_name: 'HUMINT Team 1', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'red', equipment_status: 'green', is_archived: false},
    {id: 4, team_name: 'SIGINT Team 1', location: {"city_base": "Camp Partriot Army Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 5, team_name: 'CI Team 2', location: {"city_base": "H-4 Air Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 6, team_name: 'HUMINT Team 2', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 7, team_name: 'SIGINT Team 2', location: {"city_base": "King Abdullah II Air Base", "country": "Jordan"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 8, team_name: 'CI Team 3', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, comms_status: 'yellow', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 9, team_name: 'HUMINT Team 3', location: {"city_base": "H-4 Air Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 10, team_name: 'SIGINT Team 3', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, comms_status: 'red', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 11, team_name: 'CI Team 4', location: {"city_base": "Camp Partriot Army Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 12, team_name: 'HUMINT Team 4', location: {"city_base": "King Abdullah II Air Base", "country": "Jordan"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 13, team_name: 'SIGINT Team 4', location: {"city_base": "H-4 Air Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 14, team_name: 'CI Team 5', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'yellow', equipment_status: 'green', is_archived: false},
    {id: 15, team_name: 'HUMINT Team 5', location: {"city_base": "Camp Partriot Army Base", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 16, team_name: 'SIGINT Team 5', location: {"city_base": "King Abdullah II Air Base", "country": "Jordan"}, comms_status: 'yellow', personnel_status: 'green', equipment_status: 'green', is_archived: false},
    {id: 17, team_name: 'Maintenance Team', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, comms_status: 'green', personnel_status: 'green', equipment_status: 'green', is_archived: false}
  ]);
};
