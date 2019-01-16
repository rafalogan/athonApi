
exports.up = function(knex, Promise) {
  return knex.schema.createTable('socialmedia', table => {
      table.increments('id').primary();
      table.string('network').notNullable();
      table.string('icon').notNullable();
      table.string('url', 1000).notNullable();
      table.boolean('visible').notNullable().defaultTo(true);
      table.timestamp('createdAt').notNullable();
      table.timestamp('updatedAt');
      table.integer('userUpdatedId');
      table.integer('userId').unsigned().references('id').inTable('users')
          .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('socialmedia')
};
