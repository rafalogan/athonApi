import { Knex } from 'knex';

import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('articles', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('title').notNullable();
		table.string('subtitle', 300);
		table.string('description', 1000).notNullable();
		table.binary('content').notNullable();
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
		table.integer('category_id').unsigned().references('id').inTable('categories').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('articles');
}
