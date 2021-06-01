import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('rules', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.string('description', 1000).notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('rules');
}
