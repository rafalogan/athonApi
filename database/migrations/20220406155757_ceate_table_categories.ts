import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('categories', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.string('description', 1000);
		table.string('url', 1000);
		table.boolean('status').notNullable().defaultTo(true);
		table.integer('parent_id').unsigned().references('id').inTable('categories').nullable();
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('categories');
}
