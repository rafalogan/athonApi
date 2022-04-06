import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('socialmedias', (table: TableBuilder) => {
		table.integer('id').primary();
		table.string('title').notNullable();
		table.string('url').notNullable();
		table.string('icon_name').notNullable();
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('socialmedias');
}
