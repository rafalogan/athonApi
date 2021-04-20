import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('contacts', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.string('email').notNullable();
		table.string('subject').notNullable();
		table.string('phone');
		table.text('message', 'longtext').notNullable();
		table.timestamp('created_at').notNullable().defaultTo(Date.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('contacts');
}
