import { Knex } from 'knex';
import TableBuilder = Knex.TableBuilder;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users_rules', (table: TableBuilder) => {
		table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
		table.integer('rule_id').unsigned().references('id').inTable('rules').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users_rules');
}
