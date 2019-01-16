
exports.up = function(knex, Promise) {
  return knex.schema.createTable('answer', table => {
      table.increments('id').primary();
      table.string('subject').notNullable();
      table.text('content', 'longtext').notNullable();
      table.timestamp('createdAt').notNullable();
      table.integer('userId').unsigned().references('id').inTable('users')
          .notNullable();
      table.integer('contactId').unsigned().references('id').inTable('contact')
          .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answer')
};
