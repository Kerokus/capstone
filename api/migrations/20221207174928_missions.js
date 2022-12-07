/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('missions', table => {
        table.increments();
        table.date('start_date');
        table.date('end_date');
        table.string('city_base', 250);
        table.string('country', 250);
        table.string('mgrs', 250);
        table.string('name', 250);
        table.string('description', 500);
        table.string('status', 250);
        table.string('purpose', 500);
        table.string('authority', 250);
        table.string('end_state', 500);
        table.string('transportation_methods', 250);
        table.string('timeline', 250);
        table.string('comms_p', 250);
        table.string('comms_a', 250);
        table.string('comms_c', 250);
        table.string('comms_e', 250);
        table.string('risks', 250);
        table.string('decision_point', 250);
        table.integer('team_id');
        table.foreign('team_id').references('teams.id');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
    return knex.schema.alterTable('missions', table => {
        table.dropForeign('team_id')
    })
    .then (function() {
        return knex.schema.dropTableIfExists('missions');
    })
};
