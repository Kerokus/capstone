/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('missions', table => {
        table.increments();
        table.string('start_date');
        table.string('end_date');
        table.jsonb('location', 250);
        table.string('name', 250);
        table.string('description', 500);
        table.string('status', 250);
        table.string('purpose', 500);
        table.string('authority', 250);
        table.string('end_state', 500);
        table.string('transportation_methods', 250);
        table.jsonb('timeline', 250);
        table.jsonb('pace', 250);
        table.jsonb('risks', 250);
        table.string('decision_point', 250);
        table.boolean('is_archived').defaultTo(false)
        table.integer('team_id').defaultTo(1);
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
