
exports.up = function(knex, Promise) {
  return knex.schema.createTable('newsletter', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('email').notNullable().unique();
      table.timestamp('createdAt').notNullable();
      table.boolean('status').notNullable().defaultTo(true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('newsletter')
};
