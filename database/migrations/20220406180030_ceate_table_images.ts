import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('images', (table: TableBuilder) => {
		table.increments('id').primary();
		table.string('title').notNullable();
		table.string('description');
		table.string('file_name').notNullable();
		table.string('alt');
		table.integer('article_id').unsigned().references('id').inTable('articles').notNullable();
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('images');
}
