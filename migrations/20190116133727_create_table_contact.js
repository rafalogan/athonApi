
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contact', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('subject').notNullable();
      table.integer('phone');
      table.text('content', 'longtext').notNullable();
      table.timestamp('createdAt').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contact')
};
