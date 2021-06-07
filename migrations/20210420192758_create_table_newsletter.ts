import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('newsletter', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('name');
		table.string('email').notNullable().unique();
		table.boolean('active').notNullable().defaultTo(true);
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('newsletter');
}
