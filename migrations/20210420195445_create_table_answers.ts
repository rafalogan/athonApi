import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('answers', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('subject').notNullable();
		table.text('content', 'longtext').notNullable();
		table.integer('contact_id').unsigned().references('id').inTable('contacts').notNullable();
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('answers');
}
