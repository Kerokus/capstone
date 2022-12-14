/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('personnel', table => {
        table.bigInteger('id', 10).primary().unique();
        table.string('first_name', 250);
        table.string('last_name', 250);
        table.string('rank', 250);
        table.string('mos', 250);
        table.string('email', 250);
        table.string('status', 250);
        table.jsonb('location', 250);
        table.string('deployment_start');
        table.string('deployment_end');
        table.boolean('is_archived').defaultTo(false)
        table.integer('team_id');
        table.foreign('team_id').references('teams.id');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
    return knex.schema.alterTable('personnel', table => {
        table.dropForeign('team_id')
    })
    .then (function() {
        return knex.schema.dropTableIfExists('personnel');
    })
};
