/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('teams', table => {
      table.increments();
      table.string('name', 250);
      table.string('city_base', 250);
      table.string('country', 250);
      table.string('comms_status', 250);
      table.string('personnel_status', 250);
      table.string('equipment_status', 250);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('teams');
  };

  