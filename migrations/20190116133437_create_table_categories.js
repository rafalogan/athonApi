
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description', 1000);
      table.string('url', 1000);
      table.boolean('status').notNullable().defaultTo(true);
      table.timestamp('createdAt').notNullable();
      table.integer('parentId').unsigned().references('id').inTable('categories')
          .nullable();
      table.integer('userId').unsigned().references('id').inTable('users')
          .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};